import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';

import ExpandableRowData from '../components/expandable-row.jsx';

createTheme('solarized', {
  text: {
    primary: '#00000',
    secondary: '#2aa198'
  },
  background: {
    default: '#eee'
  },
  context: {
    background: '#eee',
    text: '#000000'
  },
  divider: {
    default: '#073642'
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)'
  }
});

const LectureTable = props => {
  const { lectures } = props;
  const data = [];

  const columns = [
    {
      name: 'Kategori',
      selector: 'category',
      sortable: true
    },
    {
      name: 'Video url',
      selector: 'videourl',
      hide: 'sm'
    },
    {
      name: 'Info',
      selector: 'info',
      width: '500px',
      hide: 'sm'
    }
  ];

  lectures.forEach(lecture => {
    data.push({
      id: lecture.id,
      info: lecture.information,
      videourl: lecture.videoUrl,
      category: lecture.name
    });
  });

  return (
    <div className="lectureTable mt-3">
      <DataTable
        title="Föreläsning"
        columns={columns}
        theme="solarized"
        data={data}
        pagination={true}
        paginationPerPage={10}
        expandableRows
        expandableRowsComponent={<ExpandableRowData data={data.data} />}
      />
    </div>
  );
};

export default LectureTable;
