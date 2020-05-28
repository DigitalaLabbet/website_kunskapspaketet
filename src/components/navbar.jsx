import React from 'react';

import { NavLink } from 'react-router-dom';

const navbar = ({ role }) => {
  return (
    <div className="mobile-navbar">
      <NavLink exact={true} activeClassName="active" to="/">
        <i className="fa fa-home fa-lg"></i>
      </NavLink>
      {role === 'teacher' && (
        <NavLink exact={true} activeClassName="active" to="/admin">
          <i className="fa fa-users-cog"></i>
        </NavLink>
      )}
      <NavLink exact={true} activeClassName="active" to="/settings">
        <i className="fa fa-user-circle fa-lg"></i>
      </NavLink>
    </div>
  );
};

export default navbar;
