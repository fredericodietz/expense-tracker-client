import Grid from '@mui/material/Grid2';
import StatCard from '../StatCard';
import { BillType } from '../../types';
import { Typography } from '@mui/material';
import { isThisWeek, isTomorrow } from '../../utils/date';

function BillsReport({ bills }: { bills: BillType[] }) {
  const today = new Date();
  const todayNumber = today.getDate();
  const dueToday: BillType[] = bills.filter((b) => b.due_day === todayNumber);
  const dueTomorrow: BillType[] = bills.filter((b) => isTomorrow(b.due_day));
  const dueThisWeek: BillType[] = bills.filter((b) => isThisWeek(b.due_day));

  return (
    <>
      <Grid size={{ xs: 12 }}>
        <Typography component="h2" variant="h6" sx={{ mb: 1 }}>
          Overview
        </Typography>
      </Grid>
      <Grid size={{ xs: 6, md: 4 }}>
        <StatCard title="Today" data={dueToday} />
      </Grid>
      <Grid size={{ sm: 6, md: 4 }}>
        <StatCard title="Tomorrow" data={dueTomorrow} />
      </Grid>
      <Grid size={{ sm: 12, md: 4 }}>
        <StatCard title="This Week" data={dueThisWeek} />
      </Grid>
    </>
  );
}

export default BillsReport;
