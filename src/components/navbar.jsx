import React from 'react';

import { NavLink } from 'react-router-dom';

const navbar = (props) => {
  return (
    <div className="mobile-navbar">
      <NavLink exact={true} activeClassName="active" to="/">
        <i className="fa fa-home fa-lg"></i>
      </NavLink>
      <NavLink exact={true} activeClassName="text-success" to="/chat">
        <i className="fa fa-comment fa-lg"></i>
      </NavLink>
      <NavLink exact={true} activeClassName="text-success" to="/settings">
        <i className="fa fa-user-circle fa-lg"></i>
      </NavLink>
    </div>
  );
};

export default navbar;
