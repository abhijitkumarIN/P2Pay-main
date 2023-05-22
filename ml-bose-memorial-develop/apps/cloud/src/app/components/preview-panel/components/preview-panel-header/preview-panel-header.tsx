import { usePreviewPanel, usePreviewPanelActions } from '@kleeen/react/hooks';

import { ClassNameBem } from '@kleeen/types';
import { KsButton } from '@kleeen/react/components';
import { Translate } from '@kleeen/core-react';
import { Typography } from '@material-ui/core';
import { WidgetCategoryDropdown } from './widget-category-dropdown';
import classnames from 'classnames';
import { useStyles } from './preview-panel-header.styles';

const bem = ClassNameBem.Layout;

export function PreviewPanelHeader() {
  const { previewTitle } = usePreviewPanel();
  const styles = useStyles();

  return (
    <div className={classnames(`${bem}__handle-container`, styles.previewHeader)}>
      <Typography className={styles.previewHeaderTitle}>{previewTitle}</Typography>
      <div className={styles.previewHeaderHandler}>::::::</div>
      <div className={styles.previewHeaderActionsContainer}>
        <div className={styles.previewHeaderDropdownContainer}>
          <WidgetCategoryDropdown />
        </div>
        <CloseButton />
      </div>
    </div>
  );
}

//#region Private members
function CloseButton() {
  const { closePreviewPanel } = usePreviewPanelActions();
  const styles = useStyles();

  function handleClosePreview() {
    closePreviewPanel();
  }

  return (
    <KsButton className={styles.previewHeaderCloseButton} onClick={handleClosePreview} variant="outlined">
      <Translate id="app.previewLayout.closeButton" type="html" />
    </KsButton>
  );
}
//#endregion
