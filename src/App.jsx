import { Link } from 'react-router-dom';
import Router from './Router';
import { AppBar, Toolbar, Button, Container } from '@mui/material';

function App() {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'purple' }}>
        <Toolbar>
          <Button component={Link} to="/" color="inherit">
            Ana səhifə
          </Button>
          <Button component={Link} to="/favorites" color="inherit">
            Favorilər
          </Button>
          <Button component={Link} to="/basket" color="inherit">
            Səbət
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Router />
      </Container>
    </>
  );
}

export default App;
