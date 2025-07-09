import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";

import { Outlet } from "react-router";

function App() {
  // Al implementar react-query, no es necesario el useEffect para obtener los datos
  // Por lo que el useEffect será removido junto con el estado de activities

  return (
    <Box sx={{ bgcolor: "#eeeeee", minHeight: "100vh" }}>
      {/* Este componente elimina el margin CssBaseLine */}
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{ marginTop: 1 }}>
        {/* El componente <Outlet /> en React Router es un espacio reservado (placeholder) dentro de un componente padre donde se renderizan las rutas hijas anidadas. */}
        <Outlet />
      </Container>
    </Box>
  );
}

export default App;
