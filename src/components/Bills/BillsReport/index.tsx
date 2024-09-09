import Grid from '@mui/material/Grid2';
import StatCard from '../../StatCard';
import { Typography } from '@mui/material';
import { useBillsContext } from '../../../context/BillsContext';

function BillsReport() {
  const { stats } = useBillsContext();
  const { late, today, tomorrow, week } = stats;

  return (
    <>
      <Grid size={{ xs: 12 }}>
        <Typography component="h2" variant="h6" sx={{ mb: 1 }}>
          Overview
        </Typography>
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <StatCard title="Late" late data={late} />
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <StatCard title="Today" data={today} />
      </Grid>
      <Grid size={{ sm: 6, md: 3 }}>
        <StatCard title="Tomorrow" data={tomorrow} />
      </Grid>
      <Grid size={{ sm: 12, md: 3 }}>
        <StatCard title="This Week" data={week} />
      </Grid>
    </>
  );
}

export default BillsReport;
