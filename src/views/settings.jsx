import React, { Component } from 'react';

import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import Navbar from '../components/navbar';
import { connect } from 'react-redux';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.firebase.logout();
  }

  render() {
    const profile = this.props.profile;
    return (
      <div>
        <div className="container-fluid">
          <button onClick={this.logout} className="btn btn-danger">
            Logga ut
          </button>
          Settings page here
        </div>
        <Navbar role={profile.role} />
      </div>
    );
  }
}

const enhance = compose(
  firebaseConnect(),
  connect((state) => ({
    profile: state.firebase.profile,
  }))
);

export default enhance(Settings);
