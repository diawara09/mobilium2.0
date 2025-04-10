import React, { type JSX } from 'react'
import DataTable from 'react-data-table-component'
import type  { TableProps } from 'react-data-table-component'
import {Checkbox} from '@base-ui-components/react/checkbox'

const sortIcon = <span className="icon-[tabler--arrow-down] size-4"></span>
const selectProps = {
  indeterminate: (isIndeterminate: boolean) => isIndeterminate,
}

function DataTableBase<T>(props: TableProps<T>): JSX.Element {
  return (
    <DataTable
      pagination
      sortIcon={sortIcon}
      dense
      {...props}
    />
  )
}

export default DataTableBase
