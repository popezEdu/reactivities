import { Group } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <Paper
      sx={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        justityContent: "center",
        height: "100vh",
        backgroundImage:
          "linear-Gradient(135deg, #182a73 0%, #218aae 59%, #20a7ac 89%)",
      }}
    >
      <Box
        sx={{
          display: "center",
          alignContent: "center",
          alignItems: "center",
          color: "white",
          gap: 3,
        }}
      >
        <Group sx={{ width: 110, height: 110 }} />
        <Typography variant="h2" fontWeight="bold">
          Página de Estudio
        </Typography>
      </Box>
      <Typography variant="h2">Bienvenido a un sitio de aprendizaje</Typography>
      <Button
        variant="contained"
        component={Link}
        to="/activities"
        size="large"
        sx={{ borderRadius: 4, height: 80, fontSize: "1.5rem" }}
      >
        Ingresemos
      </Button>
    </Paper>
  );
}
