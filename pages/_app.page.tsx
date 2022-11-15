import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { AppProvider } from "components/ecosystem/appContext";
import theme from "styles/theme";
import { motion, AnimatePresence } from "framer-motion";
import ErrorBoundary from "components/ecosystem/errorBoundary";
import Script from "next/script";
import seoContext from "components/ecosystem/seoContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  if (process.env.NEXT_PUBLIC_MOCKING_API === "enabled") {
    require("../mocks");
  }
  const router = useRouter();

  return (
    <ErrorBoundary>
      <Script src="/utils/nr.js" async />
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Head>
            <title>{seoContext.title}</title>
            <meta property="title" content={seoContext.title} />
            <meta name="description" content={seoContext.description} />
            <meta property="og:title" content={seoContext.title} />
            <meta name="og:description" content={seoContext.description} />
            <meta property="twitter:title" content={seoContext.title} />
            <meta name="twitter:description" content={seoContext.description} />
            <link rel="icon" href="/img/selfridges-favicon.svg" />
          </Head>
          <AnimatePresence exitBeforeEnter initial={false}>
            <motion.div
              key={router.asPath}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.01 }}
            >
              <Component key={router.asPath} {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default MyApp;
