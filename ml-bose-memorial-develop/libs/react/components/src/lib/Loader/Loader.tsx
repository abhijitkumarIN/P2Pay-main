import React from 'react';
import { styled } from '@material-ui/core/styles';
import MuiLinearProgress from '@material-ui/core/LinearProgress';

export interface LoaderProps {
  message?: string;
}

const LinearProgress = styled(MuiLinearProgress)({
  '&.MuiLinearProgress-root': {
    width: '100%',
  },
  '&.MuiLinearProgress-colorPrimary': {
    backgroundColor: 'var(--primary-color)',
  },
  '& .MuiLinearProgress-barColorPrimary': {
    backgroundColor: 'var(--primary-color-variant)',
  },
  '& .MuiLinearProgress-bar2Indeterminate': {
    backgroundColor: 'var(--primary-color-variant)',
  },
});

export const Loader = () => <LinearProgress />;

export const LoaderWrapper = ({
  children,
  isLoading,
}: {
  children: JSX.Element;
  isLoading?: boolean;
}): JSX.Element => {
  if (isLoading) return <Loader />;
  return children;
};

export default Loader;
