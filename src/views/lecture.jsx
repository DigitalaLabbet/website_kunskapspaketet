import React, { Component } from 'react';

import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Topbar from '../components/topbar';
import Navbar from '../components/navbar';

class Lecture extends Component {
  render() {
    const profile = this.props.profile;
    const lecture = this.props.currentLecture;

    return (
      <div>
        {lecture && (
          <>
            <Topbar name={lecture.name} backLink="/" color={lecture.color} />
            <div className="container mb-navbar">
              <div className="lecture">
                <iframe title="vidoe" width="100%" height="250px" src={lecture.videoUrl}></iframe>
                <div>
                  <p>{lecture.information}</p>
                </div>
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
  firestoreConnect((props) => [
    {
      collection: 'lectures',
      where: ['name', '==', props.match.params.lectureName],
      storeAs: 'currentLecture',
    },
  ]),
  connect((state) => ({
    profile: state.firebase.profile,
    currentLecture: state.firestore.ordered.currentLecture && state.firestore.ordered.currentLecture[0],
  }))
);

export default enhance(Lecture);
