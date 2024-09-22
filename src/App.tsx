import Container from '@mui/material/Container/Container'
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Widget from './components/Widget'

const App = () => {
  const theme = createTheme({
    palette: {
      background: {
        default: 'rgb(0, 17, 35)',
      },
    },
  });

  return (<ThemeProvider theme={theme}>
    <CssBaseline />

    <Container fixed>
      <Grid container spacing={1} sx={{ flexGrow: 1 }}>
        <Grid size={{ xs: 12, md: 8 }} offset={{ xs: 0, md: 2 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
          <div style={{width: '100%'}}>
            <Widget />
          </div>
        </Grid>
      </Grid>
    </Container>
  </ThemeProvider>)
}

export default App;
