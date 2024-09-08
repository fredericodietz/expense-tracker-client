import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Button,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import BillForm from '../../Modals/Bill/BillForm';
import DeleteBill from '../../Modals/Bill/DeleteBill';
import MarkAsPaid from '../../Modals/Bill/MarkAsPaid';
import { BillType } from '../../../types';
import BillTableCell from '../BillTableCell';

function BillsTable({ bills }: { bills: BillType[] }) {
  const [openBillForm, setOpenBillForm] = useState(false);
  const [openDeleteBill, setOpenDeleteBill] = useState(false);
  const [openMarkAsPaid, setOpenMarkAsPaid] = useState(false);

  const handleClickOpenBillForm = () => {
    setOpenBillForm(true);
  };

  const handleCloseBillForm = () => {
    setOpenBillForm(false);
  };

  const handleClickOpenDeleteBill = () => {
    setOpenDeleteBill(true);
  };

  const handleCloseDeleteBill = () => {
    setOpenDeleteBill(false);
  };

  const handleClickOpenMarkAsPaid = () => {
    setOpenMarkAsPaid(true);
  };

  const handleCloseMarkAsPaid = () => {
    setOpenMarkAsPaid(false);
  };

  return (
    <Grid size={{ md: 12, lg: 8 }} sx={{ mt: 4 }}>
      <Stack direction="row">
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          All monthly bills
        </Typography>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Bill</TableCell>
              <TableCell align="center">Due Day</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.map((bill: BillType) => (
              <BillTableCell
                bill={bill}
                key={bill.id}
                handleMarkAsRead={handleClickOpenMarkAsPaid}
                handleEdit={handleClickOpenBillForm}
                handleDelete={handleClickOpenDeleteBill}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleClickOpenBillForm}>
        Add new
      </Button>
      <BillForm open={openBillForm} handleClose={handleCloseBillForm} />
      <DeleteBill open={openDeleteBill} handleClose={handleCloseDeleteBill} />
      <MarkAsPaid open={openMarkAsPaid} handleClose={handleCloseMarkAsPaid} />
    </Grid>
  );
}

export default BillsTable;
