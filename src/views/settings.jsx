import React, { Component } from 'react';

import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Topbar from '../components/topbar';
import Navbar from '../components/navbar';
import { withRouter } from 'react-router-dom';
import Notify from '../components/notify';
import * as servicesHttp from '../services/http';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.update = this.update.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: this.props.profile.name || '',
      email: this.props.profile.email || '',
      role: this.props.profile.role || '',
      phoneNumber: this.props.profile.phoneNumber || '',
      password: ''
    };
  }

  logout() {
    this.props.firebase.logout();
    this.props.history.push('/');
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  update(e) {
    e.preventDefault();
    const { firebase } = this.props;
    const patchValues = {
      name: this.state.name,
      phoneNumber: this.state.phoneNumber
    };

    if (this.state.password) {
      firebase.auth().currentUser.updatePassword(this.state.password);
      this.setState({
        password: ''
      });
    }

    firebase
      .updateProfile(patchValues)
      .then(() => {
        Notify.success('Uppdaterade användaren');
      })
      .catch(err => servicesHttp.handleError(err));
  }

  render() {
    const profile = this.props.profile;
    return (
      <div>
        <Topbar name="Inställningar" />
        <div className="container-fluid navbar-margin mt-2">
          <div className="col-12 col-lg-6 offset-lg-3 p-0">
            <div>
              <hr />
              <form>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    className="form-control"
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    className="form-control"
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="role">Role</label>
                  <input
                    id="role"
                    className="form-control"
                    type="text"
                    name="role"
                    value={this.state.role}
                    onChange={this.handleChange}
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber">PhoneNumber</label>
                  <input
                    id="phoneNumber"
                    className="form-control"
                    type="phone"
                    name="phoneNumber"
                    value={this.state.phoneNumber}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password">Ändra lösenord</label>
                  <input
                    id="password"
                    className="form-control"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
                <button type="submit" onClick={this.update} className="btn btn-success mt-2 w-100">
                  Spara
                </button>
              </form>
              <hr />
              <p className="cursor-pointer" onClick={this.logout}>
                Logga ut
              </p>
              <hr />
            </div>
          </div>
        </div>
        <Navbar role={profile.role} />
      </div>
    );
  }
}

const enhance = compose(
  firebaseConnect(),
  connect(state => ({
    profile: state.firebase.profile
  })),
  withRouter
);

export default enhance(Settings);
