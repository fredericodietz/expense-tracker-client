import { useEffect, useState } from 'react';
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
  Typography,
  FormControl,
  InputLabel,
  MenuItem
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import BillForm from '../../Modals/Bill/BillForm';
import DeleteBill from '../../Modals/Bill/DeleteBill';
import MarkAsPaid from '../../Modals/Bill/MarkAsPaid';
import { BillType } from '../../../types';
import BillTableCell from '../BillTableCell';
import { useBillsContext } from '../../../context/BillsContext';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { paymentReport } from '../../../utils/payment';

function BillsTable() {
  const { bills } = useBillsContext();
  const sortedBills = bills.sort((a, b) => {
    if (a.dueDay === b.dueDay) {
      return 0;
    }
    return a.dueDay > b.dueDay ? 1 : -1;
  });
  const [currentBills, setCurrentBills] = useState<BillType[]>(sortedBills);
  const [filterBy, setFilterBy] = useState('');
  const [openBillForm, setOpenBillForm] = useState(false);
  const [openDeleteBill, setOpenDeleteBill] = useState(false);
  const [openMarkAsPaid, setOpenMarkAsPaid] = useState(false);
  const [currentBill, setCurrentBill] = useState<BillType | null>(null);

  useEffect(() => {
    const sortedBills = bills.sort((a, b) => {
      if (a.dueDay === b.dueDay) {
        return 0;
      }
      return a.dueDay > b.dueDay ? 1 : -1;
    });
    setCurrentBills(sortedBills);
  }, [bills]);

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

  const handleFilterChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setFilterBy(value);
    const { paid, unpaid } = paymentReport(sortedBills);
    const now = new Date();
    const currentDayOfWeek = now.getDate();
    const { unpaid: lateUnpaid } = paymentReport(
      sortedBills.filter((b) => +b.dueDay < currentDayOfWeek)
    );

    switch (value) {
      case 'all':
        setCurrentBills(sortedBills);
        break;
      case 'paid':
        setCurrentBills(paid);
        break;
      case 'unpaid':
        setCurrentBills(unpaid);
        break;
      case 'late':
        setCurrentBills(lateUnpaid);
        break;
      default:
        setCurrentBills(sortedBills);
        break;
    }
  };

  return (
    <Grid size={{ md: 12, lg: 8 }} sx={{ mt: 4 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
          This month
        </Typography>
        {bills?.length > 0 && (
          <FormControl size="small" sx={{ width: '200px', mb: 1 }}>
            <InputLabel id="filter-select-label">Filter</InputLabel>
            <Select
              data-testid="filter-select"
              labelId="filter-select-label"
              id="filter"
              name="filter"
              value={filterBy}
              label="Filter"
              onChange={handleFilterChange}>
              <MenuItem value="all">Show all</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="late">Late</MenuItem>
              <MenuItem value="unpaid">Unpaid</MenuItem>
            </Select>
          </FormControl>
        )}
      </Stack>
      {currentBills.length > 0 ? (
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
              {currentBills.map((bill: BillType) => (
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
      ) : bills.length === 0 ? (
        <Typography variant="h6">
          You don't have any bills yet, create the first one
        </Typography>
      ) : (
        <Typography variant="h6">No results found</Typography>
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
