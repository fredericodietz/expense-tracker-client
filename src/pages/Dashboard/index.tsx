import Grid from '@mui/material/Grid2';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import BillsReport from '../../components/Bills/BillsReport';
import BillsTable from '../../components/Bills/BillsTable';
import { useEffect } from 'react';
import useAPI from '../../hooks/useAPI';

function Dashboard() {
  const { listBills, error, isLoading } = useAPI();

  useEffect(() => {
    listBills();
  }, []);

  if (error) {
    return (
      <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4">
            An error happend. Please try again later
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {isLoading ? (
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="h4">Loading...</Typography>
        </Box>
      ) : (
        <Grid container spacing={2} columns={12}>
          <BillsReport />
          <BillsTable />
          <Grid size={{ xs: 12, lg: 4 }} sx={{ mt: 4 }}>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
              Some graph here
            </Typography>
            <Stack
              gap={2}
              direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
              Some graph here
            </Stack>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Dashboard;
