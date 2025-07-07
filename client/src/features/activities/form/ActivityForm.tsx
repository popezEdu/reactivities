import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";

export default function ActivityForm() {
  return (
    <Paper sx={{ borderadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Crear Actividad
      </Typography>
      <Box component="form" display="flex" flexDirection="column" gap={3}>
        <TextField label="Title" />
        <TextField label="Description" multiline rows={3} />
        <TextField label="Category" />
        <TextField label="Date" type="date" />
        <TextField label="City" />
        <TextField label="Venue" />
        <Box display="flex" justifyContent="end">
          <Button color="inherit">Cancel</Button>
          <Button color="success" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
