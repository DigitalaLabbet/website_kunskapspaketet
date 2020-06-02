import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/css/categories.css';

const Categories = ({ lectures }) => {
  return (
    <div className="px-2">
      <div className="categories-container">
        {lectures.map((lecture) => (
          <Link
            className="categories-item"
            key={lecture.id}
            style={{ background: lecture.color }}
            to={'/lecture/' + lecture.id}>
            {lecture.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
