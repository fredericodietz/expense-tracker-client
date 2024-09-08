import { Stack, Breadcrumbs, Typography, IconButton } from '@mui/material';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Badge, { badgeClasses } from '@mui/material/Badge';

function Header() {
  return (
    <Stack
      direction="row"
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5
      }}
      spacing={2}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextRoundedIcon fontSize="small" />}>
        <Typography variant="body1">Dashboard</Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.primary', fontWeight: 600 }}>
          Home
        </Typography>
      </Breadcrumbs>
      <Stack direction="row" sx={{ gap: 1 }}>
        <Typography variant="h6">Hello, Frederico</Typography>
        <Badge
          color="error"
          variant="dot"
          invisible={false}
          sx={{ [`& .${badgeClasses.badge}`]: { right: 2, top: 2 } }}>
          <IconButton size="small" aria-label="Open notifications">
            <NotificationsRoundedIcon />
          </IconButton>
        </Badge>
      </Stack>
    </Stack>
  );
}

export default Header;
