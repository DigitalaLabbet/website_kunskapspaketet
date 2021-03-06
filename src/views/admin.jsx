import React, { Component } from 'react';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import '../styles/css/admin.css';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Navbar from '../components/navbar';
import Topbar from '../components/topbar';
import Notify from '../components/notify';
import UserTable from '../components/userTable';
import LectureTable from '../components/lectureTable';
import LanguageTable from '../components/languageTable';

import * as servicesHttp from '../services/http';

class Admin extends Component {
  componentDidMount() {
    const { role } = this.props.profile;
    if (role === 'student') {
      this.props.history.push('/404');
    }
  }
  render() {
    const { profile, lectures, users, languages, firestore } = this.props;

    const deleteUser = id => {
      servicesHttp
        .removeUser(id)
        .then(res => {
          console.log('res: ', res);
          Notify.success(res.data);
        })
        .catch(err => servicesHttp.handleError(err));
    };

    const deleteLanguage = id => {
      const langName = languages.find(x => x.id === id).name;
      firestore
        .collection('i18n')
        .doc(id)
        .delete()
        .then(res => {
          console.log('res: ', res);
          Notify.success(`${langName} har raderats`);
        })
        .catch(err => servicesHttp.handleError(err));
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
          const notifyText = `${!row.isVisible ? 'Aktiverade' : 'Inaktiverade'} ${row.name}`;
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
            <LectureTable lectures={lectures} toggleLecture={toggleLecture} firestore={this.props.firestore} />
          )}
          {profile.role === 'super_admin' && languages && (
            <LanguageTable languages={languages} deleteLanguage={deleteLanguage} />
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
    users: state.firestore.ordered.users,
    languages: state.firestore.ordered.i18n
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
    getArr.push({ collection: 'i18n' });
    return getArr;
  }),
  withRouter
);

export default enhance(Admin);
