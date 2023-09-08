/* eslint react/no-unstable-nested-components: 0 */
import React from 'react';
import MaterialTable, { MTableBodyRow } from '@material-table/core';
import { getTableDefault } from './table-helper';
import ToolbarCustom from './ToolbarCustom';

const Table = ({ options, onRowClick, headerButtons, ...props }) => {
  return (
    <MaterialTable
      {...getTableDefault(options)}
      components={{
        Toolbar: (props) => <ToolbarCustom headerButtons={headerButtons} props={props} />,
        Row: (p) => <MTableBodyRow {...p} onRowClick={onRowClick} />
      }}
      {...props}
    />
  );
};

export default Table;
