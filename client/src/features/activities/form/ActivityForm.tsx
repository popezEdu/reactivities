import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";

type props = {
  activity?: IActivity;
  closeForm?: () => void;
  submitForm?: (activity: IActivity) => void;
};

export default function ActivityForm({
  activity,
  closeForm,
  submitForm,
}: props) {
  // let date = new Date(activity?.date || "");
  // const format = "yyyy-MM-dd";
  // const locale = "en-US";
  // const

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data: { [Key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (activity) data.id = activity.id;

    submitForm(data as unknown as IActivity);
  };

  return (
    <Paper sx={{ borderadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Crear Actividad
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={3}
        onSubmit={handleSubmit}
      >
        <TextField name="title" label="Title" defaultValue={activity?.title} />
        <TextField
          name="description"
          label="Description"
          multiline
          rows={3}
          defaultValue={activity?.description}
        />
        <TextField
          name="category"
          label="Category"
          defaultValue={activity?.category}
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          defaultValue={activity?.date}
        />
        <TextField name="city" label="City" defaultValue={activity?.city} />
        <TextField name="venue" label="Venue" defaultValue={activity?.venue} />
        <Box display="flex" justifyContent="end">
          <Button color="inherit" onClick={closeForm}>
            Cancel
          </Button>
          <Button color="success" variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
