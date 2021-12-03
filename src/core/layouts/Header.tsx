import React from 'react';

import { AppBar, Toolbar, Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Logo } from '../components';

export function Header() {
  const classes = useStyles();

  return (
    <AppBar className={classes.header} position="static" color="default" elevation={0}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap>
          <Logo />
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: 'wrap'
  }
}));
