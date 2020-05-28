import React from 'react';
import { Link } from 'react-router-dom';

const topbar = ({ name, backLink, color }) => {
  return (
    <div className="topbar mb-2" style={{ background: color }}>
      <Link to={backLink}>
        <i className="fa fa-arrow-left ml-4 fa-lg"></i>
      </Link>
      <h3 className="text-center text-white m-0">{name}</h3>
      <i className="fa fa-info-circle fa-lg mr-4"></i>
    </div>
  );
};

export default topbar;
