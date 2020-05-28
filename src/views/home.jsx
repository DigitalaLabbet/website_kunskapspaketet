import React, { Component } from 'react';

import Categories from '../components/categories';
import Navbar from '../components/navbar';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      lectures: [],
    };
    this.loaded = false;
  }

  componentDidMount() {
    this.props.firestore
      .collection('lectures')
      .get()
      .then((snapshot) => {
        const lectures = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        this.setState({ lectures });
        this.loaded = true;
      });
  }

  render() {
    const profile = this.props.profile;
    const lectures = this.state.lectures;

    return (
      <div className="container-fluid public-container">
        {lectures.length > 0 && (
          <>
            <div className="welcome">
              <h6 className="text-white pb-5 pt-4">Välkommen {profile.name ? profile.name : profile.email}</h6>
            </div>
            <Categories lectures={this.state.lectures} />
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
          </>
        )}
        <Navbar role={profile.role} />
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
