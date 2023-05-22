import { TableCell } from '../../components/index';
import ActionsForm, { ActionsFormProps } from '../../ActionsForm';
import React from 'react';

export const validateOrderColum = (rowData: any, orderColumnName?: string) => {
  if (orderColumnName && rowData[orderColumnName]) return Number(rowData[orderColumnName].displayValue) + 1;
  return '';
};

export const MemoizeActions = React.memo(
  (props: ActionsFormProps & { rowKey: string }) => {
    return (
      <TableCell
        key={`${props.rowKey}-actions`}
        className="actions-form-cell"
        data-testid="table-row-actions"
      >
        <ActionsForm {...props} />
      </TableCell>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.actions.length === nextProps.actions.length;
  },
);
