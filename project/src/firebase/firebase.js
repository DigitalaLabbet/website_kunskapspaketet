import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyCjN4obQGSoePw-wME_yA8JVx6kIzuRCwE',
  authDomain: 'kunskapspaketet.firebaseapp.com',
  databaseURL: 'https://kunskapspaketet.firebaseio.com',
  projectId: 'kunskapspaketet',
  storageBucket: 'kunskapspaketet.appspot.com',
  messagingSenderId: '1011354741666',
  appId: '1:1011354741666:web:fe999e52c5d62fedb420fb',
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  user = (userId) => this.db.collection(`users`).doc(userId).get();

  createUser = (user) => this.db.collection('users').doc(user.id).set(user);
}

export default Firebase;
