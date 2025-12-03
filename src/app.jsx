import { Button } from "@patternfly/react-core";
import { Stack, StackItem } from "@patternfly/react-core";
import "@patternfly/react-core/src/layouts/Stack/examples/./stack.css";
import React from "react";

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
