import React from "react";
import { Stack, StackItem, Title } from "@patternfly/react-core";
import { css } from "@patternfly/react-styles";
import alignment from "@patternfly/react-styles/css/utilities/Alignment/alignment";
import flex from "@patternfly/react-styles/css/utilities/Flex/flex";
import Tux from "../../components/tux.jsx";

const ErrorPage = () => {
  return (
    <Stack
      hasGutter
      className={css(flex.alignItemsCenter, flex.justifyContentCenter)}
    >
      <StackItem>
        <Tux isError />
      </StackItem>

      <StackItem className={css(alignment.textAlignCenter)}>
        <Title headingLevel="h1">Did you scan a QR code?</Title>
      </StackItem>

      <StackItem className={css(alignment.textAlignCenter)}>
        <p>
          Sorry, we could not find the details of your error, did you arrived to
          this page after scanning a QR code?
        </p>
        <p>Please scan the QR code again.</p>
      </StackItem>
    </Stack>
  );
};

export default ErrorPage;
