import React, { Component } from 'react';

import { Modal, Accordion, Card } from 'react-bootstrap';

import * as servicesHttp from '../../services/http';
import Notify from '../notify';
import Confirm from './confirm-modal';

class CreateLecture extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      id: '',
      category: '',
      color: '',
      info: '',
      isVisible: true,
      videoUrl: '',
      links: null,
      quizzes: []
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
  }

  handleShow() {
    if (this._isMounted) {
      this.setState({ show: true });
    }
    const { lecture, firestore } = this.props;
    if (lecture) {
      if (this._isMounted) {
        this.setState(lecture);
      }

      firestore
        .collection('lectures')
        .doc(lecture.id)
        .collection('quiz')
        .get()
        .then(snapShot => {
          snapShot.docs.forEach(doc => {
            var tempQuizzes = this.state.quizzes.concat(doc.data());
            tempQuizzes.forEach(quiz => {
              quiz.questions.forEach(question => {
                question.correctAnswer = Object.assign([], question.correctAnswer);
                question.correctAnswer = question.correctAnswer.map(ca => parseInt(ca));
                question.answers = question.answers.map((answer, index) => {
                  return {
                    answer: answer,
                    isCorrect: question.correctAnswer.includes(index + 1)
                  };
                });
              });
            });
            if (this._isMounted) {
              this.setState({ quizzes: tempQuizzes });
            }
          });
        });
    }
  }

  handleClose() {
    if (this._isMounted) {
      this.setState({ show: false });
    }
  }

  handleChange(e) {
    if (this._isMounted) {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  headingChange(index, event) {
    const linksUpdated = JSON.parse(JSON.stringify(this.state.links));
    linksUpdated[index].heading = event.target.value;
    if (this._isMounted) {
      this.setState({ links: linksUpdated });
    }
  }

  itemChange(linkIndex, itemIndex, event) {
    const linksUpdated = JSON.parse(JSON.stringify(this.state.links));
    linksUpdated[linkIndex].items[itemIndex] = event.target.value;
    if (this._isMounted) {
      this.setState({ links: linksUpdated });
    }
  }

  addLink(event) {
    event.preventDefault();
    const linksUpdated = JSON.parse(JSON.stringify(this.state.links));
    linksUpdated.push({
      heading: '',
      items: []
    });
    if (this._isMounted) {
      this.setState({ links: linksUpdated });
    }
  }

  addItem(index, event) {
    event.preventDefault();
    const linksUpdated = JSON.parse(JSON.stringify(this.state.links));
    linksUpdated[index].items.push('');
    if (this._isMounted) {
      this.setState({ links: linksUpdated });
    }
  }

  quizChange(index, event) {
    const quizzesUpdated = JSON.parse(JSON.stringify(this.state.quizzes));
    quizzesUpdated[index][event.target.name] = event.target.value;
    if (this._isMounted) {
      this.setState({ quizzes: quizzesUpdated });
    }
  }

  questionChange(quizIndex, questionIndex, event) {
    const quizzesUpdated = JSON.parse(JSON.stringify(this.state.quizzes));
    quizzesUpdated[quizIndex].questions[questionIndex].question = event.target.value;
    if (this._isMounted) {
      this.setState({ quizzes: quizzesUpdated });
    }
  }

  answerChange(quizIndex, questionIndex, answerIndex, event) {
    const quizzesUpdated = JSON.parse(JSON.stringify(this.state.quizzes));
    if (event.target.name === 'isCorrect') {
      quizzesUpdated[quizIndex].questions[questionIndex].answers[answerIndex].isCorrect = event.target.value !== 'true';
    } else {
      quizzesUpdated[quizIndex].questions[questionIndex].answers[answerIndex][event.target.name] = event.target.value;
    }
    if (this._isMounted) {
      this.setState({ quizzes: quizzesUpdated });
    }
  }

  addQuizQuestion(quizIndex, event) {
    event.preventDefault();
    const quizzesUpdated = JSON.parse(JSON.stringify(this.state.quizzes));

    quizzesUpdated[quizIndex].questions.push({
      question: '',
      questionType: 'text',
      point: '10',
      correctAnswer: 1,
      messageForIncorrectAnswer: 'Fel svar, Försök igen.',
      messageForCorrectAnswer: 'Rätt svar, bra jobbat.',
      answerSelectionType: 'single',
      answers: [
        {
          answer: '',
          isCorrect: true
        },
        {
          answer: '',
          isCorrect: false
        },
        {
          answer: '',
          isCorrect: false
        },
        {
          answer: '',
          isCorrect: false
        }
      ]
    });
    if (this._isMounted) {
      this.setState({ quizzes: quizzesUpdated });
    }
  }

  save(e) {
    e.preventDefault();
    const { lecture, firestore } = this.props;
    if (lecture) {
      const updateValues = {
        videoUrl: this.state.videoUrl,
        information: this.state.information,
        color: this.state.color,
        links: this.state.links
      };

      const quizzes = JSON.parse(JSON.stringify(this.state.quizzes));
      quizzes.forEach(quiz => {
        quiz.questions.forEach(question => {
          const correctAnswers = question.answers
            .map((answer, index) => {
              return answer.isCorrect ? index + 1 : 0;
            })
            .filter(v => v > 0);
          question.answerSelectionType = correctAnswers.length > 1 ? 'multiple' : 'single';
          question.correctAnswer = correctAnswers.length > 1 ? correctAnswers : correctAnswers.toString();
          question.answers = question.answers.map(answer => answer.answer);
        });
      });

      let batch = firestore.batch();
      quizzes.forEach(quiz => {
        const quizId = firestore
          .collection('lectures')
          .doc(lecture.id)
          .collection('quiz')
          .doc(quiz.quizId);
        batch.update(quizId, quiz);
      });

      const lectureBatch = firestore.collection('lectures').doc(lecture.id);
      batch.update(lectureBatch, updateValues);
      batch
        .commit()
        .then(() => {
          Notify.success(`${lecture.name} har uppdaterats`);
          if (this._isMounted) {
            this.setState({ quizzes: [] });
          }
          this.handleClose();
        })
        .catch(err => servicesHttp.handleError(err));
    } else {
      console.log('Create new category will be here');
    }
  }

  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { show, name, videoUrl, information, color, links, quizzes } = this.state;
    const { lecture } = this.props;

    const deleteLink = index => {
      const linksUpdated = JSON.parse(JSON.stringify(this.state.links));
      linksUpdated.splice(index, 1);
      if (this._isMounted) {
        this.setState({ links: linksUpdated });
      }
    };

    const deleteItem = (linkIndex, itemIndex) => {
      const linksUpdated = JSON.parse(JSON.stringify(this.state.links));
      linksUpdated[linkIndex].items.splice(itemIndex, 1);
      if (this._isMounted) {
        this.setState({ links: linksUpdated });
      }
    };

    const deleteQuestion = (quizIndex, answerIndex) => {
      const quizzesUpdated = JSON.parse(JSON.stringify(this.state.quizzes));
      quizzesUpdated[quizIndex].questions.splice(answerIndex, 1);
      if (this._isMounted) {
        this.setState({ quizzes: quizzesUpdated });
      }
    };

    return (
      <React.Fragment>
        <button
          className={`btn btn-sm ${lecture ? 'btn-warning text-white' : 'btn-primary'}`}
          onClick={this.handleShow}>
          {lecture ? (
            <React.Fragment>
              <i className="fa fa-edit"></i>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <i className="fa fa-plus"></i>
            </React.Fragment>
          )}
        </button>
        <Modal show={show} backdrop="static" keyboard={false} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>{lecture ? 'Editera föreläsning' : 'Skapa föreläsning'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Namn</label>
                <input
                  type="text"
                  className="form-control"
                  disabled={lecture ? true : false}
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Video url</label>
                <input
                  type="text"
                  className="form-control"
                  name="videoUrl"
                  value={videoUrl}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Information</label>
                <textarea
                  rows="10"
                  className="form-control"
                  name="information"
                  value={information}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Färg</label>
                <input type="color" className="form-control" name="color" value={color} onChange={this.handleChange} />
              </div>
              {links && (
                <>
                  <h6>
                    Stycken
                    <button className="btn btn-success btn-sm ml-1" onClick={this.addLink.bind(this)}>
                      <i className="fa fa-plus"></i>
                    </button>
                  </h6>
                  <Accordion>
                    {links.map((link, index) => (
                      <Card key={index}>
                        <Accordion.Toggle
                          as={Card.Header}
                          className="w-100 text-left px-3 py-2"
                          variant="link"
                          eventKey={index}>
                          {link.heading ? link.heading : '--'}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={index}>
                          <Card.Body className="px-3 py-2">
                            <div className="form-group">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="heading"
                                  value={link.heading}
                                  onChange={this.headingChange.bind(this, index)}
                                />
                                <div className="input-group-append">
                                  <Confirm
                                    onConfirm={() => {
                                      deleteLink(index);
                                    }}
                                    body={
                                      'Är du säker du vill radera: ' +
                                      link.heading +
                                      ' det här kommer att radera stycket'
                                    }
                                    title="Radera stycke"
                                    confirmText="Radera"
                                    cancelText="Avbryt"
                                    buttonText={<i className="fa fa-trash"></i>}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <label>
                                <h6>
                                  Artiklar
                                  <button
                                    className="btn btn-success btn-sm ml-1"
                                    onClick={this.addItem.bind(this, index)}>
                                    <i className="fa fa-plus"></i>
                                  </button>
                                </h6>
                              </label>
                              {link.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="input-group mb-1">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="item"
                                    value={item}
                                    onChange={this.itemChange.bind(this, index, itemIndex)}
                                  />
                                  <div className="input-group-append">
                                    <Confirm
                                      onConfirm={() => {
                                        deleteItem(index, itemIndex);
                                      }}
                                      body={'Är du säker du vill radera: ' + item}
                                      title="Radera länk"
                                      confirmText="Radera"
                                      cancelText="Avbryt"
                                      buttonText={<i className="fa fa-trash"></i>}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    ))}
                  </Accordion>
                </>
              )}

              {quizzes && (
                <>
                  <h6 className="mt-3">Quizzes</h6>
                  <Accordion>
                    {quizzes.map((quiz, quizIndex) => (
                      <Card key={quizIndex}>
                        <Accordion.Toggle
                          as={Card.Header}
                          className="w-100 text-left px-3 py-2"
                          variant="link"
                          eventKey={quizIndex}>
                          {quiz.quizTitle ? quiz.quizTitle : '--'}
                        </Accordion.Toggle>
                        <Accordion.Collapse className="p-2" eventKey={quizIndex}>
                          <div>
                            <div className="form-group d-none">
                              <label>quizId</label>
                              <input type="text" className="form-control" defaultValue={quiz.quizId} disabled={true} />
                            </div>
                            <div className="form-group">
                              <label>Quiz namn</label>
                              <input
                                type="text"
                                className="form-control"
                                name="quizTitle"
                                value={quiz.quizTitle}
                                onChange={this.quizChange.bind(this, quizIndex)}
                              />
                            </div>
                            <h6>
                              Frågor
                              <button
                                className="btn btn-success btn-sm ml-1"
                                onClick={this.addQuizQuestion.bind(this, quizIndex)}>
                                <i className="fa fa-plus"></i>
                              </button>
                            </h6>
                            <Accordion>
                              {quiz.questions.map((question, questionIndex) => (
                                <Card key={questionIndex}>
                                  <Accordion.Toggle
                                    as={Card.Header}
                                    className="w-100 text-left px-3 py-2"
                                    variant="link"
                                    eventKey={questionIndex}>
                                    {question.question ? question.question : '--'}
                                  </Accordion.Toggle>
                                  <Accordion.Collapse eventKey={questionIndex}>
                                    <Card.Body className="px-3 py-2">
                                      <div className="form-group">
                                        <label>Fråga</label>
                                        <div className="input-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="heading"
                                            value={question.question}
                                            onChange={this.questionChange.bind(this, quizIndex, questionIndex)}
                                          />
                                          <div className="input-group-append">
                                            <Confirm
                                              onConfirm={() => {
                                                deleteQuestion(quizIndex, questionIndex);
                                              }}
                                              body={
                                                'Är du säker du vill radera: ' +
                                                question.question +
                                                ' det här kommer att radera frågan'
                                              }
                                              title="Radera frågan"
                                              confirmText="Radera"
                                              cancelText="Avbryt"
                                              buttonText={<i className="fa fa-trash"></i>}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <h6>Svar</h6>
                                      {question.answers.map((answer, answerIndex) => (
                                        <div key={answerIndex} className="input-group mb-1">
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="answer"
                                            value={answer.answer}
                                            onChange={this.answerChange.bind(
                                              this,
                                              quizIndex,
                                              questionIndex,
                                              answerIndex
                                            )}
                                          />
                                          <div className="input-group-append">
                                            <span className="input-group-text">
                                              <input
                                                type="checkbox"
                                                name="isCorrect"
                                                value={answer.isCorrect}
                                                checked={answer.isCorrect}
                                                onChange={this.answerChange.bind(
                                                  this,
                                                  quizIndex,
                                                  questionIndex,
                                                  answerIndex
                                                )}
                                              />
                                            </span>
                                          </div>
                                        </div>
                                      ))}
                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>
                              ))}
                            </Accordion>
                          </div>
                        </Accordion.Collapse>
                      </Card>
                    ))}
                  </Accordion>
                </>
              )}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={this.handleClose}>
              Stäng
            </button>
            <button className="btn btn-success" onClick={this.save}>
              Spara
            </button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CreateLecture;
