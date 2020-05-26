import React, { Component } from 'react';

import Categories from '../components/categories';
import Mobile from '../components/navbar_mb';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      user: null,
    };
  }

  logout() {
    this.props.firebase.logout();
  }

  render() {
    const profile = this.props.profile;
    return (
      <div className="container-fluid public-container">
        <div className="welcome">
          <h6 className="text-white pb-5 pt-4">Välkommen {profile.name ? profile.name : profile.email}</h6>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id recusandae commodi dolorem aperiam quibusdam,
              itaque temporibus nobis, praesentium, corrupti officiis debitis unde voluptate quaerat veritatis. Sed
              officiis nihil ipsum vitae!
            </p>
          </div>
        </div>
        <Mobile />
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

export default enhance(Home);
