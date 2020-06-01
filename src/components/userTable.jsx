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

const User_table = props => {
  const columns = [
    {
      name: 'Roll',
      selector: 'role'
    },
    {
      name: 'Namn',
      selector: 'name',
      sortable: true
    },
    {
      name: 'E-post',
      selector: 'email'
    },
    {
      name: 'telenummer',
      selector: 'phone'
    },
    {
      name: 'Redigera',
      selector: 'delete',
      cell: () => {
        return (
          <div>
            <button className="btn btn-danger btn-sm"><i class="fa fa-minus-square-o" aria-hidden="true"></i></button>
          </div>
        );
      },
      gnoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];
  const data = [];

  props.users.map((user, i) => {
    data.push({
      email: user.email,
      phone: user.phoneNumber,
      name: user.name,
      role: user.role
    });
  });

  return (
    <div className="userTable">
      <DataTable
        title="Användare"
        fixedHeaderScrollHeight="100%"
        columns={columns}
        theme="solarized"
        data={data}
        Clicked
        pagination={true}
        paginationPerPage={10}
      />
    </div>
  );
};

export default User_table;
