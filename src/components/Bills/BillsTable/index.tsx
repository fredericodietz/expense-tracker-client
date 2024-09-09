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
import { useBillsContext } from '../../../context/BillsContext';

function BillsTable() {
  const { bills } = useBillsContext();
  const [openBillForm, setOpenBillForm] = useState(false);
  const [openDeleteBill, setOpenDeleteBill] = useState(false);
  const [openMarkAsPaid, setOpenMarkAsPaid] = useState(false);
  const [currentBill, setCurrentBill] = useState<BillType | null>(null);

  const sortedBills = bills.sort((a, b) => {
    return a.dueDay > b.dueDay ? 1 : -1;
  });

  const handleAddNewBill = () => {
    setCurrentBill(null);
    handleClickOpenBillForm();
  };

  const handleClickOpenBillForm = (bill?: BillType) => {
    if (bill) {
      setCurrentBill(bill);
    }
    setOpenBillForm(true);
  };

  const handleCloseBillForm = () => {
    setOpenBillForm(false);
    // :)
    setTimeout(() => {
      setCurrentBill(null);
    }, 0);
  };

  const handleClickOpenDeleteBill = (bill: BillType) => {
    setCurrentBill(bill);
    setOpenDeleteBill(true);
  };

  const handleCloseDeleteBill = () => {
    setOpenDeleteBill(false);
    setCurrentBill(null);
  };

  const handleClickOpenMarkAsPaid = (bill: BillType) => {
    setOpenMarkAsPaid(true);
    setCurrentBill(bill);
  };

  const handleCloseMarkAsPaid = () => {
    setOpenMarkAsPaid(false);
    setCurrentBill(null);
  };

  return (
    <Grid size={{ md: 12, lg: 8 }} sx={{ mt: 4 }}>
      <Stack direction="row">
        <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
          This month
        </Typography>
      </Stack>
      {sortedBills.length > 0 ? (
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
              {sortedBills.map((bill: BillType) => (
                <BillTableCell
                  bill={bill}
                  key={bill.id}
                  handleMarkAsPaid={handleClickOpenMarkAsPaid}
                  handleEdit={handleClickOpenBillForm}
                  handleDelete={handleClickOpenDeleteBill}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6">
          You don't have any bills yet, create the first one
        </Typography>
      )}
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleAddNewBill}
        data-testid="add-new-button">
        Add new
      </Button>
      <BillForm
        open={openBillForm}
        handleClose={handleCloseBillForm}
        bill={currentBill || null}
      />
      {currentBill && (
        <DeleteBill
          open={openDeleteBill}
          handleClose={handleCloseDeleteBill}
          bill={currentBill}
        />
      )}
      {currentBill && (
        <MarkAsPaid
          open={openMarkAsPaid}
          handleClose={handleCloseMarkAsPaid}
          bill={currentBill}
        />
      )}
    </Grid>
  );
}

export default BillsTable;
