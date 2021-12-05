import { Typography, Button, Card, CardHeader, CardContent, CardActions, Box, Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { INIT_CARD_TITLE } from '../../../constants';

export type InitCardProps = {
  title: INIT_CARD_TITLE;
  icon: string;
  selectedCard: INIT_CARD_TITLE;
  description: string;

  onClick: (cardTitle: INIT_CARD_TITLE) => void;
};

export function InitCard({ title, icon, description, selectedCard, onClick }: InitCardProps) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={title === INIT_CARD_TITLE.STARSHIP ? 12 : 6} md={4}>
      <Card>
        <CardHeader className={classes.header} title={title} />
        <CardContent className={classes.content}>
          <Box className={classes.icon} component="img" src={`/static/${icon}.svg`} />
          <Typography component="p" variant="subtitle1" align="center">
            {description}
          </Typography>
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
    textAlign: 'center',
    backgroundColor: theme.palette.grey[200]
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: 160
  },
  icon: {
    width: '100%',
    height: 60,
    marginBottom: 15
  }
}));
