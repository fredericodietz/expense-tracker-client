import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { Stats } from '../../types';
import getTotalAmount from '../../utils/getTotalAmount';

function StatCard({
  title,
  data,
  late = false
}: {
  title: string;
  data: Stats;
  late?: boolean;
}) {
  const { paid, unpaid } = data;

  return (
    <>
      <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
        <CardContent>
          <Typography component="h2" variant="h5" gutterBottom>
            {title}
          </Typography>
          <Stack
            direction="column"
            sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 1 }}>
            <Stack sx={{ justifyContent: 'space-between' }}>
              <Stack
                direction="row"
                sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography
                  variant="h6"
                  component="p"
                  data-testid={`${title.toLowerCase().replace(' ', '-')}-unpaid-bills`}>
                  {unpaid.length} Unpaid
                </Typography>
                <Chip
                  size="small"
                  color="error"
                  data-testid={`${title.toLowerCase().replace(' ', '-')}-amount-unpaid`}
                  label={`$ ${getTotalAmount(unpaid).toFixed(2)}`}
                />
              </Stack>
              {!late && (
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                  <Typography
                    variant="h6"
                    component="p"
                    data-testid={`${title.toLowerCase().replace(' ', '-')}-paid-bills`}>
                    {paid.length} Paid
                  </Typography>
                  <Chip
                    size="small"
                    color="success"
                    data-testid={`${title.toLowerCase().replace(' ', '-')}-amount-paid`}
                    label={`$ ${getTotalAmount(paid).toFixed(2)}`}
                  />
                </Stack>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export default StatCard;
