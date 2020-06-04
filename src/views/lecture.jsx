import React, { Component } from 'react';

import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Topbar from '../components/topbar';
import Navbar from '../components/navbar';
import QuizModal from '../components/quiz-modal';

class Lecture extends Component {
  render() {
    const { profile, lecture, quizzes } = this.props;

    return (
      <div>
        {lecture && (
          <>
            <Topbar name={lecture.name} backLink="/" color={lecture.color} />
            <div className="container navbar-margin">
              <div className="lecture mt-2">
                <iframe title="vidoe" width="100%" height="200px" src={lecture.videoUrl}></iframe>
                <div>
                  <p>{lecture.information}</p>
                </div>
                {quizzes && quizzes.map(quiz => <QuizModal key={quiz.quizId} quiz={quiz} lectureId={lecture.id} />)}
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
  firestoreConnect(props => [
    {
      collection: 'lectures'
    },
    {
      collection: 'lectures',
      doc: props.match.params.lectureName.toLowerCase(),
      subcollections: [{ collection: 'quiz' }],
      storeAs: 'quizzes'
    }
  ]),
  connect((state, prop) => {
    const lectureName = prop.match.params.lectureName.toLowerCase();
    return {
      profile: state.firebase.profile,
      lecture: state.firestore.ordered.lectures && state.firestore.ordered.lectures.find(x => x.id === lectureName),
      quizzes: state.firestore.ordered.quizzes
    };
  })
);

export default enhance(Lecture);
