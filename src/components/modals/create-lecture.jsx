import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import * as servicesUsers from '../../services/users';
import Notify from '../notify';

class CreateLecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      id: '',
      category: '',
      color: '',
      info: '',
      isVisible: true,
      videoUrl: ''
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
  }

  handleShow() {
    this.setState({ show: true });
    const { lecture } = this.props;
    if (lecture) {
      this.setState(lecture);
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  save(e) {
    e.preventDefault();
    const { lecture, firestore } = this.props;
    if (lecture) {
      const updateValues = {
        videoUrl: this.state.videoUrl,
        information: this.state.information,
        color: this.state.color
      };

      firestore
        .collection('lectures')
        .doc(lecture.id)
        .update(updateValues)
        .then(() => {
          Notify.success(`${lecture.name} har uppdaterats`);
        })
        .catch(err => servicesUsers.handleError(err));
    } else {
      console.log('Create new category will be here');
    }
  }

  render() {
    const { show, name, videoUrl, information, color } = this.state;
    const { lecture } = this.props;

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
