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
      teacher: 'default'
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleStateUserChange = this.handleStateUserChange.bind(this);
    this.save = this.save.bind(this);
    this.isEdit = false;
  }

  handleShow() {
    this.setState({ show: true });
    const { user } = this.props;
    if (user) {
      this.setState(user);
      this.isEdit = true;
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleStateUserChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  resetState() {
    this.setState({ show: false });
    this.setState({ name: '' });
    this.setState({ email: '' });
    this.setState({ phoneNumber: '' });
    this.setState({ password: '' });
    this.setState({ role: 'student' });
    this.setState({ teacher: '' });
  }

  save(e) {
    e.preventDefault();
    const { user } = this.props;
    if (user) {
      const { name, email, password, phoneNumber } = this.state;
      const updatedValues = {
        name: name,
        password: password,
        phoneNumber: phoneNumber
      };

      servicesHttp
        .updateUser(user.id, updatedValues)
        .then(res => {
          console.log('res : ', res);
          Notify.success(`Användaren har uppdaterats: ${email}`);
          this.resetState();
          this.handleClose();
        })
        .catch(err => servicesHttp.handleError(err));
    } else {
      const { userUid, userRole } = this.props;
      const { name, email, password, role, teacher, phoneNumber } = this.state;
      const newUser = {
        name: name,
        email: email,
        password: password,
        teacher: userRole === 'super_admin' && role === 'student' ? teacher : userRole === 'teacher' ? userUid : null,
        role: role,
        phoneNumber: phoneNumber
      };
      servicesHttp
        .createUser(newUser)
        .then(res => {
          console.log('res : ', res);
          Notify.success(`Användaren har skapats: ${email}`);
          this.resetState();
          this.handleClose();
        })
        .catch(err => servicesHttp.handleError(err));
    }
  }

  render() {
    const { show, name, email, phoneNumber, password, role, teacher } = this.state;
    const { user, userRole, teachers } = this.props;
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
        <Modal show={show} backdrop="static" onHide={this.handleClose}>
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
              {!this.isEdit && userRole === 'super_admin' && (
                <>
                  <div className="form-group">
                    <label>Roll</label>
                    <select
                      className="form-control form-control-sm"
                      name="role"
                      value={role}
                      onChange={this.handleStateUserChange}>
                      <option value="teacher">Lärare</option>
                      <option value="student">student</option>
                    </select>
                  </div>

                  {role === 'student' && (
                    <div className="form-group">
                      <label>Lärare</label>
                      <select
                        className="form-control form-control-sm"
                        name="teacher"
                        value={teacher}
                        onChange={this.handleStateUserChange}>
                        <option value="default" disabled>
                          Välj
                        </option>
                        {teachers.map(teacher => (
                          <option key={teacher.id} value={teacher.id}>
                            {teacher.name}({teacher.email})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </>
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
    teachers: state.firestore.ordered.users.filter(user => user.role === 'teacher')
  }))
);

export default enhance(CreateUser);
