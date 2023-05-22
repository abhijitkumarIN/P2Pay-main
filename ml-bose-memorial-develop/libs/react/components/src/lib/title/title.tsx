import { KsSvgIcon, KsSvgIconSize } from '../svg-icon';
import { KsTitleMaxWidthEnum, KsTitleProps } from './title.model';

import KsDisplayMedia from '../KsDisplayMedia/KsDisplayMedia';
import { ReactElement } from '@kleeen/types';
import { Tooltip } from '@material-ui/core';
import classnames from 'classnames';
import { isNotNilOrEmpty } from '@kleeen/common/utils';
import { useStyles } from './title.style';

const bem = 'ks-title';

export function KsTitle({
  className,
  displayMedia,
  hasTooltip,
  icon,
  isMainTitle,
  subTitle,
  title,
  titleMaxWidth,
  upText,
}: KsTitleProps) {
  const classes = useStyles();

  const Avatar = displayMedia && (
    <div className={classnames(`${bem}__avatar-container`, classes.marginLeft)}>
      <KsDisplayMedia value={displayMedia.value} type={displayMedia.type} size={21} />
    </div>
  );

  const Icon = icon && (
    <div className={classnames(`${bem}__icon-container`, classes.iconContainer, classes.marginRight)}>
      <KsSvgIcon size={KsSvgIconSize.ExtraLarge} icon={icon} />
    </div>
  );

  const titleWidthClassMap = {
    [KsTitleMaxWidthEnum.Large]: classes.largeTitleContainer,
    [KsTitleMaxWidthEnum.Medium]: classes.mediumTitleContainer,
    [KsTitleMaxWidthEnum.Small]: classes.smallTitleContainer,
  };

  const titleWidthClass = titleWidthClassMap[titleMaxWidth || KsTitleMaxWidthEnum.Large];

  return (
    <div className={classnames(`${bem}__container`, classes.infoContainer)}>
      {displayMedia ? Avatar : null}
      {icon && !displayMedia ? Icon : null}
      <div
        className={classnames(`${bem}__title-container`, className, classes.titleContainer, {
          [titleWidthClass]: isNotNilOrEmpty(titleWidthClass),
        })}
      >
        {upText && <span className={classnames(`${bem}__title--up`, classes.withoutMargin)}>{upText}</span>}
        <h3
          className={classnames(`${bem}__title`, {
            [classes.mainTitle]: isMainTitle,
            [classes.commonTitle]: !isMainTitle,
          })}
        >
          <Title hasTooltip={hasTooltip} title={title} />
        </h3>
        {subTitle && (
          <span className={classnames(`${bem}__title--sub`, classes.withoutMargin)}>{subTitle}</span>
        )}
      </div>
    </div>
  );
}

function Title({ title, hasTooltip }: { title: ReactElement | string; hasTooltip?: boolean }) {
  const classes = useStyles();

  if (hasTooltip && title) {
    return (
      <Tooltip title={title} placement="top">
        <span className={classes.elipse}>{title}</span>
      </Tooltip>
    );
  }

  return <span className={classes.elipse}>{title}</span>;
}
