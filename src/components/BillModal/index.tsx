import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

function BillModal({
  open,
  handleClose
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [category, setCategory] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add new bill</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ sm: 12, md: 10 }}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="Bill"
              label="Bill"
              type="text"
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
                value={category}
                label="Category"
                onChange={handleChange}>
                <MenuItem value="Utilities">Utilities</MenuItem>
                <MenuItem value="Kids">Kids</MenuItem>
                <MenuItem value="Insurance">Insurance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ sm: 12, md: 6 }}>
            <TextField
              margin="dense"
              id="amount"
              name="amount"
              label="Fixed amount"
              type="text"
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
    </Dialog>
  );
}

export default BillModal;
