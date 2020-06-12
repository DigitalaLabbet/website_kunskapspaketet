import React, { Component } from 'react';

import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Topbar from '../components/topbar';
import Navbar from '../components/navbar';
import QuizModal from '../components/quiz-modal';
import { Accordion, Card, Button } from 'react-bootstrap';

class Lecture extends Component {
  render() {
    const { profile, lecture, quizzes } = this.props;

    const innerHtml = text => {
      return { __html: text ? text : '--' };
    };

    return (
      <div>
        {lecture && (
          <>
            <Topbar name={lecture.name} backLink="/" color={lecture.color} />
            <div className="container navbar-margin">
              <div className="lecture mt-2">
                <iframe title="vidoe" width="100%" height="200px" src={lecture.videoUrl}></iframe>
                <p className="text-14" dangerouslySetInnerHTML={innerHtml(lecture.information)}></p>
                <Accordion>
                  {lecture.links &&
                    lecture.links.map((link, index) => (
                      <Card key={index}>
                        <Accordion.Toggle
                          as={Card.Header}
                          variant="link"
                          eventKey={index}
                          className="w-100 text-left px-3 py-2"
                          dangerouslySetInnerHTML={innerHtml(link.heading)}></Accordion.Toggle>
                        <Accordion.Collapse eventKey={index}>
                          <Card.Body className="px-3 py-2">
                            <ul className="p-0" style={{ listStyle: 'none' }}>
                              {link.items.map(item => (
                                <li key={item} dangerouslySetInnerHTML={innerHtml(item)}></li>
                              ))}
                            </ul>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    ))}
                </Accordion>
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
