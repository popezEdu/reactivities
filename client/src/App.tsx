
import { Typography } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const titulo = "Bienvenido a Reactivities";

  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    // fetch("https://localhost:5001/api/activities")
    // .then(response => response.json())
    // .then(data => setActivities(data));
    axios.get<IActivity[]>("https://localhost:5001/api/activities")
      .then(response => {
        setActivities(response.data);
      })
      .catch(error => {
        console.error("Error fetching activities:", error);
      });

    return () => {};
  }, []);

  return (
    <>
    <Typography variant="h3">{titulo}</Typography>
    <List>
      {activities.map(activity => (
        <ListItem key={activity.id}>
          <ListItemText>{activity.title}</ListItemText>
        </ListItem>
      ))}
    </List>
    </>
  )
}

export default App
