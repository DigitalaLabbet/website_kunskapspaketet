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
      show: false,
      activeQuiz: null,
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

    const onCompleteAction = (obj) => {
      console.log('complete: ', obj);
      const { firestore, userUid, lectureId } = this.props;

      firestore.collection('users').doc(userUid).collection(lectureId).doc(quiz.id).set(obj);
    };

    return (
      <div className="text-center">
        <button className="btn btn-success" onClick={this.handleShow}>
          Start quiz
        </button>

        <Modal show={show} onHide={this.handleClose}>
          <Modal.Body>
            <Quiz quiz={quiz} locale={this.quizLocale} onComplete={onCompleteAction} />
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
  connect((state) => ({
    profile: state.firebase.profile,
    userUid: state.firebase.auth.uid,
  }))
);

export default enhance(quizModal);
