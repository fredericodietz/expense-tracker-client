import Grid from '@mui/material/Grid2';
import { Box, Stack, Typography } from '@mui/material';
import BillsReport from '../../components/Bills/BillsReport';
import BillsTable from '../../components/Bills/BillsTable';
import seedData from '../../utils/seedData';

function Dashboard() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid container spacing={2} columns={12}>
        <BillsReport bills={seedData} />
        <BillsTable bills={seedData} />
        <Grid size={{ xs: 12, lg: 4 }} sx={{ mt: 4 }}>
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Some graph here
          </Typography>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            Some graph here
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
