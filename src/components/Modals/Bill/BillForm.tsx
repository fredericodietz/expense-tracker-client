import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  InputAdornment
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import { BillType } from '../../../types';
import { Categories } from '../../../types/common';
import { NumericFormat, NumberFormatValues } from 'react-number-format';
import useAPI from '../../../hooks/useAPI';

function BillForm({
  open,
  handleClose,
  bill
}: {
  open: boolean;
  handleClose: () => void;
  bill?: BillType | null;
}) {
  const { createBill, handleUpdateBill } = useAPI();

  const billTemplate: Omit<BillType, 'id' | 'Payments'> = {
    category: Categories.Utilities,
    name: '',
    amountDue: '0.00',
    dueDay: 1
  };

  const [billFormData, setFormBillData] = useState<
    BillType | Omit<BillType, 'id' | 'Payments'>
  >(billTemplate);

  const handleChange = (event: SelectChangeEvent) => {
    setFormBillData({
      ...billFormData,
      category: event.target.value as Categories
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormBillData({
      ...billFormData,
      [event.target.name]: event.target.value
    });
  };

  const handleFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (bill?.id) {
      handleUpdateBill(billFormData as BillType);
      handleClose();
      return;
    }
    createBill(billFormData as Omit<BillType, 'id'>);
    handleClose();
  };

  const handleAmountChange = (values: NumberFormatValues) => {
    const value = values.value;
    setFormBillData({
      ...billFormData,
      amountDue: value
    });
  };

  useEffect(() => {
    setFormBillData(bill || billTemplate);
  }, [bill]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle data-testid="form-title">
        {bill ? `Edit ${bill.name}` : 'Add new'} bill
      </DialogTitle>
      <form onSubmit={handleFormSubmit}>
        <DialogContent>
          <Grid container spacing={2} columns={12}>
            <Grid size={{ sm: 12, md: 10 }}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="Bill"
                placeholder="Bill"
                type="text"
                value={billFormData.name}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ sm: 12, md: 2 }}>
              <TextField
                required
                margin="dense"
                id="dueDay"
                name="dueDay"
                label="Due Day"
                type="number"
                onChange={handleInputChange}
                value={billFormData.dueDay}
                InputProps={{ inputProps: { min: 1, max: 31 } }}
                fullWidth
              />
            </Grid>
            <Grid size={{ sm: 12, md: 6 }}>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category"
                  name="category"
                  value={billFormData.category}
                  label="Category"
                  onChange={handleChange}>
                  {Object.keys(Categories).map((c, index) => (
                    <MenuItem key={index} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ sm: 12, md: 6 }}>
              <NumericFormat
                customInput={TextField}
                thousandSeparator
                margin="dense"
                id="amount"
                name="amount"
                label="Amount"
                type="text"
                value={billFormData.amountDue || 0}
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
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {bill ? 'Save' : 'Add new'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default BillForm;
