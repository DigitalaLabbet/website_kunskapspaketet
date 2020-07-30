import React, { Component } from 'react';

import Modal from 'react-bootstrap/Modal';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import * as servicesHttp from '../../services/http';

import { connect } from 'react-redux';
import Notify from '../notify';

class CreateUser extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      name: '',
      isEdit: false,
      keys: { welcomeTitle: '', description: '' }
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleStateFormChange = this.handleStateFormChange.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleShow() {
    if (this._isMounted) {
      this.setState({ show: true });
    }
    this.setState({ show: true });
    const { language } = this.props;
    if (language) {
      if (this._isMounted) {
        this.setState(language);
        this.setState({ isEdit: true });
      }
    }
  }

  handleClose() {
    if (this._isMounted) {
      this.setState({ show: false });
    }
  }

  handleStateFormChange(e) {
    if (this._isMounted) {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  resetState() {
    this.setState({ show: false });
    this.setState({ name: '' });
    this.setState({ isEdit: false });
    this.setState({ keys: { welcomeTitle: '', description: '' } });
  }

  save(e) {
    e.preventDefault();
    const { language, firestore } = this.props;
    const { name, keys } = this.state;
    if (language) {
      const updateValues = {
        name: name,
        keys: keys
      };

      firestore
        .collection('i18n')
        .doc(language.id)
        .update(updateValues)
        .then(() => {
          Notify.success(`${updateValues.name} har uppdaterats`);
          if (this._isMounted) {
            this.resetState();
          }
          this.handleClose();
        })
        .catch(err => servicesHttp.handleError(err));
    } else {
      const newLanguage = {
        name: name,
        keys: keys
      };

      firestore
        .collection('i18n')
        .doc()
        .set(newLanguage)
        .then(res => {
          console.log('res: ', res);
          Notify.success(`${newLanguage.name} har lagts till`);
          if (this._isMounted) {
            this.resetState();
          }
          this.handleClose();
        })
        .catch(err => servicesHttp.handleError(err));
    }
  }

  handleKeysChange(event) {
    event.preventDefault();
    const keysUpdate = JSON.parse(JSON.stringify(this.state.keys));

    keysUpdate[event.target.name] = event.target.value;
    if (this._isMounted) {
      this.setState({ keys: keysUpdate });
    }
  }

  render() {
    const { show, name, keys } = this.state;
    const { language } = this.props;

    return (
      <React.Fragment>
        <button
          className={`btn btn-sm ${language ? 'btn-warning text-white' : 'btn-primary'}`}
          onClick={this.handleShow}>
          {language ? (
            <React.Fragment>
              <i className="fa fa-edit"></i>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <i className="fa fa-plus"></i>
            </React.Fragment>
          )}
        </button>
        <Modal show={show} backdrop="static" onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>{language ? 'Editera språk' : 'Skapa språk'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.save}>
              <div className="form-group">
                <label>Namn</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={this.handleStateFormChange}
                  required
                />
              </div>
              <h5 className="mt-4">Nycklar</h5>
              {Object.keys(keys)?.map((key, index) => (
                <div key={index} className="form-group">
                  <label>{key}</label>
                  <input
                    type="text"
                    className="form-control"
                    name={key}
                    value={keys[key]}
                    onChange={this.handleKeysChange.bind(this)}
                    required
                  />
                </div>
              ))}
                <div className="form-footer">
                  <button type="reset" className="btn btn-secondary" onClick={this.handleClose}>
                    Stäng
                  </button>
                  <input type="submit" className="btn btn-success" value="Spara" />
                </div>
            </form>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

const enhance = compose(
  firestoreConnect(),
  connect(state => ({}))
);

export default enhance(CreateUser);
