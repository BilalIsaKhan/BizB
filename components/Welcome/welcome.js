import * as React from "react";
import { useState, useEffect, useContext } from "react";

import { Box, Divider, Typography, Button, Modal, FormControl, TextField, CircularProgress } from "@material-ui/core";
import useViewer from "../../hooks/viewer/useViewer";
import { withApollo } from "lib/apollo/withApollo";
import { makeStyles } from "@material-ui/core/styles";
import ReactGA from "react-ga4";
import useCreateanalytics from "../../hooks/analytics/usecreateAnalytics";
import DeviceInfo from "./DeviceInfo";

const Welcome = () => {
  const useStyles = makeStyles((theme) => ({
    styleofdiv: {
      justifyContent: "center",
      width: "100%",
    },
    maindivqrcodeapp: {
      display: "flex",
      width: "100%",
      paddingTop: theme.spacing(2),
      height: "400px",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    maindivapp: {
      display: "flex",

      flexDirection: "column",
    },
    maindivqrcode: {
      display: "flex",
    },
    imageqrcode: {
      marginTop: theme.spacing(1),
      height: "150px",
      width: "126px",
    },

    image: {
      height: "100px",
      width: "250px",
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(2),

      [theme.breakpoints.up(700)]: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
      },
      [theme.breakpoints.down("sm")]: {
        height: "80px",
        width: "200px",
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(0),
      },
    },
    type: {
      width: "100%",
      color: "white",
      fontSize: "22px",
      marginLeft: "20px",
      marginTop: "9px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "16px",
      },
    },
    image3: {
      height: "60px",
      width: "250px",
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),

      [theme.breakpoints.down("sm")]: {
        height: "44px",
        width: "250px",
        marginRight: theme.spacing(0),
        marginTop: theme.spacing(1),
      },
    },
    image2: {
      height: "100px",
      width: "250px",
      border: "1px black",
      borderRadius: "100%",
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(2),

      [theme.breakpoints.up(700)]: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
      },
      [theme.breakpoints.down("sm")]: {
        height: "80px",
        width: "200px",
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(0),
      },
    },
    socialmediafo: {
      width: "100%",
      height: "48px",
      marginTop: theme.spacing(3),
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
      },
      display: "flex",
      justifyContent: "center",
    },
    socialmediadiv: {
      width: "250px",
      height: "80px",
      backgroundColor: "black",
      marginRight: theme.spacing(2),
      borderRadius: "18px",
      marginTop: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        width: "200px",
        height: "60px",
        borderRadius: "10px",
        marginRight: theme.spacing(0),

        // marginTop: theme.spacing(5),
        // marginBottom: theme.spacing(5),
      },
      display: "flex",
      justifyContent: "center",
    },
    imges: {
      width: "51px",
      height: "51px",
      marginRight: theme.spacing(2),

      "& .hover": {
        transform: "scale(1.2)",
      },
    },
  }));
  const [deviceInfo, setDeviceInfo] = useState(null);

  useEffect(() => {
    console.log("DeviceInfo", deviceInfo ? deviceInfo?.deviceType : "");
    handleanalytics("SCANNED", deviceInfo);
  }, [deviceInfo]);

  useEffect(() => {
    // Access device information when the component mounts
    const userAgent = navigator.userAgent;
    const isMobileDevice = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(userAgent);
    const isTabletDevice = /Tablet|iPad/.test(userAgent);

    const deviceType = isMobileDevice ? "Mobile" : isTabletDevice ? "Tablet" : "Desktop";

    // Set the device information in the state
    setDeviceInfo({
      userAgent,
      isMobileDevice,
      isTabletDevice,
      deviceType,
    });
    // Track "Page View" event with Google Analytics 4 for Welcome Page
    ReactGA.send({
      hitType: "pageview",
      page: "/welcome",
      title: "Welcome Page",
    });
  }, []);
  const [createanalyticsFunction, loding] = useCreateanalytics();

  const handleanalytics = async (eventName, deviceInfo) => {
    try {
      const createanalytics = await createanalyticsFunction({
        variables: {
          input: {
            eventName: eventName,
            metafields: {
              key: "deviceName",
              value: deviceInfo ? deviceInfo?.deviceType : "",
            },
          },
        },
      });
      console.log("createanalytics:", createanalytics);

      // clearForm()
    } catch (error) {
      console.log("error", error);
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.styleofdiv}>
      <div className={classes.maindivqrcodeapp}>
        <a
          onClick={() => {
            console.log("kjdgegfiewgfewvfuve");
            ReactGA.send({
              hitType: "event",
              eventCategory: "App",
              eventAction: "install_android",
            });
            handleanalytics("ANDROID", deviceInfo);
          }}
          href="https://play.google.com/store/apps/details?id=com.bizb_store&hl=en&gl=US&pli=1"
          target="_blank"
        >
          <img src="/favicons/Group157.svg" className={classes.image} alt="icon"/>
        </a>
        <a
          href="https://bizb.store/en?"
          target="_blank"
          onClick={() => {
            handleanalytics("WEB", deviceInfo);
          }}
        >
          <div className={classes.socialmediadiv}>
            <img src="/images/logoLight.svg" className={classes.image3} alt="icon"/>
            <span className={classes.type}>Visit our website</span>
          </div>
        </a>
        <a
          onClick={() => {
            ReactGA.send({
              hitType: "event",
              eventCategory: "App",
              eventAction: "install_ios",
            });
            handleanalytics("IOS", deviceInfo);
          }}
          href="https://apps.apple.com/pk/app/bizb/id1571110423"
          target="_blank"
        >
          <img src="/favicons/Group159.svg" className={classes.image} alt="icon"/>
        </a>
      </div>
      <div className={classes.socialmediafo}>
        <a
          onClick={() => {
            ReactGA.send({
              hitType: "event",
              eventCategory: "Social",
              eventAction: "share",
              eventLabel: "Facebook", // You can replace this with the specific social media platform
            });
          }}
          target="_blank"
          href="https://www.facebook.com/bizb.store/?_ga=2.46482023.1960989760.1689242030-358638331.1683619134"
        >
          <img src="/cart/facebooksvg.svg" className={classes.imges} alt="facebook"></img>
        </a>
        <a
          onClick={() => {
            ReactGA.send({
              hitType: "event",
              eventCategory: "Social",
              eventAction: "share",
              eventLabel: "Instagram", // You can replace this with the specific social media platform
            });
          }}
          target="_blank"
          href="https://www.instagram.com/bizb.store/?_ga=2.46482023.1960989760.1689242030-358638331.1683619134"
        >
          <img src="/cart/instagramlogo.jpg" className={classes.imges} alt="instagram"></img>
        </a>
        <a
          onClick={() => {
            ReactGA.send({
              hitType: "event",
              eventCategory: "Social",
              eventAction: "share",
              eventLabel: "LinkedIn", // You can replace this with the specific social media platform
            });
          }}
          target="_blank"
          href="https://www.linkedin.com/company/bizbstore/"
        >
          <img src="/cart/LinkedInsvg.png" className={classes.imges} alt="linkedin"></img>
        </a>
      </div>
    </div>
  );
};
export default withApollo()(Welcome);
