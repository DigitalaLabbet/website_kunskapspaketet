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
              <h6 className="text-white text-center py-3">Välkommen {profile.name ? profile.name : profile.email}</h6>
            </div>
            <Categories lectures={lectures} />
            <div className="row m-0 mt-4 px-2">
              <div className="col-md-10 mx-auto px-0 pb-5">
                <h5>instruktioner om hur eleverna kan använda kategorierna</h5>
                <hr className="my-2" />
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
  firestoreConnect(() => [{ 
    collection: 'lectures',
    where: ['isVisible', '==', true]
  }]),
  connect(state => ({
    profile: state.firebase.profile,
    lectures: state.firestore.ordered.lectures
  }))
);

export default enhance(Home);
