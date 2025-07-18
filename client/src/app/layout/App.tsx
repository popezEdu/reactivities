import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";

import { Outlet, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";

function App() {
  // Al implementar react-query, no es necesario el useEffect para obtener los datos
  // Por lo que el useEffect será removido junto con el estado de activities

  const location = useLocation();

  return (
    <Box sx={{ bgcolor: "#eeeeee", minHeight: "100vh" }}>
      {/* Este componente elimina el margin CssBaseLine */}
      <CssBaseline />
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container maxWidth="xl" sx={{ marginTop: 1 }}>
            {/* El componente <Outlet /> en React Router es un espacio reservado (placeholder) dentro de un componente padre donde se renderizan las rutas hijas anidadas. */}
            <Outlet />
          </Container>
        </>
      )}
    </Box>
  );
}

export default App;
