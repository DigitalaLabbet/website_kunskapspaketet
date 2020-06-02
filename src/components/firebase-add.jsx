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

    lectures.forEach((lecture) => {
      const doc = {
        name: lecture.name,
        color: lecture.color,
        information: lecture.information,
        videoUrl: lecture.videoUrl,
      };
      const quizzes = lecture.quiz;
      console.log('doc: ', doc);
      console.log('quizzes: ', quizzes);

      firestore
        .collection('lectures')
        .doc(lecture.documentId)
        .set(doc)
        .then(() => {
          quizzes.forEach((quiz) => {
            console.log('quiz: ', quiz);
            firestore.collection('lectures').doc(lecture.documentId).collection('quiz').doc(quiz.quizId).set(quiz);
          });
        });
    });
  }

  render() {
    return <button onClick={this.addLectures}>ADD EVERYTHING database</button>;
  }
}
const enhance = compose(firebaseConnect(), firestoreConnect());
export default enhance(FirebaseAdd);
