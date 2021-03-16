import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import PopupGame from './PopupGame';

const useStyles = makeStyles({
  tableContainer: {
    maxWidth: '800px',
    width: '90%',
    marginTop: '100px',
  },
  table: {
    width: '100%',
  },
  buttonStart: {
    marginTop: '20px',
  },
  popupGameStyle: {
    height: '400px',
    minWidth: '300px',
    padding: '60px 0px 40px 0px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  containerSlots: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  slots: {
    height: '100px',
    width: '80px',
    border: '3px solid #000000',
    backgroundColor: '#3f51b5a9',
    color: '#ffffff',
    fontSize: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerButtonPopup: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'space-around',
    width: '80%'
  },
  buttonPopup: {
    minWidth: '100px',
    height: '40px'
  },
});

const ContentTable = ({ balance, setBalance, userBalance, setUserBalance  }) => {
  
  useEffect(() => {
    setUserBalance(localStorage.getItem('setBalance'))
  }, [userBalance])

  const [ slotNumbers, setSlotNumbers ] = useState({
    slot_1: 0,
    slot_2: 0,
    slot_3: 0
  })
  const [ rows, setRows ] = useState([])
  const [ openPopup, setOpenPopup ] = useState(false)
  const classes = useStyles();
  let time = new Date()
  const userLoged = localStorage.getItem('setUser')

  const handleBalanceInit = () => {
    setUserBalance(userBalance -=1 )
    localStorage.setItem('setBalance', userBalance)
  }
  const handleBalanceWin_par = () => {
    setUserBalance(userBalance += 1.5 )
    localStorage.setItem('setBalance', userBalance)
  }
  const handleBalanceWin_three = () => {
    setUserBalance(userBalance += 6 )
    localStorage.setItem('setBalance', userBalance)
  }
  const handleBalanceWin_seven = () => {
    setUserBalance(userBalance += 6 )
    localStorage.setItem('setBalance', userBalance)
  }

  const handleGame = () => {
    let newSlot_1 = Math.ceil(Math.random() * 9)
    let newSlot_2 = Math.ceil(Math.random() * 9)
    let newSlot_3 = Math.ceil(Math.random() * 9)

    setSlotNumbers({
      slot_1: newSlot_1,
      slot_2: newSlot_2,
      slot_3: newSlot_3
    })
    
    userLoged ? handleBalanceInit() : setBalance(balance -= 1)

    setRows([...rows, {id: rows.length + 1, slot: `${newSlot_1} - ${newSlot_2} - ${newSlot_3}`, date: `${time.getHours()} : ${time.getMinutes()}`}])
    
    if(newSlot_1 === 7 && newSlot_2 === 7 && newSlot_3 === 7 ){
      userLoged ? handleBalanceWin_seven() : setBalance(balance += 11)
    }else{
      if(newSlot_1 === newSlot_2){
        if(newSlot_2 === newSlot_3){
          userLoged ? handleBalanceWin_three() : setBalance(balance += 6)
        }else{
          userLoged ? handleBalanceWin_par() : setBalance(balance += 1.5)
        }
      } else if(newSlot_1 === newSlot_3){
        if(newSlot_2 === newSlot_3){
          userLoged ? handleBalanceWin_three() : setBalance(balance += 6)

        }else{
          userLoged ? handleBalanceWin_par() : setBalance(balance += 1.5)
        }
      }else if(newSlot_2 === newSlot_3){
        if(newSlot_2 === newSlot_1){
          userLoged ? handleBalanceWin_three() : setBalance(balance += 6)
        }else{
          userLoged ? handleBalanceWin_par() : setBalance(balance += 1.5)
        }
      }
    }
  }
  return (
    <div className={classes.tableContainer}>
      <TableContainer component={Paper} >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">SLOT</TableCell>
              <TableCell align="center">DATE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.slot}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        className={classes.buttonStart}
        variant="contained"
        color="secondary"
        onClick={() => setOpenPopup(true)}
      >
        Start
      </Button>
      <PopupGame
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title='Good Luck!!'
      >
        <Paper elevation={0} className={classes.popupGameStyle}>
          <div className={classes.containerSlots}>
            <div className={classes.slots}>{slotNumbers.slot_1}</div>
            <div className={classes.slots}>{slotNumbers.slot_2}</div>
            <div className={classes.slots}>{slotNumbers.slot_3}</div>
          </div>
          <div className={classes.containerButtonPopup}>
            <Button onClick={handleGame} variant="contained" color="secondary" className={classes.buttonPopup}>
              Run
            </Button>
            <Button variant="contained" color="secondary" className={classes.buttonPopup}>
              Debug
            </Button>
          </div>
        </Paper>
      </PopupGame>
    </div>
  );
}

export default ContentTable