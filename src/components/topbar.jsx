import React from 'react';
import { Link } from 'react-router-dom';

const topbar = ({ name, backLink, color, info }) => {
  return (
    <div className="topbar mb-2" style={{ background: color }}>
      <h3 className="text-center text-white m-0 w-100 position-relative">
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
      </h3>
    </div>
  );
};

export default topbar;
