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
    const { user } = this.props;
    if (user) {
      this.setState(user);
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleStateUserChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
    const { show, name, email, phoneNumber, password } = this.state;
    const { user } = this.props;
    return (
      <React.Fragment>
        <button className={`btn btn-sm ${user ? 'btn-warning text-white' : 'btn-primary'}`} onClick={this.handleShow}>
          {user ? (
            <React.Fragment>
              <i className="fa fa-edit"></i>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <i className="fa fa-plus"></i>
            </React.Fragment>
          )}
        </button>
        <Modal show={show} backdrop="static" keyboard={false} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>{user ? 'Editera användare' : 'Skapa användare'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Namn</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={this.handleStateUserChange}
                />
              </div>
              <div className="form-group">
                <label>E-post</label>
                <input
                  type="email"
                  className="form-control"
                  disabled={user ? true : false}
                  name="email"
                  value={email}
                  onChange={this.handleStateUserChange}
                />
              </div>
              <div className="form-group">
                <label>Telenummer</label>
                <input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={this.handleStateUserChange}
                />
              </div>
              <div className="form-group">
                <label>Lösenord</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
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
