import { Chip, Divider, FormLabel, Popover, Typography } from '@material-ui/core';
import { useState } from 'react';

import { Translate } from '@kleeen/core-react';

import { upperFirst } from 'lodash';
import { VisibilityOff } from '@material-ui/icons';
import { FormGroup, FormControlLabel } from '@material-ui/core';
import { useTheme } from '@kleeen/react/hooks';
import * as React from 'react';
import classnames from 'classnames';

import { SwitchHideColumn, useStyles } from './hide-column.style';
import { ColumnToShowArgs } from './virtualized-table-props.model';

export const bem = 'ks-hide-columns';

interface HideColumnsProps {
  columns: ColumnToShowArgs[];
  hideColumns: (column: ColumnToShowArgs, hideColumn: boolean, idex: number) => void;
  setColumnsState: (T: any) => void;
}

const HideColumns = (props: HideColumnsProps) => {
  const { columns, hideColumns, setColumnsState } = props;

  if (!columns) return null;

  const totalHideColumnsLabel = (
    <Translate
      id="app.subHeader.hideColumns"
      type="html"
      values={{ count: columns.filter((column) => column.hideColumn).length }}
    />
  );
  const classes = useStyles();
  const { themeClass } = useTheme();

  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);

  function handleClick(event: React.MouseEvent<HTMLInputElement>) {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  }

  function handleClose() {
    setAnchorEl(null);
    setOpen(false);
  }

  const handleToggle = (columnToShow: ColumnToShowArgs, index: number) => () => {
    const hideColumn = !columnToShow.hideColumn;
    const newState = columns.map((column) => {
      if (column.label === columnToShow.label) {
        return {
          ...columnToShow,
          hideColumn,
          order: index,
        };
      }
      return column;
    });

    setColumnsState(newState);
    hideColumns(columnToShow, hideColumn, index);
  };

  return (
    <>
      <div className={classnames(`${bem}__handle-container`, classes.hiddenFieldsHeader)}>
        <Typography className={classes.hiddenFieldsHeaderTitle}>{totalHideColumnsLabel}</Typography>
        <div className={classes.hiddenFieldsHeaderHandler}>...</div>
        <div className={classes.hiddenFieldsHeaderActionsContainer}>
          <div className={classes.hiddenFieldsHeaderChipButton}>
            <Chip
              className={classes.chip}
              icon={<VisibilityOff />}
              label={totalHideColumnsLabel}
              onClick={handleClick}
              variant="outlined"
            />
            <Popover
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              classes={{
                paper: classes.paper,
                root: classes.popover,
              }}
              className={themeClass}
              onClose={handleClose}
              open={open}
            >
              <div>
                <FormLabel className={classes.header} component="legend">
                  {totalHideColumnsLabel}
                </FormLabel>
                <Divider />
                <FormGroup>
                  {columns.map((value, index) => {
                    return (
                      <FormControlLabel
                        className={classes.label}
                        control={<SwitchHideColumn defaultChecked={!value.hideColumn} />}
                        label={upperFirst(value.label)}
                        onClick={handleToggle(value, index)}
                      />
                    );
                  })}
                </FormGroup>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};

export default HideColumns;
