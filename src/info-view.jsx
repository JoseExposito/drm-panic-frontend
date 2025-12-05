import React from "react";
import { Button } from "@patternfly/react-core";
import PropTypes from "prop-types";

const InfoView = ({ architecture, version, trace }) => {
  return (
    <>
      <p>{architecture}</p>
      <p>{version}</p>
      <pre>{trace}</pre>
      <Button variant="primary">Report Error</Button>
    </>
  );
};

InfoView.propTypes = {
  architecture: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  trace: PropTypes.string.isRequired,
};

export default InfoView;
