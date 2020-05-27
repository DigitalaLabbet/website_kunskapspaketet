import React, { Component } from 'react';

import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import Navbar from '../components/navbar';
import { connect } from 'react-redux';

class Chat extends Component {
  render() {
    const profile = this.props.profile;

    return (
      <div>
        <div className="container-fluid">Chat here</div>
        <Navbar role={profile.role} />
      </div>
    );
  }
}

const enhance = compose(
  firebaseConnect(),
  firestoreConnect(),
  connect((state) => ({
    profile: state.firebase.profile,
  }))
);

export default enhance(Chat);
