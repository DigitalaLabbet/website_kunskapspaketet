import React, { Component } from 'react';

import { Modal, Accordion, Card, ListGroup } from 'react-bootstrap';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import * as servicesHttp from '../../services/http';

class ViewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      quizzes: null
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleShow() {
    this.setState({ show: true });
    const { firestore } = this.props;
    firestore
      .collection('users')
      .doc(this.props.user.id)
      .collection('quizzes')
      .get()
      .then(res => {
        const quizzes = [];
        res.docs.forEach(doc => {
          quizzes.push(doc.data());
        });
        quizzes.forEach(quiz => {
          quiz.userInput.forEach(x => {
            if (typeof x === 'object') {
              x = Object.assign([], x);
            }
          });
        });
        quizzes.forEach(quiz => {
          quiz.userInput = quiz.userInput.map(input => {
            if (typeof input === 'object') {
              input = Object.assign([], input);
            }
            return input;
          });
        });

        this.setState({ quizzes: quizzes });
      });
  }

  handleClose() {
    this.setState({ show: false });
    const { firestore } = this.props;
    const { userUid } = this.props;
    const { user } = this.props;
    if (user.teacherCheck && user.teacher === userUid) {
      firestore
        .collection('users')
        .doc(user.id)
        .update({ teacherCheck: false })
        .then(() => {})
        .catch(err => servicesHttp.handleError(err));
    }
  }

  render() {
    const { show, quizzes } = this.state;
    const { user } = this.props;

    const checkIfCorrect = (userAnswer, correctAnswer, answerIndex) => {
      if (typeof correctAnswer === 'object') {
        if (correctAnswer.includes(answerIndex)) {
          return correctAnswer.includes(answerIndex) ? 'bg-success text-white' : 'bg-danger text-white';
        }
        return userAnswer.includes(answerIndex) ? 'bg-danger text-white' : '';
      } else {
        return parseInt(correctAnswer) === answerIndex
          ? 'bg-success text-white'
          : parseInt(userAnswer) === answerIndex
          ? 'bg-danger text-white'
          : '';
      }
    };

    const convertDate = quizSubmitted => {
      const date = new Date(quizSubmitted);
      return `${date.getFullYear()}/${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + date.getDate()).slice(
        -2
      )} ${date.getHours()}:${date.getMinutes()}`;
    };

    return (
      <React.Fragment>
        <button
          className="btn btn-info btn-sm"
          style={{
            width: '33.75px',
            height: '31px',
            position: 'relative'
          }}
          onClick={this.handleShow}>
          <span
            className="fa-stack"
            style={{
              top: '0',
              left: '0',
              width: '33.75px',
              height: '31px',
              position: 'absolute'
            }}>
            <i className="fa fa-file-alt fa-stack-1x"></i>
            {user.teacherCheck && (
              <i
                className="fa fa-bell fa-stack-1x text-danger"
                style={{ left: 'auto', right: '-5px', top: '-5px' }}></i>
            )}
          </span>
        </button>
        <Modal show={show} backdrop="static" keyboard={false} onHide={this.handleClose}>
          <Modal.Header>Quiz svar för {user.name ? user.name : user.email}</Modal.Header>
          <Modal.Body>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            {quizzes?.length > 0 ? (
              <>
                <Accordion>
                  {quizzes.map((quiz, index) => (
                    <Card key={quiz.quizTitle}>
                      <Accordion.Toggle
                        as={Card.Header}
                        className="w-100 text-left px-3 py-2"
                        variant="link"
                        eventKey={index}>
                        {quiz.quizTitle} - {convertDate(quiz.quizSubmitted)} - {quiz.numberOfCorrectAnswers} av{' '}
                        {quiz.numberOfQuestions} rätt
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey={index}>
                        <Card.Body style={{ padding: '8px' }}>
                          {quiz.questions.map((question, questionIndex) => (
                            <div key={`${index}+${question.question}`}>
                              {questionIndex === 0 && (
                                <div>
                                  {user.name ? user.name : user.email} fick {quiz.numberOfCorrectAnswers} av{' '}
                                  {quiz.numberOfQuestions} frågor rätt
                                </div>
                              )}
                              <br />
                              <h6 className="text-secondary">
                                <p>
                                  Q{questionIndex + 1}: {question.question}
                                </p>
                                <span
                                  className={`badge py-2 px-3 text-white ${
                                    question.answerSelectionType === 'multiple' ? 'badge-warning' : 'badge-primary'
                                  }`}>
                                  {question.answerSelectionType === 'multiple' ? 'Flerval' : 'Ett val'}
                                </span>
                                <span className="badge py-2 px-3 ml-1 text-white" style={{ background: '#673AB7' }}>
                                  Välj {question.correctAnswer.length}
                                </span>
                              </h6>
                              <ListGroup as="ul">
                                {question.answers.map((answer, answerIndex) => (
                                  <ListGroup.Item
                                    as="li"
                                    key={answer}
                                    className={checkIfCorrect(
                                      quiz.userInput[questionIndex],
                                      question.correctAnswer,
                                      answerIndex + 1
                                    )}>
                                    {answer}
                                  </ListGroup.Item>
                                ))}
                              </ListGroup>
                            </div>
                          ))}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  ))}
                </Accordion>
              </>
            ) : (
              <h4>Har inte gjort något quiz ännu</h4>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={this.handleClose}>
              Stäng
            </button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

const enhance = compose(
  firestoreConnect(),
  connect(state => ({
    userUid: state.firebase.auth.uid
  }))
);

export default enhance(ViewUser);
