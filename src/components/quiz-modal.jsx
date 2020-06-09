import React, { Component } from 'react';

import Modal from 'react-bootstrap/Modal';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import Quiz from 'react-quiz-component';

import '../styles/css/quiz-modal.css';

class quizModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  render() {
    const { show } = this.state;
    const { quiz } = this.props;

    const quizData = Object.assign({}, quiz, {
      appLocale: {
        landingHeaderText: '<questionLength> Frågor',
        multipleSelectionTagText: 'Flerval',
        nextQuestionBtn: 'Nästa',
        pickNumberOfSelection: 'Välj <numberOfSelection>',
        question: 'Fråga',
        resultFilterAll: 'Alla',
        resultFilterCorrect: 'Rätt',
        resultFilterIncorrect: 'Fel',
        resultPageHeaderText: 'Du har avslutat quizzen. Du fick <correctIndexLength> av <questionLength> frågor rätt.',
        resultPagePoint: 'Du fick <correctPoints> av <totalPoints> poäng.',
        singleSelectionTagText: 'Ett val',
        startQuizBtn: 'Starta quiz'
      }
    });

    const onCompleteAction = obj => {
      console.log('complete: ', obj);
      const { firestore, userUid, lectureId, quiz } = this.props;

      const data = Object.assign({}, { ...obj, quizTitle: quiz.quizTitle });

      // Convert multiple answers to a map, for firebase storage
      data.userInput = data.userInput.map(input => {
        if (typeof input === 'object') {
          input = Object.assign({}, input);
        }
        return input;
      });

      data.quizSubmitted = new Date().toISOString();

      firestore
        .collection('users')
        .doc(userUid)
        .collection('quizzes')
        .doc(lectureId)
        .set(data);
    };

    return (
      <div className="text-center">
        <button className="btn btn-success" onClick={this.handleShow}>
          Starta quiz
        </button>

        <Modal show={show} backdrop="static" keyboard={false} onHide={this.handleClose}>
          <Modal.Body>
            <Quiz quiz={quizData} locale={this.quizLocale} onComplete={onCompleteAction} />
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-sm btn-danger" onClick={this.handleClose}>
              <i className="fa fa-times"></i>
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const enhance = compose(
  firestoreConnect(),
  firebaseConnect(),
  connect(state => ({
    profile: state.firebase.profile,
    userUid: state.firebase.auth.uid
  }))
);

export default enhance(quizModal);
