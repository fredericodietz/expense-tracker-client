import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';

function MarkAsPaid({
  open,
  handleClose
}: {
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Mark this Bill as paid?</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="amount"
          name="amount"
          label="Amount"
          type="text"
          fullWidth
        />
      </DialogContent>
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

export default MarkAsPaid;
