import React from 'react';

import { Link } from 'react-router-dom';

const Mobile_navbar = (props) => {
  return (
    <div className="mobile-navbar">

      <ul>
        <li>
          <i className="fa fa-sign-out fa-lg" aria-hidden="true"></i>
        </li>
        <Link to="/hem">
          <li>
            <i className="fa fa-home fa-lg" aria-hidden="true"></i>
          </li>
        </Link>

        <li>
          <i className="fa fa-arrow-left fa-lg" aria-hidden="true"></i>
        </li>
      </ul>

    </div>
  );
};

export default Mobile_navbar;
