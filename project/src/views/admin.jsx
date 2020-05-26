import React, { Component } from "react";
import RegisterForm from "../components/RegisterForm"
import firebase from '../firebase/firebase'
import { Link } from 'react-router-dom';

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;
    this.state = {
      users: [],
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const users = []
    querySnapshot.forEach((doc) => {
      const {role, name, email} = doc.data()
      users.push({
        key: doc.id,
        doc,
        role,
        name,
        email,
      });
    });
    this.setState({users})
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  render() {
    return (
      <div className="container">
        <header>
          
            <ul>
              <li>lärare: jens</li>
              <li>email: jens@gmail.com</li>
            </ul>
         
        </header>
        <main>
          <div className="student mt-5">
            <div className="w-100">
              <h5 className="text-center">användare tabell</h5>
            </div>
            <table class="table table-sm">
              <thead class="bg-Secondary">
                <tr>
                  <th scope="col">roll</th>
                  <th scope="col">Namn</th>
                  <th scope="col">e-post</th>
                  <th scope="col">
                    <button className="btn btn-primary btn-sm" data-toggle="modal" data-target="#adduser">
                      <i class="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
              {
                this.state.users.map(user => 
                  <tr>
                  <td>{user.role}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                        <button className="btn btn-danger btn-sm">
                          <i class="fa fa-eraser" aria-hidden="true"></i>
                        </button>


                  </td>
                </tr>
                  
                  
                  )
              }


              </tbody>
            </table>
          </div>

          <div className="lecture mt-5">
            <div className="w-100">
              <h5 className="text-center">Föreläsning</h5>
            </div>
            <table class="table table-sm">
              <thead class="bg-Secondary">
                <tr>
                  <th scope="col">kategori</th>
                  <th scope="col">video</th>
                  <th scope="col">info</th>
                  <th scope="col">
                    <button className="btn btn-primary btn-sm" data-toggle="modal" data-target="#lecture">
                      <i class="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>hälsa</td>
                  <td>https://getbootstra.....</td>
                  <td>Lorem ipsum dolor, sit amet....</td>
                  <td>
                    <button className="btn btn-danger mr-1 btn-sm">
                      <i class="fa fa-eraser" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </main>
        <RegisterForm />
      </div>
    );
  }
}
