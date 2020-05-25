import React, { Component } from 'react';

import Categories from '../components/categories';
import Mobile from '../components/navbar_mb';
import { withFirebase } from '../firebase';

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.authChange = this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.updateUser(user);
      } else {
        this.setState({ user: null });
      }
    });
  }

  updateUser(user) {
    this.props.firebase.user(user.uid).then((res) => {
      if (res.exists) {
        // User exists in database
        this.setState({ user: res.data() });
      } else {
        // User doesn't exist in database > create user
        const newUser = {
          id: user.uid,
          email: user.email,
          name: '',
          role: 'student',
        };
        this.props.firebase.createUser(newUser);
        this.setState({ user: newUser });
      }
    });
  }

  componentWillUnmount() {
    this.authChange();
  }

  logout() {
    this.props.firebase.doSignOut();
  }

  render() {
    return (
      this.state.user && (
        <div className="container-fluid public-container">
          <div className="welcome">
            <h6 className="text-white pb-5 pt-4">
              Välkommen {this.state.user.name ? this.state.user.name : this.state.user.email}
            </h6>
            <button onClick={this.logout} className="btn btn-danger">
              Logga ut
            </button>
          </div>
          <Categories />
          <div className="row instructions">
            <div className="col-md-10 mx-auto pb-5 content">
              <h5>instruktioner om hur eleverna kan använda kategorierna</h5>
              <hr />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id recusandae commodi dolorem aperiam
                quibusdam, itaque temporibus nobis, praesentium, corrupti officiis debitis unde voluptate quaerat
                veritatis. Sed officiis nihil ipsum vitae!
              </p>
            </div>
          </div>
          <Mobile />
        </div>
      )
    );
  }
}

export default withFirebase(Home);
