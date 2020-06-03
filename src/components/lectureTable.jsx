import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';

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

const Lecture_table = props => {
  let lectures = props.lectures;
  const columns = [
    {
      name: 'kategori',
      selector: 'catygory',
      sortable: true,
      width: '150px'
    },
    {
      name: 'video url',
      selector: 'videourl',
      width: '300px'
    },
    {
      name: 'info',
      selector: 'info',
      width: '500px',
      wrap: true
    },
    // {
    //   name: 'Redigera',
    //   selector: 'delete',
    //   cell: (id) => {
    //     return (
    //       <div>
    //         <button onClick={props.onDeleteLecture.bind(this, id.id)} className="btn btn-danger btn-sm " id="deleteUser"><i className="fa fa-minus-square-o" aria-hidden="true"></i></button>
    //       </div>
    //     );
    //   },
    //   gnoreRowClick: true,
    //   allowOverflow: true,
    //   button: true
    // }
    
  ];
  const data = [];


  lectures.map(lecture => {

    data.push({
      id: lecture.id,
      info: lecture.information,
      videourl: lecture.videoUrl,
      catygory: lecture.name
    });
  });

  return (
    <div className="lectureTable my-5">
      <DataTable
        title="Föreläsning"
        columns={columns}
        theme="solarized"
        data={data}
        pagination={true}
        paginationPerPage = {5}
      />
    </div>
  );
};

export default Lecture_table;
