import { Grid, Typography } from '@material-ui/core';
import React from 'react';

interface FormHeaderProps {
  formTitle: string;
}

export function FormHeader({ formTitle }: FormHeaderProps) {
  return (
    <>
      <Grid style={{ paddingBottom: '40px' }} item xs={10} sm={10}>
        <Typography variant="h5">{formTitle}</Typography>
      </Grid>
    </>
  );
}
