import {
  IconButton,
  TableCell,
  TableRow,
  Stack,
  Tooltip,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PaidIcon from '@mui/icons-material/Paid';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventIcon from '@mui/icons-material/Event';
import { BillType } from '../../../types';
import { isPaid } from '../../../utils/payment';

function BillTableCell({
  bill,
  handleMarkAsPaid,
  handleEdit,
  handleDelete
}: {
  bill: BillType;
  handleMarkAsPaid: (bill: BillType) => void;
  handleEdit: (bill: BillType) => void;
  handleDelete: (bill: BillType) => void;
}) {
  const TODAY = new Date().getDate();
  // TODO: use a calendar picker to get month and change this view dynamically
  const billPaidThisMonth = isPaid(bill.Payments);

  const handleMarkAsPaidClick = () => {
    handleMarkAsPaid(bill);
  };

  const handleEditClick = () => {
    handleEdit(bill);
  };

  const handleDeleteClick = () => {
    handleDelete(bill);
  };

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      data-testid="bill-tablecell">
      <TableCell data-testid="bill-name">{bill.name}</TableCell>
      <TableCell align="center">{bill.dueDay}</TableCell>
      <TableCell align="center">
        {bill.amountDue ? `$ ${bill.amountDue}` : '-'}
      </TableCell>
      <TableCell align="center">{bill.category}</TableCell>
      <TableCell align="center">
        {billPaidThisMonth ? (
          <Tooltip title="Paid" data-testid="status-paid">
            <EventAvailableIcon color="success" />
          </Tooltip>
        ) : bill.dueDay > TODAY ? (
          <Tooltip title="Not paid yet" data-testid="status-unpaid">
            <EventIcon color="warning" />
          </Tooltip>
        ) : (
          <Tooltip title="Late" data-testid="status-late">
            <EventBusyIcon color="error" />
          </Tooltip>
        )}
      </TableCell>
      <TableCell align="right">
        <Stack direction="row" justifyContent="end" gap={1}>
          <Tooltip title={billPaidThisMonth ? 'Paid' : 'Mark as paid'}>
            {billPaidThisMonth ? (
              <Box
                sx={{
                  width: '2.5rem',
                  height: '2.5rem',
                  opacity: '0.5',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <PaidIcon />
              </Box>
            ) : (
              <IconButton
                data-testid="mark-as-paid-button"
                aria-label="mark as paid"
                color="success"
                onClick={handleMarkAsPaidClick}>
                <PaidIcon />
              </IconButton>
            )}
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton aria-label="edit" onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              color="error"
              onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

export default BillTableCell;
