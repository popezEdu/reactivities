import { Button, ButtonGroup, Typography } from "@mui/material";
import { useStore } from "../../lib/hooks/useStore";
import { Observer } from "mobx-react";

export default function Counter() {
  const { counterStore } = useStore();

  return (
    <>
      <Observer>
        {() => (
          <>
            <Typography variant="h4" gutterBottom>
              {counterStore.title}
            </Typography>
            <Typography variant="h6">
              La cuenta es: {counterStore.count}
            </Typography>
          </>
        )}
      </Observer>
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
    </>
  );
}
