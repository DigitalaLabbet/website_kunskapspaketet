import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  login(e) {
    e.preventDefault();
    this.props.firebase.login(this.state).catch((err) => {
      console.log('doSignInWithEmailAndPassword - err: ', err);
    });
  }

  signup(e) {
    e.preventDefault();
    const profile = {
      email: this.state.email,
      phoneNumber: '',
      name: '',
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
    return (
      <div className="row login">
        <div className="col-md-6 login-form">
          <form action="">
            <div className="form-group">
              <input
                value={this.state.email}
                type="email"
                onChange={this.handleChange}
                id="InputEmail"
                className="form-control"
                name="email"
                placeholder="E-post"
              />  
            </div>
            <div className="form-group">
              <input
                value={this.state.password}
                type="password"
                onChange={this.handleChange}
                id="InputPassword"
                className="form-control"
                name="password"
                placeholder="Lösenord"
              />
            </div>
            <button type="submit" onClick={this.login} className="btn btn-primary" name="values">
              Logga in
            </button>
            <button onClick={this.signup} className="btn btn-success" name="values">
              Registrera
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default firebaseConnect()(Login);
