import React, { Component } from 'react';

/* thired part packages */

import { Route, HashRouter, Switch } from 'react-router-dom';

import { isLoaded, firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ToastContainer, Slide } from 'react-toastify';

/* our components */
import 'react-toastify/dist/ReactToastify.css';
import './styles/css/main.css';
import './styles/css/home.css';

import Landing from './views/landing';
import Home from './views/home';
import Admin from './views/admin';
import Settings from './views/settings';
import Lecture from './views/lecture';
import NoMatch from './views/no-match';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    const profile = this.props.profile;
    return (
      <div className="app">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          closeButton={false}
          transition={Slide}
        />
        {isLoaded(profile) && (
          <HashRouter>
            <Switch>
              <Route path="/" exact component={profile.email ? Home : Landing} />
              <Route path="/settings" component={profile.email ? Settings : Landing} />
              <Route path="/lecture/:lectureName" component={profile.email ? Lecture : Landing} />
              <Route path="/admin" component={profile.email ? Admin : Landing} />
              <Route component={NoMatch}></Route>
            </Switch>
          </HashRouter>
        )}
      </div>
    );
  }
}
const enhance = compose(
  firebaseConnect(),
  firestoreConnect(),
  connect(state => ({
    profile: state.firebase.profile
  }))
);

export default enhance(App);
