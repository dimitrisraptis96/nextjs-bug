import React, { Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { ChakraProvider } from "@chakra-ui/react";
import ErrorBoundary from "../components/ErrorBoundary";

const App = ({ Component, pageProps, canonicalUrl, hasHelpkit }) => {
  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <ChakraProvider>
          <ErrorBoundary>
            <MotionConfig reducedMotion="user">
              <Component {...pageProps} canonicalUrl={canonicalUrl} />
            </MotionConfig>
          </ErrorBoundary>
        </ChakraProvider>
      </Suspense>
    </>
  );
};

App.getInitialProps = ({ ctx }) => {
  const isProd = process.env.NODE_ENV === "production";
  const base = isProd ? "https://www.brandbird.app" : "http://localhost:3000";
  const { asPath } = ctx;
  const canonicalUrl = base + asPath;
  const hasHelpkit = ["/studio", "/editor"].includes(asPath);

  return {
    hasHelpkit,
    canonicalUrl,
  };
};

export default App;
