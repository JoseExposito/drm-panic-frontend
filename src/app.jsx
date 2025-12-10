import React, { useMemo } from "react";
import {
  Brand,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadLogo,
  MastheadMain,
  Page,
  PageSection,
} from "@patternfly/react-core";
import parseUrl from "./url-parser.js";
import useSystemColorScheme from "./hooks/use-system-color-scheme.jsx";
import ErrorPage from "./pages/error/error-page.jsx";
import InfoPage from "./pages/info/info-page.jsx";

import fedoraLogo from "../public/fedora-logo-white.png";

const App = () => {
  const params = useMemo(() => parseUrl(), []);
  useSystemColorScheme();

  const masthead = (
    <Masthead display={{ default: "inline" }} className="fedora-header">
      <MastheadMain>
        <MastheadBrand>
          <MastheadLogo>
            <Brand src={fedoraLogo} alt="" />
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent />
    </Masthead>
  );

  return (
    <Page masthead={masthead} className="page">
      <PageSection className="page-container">
        {params ? (
          <InfoPage
            architecture={params.architecture}
            version={params.version}
            trace={params.trace}
          />
        ) : (
          <ErrorPage />
        )}
      </PageSection>
    </Page>
  );
};

export default App;
