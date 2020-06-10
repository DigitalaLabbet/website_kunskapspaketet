import React, { Component } from 'react';

import * as servicesUsers from '../../services/users';
import Notify from '../notify';
import { Modal, Accordion, Card, Button } from 'react-bootstrap';
import Confirm from './confirm-modal';

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
      videoUrl: '',
      links: null
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

  headingChange(index, event) {
    const linksUpdated = JSON.parse(JSON.stringify(this.state.links));
    linksUpdated[index].heading = event.target.value;
    this.setState({ links: linksUpdated });
  }

  itemChange(linkIndex, itemIndex, event) {
    const linksUpdated = JSON.parse(JSON.stringify(this.state.links));
    linksUpdated[linkIndex].items[itemIndex] = event.target.value;
    this.setState({ links: linksUpdated });
  }

  addLink(event) {
    event.preventDefault();
    const linksUpdated = JSON.parse(JSON.stringify(this.state.links));
    linksUpdated.push({
      heading: '',
      items: []
    });
    this.setState({ links: linksUpdated });
  }

  addItem(index, event) {
    event.preventDefault();
    const linksUpdated = JSON.parse(JSON.stringify(this.state.links));
    linksUpdated[index].items.push('');
    this.setState({ links: linksUpdated });
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
    const { show, name, videoUrl, information, color, links } = this.state;
    const { lecture } = this.props;

    const deleteLink = index => {
      const linksUpdated = JSON.parse(JSON.stringify(this.state.links));
      linksUpdated.splice(index, 1);
      this.setState({ links: linksUpdated });
    };

    const deleteItem = (linkIndex, itemIndex) => {
      const linksUpdated = JSON.parse(JSON.stringify(this.state.links));
      linksUpdated[linkIndex].items.splice(itemIndex, 1);
      this.setState({ links: linksUpdated });
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
                  <h6>Stycken</h6>
                  <Accordion>
                    {links.map((link, index) => (
                      <Card key={index}>
                        <Card.Header className="py-1 px-2">
                          <Accordion.Toggle as={Button} variant="link" eventKey={index} className="w-100 text-left">
                            {link.heading ? link.heading : '--'}
                          </Accordion.Toggle>
                        </Card.Header>
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
                                      ' Det här kommer att radera hela objektet'
                                    }
                                    title="Radera länk"
                                    confirmText="Radera"
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
              <button className="btn btn-success btn-sm mt-1" onClick={this.addLink.bind(this)}>
                <i className="fa fa-plus"></i>
              </button>
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
