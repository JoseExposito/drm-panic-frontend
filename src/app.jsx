import React, { useMemo } from "react";
import { Stack, StackItem } from "@patternfly/react-core";
import ErrorView from "./error-view.jsx";
import InfoView from "./info-view.jsx";
import parseUrl from "./url-parser.js";

const App = () => {
  const params = useMemo(() => parseUrl(), []);

  return (
    <Stack>
      <StackItem>
        <h1>Hello world</h1>
      </StackItem>
      <StackItem isFilled>
        {params ? (
          <InfoView
            architecture={params.architecture}
            version={params.version}
            trace={params.trace}
          />
        ) : (
          <ErrorView />
        )}
      </StackItem>
      <StackItem>Footer</StackItem>
    </Stack>
  );
};

export default App;
