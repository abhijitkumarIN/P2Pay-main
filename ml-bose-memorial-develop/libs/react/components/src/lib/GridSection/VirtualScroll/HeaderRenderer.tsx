import { Attribute, DEBOUNCE_WAIT, GenericFunction } from '@kleeen/types';
import { Order, isNilOrEmpty } from '@kleeen/common/utils';

import { GridSectionHeaderProps } from '../GridSection.model';
import { Icon } from '../../Icon';
import TableCell from '@material-ui/core/TableCell';
import { TextField } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import _ from 'lodash';
import classnames from 'classnames';
import { setVirtualizedTableInputValue } from './virtual-table/virtualized-table-props.model';
import { SortableHandle } from 'react-sortable-hoc';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import Draggable from 'react-draggable';

const iconBySortDirection: { [key in Order]: string } = {
  [Order.asc]: 'ks-sort-asc',
  [Order.desc]: 'ks-sort-desc',
  [Order.none]: 'ks-sort-asc',
};

const DragHandle = SortableHandle(({ children }) => <div className="draggableArea">{children}</div>);

export type HeaderRendererProps = GridSectionHeaderProps & {
  columnIndex: number;
  inputValues?: string | number | Record<string, never>;
  isLoading?: boolean;
  newAttributes?: Attribute[];
  resizeColumn: (props: any) => void;
  setInputValue?: setVirtualizedTableInputValue;
};

export const headerRenderer = ({
  attributes,
  columnIndex,
  handleChange,
  hasActions,
  inputValues,
  isLoading = false,
  newAttributes,
  onSort,
  order,
  orderBy,
  resizeColumn,
  setInputValue,
}: HeaderRendererProps): JSX.Element | null => {
  let debouncedFn;

  const colSpan = columnIndex === 0 && hasActions ? 2 : 0;
  const getColumnLabel = (attr: Attribute): string => attr.label || attr.name;
  const baseAttributes = newAttributes ? newAttributes : attributes;
  const attribute = baseAttributes[columnIndex];
  const classAppend = () => {
    if (columnIndex === 0) return 'firstHeader';
    if (columnIndex === baseAttributes.length - 1) return 'lastHeader';
    return 'middleHeader';
  };

  return (
    <TableCell key={attribute.id} colSpan={colSpan} className={classnames('header-container', classAppend())}>
      <div className="header-item">
        <DragHandle>
          <DragIndicatorIcon />
        </DragHandle>
        <div className="truncate-text">
          <Tooltip title={getColumnLabel(attribute)} placement="top">
            <TextField
              onChange={(e) => {
                e.persist();
                if (isNilOrEmpty(debouncedFn)) {
                  debouncedFn = _.debounce(() => {
                    const { value } = e.target;
                    handleChange(attribute.name, value);
                  }, DEBOUNCE_WAIT);
                }
                debouncedFn();
              }}
              onInput={(e) => {
                if (isNilOrEmpty(setInputValue)) return;
                setInputValue(attribute.name, e.target['value']);
              }}
              value={inputValues ? inputValues[attribute.name] : ''}
              label={getColumnLabel(attribute)}
              disabled={isNilOrEmpty(setInputValue)}
            />
          </Tooltip>
        </div>
        <IconSort
          isLoading={isLoading}
          name={attribute.name}
          onSort={onSort}
          order={order}
          orderBy={orderBy}
        />
      </div>
      <div className="resize-container">
        <Draggable
          axis="x"
          defaultClassName="resizable-area"
          defaultClassNameDragging="resizing"
          onDrag={(e, { deltaX }) => {
            e.stopPropagation();
            resizeColumn({ deltaX });
          }}
          position={{ x: 0 } as any}
        >
          <div className="resizable-area"></div>
        </Draggable>
      </div>
    </TableCell>
  );
};

interface IconSortProps {
  isLoading: boolean;
  name: string;
  onSort: GenericFunction;
  order: Order;
  orderBy: string;
}

function IconSort({ isLoading, name, onSort, order, orderBy }: IconSortProps) {
  const classAppend = classnames('sort-icon', { show: orderBy === name }, { disabled: isLoading });

  function dispatchOnClick() {
    if (!isLoading) onSort(name);
  }

  return (
    <div className={classAppend} onClick={dispatchOnClick}>
      <Icon icon={iconBySortDirection[order]} />
    </div>
  );
}
