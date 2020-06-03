import React, { Component } from 'react';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import '../styles/css/admin.css';
import UserTable from '../components/userTable';
import LectureTable from '../components/lectureTable';

import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import RegisterForm from '../components/RegisterForm';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      lectures: [],
      name: '',
      email: '',
      phoneNumber: '',
      role: '',
      password: ''
    };
    this.createUser = this.createUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }



  createUser(e) {
    e.preventDefault();
    const profile = {
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      name: this.state.name,
      role: 'student'
    };
    this.props.firebase.createUser(this.state, profile).catch(err => {
      console.log('doCreateUserWithEmailAndPassword - err: ', err);
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { profile, lectures, users} = this.props;

    console.log(typeof lectures);
    



    return (
      <div className="container admin">
        <header className="adminHeader">
          <nav>
            <h6>Adminstration</h6>
            <ul>
              <li>användare: {profile.name}</li>
              <li>
                <i className="fa fa-cog fa-2x" aria-hidden="true"></i>
              </li>
            </ul>
          </nav>

          <div className="edit">
            <ul>
              <li>
                <button className="btn btn-primary " data-toggle="modal" data-target="#adduser">
                  <i className="fa fa-plus fa-lg mr-2" aria-hidden="true"></i> Elev
                </button>
              </li>
              <li>
                <button className="btn btn-info" data-toggle="modal" data-target="#lecture">
                  <i className="fa fa-plus fa-lg mr-2" aria-hidden="true"></i> Föreläsning
                </button>
              </li>
            </ul>
          </div>
        </header>
        <main>
          <div className="modal fade" id="adduser" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="adduser">
                    lägg till ny användare
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label> Namn </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> E-post </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> telenummer </label>
                      <input
                        type="text"
                        className="form-control"
                        name="phoneNumber"
                        value={this.state.phoneNumber}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Lösenord </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Roll </label>
                      <select className="form-control form-control-sm">
                        <option name="role">elev</option>
                        <option name="role">Lärare</option>
                      </select>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">
                        Stäng
                      </button>
                      <button onClick={this.createUser} className="btn btn-success" data-dismiss="modal">
                        Spara
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
        <RegisterForm />
        {users && <UserTable users={users} />}
        {lectures && <LectureTable lectures={lectures} />}
   
      </div>
    );
  }
}

// const enhance = compose(
//   firebaseConnect(),

//   firestoreConnect(),
//   connect(state => ({
//     profile: state.firebase.profile
//   }))
// );


const enhance = compose(
  firebaseConnect(),
  firestoreConnect(() => ['lectures', 'users']),
  connect((state) => ({
    profile: state.firebase.profile,
    lectures: state.firestore.ordered.lectures,
    users: state.firestore.ordered.users
  }))
);


export default enhance(Admin);
