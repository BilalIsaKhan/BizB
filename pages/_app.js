import NextApp from "next/app";
import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ContextProviders } from "context/ContextProviders";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import components from "custom/componentsContext";
import theme from "custom/reactionTheme";
import TagManager from "react-gtm-module";
import { GTM_ID, pageview } from "../lib/utils/gtm";
import { useRouter } from "next/router";
import ReactGA from "react-ga4";

// import Script from 'next/script';

// import 'swiper/swiper.min.css';
// import 'swiper/modules/pagination/pagination.min.css'
// import 'swiper/modules/navigation/navigation.min.css'
// import "swiper/modules/thumbs/thumbs.min.css";
// import "swiper/modules/free-mode/free-mode.min.css";
import "swiper/swiper-bundle.css";
// import 'swiper/components/navigation/navigation.scss';
// import 'swiper/components/pagination/pagination.scss';
// import 'swiper/components/scrollbar/scrollbar.scss';
import "../styles/global.css";
import "../assets/fonts/style.css";
import "react-toastify/dist/ReactToastify.css";
// import { StripeWrapper } from "components/StripeCard";

// if (process.env.NODE_ENV === "production")
{
  // Override the console.log method to do nothing
  // console.log = function () { };
  // console.error = function () { };
  // console.warn = function () { };
}

export default class App extends NextApp {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_TAG); // Replace with your Measurement ID

    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    console.log("kjgjhvhgc", process.env.NEXT_PUBLIC_GOOGLE_TAG);
    if (process.browser) {
      // TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAG }); // Replace GTM-XXXXXX with your GTM container ID
    }
    console.log("process.env.NEXT_PUBLIC_GOOGLE_TAG", process.env.NEXT_PUBLIC_GOOGLE_TAG);
    // TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAG });

    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("170363809485316");
        ReactPixel.pageView();

        this.props.router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      });
  }
  // componentWillUnmount() {
  //   // Remove the event listener on unmount
  //   if (GTM_ID) {
  //     this.props.router.events.off('routeChangeComplete', pageview);
  //   }
  // }
  render() {
    const { Component, pageProps, ...rest } = this.props;

    // useEffect(() => {

    // }, [router.events])

    return (
      // <StripeWrapper>
      <>
        <html>
          <head>
            <meta name="facebook-domain-verification" content="9zhnwvopdk5dso364txrm34wpgpcw8" />

            <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZRWM07YWWB"></script>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-60BJ8X8BEN"></script>

            <script async>
              {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                  
                    gtag('config', 'G-ZRWM07YWWB'), {
                    page_path: window.location.pathname,
                    });
                `}
              {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                  
                    gtag('config', 'G-60BJ8X8BEN');
                `}
            </script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-MWBXV4RS');
              `,
              }}
            />
          </head>
          <body></body>
        </html>

        <ContextProviders pageProps={pageProps}>
          <ComponentsProvider value={components}>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...rest} {...pageProps} />
            </MuiThemeProvider>
          </ComponentsProvider>
        </ContextProviders>
      </>
      // </StripeWrapper>
    );
  }
}
