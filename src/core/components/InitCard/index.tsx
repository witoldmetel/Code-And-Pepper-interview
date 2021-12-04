import { Typography, Button, Card, CardHeader, CardContent, CardActions, Box, Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { INIT_CARD_TITLE } from '../../../constants';

export type InitCardProps = {
  title: INIT_CARD_TITLE;
  selectedCard: INIT_CARD_TITLE;
  description: string[];

  onClick: (cardTitle: INIT_CARD_TITLE) => void;
};

export function InitCard({ title, description, selectedCard, onClick }: InitCardProps) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={title === INIT_CARD_TITLE.SHIP ? 12 : 6} md={4}>
      <Card>
        <CardHeader className={classes.header} title={title} titleTypographyProps={{ align: 'center' }} />
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
              <Typography key={line} component="li" variant="subtitle1" align="center">
                {line}
              </Typography>
            ))}
          </ul>
        </CardContent>
        <CardActions>
          <Button fullWidth variant={selectedCard === title ? 'contained' : 'outlined'} onClick={() => onClick(title)}>
            Select
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    backgroundColor: theme.palette.grey[200]
  }
}));
