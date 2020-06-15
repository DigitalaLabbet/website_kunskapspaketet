import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class NoMatch extends Component {
  render() {
    const nextPath = () => {
      this.props.history.push('/');
    };
    return (
      <div className="text-center mt-5">
        <i className="fa fa-exclamation-triangle text-danger w-100" style={{ fontSize: '2rem' }}></i>
        <p>Sidan du försöker nå finns inte</p>
        <button className="btn btn-warning" onClick={() => nextPath()}>
          Tillbaka till hem
        </button>
      </div>
    );
  }
}

export default withRouter(NoMatch);
