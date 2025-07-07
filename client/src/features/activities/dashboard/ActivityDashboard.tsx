import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

type Props = {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  selectedActivity: IActivity | undefined;
};

export default function ActivityDashboard({
  activities,
  selectActivity,
  cancelSelectActivity,
  selectedActivity,
}: Props) {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={7}>
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </Grid2>
      <Grid2 size={5}>
        {selectedActivity && (
          <ActivityDetail
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
          />
        )}
        <ActivityForm />
      </Grid2>
    </Grid2>
  );
}
