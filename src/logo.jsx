import React from "react";
import { Brand } from "@patternfly/react-core";

import fedoraLogoDark from "../public/fedora-logo-dark.png";
import fedoraLogo from "../public/fedora-logo-default.png";

const Logo = () => {
  return (
    <Brand
      src={fedoraLogo}
      alt=""
      widths={{
        default: "200px",
      }}
      heights={{
        default: "200px",
      }}
    >
      <source srcSet={fedoraLogo} media="(prefers-color-scheme: light)" />
      <source srcSet={fedoraLogoDark} media="(prefers-color-scheme: dark)" />
    </Brand>
  );
};

export default Logo;
