import React from "react";
import { Button, Stack, StackItem, Title } from "@patternfly/react-core";
import { css } from "@patternfly/react-styles";
import alignment from "@patternfly/react-styles/css/utilities/Alignment/alignment";
import flex from "@patternfly/react-styles/css/utilities/Flex/flex";
import PropTypes from "prop-types";
import Tux from "./tux.jsx";

const InfoPage = ({ architecture, version, trace }) => {
  return (
    <Stack hasGutter className={css(flex.alignItemsCenter)}>
      <StackItem>
        <Tux />
      </StackItem>

      <StackItem className={css(alignment.textAlignCenter)}>
        <Title headingLevel="h1">
          Your system encountered a critical issue
        </Title>
      </StackItem>

      <StackItem className={css(alignment.textAlignCenter)}>
        <p>
          We are sorry, it looks like your system has encountered a critical
          issue that prevented it from continuing normal operation.
        </p>
        <p>Please consider reporting it to get support.</p>
      </StackItem>

      <StackItem>
        <Button variant="primary">Report Issue</Button>
      </StackItem>

      <p>{architecture}</p>
      <p>{version}</p>
      <pre>{trace}</pre>
    </Stack>
  );
};

InfoPage.propTypes = {
  architecture: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  trace: PropTypes.string.isRequired,
};

export default InfoPage;
