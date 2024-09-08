import { useState } from 'react';
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
import { NumericFormat, NumberFormatValues } from 'react-number-format';

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
  const [amount, setAmount] = useState(bill.amount_due || 0);

  const handleMarkAsPaidClick = () => {
    if (amount <= 0) {
      return;
    }

    if (amount !== bill.amount_due) {
      bill.amount_due = amount;
      bill.is_paid = true;
      updateBill(bill);
    } else {
      markAsPaid(bill);
    }

    handleClose();
  };

  const handleAmountChange = (values: NumberFormatValues) => {
    const value = values.floatValue;
    setAmount(value || 0);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Mark {bill.name} as paid?</DialogTitle>
      <DialogContent>
        <NumericFormat
          customInput={TextField}
          thousandSeparator
          margin="dense"
          id="amount"
          name="amount"
          label="Amount"
          type="text"
          value={amount}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }
          }}
          onValueChange={handleAmountChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          disabled={amount === 0}
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
