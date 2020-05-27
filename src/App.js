import React, { Component } from 'react';

/* thired part packages */

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { isLoaded, firebaseConnect, firestoreConnect } from 'react-redux-firebase';

/* our components */
import './styles/css/main.css';
import './styles/css/home.css';

import Landing from './views/landing';
import Home from './views/home';
import Categories_list from './views/categoriesList';
import Lecture from './views/lecture';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Admin from './views/admin';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.isAuthenticated = false;
        this.setState({ user: null });
      }
    });
  }

  render() {
    const profile = this.props.profile;
    return (
      <Router>
        {isLoaded(profile) && (
          <div className="app">
            <Switch>
              <Route path="/" exact component={profile.email ? Home : Landing} />
              <Route path="/hem" component={profile.email ? Home : Landing} />
              <Route path="/kategori_list" component={profile.email ? Categories_list : Landing} />
              <Route path="/forlasning" component={profile.email ? Lecture : Landing} />
              <Route path="/admin" component={profile.email ? Admin : Landing} />
            </Switch>
          </div>
        )}
      </Router>
    );
  }
}
const enhance = compose(
  firebaseConnect(),
  firestoreConnect(),
  connect(
    (state) => (
      ({ firebase: { auth, profile } }) => ({
        auth,
        profile,
      }),
      {
        profile: state.firebase.profile,
      }
    )
  )
);

export default enhance(App);
