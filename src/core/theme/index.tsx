import { ReactNode } from 'react';

import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

type ThemeConfigProps = {
  children: ReactNode;
};

export function ThemeConfig({ children }: ThemeConfigProps) {
  const theme = createTheme();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
