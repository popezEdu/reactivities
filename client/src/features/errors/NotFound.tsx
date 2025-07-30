import { SearchOff } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <Paper
      sx={{
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 6,
      }}
    >
      <SearchOff sx={{ fontSize: 100 }} color="primary" />
      <Typography gutterBottom variant="h3">
        No puedo encontrar lo que estas buscando.
      </Typography>
      <Button fullWidth component={Link} to="/activities">
        Retornar a Actividades
      </Button>
    </Paper>
  );
}
