import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';

import ExpandableRowData from '../components/expandable-row.jsx';
import { Link } from 'react-router-dom';

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
      sortable: true,
      conditionalCellStyles: [
        {
          when: row => row.isVisible === false,
          style: {
            color: 'gray'
          }
        }
      ]
    },
    {
      name: 'Video url',
      selector: 'videourl',
      width: '300px',
      hide: 'sm',
      conditionalCellStyles: [
        {
          when: row => row.isVisible === false,
          style: {
            color: 'gray'
          }
        }
      ]
    },
    {
      name: 'Info',
      selector: 'info',
      width: '300px',
      hide: 'sm',
      conditionalCellStyles: [
        {
          when: row => row.isVisible === false,
          style: {
            color: 'gray'
          }
        }
      ]
    },

    {
      name: 'Actions',
      sortable: false,
      style: { padding: '0' },
      cell: row => (
        <div>
          <Link key={row.id} to={'/redigera/' + row.id}>
            <button className="btn btn-sm btn-warning text-white">
              <i className="fas fa-edit"></i>
            </button>
          </Link>
          <button className={`btn btn-sm btn-info`} onClick={() => props.toggleLecture(row)}>
            <i className={`far  ${row.isVisible ? 'fa-eye' : 'fa-eye-slash'}`}></i>
          </button>
        </div>
      )
    }
  ];

  lectures.forEach(lecture => {
    data.push({
      id: lecture.id,
      info: lecture.information,
      videourl: lecture.videoUrl,
      category: lecture.name,
      color: lecture.color,
      isVisible: lecture.isVisible
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
