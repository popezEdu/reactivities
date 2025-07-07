import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    IActivity | undefined
  >(undefined);

  useEffect(() => {
    // fetch("https://localhost:5001/api/activities")
    // .then(response => response.json())
    // .then(data => setActivities(data));
    axios
      .get<IActivity[]>("https://localhost:5001/api/activities")
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
      });

    return () => {};
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((activity) => activity.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  return (
    <Box sx={{ bgcolor: "#eeeeee" }}>
      {/* Este componente elimina el margin CssBaseLine */}
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{ marginTop: 1 }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivity={selectedActivity}
        />
      </Container>
    </Box>
  );
}

export default App;
