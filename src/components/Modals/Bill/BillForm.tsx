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
import { BillData, BillType } from '../../../types';
import { Categories } from '../../../types/common';
import { NumericFormat, NumberFormatValues } from 'react-number-format';
import { useBillsContext } from '../../../context/BillsContext';

function BillForm({
  open,
  handleClose,
  bill
}: {
  open: boolean;
  handleClose: () => void;
  bill?: BillType | null;
}) {
  const { addBill, updateBill } = useBillsContext();

  const billTemplate: BillData = {
    category: Categories.Utilities,
    name: '',
    amount_due: 0,
    due_day: 1,
    is_paid: false
  };

  const [billFormData, setFormBillData] = useState<BillType | BillData>(
    billTemplate
  );

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
      updateBill(billFormData as BillType);
      return;
    }
    addBill(billFormData as BillData);
    handleClose();
  };

  const handleAmountChange = (values: NumberFormatValues) => {
    const value = values.floatValue;
    setFormBillData({
      ...billFormData,
      amount_due: value
    });
  };

  useEffect(() => {
    setFormBillData(bill || billTemplate);
  }, [bill]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{bill ? `Edit ${bill.name}` : 'Add new'} bill</DialogTitle>
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
                id="due_day"
                name="due_day"
                label="Due Day"
                type="number"
                onChange={handleInputChange}
                value={billFormData.due_day}
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
                value={billFormData.amount_due || 0}
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
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default BillForm;
