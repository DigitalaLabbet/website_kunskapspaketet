import React from 'react';

const FirebaseContext = React.createContext(null);

export const withFirebase = (Component) => (props, store) => (
  <FirebaseContext.Consumer>
    {(firebase) => <Component {...props} firebase={firebase} store={store} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;
