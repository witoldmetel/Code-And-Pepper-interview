import { Typography, Button, Card, CardHeader, CardContent, CardActions, Box, Grid } from '@mui/material';

type InitCardProps = {
  title: string;
  description: string[];
};

export function InitCard({ title, description }: InitCardProps) {
  return (
    <Grid item xs={12} sm={title === 'Ship' ? 12 : 6} md={4}>
      <Card>
        <CardHeader
          title={title}
          titleTypographyProps={{ align: 'center' }}
          subheaderTypographyProps={{
            align: 'center'
          }}
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700]
          }}
        />
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline',
              mb: 2
            }}
          >
            <Typography component="h2" variant="h3" color="text.primary">
              $60
            </Typography>
            <Typography variant="h6" color="text.secondary">
              /mo
            </Typography>
          </Box>
          <ul>
            {description.map((line) => (
              <Typography component="li" variant="subtitle1" align="center" key={line}>
                {line}
              </Typography>
            ))}
          </ul>
        </CardContent>
        <CardActions>
          <Button fullWidth variant="outlined">
            Select
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
