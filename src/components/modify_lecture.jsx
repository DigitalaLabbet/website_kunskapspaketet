import React from 'react';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Topbar from '../components/topbar';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      videoUrl: '',
      color: '',
      information: '',
      id: '',
      msg: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const ref = this.props.firebase
      .firestore()
      .collection('lectures')
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        const lecture = doc.data();
        this.setState({
          id: this.props.match.params.id,
          name: lecture.name,
          videoUrl: lecture.videoUrl,
          information: lecture.information,
          color: lecture.color
        });
      } else {
        console.log('item does not exiting');
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { name, videoUrl, information, color, id } = this.state;
    const { firebase } = this.props;
    const updateRef = {
      name,
      videoUrl: videoUrl.replace('watch?v=', 'embed/'),
      information,
      color
    };

    firebase
      .firestore()
      .collection('lectures')
      .doc(id)
      .update(updateRef)
      .then(() => {
        this.props.history.push('/admin');
      })
      .catch(error => {
        console.error('Error writing document: ', error);
        this.setState({ msg: 'uppdatering misslyckades' });
        // this.props.history.push(`'/redigera/' + ${id}`);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div className="edit">
        <Topbar name={this.state.name} />
        <div className="w-100 bg-danger text-white">{this.state.msg}</div>

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>namn:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>video url:</label>
            <input
              type="url"
              className="form-control"
              name="videoUrl"
              onChange={this.handleChange}
              value={this.state.videoUrl}
            />
          </div>
          <div className="form-group">
            <label>infomation:</label>
            <textarea
              className="form-control"
              rows="10"
              onChange={this.handleChange}
              value={this.state.information}
              name="information"></textarea>
          </div>
          <div className="form-group">
            <label>Bakgrund färg:</label>
            <input
              type="color"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.color}
              name="color"
            />
          </div>
          <div className="edit-btn w-100 d-flex justify-content-around">
            <input
              type="submit"
              className="btn btn-outline-success btn-md"
              value="Redigera"
            />
          </div>
        </form>
      </div>
    );
  }
}

const enhance = compose(
  firebaseConnect(),
  firestoreConnect(() => ['lectures']),
  connect(state => ({
    lectures: state.firestore.ordered.lectures
  }))
);

export default enhance(Edit);
