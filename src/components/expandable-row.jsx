import React from 'react';

const ExpandableRow = data => {
  return (
    <ul className="p-0">
      {Object.keys(data.data).map(key => (
        <li key={key} className="pl-3">
          <b>{key}: </b> {JSON.stringify(data.data[key])}
        </li>
      ))}
    </ul>
  );
};

export default ExpandableRow;
