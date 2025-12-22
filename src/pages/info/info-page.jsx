import React, { useState } from "react";
import { Alert, Button, Stack, StackItem, Title } from "@patternfly/react-core";
import { ExternalLinkSquareAltIcon } from "@patternfly/react-icons/dist/esm/icons/external-link-square-alt-icon";
import { css } from "@patternfly/react-styles";
import alignment from "@patternfly/react-styles/css/utilities/Alignment/alignment";
import flex from "@patternfly/react-styles/css/utilities/Flex/flex";
import PropTypes from "prop-types";
import reportBug from "../../bugzilla.js";
import Tux from "../../components/tux.jsx";
import DetailsModal from "./details-modal.jsx";

const InfoPage = ({ architecture, version, trace }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReportingBug, setIsReportingBug] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertDetails, setAlertDetails] = useState({ error: false, url: "" });

  const handleModalToggle = () => {
    setIsOpen((prevIsModalOpen) => !prevIsModalOpen);
  };

  const handleReportBug = async () => {
    setIsReportingBug(true);
    setShowAlert(false);

    const url = await reportBug(architecture, version, trace);
    if (!url) {
      setIsReportingBug(false);
      setAlertDetails({ error: true, url: "" });
    } else {
      setAlertDetails({ error: false, url });
    }
    setShowAlert(true);
  };

  return (
    <>
      {showAlert && (
        <Alert
          variant={alertDetails.error ? "danger" : "success"}
          title={
            alertDetails.error
              ? "There was an error reporting your issue"
              : "Error reported successfully"
          }
        >
          {alertDetails.error ? (
            <p>
              If the problem persist, please report it on{" "}
              <a
                href="https://bugzilla.redhat.com/"
                target="_blank"
                rel="noreferrer"
              >
                Bugzilla
              </a>
              .
            </p>
          ) : (
            <p>
              You can see your bug report on{" "}
              <a href={alertDetails.url} target="_blank" rel="noreferrer">
                Bugzilla
              </a>
              .
            </p>
          )}
          <p></p>
        </Alert>
      )}

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
          <Button
            variant="primary"
            isDisabled={isReportingBug}
            onClick={handleReportBug}
          >
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
