import Grid from '@mui/material/Grid2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Box, Typography } from '@mui/material';
import { useBillsContext } from '../../context/BillsContext';
import { BillType } from '../../types';
import getTotalAmount from '../../utils/getTotalAmount';
ChartJS.register(ArcElement, Tooltip);

function removeDuplicates(arr: BillType[]): BillType[] {
  const uniqueIds: number[] = [];
  const unique = arr.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.id);

    if (!isDuplicate) {
      uniqueIds.push(element.id);
      return true;
    }

    return false;
  });
  return unique;
}

function Graph() {
  const { stats } = useBillsContext();
  const { late, today, tomorrow, week } = stats;
  const paid = getTotalAmount(
    removeDuplicates([...today.paid, ...tomorrow.paid, ...week.paid])
  );
  const unpaid = getTotalAmount(
    removeDuplicates([...today.unpaid, ...tomorrow.unpaid, ...week.unpaid])
  );

  const lateBills = getTotalAmount(late.unpaid);

  const data = {
    labels: ['Paid', 'To be paid this week', 'Late'],
    datasets: [
      {
        label: 'Total',
        data: [paid, unpaid, lateBills],
        backgroundColor: ['green', 'orange', 'red'],
        hoverOffset: 4
      }
    ]
  };

  return (
    <Grid size={{ xs: 6, lg: 4 }} sx={{ mt: 4 }}>
      <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
        Weekly status
      </Typography>
      <Box p={4} mt={4}>
        <Pie data={data} />
      </Box>
    </Grid>
  );
}

export default Graph;
