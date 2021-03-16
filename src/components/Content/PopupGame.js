import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: 'grey',
  },
})

const Popup = (props) => {
  const classes = useStyles()

  const { title, children, openPopup, setOpenPopup } = props

  return (
    <Dialog open={openPopup} maxWidth='md'>
      <DialogTitle>
        <Typography>{ title }</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={() => setOpenPopup(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        { children }
      </DialogContent>
    </Dialog>
  )
}

export default Popup
