import React, { Component } from 'react';

/* thired part packages */

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { isLoaded, firebaseConnect, firestoreConnect } from 'react-redux-firebase';

/* our components */
import './styles/css/main.css';
import './styles/css/home.css';

import Main from './views/main';
import Home from './views/home';
import Categories_list from './views/categoriesList';
import Lecture from './views/lecture';
import { connect } from 'react-redux';
import { compose } from 'redux';

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
              <Route path="/" exact component={profile.email ? Home : Main} />
              <Route path="/hem" component={Home} />
              <Route path="/kategori_list" component={Categories_list} />
              <Route path="/forlasning" component={Lecture} />
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
