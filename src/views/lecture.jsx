import React, { Component } from 'react';

import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Navbar from '../components/navbar';

class Lecture extends Component {
  constructor() {
    super();
    this.state = {
      lecture: null,
    };
  }
  componentDidMount() {
    const lectureName = this.props.match.params.lectureName;
    this.props.firestore
      .collection('lectures')
      .where('name', '==', lectureName)
      .get()
      .then((snapshot) => {
        const lecture = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
        this.setState({ lecture });
      })
      .catch((err) => {
        console.error('Couldnt get lecture with name:', lectureName, 'err:', err);
        this.props.history.push('/');
      });
  }
  render() {
    const profile = this.props.profile;
    const lecture = this.state.lecture;

    return (
      <div className="container-fluid public-container">
        {lecture && (
          <>
            <div className="lecture py-5">
              <div className="d-flex justify-content-center">
                <iframe title="vidoe" width="800px" height="350px" src={lecture.videoUrl}></iframe>
              </div>

              <div className="theory row mt-5">
                <div className="col-md-10 mx-auto content p-3">
                  <h4>{lecture.name}</h4>
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
  firestoreConnect(),
  connect((state) => ({
    profile: state.firebase.profile,
  }))
);

export default enhance(Lecture);
