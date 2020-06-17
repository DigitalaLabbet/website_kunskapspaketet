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
      msg: ''
    };
  }

  login(e) {
    e.preventDefault();
    const { email, password } = this.state;
    if (email.length > 0 && password.length > 0) {
      this.props.firebase.login(this.state).catch(err => {
        console.log('doSignInWithEmailAndPassword - err: ', err);
        this.errorHandle(err.code);
      });
    } else {
      this.setState({ msg: 'får inte att logga in med tomma fält' });
    }
  }

  signup(e) {
    e.preventDefault();
    const { email, password } = this.state;
    if (email.length > 0 && password.length > 0) {
      const profile = {
        email: this.state.email,
        phoneNumber: '',
        name: '',
        role: 'student'
      };
      this.props.firebase.createUser(this.state, profile).catch(err => {
        console.log('doCreateUserWithEmailAndPassword - err: ', err);
        this.errorHandle(err.code);
      });
    } else {
      this.setState({ msg: 'får inte att registera dig med tomma fält' });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  errorHandle(err) {
    if (err === 'auth/wrong-password') {
      this.setState({ msg: 'E-postadressen eller lösenord felaktig' });
    }
    if (err === 'auth/invalid-email') {
      this.setState({ msg: 'E-postadressen är inte glitlig' });
    }
    if (err === 'auth/user-not-found') {
      this.setState({ msg: 'E-postadressen finns inte' });
    }
    if (err === 'auth/email-already-in-use') {
      this.setState({ msg: 'E-postadressen används redan av ett annat konto.' });
    }
    if (err === 'auth/weak-password') {
      this.setState({ msg: 'Lösenordet måste vara minst 6 tecken' });
    }
  }

  render() {
    return (
      <div className="row login">
        <div className="col-md-6 login-form">
          <div className="w-75 mx-auto">
            <p className="bg-warning text-center" style={{ fontSize: '13px' }}>
              {this.state.msg}
            </p>
          </div>
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
            <div className="w-100 d-flex flex-row justify-content-around  mx-auto my-3">
              {/*<button onClick={this.signup} className="btn btn-success btn-sm" name="values">
                Registrera
              </button>*/}
              <button type="submit" onClick={this.login} className="btn btn-primary btn-sm" name="values">
                Logga in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default firebaseConnect()(Login);
