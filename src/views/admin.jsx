import React, { Component } from 'react';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import '../styles/css/admin.css';
import UserTable from '../components/userTable';
import LectureTable from '../components/lectureTable';

import { connect } from 'react-redux';
import RegisterForm from '../components/RegisterForm';

import Navbar from '../components/navbar';
import Topbar from '../components/topbar';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      lectures: [],
      name: '',
      email: '',
      phoneNumber: '',
      role: '',
      password: '',
      msg: ''
    };
    this.createUser = this.createUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.errorHandle = this.errorHandle.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  createUser(e) {
    e.preventDefault();
    const { email, password } = this.state;
    if (email.length > 0 && password.length > 0) {
      const profile = {
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        name: this.state.name,
        role: this.state.role
      };
      this.props.firebase.createUser(this.state, profile).catch(err => {
        console.log('doCreateUserWithEmailAndPassword - err: ', err);
        this.errorHandle(err.code);
      });
    } else {
      this.setState({ msg: 'E-post och lösenord måste deklareras' });
    }
  }

  errorHandle(err) {
    if (err === 'auth/wrong-password') {
      this.setState({ msg: 'E-postadressen eller lösenord felaktig' });
    }
    if (err === 'auth/invalid-email') {
      this.setState({ msg: 'E-postadressen är inte glitlig' });
    }
    if (err === 'auth/user-not-found') {
      this.setState({ msg: 'E-postadressen finns inte' });
    }
    if (err === 'auth/email-already-in-use') {
      this.setState({ msg: 'E-postadressen används redan av ett annat konto.' });
    }
    if (err === 'auth/weak-password') {
      this.setState({ msg: 'Lösenordet måste vara minst 6 tecken' });
    }
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSelectChange = event => {
    this.setState({
      role: event.target.value
    });
  };

  render() {
    const { profile, lectures, users } = this.props;
    
    return (
      <div className="container admin">
        <Topbar name={profile.role == 'super_admin' ? ( 'Administration') :( 'lärare Dashbord')} />
        <header className="adminHeader">
          <div className="edit">
            <ul>
              <li>
                <button className="btn btn-primary " data-toggle="modal" data-target="#adduser">
                  <i className="fa fa-plus fa-lg mr-2" aria-hidden="true"></i> Konto
                </button>
              </li>
              <li>
                <button className="btn btn-info" data-toggle="modal" data-target="#lecture">
                  <i className="fa fa-plus fa-lg mr-2" aria-hidden="true"></i> Föreläsning
                </button>
              </li>
            </ul>
          </div>
          <div className="w-75 mx-auto">
            <p className="bg-warning text-center" style={{ fontSize: '13px' }}>
              {this.state.msg}
            </p>
          </div>
        </header>
        <main>
          <div className="modal fade" id="adduser" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="adduser">
                    lägg till ny användare
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label> Namn </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> E-post </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> telenummer </label>
                      <input
                        type="text"
                        className="form-control"
                        name="phoneNumber"
                        value={this.state.phoneNumber}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Lösenord </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Roll </label>
                      <select className="form-control form-control-sm" onClick={this.handleSelectChange}>
                        <option value="student">elev</option>
                        <option value="teacher">Lärare</option>
                      </select>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">
                        Stäng
                      </button>
                      <button onClick={this.createUser} className="btn btn-success" data-dismiss="modal">
                        Spara
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
        <RegisterForm />
        <div className="navbar-margin">
          {users && <UserTable users={users} />}

          {/* if the role field is super_admin the lecture table will show up */}
          {profile.role === "super_admin" && (
            lectures && <LectureTable lectures={lectures} />
          )
          }
          
        </div>
        <Navbar role={profile.role} />
      </div>
    );
  }
}

const enhance = compose(
  firebaseConnect(),
  firestoreConnect(() => ['lectures', 'users']),
  connect(state => ({
    profile: state.firebase.profile,
    lectures: state.firestore.ordered.lectures,
    users: state.firestore.ordered.users
  }))
);

export default enhance(Admin);
