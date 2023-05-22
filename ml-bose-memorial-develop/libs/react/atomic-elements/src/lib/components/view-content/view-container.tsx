import { useEffect, useState } from 'react';

import { ClassNameBem } from '@kleeen/types';
import { KsViewContainerProps } from './view-content.model';
import classnames from 'classnames';
import { useGetNavigationStyle } from '@kleeen/react/hooks';
import { useStyles } from './view-container.style';

const bem = ClassNameBem.DataDisplaySection;

export const KsViewContainer = (props: KsViewContainerProps) => {
  const [withoutSubHeader, setWithoutSubHeader] = useState(false);

  useEffect(() => {
    const subHeader = document.getElementById('sub-header-element-id');
    const { isNavLeft } = useGetNavigationStyle();
    if (!subHeader && isNavLeft) {
      setWithoutSubHeader(true);
    }
  }, []);

  const classes = useStyles({ withoutSubHeader });
  return <div className={classnames(bem, classes.dataViewDisplaySection)}>{props.children}</div>;
};
