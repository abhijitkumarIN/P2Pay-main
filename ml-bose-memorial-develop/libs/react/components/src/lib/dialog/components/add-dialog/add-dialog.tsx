import { AttributesDialogMap, KsAddDialogProps } from './add-dialog.model';
import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { KsDialog, useDialogStyles as useStyles } from '../../dialog.styles';
import { MouseEvent, useEffect, useState } from 'react';

import { KsButton } from '../../../button';
import capitalize from 'lodash.capitalize';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useTheme } from '@kleeen/react/hooks';

export function KsAddDialog({
  action,
  attributes: deprecatedAttributes,
  children,
  className,
  containerId,
  onAction,
  onClose,
  open,
  parent,
  title,
}: KsAddDialogProps): JSX.Element {
  const [form, setForm] = useState({});
  const classes = useStyles();
  const { themeClass } = useTheme();
  const attrs = isNilOrEmpty(action?.addModalAttributes) ? deprecatedAttributes : action?.addModalAttributes;

  useEffect(() => {
    if (Array.isArray(attrs)) {
      const attributesMap = attrs.reduce((acc: AttributesDialogMap, attribute) => {
        acc[attribute.name] = `New ${attribute.name}`;

        return acc;
      }, {});
      setForm(attributesMap);
    }
  }, [attrs]);

  const onAdd = (e: MouseEvent): void => {
    const entityKey = attrs?.[0]?.name;

    if (!entityKey) {
      console.error('The entityKey is empty for the add action.');
      return;
    }

    const payload = {
      entity: form,
      parent,
      entityKey,
    };

    onAction(e, payload);
  };

  return (
    <KsDialog
      aria-labelledby="form-dialog-title"
      className={`${className} ${themeClass}`}
      data-testid="add-dialog"
      maxWidth="md"
      onClose={onClose}
      open={open}
    >
      <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
        {typeof title === 'string' ? capitalize(title.toString()) : title}
      </DialogTitle>
      <DialogContent className={classes.dialogContent} id={containerId}>
        {children}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <KsButton data-testid="add-dialog-cancel" onClick={onClose}>
          Cancel
        </KsButton>
        <KsButton data-testid="add-dialog-add" onClick={onAdd} color="primary">
          {title}
        </KsButton>
      </DialogActions>
    </KsDialog>
  );
}

export * from './add-dialog.model';
