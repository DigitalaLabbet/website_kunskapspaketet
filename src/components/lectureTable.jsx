import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';

import ExpandableRowData from '../components/expandable-row.jsx';
import CreateLecture from './modals/create-lecture';

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
      selector: 'name',
      sortable: true,
      width: '200px',
      conditionalCellStyles: [
        {
          when: row => !row.isVisible,
          style: {
            color: 'rgba(0,0,0,.18)'
          }
        }
      ]
    },
    {
      name: 'Video url',
      selector: 'videoUrl',
      sortable: true,
      width: '200px',
      hide: 'sm',
      conditionalCellStyles: [
        {
          when: row => !row.isVisible,
          style: {
            color: 'rgba(0,0,0,.18)'
          }
        }
      ]
    },
    {
      name: 'Information',
      selector: 'information',
      sortable: true,
      width: '300px',
      hide: 'sm',
      conditionalCellStyles: [
        {
          when: row => !row.isVisible,
          style: {
            color: 'rgba(0,0,0,.18)'
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
          <button className={`btn btn-sm btn-info`} onClick={() => props.toggleLecture(row)}>
            <i className="fa  fa-eye"></i>
          </button>
          <CreateLecture lecture={row} firestore={props.firestore} />
        </div>
      ),
      conditionalCellStyles: [
        {
          when: row => !row.isVisible,
          style: {
            color: 'rgba(0,0,0,.18)'
          }
        }
      ]
    }
  ];

  lectures.forEach(lecture => {
    data.push({
      id: lecture.id,
      information: lecture.information,
      videoUrl: lecture.videoUrl,
      name: lecture.name,
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
        expandableRowDisabled={row => !row.isVisible}
        expandableRowsComponent={<ExpandableRowData data={data.data} />}
      />
    </div>
  );
};

export default LectureTable;
