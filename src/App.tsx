import { Box, Stack } from '@mui/material';
import Dashboard from './pages/Dashboard';
import Header from './components/Layout/Header';

function App() {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: 'auto'
        }}>
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
            mx: 3,
            pb: 10,
            mt: { xs: 8, md: 0 }
          }}>
          <Header />
          <Dashboard />
        </Stack>
      </Box>
    </>
  );
}

export default App;
