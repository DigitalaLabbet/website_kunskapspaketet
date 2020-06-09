import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';

import ExpandableRowData from '../components/expandable-row.jsx';
import Confirm from './modals/confirm-modal';
import CreateUser from './modals/create-user';
import ViewUser from './modals/view-user';

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
      width: '50px',
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
      ],
      cell: row => (
        <div className="w-100 text-center">
          {row.role === 'teacher' ? 'T' : row.role === 'super_admin' ? 'SA' : 'S'}
        </div>
      )
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
      selector: 'phoneNumber',
      sortable: true,
      hide: 'sm'
    },
    {
      name: 'Actions',
      sortable: false,
      style: { padding: '0' },
      cell: row => (
        <div>
          {row.role !== 'super_admin' && (
            <>
              {row.role === 'student' && <ViewUser user={row} />}
              <CreateUser user={row} />
              <Confirm
                onConfirm={() => {
                  props.deleteUser(row.id);
                }}
                body={'Är du säker du vill radera: ' + row.email}
                title="Radera användare"
                confirmText="Confirm delete"
                buttonText={<i className="fa fa-trash"></i>}
              />
            </>
          )}
        </div>
      )
    }
  ];

  users.forEach(user => {
    data.push({
      email: user.email,
      phoneNumber: user.phoneNumber,
      name: user.name,
      role: user.role,
      id: user.id
    });
  });

  return (
    <div className="userTable mt-3">
      <h5 className="m-0 p-2" style={{ background: '#eeeeee' }}>
        Användare <CreateUser />
      </h5>
      <DataTable
        noHeader={true}
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
