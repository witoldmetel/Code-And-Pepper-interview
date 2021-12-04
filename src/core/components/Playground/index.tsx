import { Typography, Button, Container, Card, CardHeader, CardContent, Divider, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

import { INIT_CARD_TITLE } from 'src/constants';
import { usePeople } from 'src/hooks/usePeople';
import { getPageCount } from 'src/utils/getPageCount';

type PlaygroundProps = {
  type: INIT_CARD_TITLE;

  onPlayClick: (isGameActive: boolean) => void;
};

export function Playground({ type, onPlayClick }: PlaygroundProps) {
  const [pageCount, setPageCount] = useState(1);
  const { data, isLoading, isError, refetch } = usePeople(pageCount);

  useEffect(() => {
    if (data) {
      setPageCount(getPageCount(data.count));
    }
  }, [data]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <span>Cannot get card. Please try again</span>;
  }

  return (
    <Container maxWidth="lg" component="main" sx={{ p: 5 }}>
      <Card>
        <CardHeader title={type} />
        <CardContent>
          <Typography component="p" variant="subtitle1" align="center">
            {type}
          </Typography>
        </CardContent>
      </Card>

      <Divider orientation="vertical" />

      <Card>
        <CardHeader title={type} />
        <CardContent>
          <Typography component="p" variant="subtitle1" align="center">
            {type}
          </Typography>
        </CardContent>
      </Card>

      <Button variant="contained" onClick={() => refetch()}>
        Play Again
      </Button>
      <Button variant="contained" onClick={() => onPlayClick(false)}>
        Start New Game
      </Button>
    </Container>
  );
}
