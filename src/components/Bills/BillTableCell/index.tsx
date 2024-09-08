import { IconButton, TableCell, TableRow, Stack, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PaidIcon from '@mui/icons-material/Paid';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventIcon from '@mui/icons-material/Event';
import { BillType } from '../../../types';

function BillTableCell({
  bill,
  handleMarkAsRead,
  handleEdit,
  handleDelete
}: {
  bill: BillType;
  handleMarkAsRead: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
}) {
  const TODAY = new Date().getDate();

  const handleMarkAsReadClick = () => {
    handleMarkAsRead();
  };

  const handleEditClick = () => {
    handleEdit();
  };

  const handleDeleteClick = () => {
    handleDelete();
  };

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      data-testid="bill-tablecell">
      <TableCell>{bill.name}</TableCell>
      <TableCell align="center">{bill.due_day}</TableCell>
      <TableCell align="center">
        {bill.amount_due ? `$ ${bill.amount_due.toFixed(2)}` : '-'}
      </TableCell>
      <TableCell align="center">{bill.category}</TableCell>
      <TableCell align="center">
        {bill.is_paid ? (
          <Tooltip title="Paid" data-testid="status-paid">
            <EventAvailableIcon color="success" />
          </Tooltip>
        ) : bill.due_day > TODAY ? (
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
          <Tooltip title="Mark as paid">
            <IconButton
              disabled={bill.is_paid}
              aria-label="mark as paid"
              color="success"
              onClick={handleMarkAsReadClick}>
              <PaidIcon />
            </IconButton>
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
