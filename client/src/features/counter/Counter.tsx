import {
  Box,
  Button,
  ButtonGroup,
  List,
  Paper,
  Typography,
} from "@mui/material";
import { useStore } from "../../lib/hooks/useStore";
import { observer } from "mobx-react";

const Counter = observer(function Counter() {
  const { counterStore } = useStore();

  return (
    <Box display="flex" justifyContent="space-between">
      <Box sx={{ width: "60%" }}>
        <Typography variant="h4" gutterBottom>
          {counterStore.title}
        </Typography>
        <Typography variant="h6">La cuenta es: {counterStore.count}</Typography>

        <ButtonGroup sx={{ mt: 3 }}>
          <Button
            onClick={() => counterStore.increment()}
            variant="contained"
            color="primary"
          >
            Sumar 1
          </Button>
          <Button
            onClick={() => counterStore.decrement()}
            variant="contained"
            color="secondary"
          >
            Restar 1
          </Button>
          <Button
            onClick={() => counterStore.increment(5)}
            variant="contained"
            color="info"
          >
            Sumar 5
          </Button>
        </ButtonGroup>
      </Box>
      <Paper sx={{ width: "40%", p: 4 }}>
        <Typography variant="h5">
          Contador de eventos ({counterStore.eventCount})
        </Typography>
        <List>
          {counterStore.events.map((event, index) => (
            <Typography key={index} variant="body1">
              {event}
            </Typography>
          ))}
        </List>
      </Paper>
    </Box>
  );
});

export default Counter;
