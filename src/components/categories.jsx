import React from 'react';
import { Link } from 'react-router-dom';

const Categories = ({ lectures }) => {
  return (
    <div className="categories">
      <ul>
        {lectures.map((lecture) => (
          <li key={lecture.id} style={{ background: lecture.color }}>
            <Link to={'/lecture/' + lecture.name}>
              <h4>{lecture.name}</h4>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
