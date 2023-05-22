import { DisplayValueTitle } from '../display-value-title';
import { FormatProps } from '@kleeen/types';
import React from 'react';
import classnames from 'classnames';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { LoaderWrapper } from '@kleeen/react/components';

const bem = 'ks-header-title';

interface HeaderTitleProps {
  displayValue?: string;
  isLoading?: boolean;
  format?: FormatProps;
  formatType?: string;
  subTitle?: string;
  title?: string;
}

export const HeaderTitleEllipsis = (props: HeaderTitleProps, split = true): React.ReactElement => {
  return (
    <>
      {props.displayValue && isNilOrEmpty(props.subTitle) ? (
        <div className={classnames(bem, 'header-title')}>
          <div className={classnames(`${bem}__title`, 'title-container')}>{props.title}</div>
          <LoaderWrapper isLoading={props.isLoading}>
            <div className={classnames(`${bem}__ellipsis`, 'with-ellipsis')}>
              <DisplayValueTitle {...props} />
            </div>
          </LoaderWrapper>
        </div>
      ) : (
        props.title
      )}
    </>
  );
};

export const HeaderTitle = (props: HeaderTitleProps, split = true): React.ReactElement => {
  return (
    <>
      {props.displayValue && isNilOrEmpty(props.subTitle) ? (
        <>
          <DisplayValueTitle {...props} />
          {split && ' | ' + props.title}
        </>
      ) : (
        props.title
      )}
    </>
  );
};
