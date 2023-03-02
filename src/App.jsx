import { createTheme, ThemeProvider } from '@mui/material';
import { HomePage } from './pages/HomePage';

export const themeOptions = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#452c63'
    },
    secondary: {
      main: '#0b7722'
    }
  },
  shape: {
    borderRadius: 10
  }
});

const App = () => {
  // return <Form />;
  return (
    <ThemeProvider theme={themeOptions}>
      <HomePage />
    </ThemeProvider>
  );
};

export default App;
