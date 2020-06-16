import React, { Component } from 'react';

import Modal from 'react-bootstrap/Modal';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import Notify from '../notify';

import * as servicesHttp from '../../services/http';
import { connect } from 'react-redux';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      role: 'student',
      teacher: ''
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

      servicesHttp
        .updateUser(user.id, updatedValues)
        .then(res => {
          console.log('res : ', res);
          Notify.success(`Eleven har uppdaterats: ${this.state.email}`);
          this.handleClose();
        })
        .catch(err => servicesHttp.handleError(err));
    } else {
      const { userUid, userRole } = this.props;
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        teacher:
          userRole === 'super_admin' && this.state.role === 'student'
            ? this.state.teacher
            : userRole === 'admin'
            ? userUid
            : null,
        role: this.state.role,
        phoneNumber: this.state.phoneNumber
      };
      servicesHttp
        .createUser(newUser)
        .then(res => {
          console.log('res : ', res);
          Notify.success(`Eleven har skapats: ${this.state.email}`);
          this.handleClose();
        })
        .catch(err => servicesHttp.handleError(err));
    }
  }

  render() {
    const { show, name, email, phoneNumber, password } = this.state;
    const { user, userRole, users } = this.props;
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
              {userRole === 'super_admin' && (
                <div className="form-group">
                <label>role :</label>
                <select className="form-control form-control-sm" name="role" onChange={this.handleStateUserChange}>
                  <option>välj ...</option>
                  <option value="teacher">Lärare</option>
                  <option value="student">student</option>
                </select>
                </div>
              )}

              {this.state.role === 'student' && (
                <div className="form-group">
                  <label>Lärare :</label>
                  <select
                    className="form-control form-control-sm"
                    name="teacher"
                    onChange={this.handleStateUserChange}>
                    <option>välj ...</option>
                    {users.map(
                      user =>
                        user.role === 'teacher' && (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        )
                    )}
                  </select>
                </div>
              )}
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

const enhance = compose(
  firebaseConnect(),
  connect(state => ({
    userUid: state.firebase.auth.uid,
    userRole: state.firebase.profile.role,
    users: state.firestore.ordered.users
  }))
);

export default enhance(CreateUser);
