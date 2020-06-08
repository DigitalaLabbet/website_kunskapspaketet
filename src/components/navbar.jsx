import React from 'react';

import { NavLink } from 'react-router-dom';

const checkLectureActive = (match, location) => {
  if (!location) return false;
  const { pathname } = location;
  return pathname === '/' || pathname.startsWith('/lecture');
};

const navbar = ({ role }) => {
  console.log(role);
  
  return (
    <div className="mobile-navbar">
      <NavLink exact={true} activeClassName="active" to="/" isActive={checkLectureActive}>
        <i className="fa fa-home fa-lg"></i>
      </NavLink>
      {(role === 'teacher' || role === 'super_admin') && (
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
