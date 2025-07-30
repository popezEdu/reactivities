import { Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router";

export default function ServerError() {
  const { state } = useLocation();

  return (
    <Paper>
      {state.error ? (
        <>
          <Typography
            gutterBottom
            variant="h3"
            sx={{ px: 4, pt: 2 }}
            color="secondary"
          >
            {state.error.message || "Existia un error."}
          </Typography>
          <Divider />
          <Typography variant="body1" padding={4}>
            {state.error.details || "Internal Server Error"}
          </Typography>
        </>
      ) : (
        <Typography variant="h5">Error del Servidor</Typography>
      )}
    </Paper>
  );
}
