import React, { useMemo } from "react";
import {
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
import Logo from "./logo.jsx";
import ErrorPage from "./pages/error/error-page.jsx";
import InfoPage from "./pages/info/info-page.jsx";

const App = () => {
  const params = useMemo(() => parseUrl(), []);
  useSystemColorScheme();

  const masthead = (
    <Masthead display={{ default: "inline" }}>
      <MastheadMain>
        <MastheadBrand>
          <MastheadLogo>
            <Logo />
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent />
    </Masthead>
  );

  return (
    <Page masthead={masthead}>
      <PageSection isFilled>
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
      <PageSection variant="secondary">Footer??</PageSection>
    </Page>
  );
};

export default App;
