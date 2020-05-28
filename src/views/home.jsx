import React, { Component } from 'react';

import Categories from '../components/categories';
import Navbar from '../components/navbar';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Home extends Component {
  render() {
    const { profile } = this.props;
    const { lectures } = this.props;

    return (
      <div>
        {lectures && lectures.length > 0 && (
          <div className="container-fluid public-container">
            <div className="welcome">
              <h6 className="text-white text-center pb-3 pt-3">
                Välkommen {profile.name ? profile.name : profile.email}
              </h6>
            </div>
            <Categories lectures={lectures} />
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
          </div>
        )}
        <Navbar role={profile.role} />
      </div>
    );
  }
}
const enhance = compose(
  firebaseConnect(),
  firestoreConnect(() => ['lectures']),
  connect((state) => ({
    profile: state.firebase.profile,
    lectures: state.firestore.ordered.lectures,
  }))
);

export default enhance(Home);
