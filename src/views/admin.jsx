import React, { Component } from 'react';
import RegisterForm from '../components/RegisterForm';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
// import { TablePagination } from 'react-pagination-table';
import '../styles/css/admin.css';
import UserTable from '../components/userTable';
import LectureTable from '../components/lectureTable';
import Navbar_mb from '../components/navbar_mb';
import { connect } from 'react-redux';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      lectures: []
    };
  }

  componentDidMount() {
    this.props.firestore
      .collection('users')
      .get()
      .then(snapshot => {
        const users = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });
        this.setState({ users });
      });

    this.props.firestore
      .collection('lectures')
      .get()
      .then(snapshot => {
        const lectures = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });
        this.setState({ lectures });
      });
  }

  render() {
    const { profile } = this.props;

    return (
      <div className="container admin">
        <header className="adminHeader">
          <nav>
            <h6>Adminstration</h6>
            <ul>
              <li>användare:  {profile.name}</li>
              <li><i class="fa fa-cog fa-2x" aria-hidden="true"></i></li>
            </ul>
          </nav>

          <div className="edit">
            <ul>
              <li>
                <button className="btn btn-primary " data-toggle="modal" data-target="#adduser"><i className="fa fa-plus fa-lg mr-2" aria-hidden="true"></i> Elev</button> 
              </li>
              <li>
              <button className="btn btn-info"  data-toggle="modal" data-target="#lecture"><i className="fa fa-plus fa-lg mr-2" aria-hidden="true"></i> Föreläsning</button> 
              </li>
            </ul>
          </div>
        </header>
        <main>
          <UserTable users={this.state.users} />
          <LectureTable lectures={this.state.lectures} />
        </main>
        <RegisterForm />
        <Navbar_mb />
      </div>
    );
  }
}

const enhance = compose(
  firebaseConnect(),
  firestoreConnect(),
  connect(state => ({
    profile: state.firebase.profile
  }))
);

export default enhance(Admin);
