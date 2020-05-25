import React, { Component } from 'react';

/* thired part packages */

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/* our components */
import './styles/css/main.css';
import './styles/css/home.css';

import Main from './views/main';
import Home from './views/home';
import Categories_list from './views/categoriesList';
import Lecture from './views/lecture';
import { withFirebase } from './firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    // check if user is signed in
    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route path="/" exact component={this.state.user ? Home : Main} />
            <Route path="/hem" component={Home} />
            <Route path="/kategori_list" component={Categories_list} />
            <Route path="/forlasning" component={Lecture} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withFirebase(App);
