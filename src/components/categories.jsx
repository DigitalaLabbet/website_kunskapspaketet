import React from 'react';

const Categories = ({ lectures }) => {
  return (
    <div className="categories">
      <ul>
        {lectures.map((lecture) => (
          <li key={lecture.id} style={{ background: lecture.color }}>
            <h4>{lecture.name}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
