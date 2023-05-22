import React, { memo } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useStyles, Typography } from './Branding.style';
import classNames from 'classnames';

import { BrandingProps } from './Branding.model';

const bem = 'ks-branding';

const Branding: React.FC<BrandingProps> = ({ logo, accountName, productName, isMobile, isTablet }) => {
  const classes = useStyles();

  return (
    <div className={classNames(bem, classes.branding)}>
      {logo && <Avatar alt="KS" variant="square" src={logo} />}
      {!isMobile && !isTablet && (
        <div>
          {accountName && (
            <Typography className={classNames(`${bem}__company`, classes.companyName)}>
              {accountName}
            </Typography>
          )}
          {productName && (
            <Typography className={classNames(`${bem}__product`, classes.productName)}>
              {productName}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(Branding);
