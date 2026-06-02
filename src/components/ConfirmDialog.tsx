// material ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type ConfirmDialogProps = {
    open: boolean;
    handleClose: (deleteItem: boolean) => void;
}

export const ConfirmDialog = ({open, handleClose}: ConfirmDialogProps) => {
    return (
      <Dialog
        fullScreen={false}
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Delete Item?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleClose(false)}>
            No, Cancel
          </Button>
          <Button onClick={() => handleClose(true)}>
            Yes, Delete it
          </Button>
        </DialogActions>
      </Dialog>
    )
}