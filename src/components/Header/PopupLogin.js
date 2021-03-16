import React, { useState } from 'react';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';

const PopupLogin = ({ login }) => {
  const [ user, setUser ] = useState('')
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const Login = () => {
    localStorage.setItem('setUser', user)
    localStorage.setItem('setBalance', '50')
    login()
  }
  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Welcome</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this game, please enter your name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="What is your name?"
            type="text"
            fullWidth
            onChange={e => setUser( e.target.value )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={user ? Login : handleClose} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PopupLogin