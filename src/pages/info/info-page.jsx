import React, { useState } from "react";
import { Button, Stack, StackItem, Title } from "@patternfly/react-core";
import { ExternalLinkSquareAltIcon } from "@patternfly/react-icons/dist/esm/icons/external-link-square-alt-icon";
import { css } from "@patternfly/react-styles";
import alignment from "@patternfly/react-styles/css/utilities/Alignment/alignment";
import flex from "@patternfly/react-styles/css/utilities/Flex/flex";
import PropTypes from "prop-types";
import DetailsModal from "./details-modal.jsx";
import Tux from "./tux.jsx";

const InfoPage = ({ architecture, version, trace }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalToggle = () => {
    setIsOpen((prevIsModalOpen) => !prevIsModalOpen);
  };

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
        <DetailsModal
          isOpen={isOpen}
          onClose={handleModalToggle}
          architecture={architecture}
          version={version}
          trace={trace}
        />
        <Button
          variant="link"
          icon={<ExternalLinkSquareAltIcon />}
          iconPosition="end"
          onClick={handleModalToggle}
        >
          View more details
        </Button>
      </StackItem>

      <StackItem>
        <Button variant="primary">Report Issue</Button>
      </StackItem>
    </Stack>
  );
};

InfoPage.propTypes = {
  architecture: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  trace: PropTypes.string.isRequired,
};

export default InfoPage;
