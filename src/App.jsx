import { Route, Routes, Link } from "react-router-dom"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import Basket from "./pages/Basket"
import { AppBar, Toolbar, Button, Container } from "@mui/material"

function App() {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "purple" }}>
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/basket" element={<Basket />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
