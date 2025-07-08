import { Box, Container, CssBaseline, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useQuery } from "@tanstack/react-query";

function App() {
  // const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    IActivity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  // useEffect(() => {
  //   // fetch("https://localhost:5001/api/activities")
  //   // .then(response => response.json())
  //   // .then(data => setActivities(data));
  //   axios
  //     .get<IActivity[]>("https://localhost:5001/api/activities")
  //     .then((response) => {
  //       setActivities(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching activities:", error);
  //     });

  //   return () => {};
  // }, []);

  // Al implementar react-query, no es necesario el useEffect para obtener los datos
  // Por lo que el useEffect será removido junto con el estado de activities
  const { data: activities, isPending } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await axios.get<IActivity[]>(
        "https://localhost:5001/api/activities"
      );
      return response.data;
    },
    // Si se desea que se actualice cada cierto tiempo
    // refetchInterval: 10000, // 10 segundos
  });

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find((activity) => activity.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleOpenForm = (id?: string) => {
    if (id) {
      handleSelectActivity(id);
    } else {
      handleCancelSelectActivity();
    }
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleSubmitForm = (activity: IActivity) => {
    // if (activity.id) {
    //   setActivities([
    //     ...activities.filter((a) => a.id !== activity.id),
    //     activity,
    //   ]);
    // } else {
    //   activity.id = crypto.randomUUID();
    //   setActivities([...activities, activity]);
    // }
    // setSelectedActivity(activity);
    console.log(activity);
    setEditMode(false);
  };

  const handleDelete = (id: string) => {
    // setActivities(activities.filter((activity) => activity.id !== id));
    console.log(id);
    setSelectedActivity(undefined);
  };

  return (
    <Box sx={{ bgcolor: "#eeeeee", minHeight: "100vh" }}>
      {/* Este componente elimina el margin CssBaseLine */}
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ marginTop: 1 }}>
        {!activities && isPending ? (
          <Typography>Loading...</Typography>
        ) : (
          <ActivityDashboard
            activities={activities}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleFormClose}
            submitForm={handleSubmitForm}
            deleteActivity={handleDelete}
          />
        )}
      </Container>
    </Box>
  );
}

export default App;
