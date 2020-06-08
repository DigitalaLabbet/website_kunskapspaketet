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

const UserTable = props => {
  const { users } = props;
  const data = [];

  const columns = [
    {
      name: 'Roll',
      selector: 'role',
      sortable: true,
      width: '100px',
      style: {
        color: '#ffffff'
      },
      conditionalCellStyles: [
        {
          when: row => row.role === 'teacher',
          style: {
            backgroundColor: '#4299e1'
          }
        },
        {
          when: row => row.role === 'student',
          style: {
            backgroundColor: '#48bb78'
          }
        },
        {
          when: row => row.role === 'super_admin',
          style: {
            backgroundColor: '#EBB035'
          }
        }
      ]
    },
    {
      name: 'Namn',
      selector: 'name',
      sortable: true,
      hide: 'sm'
    },
    {
      name: 'E-post',
      selector: 'email',
      sortable: true
    },
    {
      name: 'Telenummer',
      selector: 'phone',
      sortable: true,
      hide: 'sm'
    }
  ];

  users.forEach(user => {
    data.push({
      email: user.email,
      phone: user.phoneNumber,
      name: user.name,
      role: user.role,
      id: user.id
    });
  });

  return (
    <div className="userTable mt-3">
      <DataTable
        title="Användare"
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

export default UserTable;
