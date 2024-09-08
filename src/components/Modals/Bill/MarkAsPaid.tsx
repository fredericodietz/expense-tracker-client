import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField
} from '@mui/material';
import { BillType } from '../../../types';
import { useBillsContext } from '../../../context/BillsContext';
import { useState } from 'react';

function MarkAsPaid({
  open,
  handleClose,
  bill
}: {
  open: boolean;
  handleClose: () => void;
  bill: BillType;
}) {
  const { markAsPaid, updateBill } = useBillsContext();
  const [amount, setAmount] = useState(
    bill.amount_due?.toFixed(2).toString() || '0'
  );

  const handleMarkAsPaidClick = () => {
    if (bill) {
      const amountCurrency = parseFloat(amount);
      if (amountCurrency !== bill.amount_due) {
        bill.amount_due = amountCurrency;
        bill.is_paid = true;
        updateBill(bill);
      } else {
        markAsPaid(bill);
      }
    }
    handleClose();
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Mark {bill.name} as paid?</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="amount"
          name="amount"
          label="Amount"
          type="text"
          value={amount}
          onChange={handleAmountChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }
          }}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={handleMarkAsPaidClick}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MarkAsPaid;
