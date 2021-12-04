import { Typography, Card, CardHeader, CardContent, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export function GameCard({ name, mass, gender, birth_year, height }: any) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header} title={name} />
      <CardContent className={classes.content}>
        <Typography component="div" variant="h4" gutterBottom align="center">
          <strong>Mass: {mass}</strong>
        </Typography>
        <Typography component="p" variant="subtitle1" align="center">
          Gender: {gender}
        </Typography>
        <Typography component="p" variant="subtitle1" align="center">
          Birth Year: {birth_year}
        </Typography>
        <Typography component="p" variant="subtitle1" align="center">
          Height: {height}
        </Typography>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 10
  },
  header: {
    textAlign: 'center',
    backgroundColor: theme.palette.grey[200]
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: 300,
    height: 300
  }
}));
