import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/css/topbar.css';

const topbar = ({ name, backLink, color, info }) => {
  return (
    <div className="topbar" style={{ background: color ? color : '#314f6f' }}>
      <h5 className="text-white m-0 w-100 position-relative">
        {backLink && (
          <Link to={backLink} className="position-absolute back-button">
            <i className="fa fa-arrow-left ml-4 fa-xs"></i>
          </Link>
        )}
        {name}
        {info && (
          <button className="position-absolute info-button">
            <i className="fa fa-info-circle mr-4 fa-xs"></i>
          </button>
        )}
      </h5>
    </div>
  );
};

export default topbar;
