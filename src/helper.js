import React, { Component } from 'react';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
<<<<<<< HEAD
import { useSelector, useDispatch } from 'react-redux';
// import { TablePagination } from 'react-pagination-table';
import '../styles/css/admin.css';
import UserTable from '../components/userTable';
import LectureTable from '../components/lectureTable';
=======
<<<<<<< HEAD
import {useSelector, useDispatch} from 'react-redux'
=======
>>>>>>> 0cd2e83354072e5e4e7f8ae99455a591cd619e23
import { connect } from 'react-redux';
import RegisterForm from '../components/RegisterForm';
<<<<<<< HEAD
=======
import Navbar from '../components/navbar';
>>>>>>> 756d1094b9a4694cce6c20da42f19800174fd934
>>>>>>> 0cd2e83354072e5e4e7f8ae99455a591cd619e23

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
      password: '',
    };
    this.createUser = this.createUser.bind(this)
    this.handleChange = this.handleChange.bind(this);
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

  createUser(e) {
      e.preventDefault();
      const profile = {
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        name: this.state.name,
        role: 'student',
      };
      this.props.firebase.createUser(this.state, profile).catch((err) => {
        console.log('doCreateUserWithEmailAndPassword - err: ', err);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {
<<<<<<< HEAD
    const { profile } = this.props;

    const onDelete = id => {
      this.props.firestore
        .collection('users')
        .doc(id)
        .delete()
        .then(() => {
          this.props.history.push('/admin');
        })
        .catch(err => console.error(err));
    };

    const onDeleteLecture = id => {
      console.log(id);
      
      this.props.firestore
        .collection('lectures')
        .doc(id)
        .delete()
        .then(() => {
          this.props.history.push('/admin');
          console.log('item deleted');
          
        })
        .catch(err => console.error(err));
    };
    
=======
<<<<<<< HEAD
    let { users, lectures } = this.state
    
=======
    const profile = this.props.profile;

>>>>>>> 756d1094b9a4694cce6c20da42f19800174fd934
>>>>>>> 0cd2e83354072e5e4e7f8ae99455a591cd619e23
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
<<<<<<< HEAD
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
=======
          </header>
          <main>
            <div className="student mt-5">
              <div className="w-100">
                <h5 className="text-center">användare tabell</h5>
              </div>
              <table className="table table-sm">
                <thead className="bg-Secondary">
                  <tr>
                    <th scope="col">roll</th>
                    <th scope="col">Namn</th>
                    <th scope="col">e-post</th>
                    <th scope="col">Telefon</th>
                    <th scope="col">
                      <button className="btn btn-primary btn-sm" data-toggle="modal" data-target="#adduser">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.role}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>
                        <button className="btn btn-danger btn-sm">
                          <i className="fa fa-eraser" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <table className="table table-sm">
              <thead className="bg-Secondary">
                <tr>
                  <th scope="col">roll</th>
                  <th scope="col">Namn</th>
                  <th scope="col">e-post</th>
                  <th scope="col">
                    <button className="btn btn-primary btn-sm" data-toggle="modal" data-target="#adduser">
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.role}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>


            <div className="lecture mt-5">
              <div className="w-100">
                <h5 className="text-center">Föreläsning</h5>
              </div>
              <table className="table table-sm">
                <thead className="bg-Secondary">
                  <tr>
                    <th scope="col">kategori</th>
                    <th scope="col">video</th>
                    <th scope="col">info</th>
                    <th scope="col">
                      <button className="btn btn-primary btn-sm" data-toggle="modal" data-target="#lecture">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>hälsa</td>
                    <td>https://getbootstra.....</td>
                    <td>Lorem ipsum dolor, sit amet....</td>
>>>>>>> 756d1094b9a4694cce6c20da42f19800174fd934
                    <td>
                      <button className="btn btn-danger mr-1 btn-sm">
                        <i className="fa fa-eraser" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
<<<<<<< HEAD
                ))}
              </tbody>
            </table>
>>>>>>> 0cd2e83354072e5e4e7f8ae99455a591cd619e23
          </div>
        </header>
        <main>
          <UserTable users={this.state.users} onDelete={onDelete} />
          <LectureTable lectures={this.state.lectures} onDeleteLecture={onDeleteLecture}/>
        </main>
<<<<<<< HEAD

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
     
                <form >
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
                    <select className="form-control form-control-sm" >
                      <option  name="role" >
                        elev
                      </option>
                      <option  name="role">
                        Lärare
                      </option>
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button type="button"  className="btn btn-secondary" data-dismiss="modal">
                      Stäng
                    </button>
                    <button onClick={this.createUser} className="btn btn-success" data-dismiss="modal">
                      Spara
                    </button>
                  </div>
                </form>
                
              </div>
=======
=======
                </tbody>
              </table>
>>>>>>> 0cd2e83354072e5e4e7f8ae99455a591cd619e23
            </div>
          </div>
        </div>
<<<<<<< HEAD
=======
>>>>>>> 756d1094b9a4694cce6c20da42f19800174fd934
>>>>>>> 0cd2e83354072e5e4e7f8ae99455a591cd619e23
        <RegisterForm />
   
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
