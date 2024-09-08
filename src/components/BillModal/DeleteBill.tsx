import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

function DeleteBill({
  open,
  handleClose
}: {
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Are you sure you want to delete Internet Bill?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteBill;
