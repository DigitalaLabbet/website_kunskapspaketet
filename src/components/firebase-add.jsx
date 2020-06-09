import React, { Component } from 'react';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import lectures from './data/lectures.json';

class FirebaseAdd extends Component {
  constructor(props) {
    super(props);

    this.addLectures = this.addLectures.bind(this);
  }

  addLectures() {
    const { firestore } = this.props;

    lectures.forEach(lecture => {
      const doc = {
        name: lecture.name,
        color: lecture.color,
        information: lecture.information,
        videoUrl: lecture.videoUrl,
        isVisible: lecture.isVisible,
        links: lecture.links
      };

      const quizzes = lecture.quiz;
      console.log('doc: ', doc);
      console.log('quizzes: ', quizzes);

      firestore
        .collection('lectures')
        .doc(lecture.documentId)
        .set(doc)
        .then(() => {
          quizzes.forEach(quiz => {
            console.log('quiz: ', quiz);
            firestore
              .collection('lectures')
              .doc(lecture.documentId)
              .collection('quiz')
              .doc(quiz.quizId)
              .set(quiz);
          });
        });
    });
  }

  render() {
    return (
      <div className="text-center py-2">
        <button className="btn btn-success" onClick={this.addLectures}>
          Add lecture data to firestore
        </button>
      </div>
    );
  }
}
const enhance = compose(firebaseConnect(), firestoreConnect());
export default enhance(FirebaseAdd);
