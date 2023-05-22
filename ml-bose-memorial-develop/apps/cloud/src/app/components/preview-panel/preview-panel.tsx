import { PreviewPanelContent, PreviewPanelHeader } from './components';
import { ReflexContainer, ReflexElement, ReflexHandle, ReflexSplitter } from 'react-reflex';

import { ClassNameBem } from '@kleeen/types';
import { PreviewPanelProps } from './preview-panel.model';
import classnames from 'classnames';
import { memo } from 'react';
import { usePreviewPanelIsOpen } from '@kleeen/react/hooks';
import { useStyles } from './preview-panel.styles';

const bem = ClassNameBem.Layout;

export const PreviewPanel = memo(({ children }: PreviewPanelProps) => {
  const { isPreviewOpen } = usePreviewPanelIsOpen();
  const styles = useStyles();

  return (
    <ReflexContainer className={classnames(`${bem}__preview-container`, 'layout')} orientation="horizontal">
      <ReflexElement minSize={288}>{children}</ReflexElement>
      {isPreviewOpen && <ReflexSplitter className={styles.previewSplitter} />}
      {isPreviewOpen && (
        <ReflexElement minSize={42}>
          <ReflexHandle className={styles.previewHandle}>
            <PreviewPanelHeader />
          </ReflexHandle>
          <PreviewPanelContent />
        </ReflexElement>
      )}
    </ReflexContainer>
  );
});
