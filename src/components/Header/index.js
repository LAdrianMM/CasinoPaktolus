import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors'
import { AppBar, Toolbar, Typography, Avatar, Chip } from '@material-ui/core';
import PopupLogin from './PopupLogin'

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    position: 'absolute',
    top: '0',
    display: 'flex',
    justifyContent: 'center'
  },
  headerBar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  avatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    cursor: 'pointer',
  },
  balance: {
    backgroundColor: '#ddd',
    color: 'green',
    fontWeight: 'bold',
    fontSize: '24px'
  }
}));

const Header = ({ balance, userBalance }) => {
  const [ isLogin, setIsLogin ] = useState(localStorage.getItem('setUser') || '')
  const classes = useStyles();
  const handleLogin = () => {
    setIsLogin(!isLogin)
  }
  let userLoged = localStorage.getItem('setUser')
  const handleLogout = () => {
    localStorage.clear()
    setIsLogin('')
  }
  return (
    <div  className={classes.headerContainer}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.headerBar}>
          <Typography variant="h6" className={classes.title}>
            Casino
          </Typography>
          <Chip label={`$${userLoged ? userBalance : balance.toFixed(2)}`} className={classes.balance} />
          {
            !isLogin
            ? <PopupLogin login={handleLogin} balance= { balance } />
            : <Avatar onClick={handleLogout} className={classes.avatar}>{userLoged.charAt(0)}</Avatar>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header