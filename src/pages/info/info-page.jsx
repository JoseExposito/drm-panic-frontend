import React, { useState } from "react";
import { Button, Stack, StackItem, Title } from "@patternfly/react-core";
import { ExternalLinkSquareAltIcon } from "@patternfly/react-icons/dist/esm/icons/external-link-square-alt-icon";
import { css } from "@patternfly/react-styles";
import alignment from "@patternfly/react-styles/css/utilities/Alignment/alignment";
import flex from "@patternfly/react-styles/css/utilities/Flex/flex";
import PropTypes from "prop-types";
import Tux from "../../components/tux.jsx";
import DetailsModal from "./details-modal.jsx";
import ReportIssueModal from "./report-issue-modal.jsx";

const InfoPage = ({ architecture, version, trace }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReportIssueOpen, setIsReportIssueOpen] = useState(false);

  const handleDetailsModalToggle = () => {
    setIsDetailsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleReportIssueModalToggle = () => {
    setIsReportIssueOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
      <DetailsModal
        isOpen={isDetailsOpen}
        onClose={handleDetailsModalToggle}
        architecture={architecture}
        version={version}
        trace={trace}
      />

      <ReportIssueModal
        isOpen={isReportIssueOpen}
        onClose={handleReportIssueModalToggle}
        architecture={architecture}
        version={version}
        trace={trace}
      />

      <Stack
        hasGutter
        className={css(flex.alignItemsCenter, flex.justifyContentCenter)}
      >
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
          <Button
            variant="link"
            icon={<ExternalLinkSquareAltIcon />}
            iconPosition="end"
            onClick={handleDetailsModalToggle}
          >
            View more details
          </Button>
        </StackItem>

        <StackItem>
          <Button variant="primary" onClick={handleReportIssueModalToggle}>
            Report Issue
          </Button>
        </StackItem>
      </Stack>
    </>
  );
};

InfoPage.propTypes = {
  architecture: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  trace: PropTypes.string.isRequired,
};

export default InfoPage;
