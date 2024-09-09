import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { BillType } from '../../../types';
import useAPI from '../../../hooks/useAPI';

function DeleteBill({
  open,
  handleClose,
  bill
}: {
  open: boolean;
  handleClose: () => void;
  bill: BillType;
}) {
  const { handleDeleteBill } = useAPI();

  const handleDeleteClick = () => {
    handleDeleteBill(bill.id);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Are you sure you want to delete {bill.name} Bill?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button type="submit" variant="contained" onClick={handleDeleteClick}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteBill;
