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
import { NumericFormat, NumberFormatValues } from 'react-number-format';
import useAPI from '../../../hooks/useAPI';

function MarkAsPaid({
  open,
  handleClose,
  bill
}: {
  open: boolean;
  handleClose: () => void;
  bill: BillType;
}) {
  const { handlePayBill, handleUpdateBill } = useAPI();
  const [amount, setAmount] = useState(bill.amountDue || '0');

  const handleMarkAsPaidClick = () => {
    if (amount !== bill.amountDue) {
      bill.amountDue = amount;
      handleUpdateBill(bill);
    } else {
      handlePayBill(bill.id, amount);
    }

    handleClose();
  };

  const handleAmountChange = (values: NumberFormatValues) => {
    const value = values.value;
    setAmount(value || '0');
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
          disabled={amount === '0'}
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
