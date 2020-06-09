import React, { Component } from 'react';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import '../styles/css/admin.css';

import { connect } from 'react-redux';

import Navbar from '../components/navbar';
import Topbar from '../components/topbar';
import Notify from '../components/notify';
import RegisterForm from '../components/RegisterForm';
import UserTable from '../components/userTable';
import LectureTable from '../components/lectureTable';
import CreateUser from '../components/modals/create-user';

import * as servicesUsers from '../services/users';

class Admin extends Component {
  render() {
    const { profile, lectures, users } = this.props;

    const deleteUser = id => {
      servicesUsers
        .removeUser(id)
        .then(res => {
          console.log('res: ', res);
          Notify.success(res.data);
        })
        .catch(err => servicesUsers.handleError(err));
    };
    this.createUser = this.createUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.errorHandle = this.errorHandle.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.toggleLecture = this.toggleLecture.bind(this);
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

  toggleLecture = id => {
    const { isVisible } = this.state;
    this.setState({ isVisible: !this.state.isVisible });
    console.log(isVisible);
    
    if (isVisible != undefined) {
      this.props.firebase
        .firestore()
        .collection('lectures')
        .doc(id)
        .update({
          isVisible: isVisible
        })
        .then(() => {
          this.props.history.push('/admin');
        })
        .catch(error => console.error('Error writing document: ', error));
    }
  };

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
        <Topbar name={profile.role == 'super_admin' ? 'Administration' : 'lärare Dashbord'} />
        <header className="adminHeader">
          <div className="edit">
            <ul>
              <li>
                <CreateUser />
              </li>
              <li>
                <button className="btn btn-info" data-toggle="modal" data-target="#lecture">
                  <i className="fa fa-plus fa-lg mr-2" aria-hidden="true"></i> Föreläsning
                </button>
              </li>
            </ul>
          </div>
        </header>
        <RegisterForm />
        <div className="navbar-margin">
          {users && <UserTable users={users} />}

          {/* if the role field is super_admin the lecture table will show up */}
          {profile.role === 'super_admin' && lectures && (
            <LectureTable lectures={lectures} onToggle={this.toggleLecture} isVisible={this.state.isVisible} />
          )}
        </div>
        <Navbar role={profile.role} />
      </div>
    );
  }
}

const enhance = compose(
  connect(state => ({
    profile: state.firebase.profile,
    lectures: state.firestore.ordered.lectures,
    users: state.firestore.ordered.users
  })),
  firebaseConnect(),
  firestoreConnect(props => {
    const { uid } = props.firebase.auth().currentUser;
    const { role } = props.profile;

    const getArr = ['lectures'];
    if (role === 'super_admin') {
      getArr.push('users');
    } else {
      getArr.push({ collection: 'users', where: ['teacher', '==', uid] });
    }
    return getArr;
  })
);

export default enhance(Admin);
