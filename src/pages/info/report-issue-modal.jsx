import React from "react";
import {
  Button,
  Content,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import { CopyIcon } from "@patternfly/react-icons/dist/esm/icons/copy-icon";
import { ExternalLinkSquareAltIcon } from "@patternfly/react-icons/dist/esm/icons/external-link-square-alt-icon";
import PropTypes from "prop-types";
import { getBugzillaReportBugURL, getFedoraVersion } from "../../bugzilla.js";

const ReportIssueModal = ({
  isOpen,
  onClose,
  architecture,
  version,
  trace,
}) => {
  const fedoraVersion = getFedoraVersion(version);
  const bugzillaUrl = getBugzillaReportBugURL(fedoraVersion);
  const reportTrace = `Linux kernel version: ${version}\nArchitecture: ${architecture}\nFedora version: ${fedoraVersion}\n\n${trace}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="large"
      aria-labelledby="report-issue-modal-title"
      aria-describedby="report-issue-modal-body"
    >
      <ModalHeader title="Report Issue" labelId="report-issue-modal-title" />
      <ModalBody
        tabIndex={0}
        id="report-issue-modal-body"
        aria-label="Instructions for reporting a kernel bug"
      >
        <Stack hasGutter>
          <StackItem>
            <Content>
              <h3>How to Report This Issue</h3>
              <p>
                Reporting this problem helps developers fix it for everyone.
                Follow these simple steps:
              </p>
              <ol>
                <li>
                  Click this link to open the bug report form: &nbsp;
                  <Button
                    component="a"
                    href={bugzillaUrl}
                    target="_blank"
                    rel="noreferrer"
                    variant="link"
                    isInline
                    icon={<ExternalLinkSquareAltIcon />}
                    iconPosition="end"
                  >
                    Open Bug Report Form
                  </Button>
                </li>
                <li>Log in or create an account</li>
                <li>
                  Fill in a short summary describing what happened (e.g.,
                  &quot;System crashed while browsing&quot;)
                </li>
                <li>
                  <p>In the details box, tell us:</p>
                  <ul>
                    <li>What you were doing when the crash happened</li>
                    <li>
                      Copy and paste the error trace below &nbsp;(
                      <Button
                        variant="link"
                        isInline
                        icon={<CopyIcon />}
                        iconPosition="end"
                        onClick={() => {
                          navigator.clipboard.writeText(reportTrace);
                        }}
                      >
                        Click here to copy it
                      </Button>
                      )
                    </li>
                    <li>Any other details you think might be helpful</li>
                  </ul>
                </li>
                <li>Click &quot;Submit Bug Report&quot; to send your report</li>
              </ol>

              <p>
                That&apos;s it! Developers will review your report and may ask
                follow-up questions.
              </p>

              <h3>Error trace:</h3>
            </Content>
          </StackItem>
          <StackItem isFilled>
            <textarea
              id="trace-textarea"
              className="trace-modal-textarea"
              readOnly={true}
              value={reportTrace}
            />
          </StackItem>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <Button key="confirm" variant="primary" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

ReportIssueModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  architecture: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  trace: PropTypes.string.isRequired,
};

export default ReportIssueModal;
