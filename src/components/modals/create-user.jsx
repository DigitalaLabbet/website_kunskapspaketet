import React, { Component } from 'react';

import Modal from 'react-bootstrap/Modal';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import Notify from '../notify';

import * as servicesUsers from '../../services/users';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      name: '',
      email: '',
      phoneNumber: '',
      password: ''
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleStateUserChange = this.handleStateUserChange.bind(this);
    this.save = this.save.bind(this);
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleStateUserChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      this.setState(user);
    }
  }

  save(e) {
    e.preventDefault();
    const { user } = this.props;
    if (user) {
      const updatedValues = {
        name: this.state.name,
        password: this.state.password,
        phoneNumber: this.state.phoneNumber
      };

      console.log(updatedValues);
      servicesUsers
        .updateUser(user.id, updatedValues)
        .then(res => {
          console.log('res : ', res);
          Notify.success(`Eleven har uppdaterats: ${this.state.email}`);
          this.handleClose();
        })
        .catch(err => servicesUsers.handleError(err));
    } else {
      const { uid } = this.props.firebase.auth().currentUser;
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        teacher: uid,
        role: 'student',
        phoneNumber: this.state.phoneNumber
      };
      servicesUsers
        .createUser(newUser)
        .then(res => {
          console.log('res : ', res);
          Notify.success(`Eleven har skapats: ${this.state.email}`);
          this.handleClose();
        })
        .catch(err => servicesUsers.handleError(err));
    }
  }

  render() {
    const { show } = this.state;
    return (
      <React.Fragment>
        <button
          className={`btn ${this.props.user ? 'btn-sm btn-warning text-white' : 'btn-primary'}`}
          onClick={this.handleShow}>
          {this.props.user ? (
            <React.Fragment>
              <i className="fa fa-edit"></i>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <i className="fa fa-plus fa-lg mr-2"></i> Konto
            </React.Fragment>
          )}
        </button>
        <Modal show={show} backdrop="static" keyboard={false} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>{this.props.user ? 'Editera användare' : 'Skapa användare'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Namn</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleStateUserChange}
                />
              </div>
              <div className="form-group">
                <label>E-post</label>
                <input
                  type="email"
                  className="form-control"
                  disabled={this.props.user ? true : false}
                  name="email"
                  value={this.state.email}
                  onChange={this.handleStateUserChange}
                />
              </div>
              <div className="form-group">
                <label>Telenummer</label>
                <input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={this.handleStateUserChange}
                />
              </div>
              <div className="form-group">
                <label>Lösenord</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleStateUserChange}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={this.handleClose}>
              Stäng
            </button>
            <button className="btn btn-success" onClick={this.save}>
              Spara
            </button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

const enhance = compose(firebaseConnect());

export default enhance(CreateUser);
