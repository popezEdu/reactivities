import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Container, MenuItem } from "@mui/material";
import { Group } from "@mui/icons-material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage:
            "linear-Gradient(135deg, #182a73 0%, #218aae 59%, #20a7ac 89%)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <MenuItem
                component={NavLink}
                to="/"
                sx={{ display: "flex", gap: 2 }}
              >
                {/* Group Representa un icono de grupo */}
                <Group fontSize="large" />
                <Typography variant="h4" fontWeight="bold">
                  Reactivities
                </Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <MenuItemLink to="/activities">Actividades</MenuItemLink>
              <MenuItemLink to="/createActivity">Crear Actividad</MenuItemLink>
            </Box>
            <MenuItem>Menú del Usuario</MenuItem>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
