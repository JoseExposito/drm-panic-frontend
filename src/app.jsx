import React from "react";
import { Button, Stack, StackItem } from "@patternfly/react-core";

const App = () => {
  return (
    <Stack>
      <StackItem>
        <h1>Hello world</h1>
      </StackItem>
      <StackItem isFilled>
        <Button variant="primary">Button</Button>
      </StackItem>
      <StackItem>Footer</StackItem>
    </Stack>
  );
};

export default App;
