import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

const checkLectureActive = (match, location) => {
  if (!location) return false;
  const { pathname } = location;
  return pathname === '/' || pathname.startsWith('/lecture');
};

class Navbar extends Component {
  render() {
    const { t, role } = this.props;
    return (
      <div className="mobile-navbar">
        <NavLink exact={true} activeClassName="active" to="/" isActive={checkLectureActive}>
          <i className="fa fa-home fa-lg"></i>
          <p>{t('home')}</p>
        </NavLink>
        {(role === 'teacher' || role === 'super_admin') && (
          <NavLink exact={true} activeClassName="active" to="/admin">
            <i className="fa fa-users-cog"></i>
            <p>{t('admin')}</p>
          </NavLink>
        )}
        <NavLink exact={true} activeClassName="active" to="/settings">
          <i className="fa fa-user-circle fa-lg"></i>
          <p>{t('settings')}</p>
        </NavLink>
      </div>
    );
  }
}

export default withTranslation()(Navbar);
