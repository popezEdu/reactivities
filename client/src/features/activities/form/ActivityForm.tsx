import { Box, Button, Paper, TextField, Typography } from "@mui/material";

import { useActivities } from "../../../lib/hooks/useActivities";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  activitySchema,
  type ActivitySchema,
} from "../../../lib/schemas/activityschema";

import { zodResolver } from "@hookform/resolvers/zod";

export default function ActivityForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivitySchema>({
    mode: "onTouched",
    resolver: zodResolver(activitySchema),
  });
  const { id } = useParams<{ id: string }>();
  const { updateActivity, createActivity, activity, isLoadingActivity } =
    useActivities(id);

  // Replace with actual activity data if available

  useEffect(() => {
    if (activity) reset(activity);
  }, [activity, reset]);

  const onSubmit = async (data: ActivitySchema) => {
    console.log(data);
  };

  if (isLoadingActivity) return <Typography>Loading...</Typography>;

  return (
    <Paper sx={{ borderadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity ? "Editar Activity" : "Crear Activity"}
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={3}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          {...register("title")}
          name="title"
          label="Title"
          defaultValue={activity?.title}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          {...register("description")}
          name="description"
          label="Description"
          multiline
          rows={3}
          defaultValue={activity?.description}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <TextField
          {...register("category")}
          name="category"
          label="Category"
          defaultValue={activity?.category}
          error={!!errors.category}
          helperText={errors.category?.message}
        />
        <TextField
          {...register("date")}
          name="date"
          label="Date"
          type="date"
          defaultValue={
            activity?.date
              ? new Date(activity.date).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0]
          }
        />
        <TextField
          {...register("city")}
          name="city"
          label="City"
          defaultValue={activity?.city}
          error={!!errors.city}
          helperText={errors.city?.message}
        />
        <TextField
          {...register("venue")}
          name="venue"
          label="Venue"
          defaultValue={activity?.venue}
          error={!!errors.venue}
          helperText={errors.venue?.message}
        />
        <Box display="flex" justifyContent="end">
          <Button color="inherit">Cancel</Button>
          <Button
            color="success"
            variant="contained"
            type="submit"
            disabled={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
