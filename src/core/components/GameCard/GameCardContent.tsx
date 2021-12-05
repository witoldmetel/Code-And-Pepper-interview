import { Typography, CardHeader, CardContent, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { INIT_CARD_TITLE } from 'src/constants';
import { GameCardType, Character, Starship } from '../types';

type GameCardContentProps = GameCardType & { type: INIT_CARD_TITLE };

export function GameCardContent(props: GameCardContentProps) {
  const classes = useStyles();

  return props.type === INIT_CARD_TITLE.CHARACTER ? (
    <>
      <CardHeader className={classes.header} title={props.name ?? 'Peasant'} />
      <CardContent className={classes.content}>
        <Typography component="div" variant="h4" gutterBottom align="center">
          <strong>Mass: </strong>
          {(props as Character).mass ?? 1}
        </Typography>
        <Typography component="p" variant="subtitle1" align="center">
          <strong>Gender: </strong>
          {(props as Character).gender ?? 'male'}
        </Typography>
        <Typography component="p" variant="subtitle1" align="center">
          <strong>Birth Year: </strong>
          {(props as Character).birth_year ?? 'unknown'}
        </Typography>
        <Typography component="p" variant="subtitle1" align="center">
          <strong>Height: </strong>
          {(props as Character).height ?? 'unknown'}
        </Typography>
      </CardContent>
    </>
  ) : (
    <>
      <CardHeader className={classes.header} title={props.name ?? 'Solar Satellite'} />
      <CardContent className={classes.content}>
        <Typography component="div" variant="h4" gutterBottom align="center">
          <strong>Crew: {(props as Starship).crew ?? 0}</strong>
        </Typography>
        <Typography component="p" variant="subtitle1" align="center">
          Model: {(props as Starship).model ?? 'satellite'}
        </Typography>
        <Typography component="p" variant="subtitle1" align="center">
          Manufacturer: {(props as Starship).manufacturer ?? 'unknown'}
        </Typography>
        <Typography component="p" variant="subtitle1" align="center">
          length: {(props as Starship).length ?? 'unknown'}
        </Typography>
      </CardContent>
    </>
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
    width: 300,
    height: 300
  }
}));
