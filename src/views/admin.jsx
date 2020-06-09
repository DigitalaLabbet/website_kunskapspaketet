import React, { Component } from 'react';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import '../styles/css/admin.css';

import { connect } from 'react-redux';

import Navbar from '../components/navbar';
import Topbar from '../components/topbar';
import Notify from '../components/notify';
import UserTable from '../components/userTable';
import LectureTable from '../components/lectureTable';

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

    const toggleLecture = row => {
      this.props.firebase
        .firestore()
        .collection('lectures')
        .doc(row.id)
        .update({
          isVisible: !row.isVisible
        })
        .then(() => {
          const notifyText = `${!row.isVisible ? 'Aktiverade' : 'Deaktiverade'} ${row.category}`;
          if (!row.isVisible) {
            Notify.success(notifyText);
          } else {
            Notify.warning(notifyText);
          }
        })
        .catch(error => console.error('Error writing document: ', error));
    };

    return (
      <div className="container admin">
        <Topbar name={profile.role === 'super_admin' ? 'Administration' : 'Lärare'} />
        <div className="navbar-margin">
          {users && <UserTable users={users} deleteUser={deleteUser} />}
          {profile.role === 'super_admin' && lectures && (
            <LectureTable lectures={lectures} toggleLecture={toggleLecture} />
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
