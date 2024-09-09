import Grid from '@mui/material/Grid2';
import { Box, CircularProgress, Typography } from '@mui/material';
import BillsReport from '../../components/Bills/BillsReport';
import BillsTable from '../../components/Bills/BillsTable';
import { useEffect } from 'react';
import useAPI from '../../hooks/useAPI';
import Graph from '../../components/Graph';

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
          <Graph />
        </Grid>
      )}
    </Box>
  );
}

export default Dashboard;
