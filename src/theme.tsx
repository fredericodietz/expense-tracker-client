import { createTheme } from '@mui/material';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { alpha } from '@mui/material/styles';

const gray = {
  50: 'hsl(220, 35%, 97%)',
  100: 'hsl(220, 30%, 94%)',
  200: 'hsl(220, 20%, 88%)',
  300: 'hsl(220, 20%, 80%)',
  400: 'hsl(220, 20%, 65%)',
  500: 'hsl(220, 20%, 42%)',
  600: 'hsl(220, 20%, 35%)',
  700: 'hsl(220, 20%, 25%)',
  800: 'hsl(220, 30%, 6%)',
  900: 'hsl(220, 35%, 3%)'
};

const theme = createTheme({
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: 'none',
          borderRadius: '4px',
          textTransform: 'none',
          letterSpacing: 0,
          border: '1px solid ',
          borderColor: gray[200],
          backgroundColor: alpha(gray[50], 0.3),
          '&:hover': {
            backgroundColor: gray[100],
            borderColor: gray[300]
          },
          '&:active': {
            backgroundColor: gray[200]
          },
          ...theme.applyStyles('dark', {
            backgroundColor: gray[800],
            borderColor: gray[700],
            '&:hover': {
              backgroundColor: gray[900],
              borderColor: gray[600]
            },
            '&:active': {
              backgroundColor: gray[900]
            }
          }),
          variants: [
            {
              props: {
                size: 'small'
              },
              style: {
                width: '2.25rem',
                height: '2.25rem',
                padding: '0.25rem',
                [`& .${svgIconClasses.root}`]: { fontSize: '1rem' }
              }
            },
            {
              props: {
                size: 'medium'
              },
              style: {
                width: '2.5rem',
                height: '2.5rem'
              }
            }
          ]
        })
      }
    }
  }
});

export default theme;
