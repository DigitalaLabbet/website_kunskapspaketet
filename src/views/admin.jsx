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

    return (
      <div className="container admin">
        <Topbar name={profile.role === 'super_admin' ? 'Administration' : 'lärare Dashbord'} />
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
          {users && <UserTable users={users} deleteUser={deleteUser} />}
          {profile.role === 'super_admin' && lectures && <LectureTable lectures={lectures} />}
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
