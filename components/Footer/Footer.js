import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { styled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import ProgressiveImage from "components/ProgressiveImage";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ReactGA from "react-ga4";

const date = new Date();

const useStyles = makeStyles((theme) => ({
  footerthirdsec: {
    display: "flex",

    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  footerStyle: {
    marginTop: "70px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "20px",
    },
  },
  footerStyle2: {
    marginTop: "80px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "30px",
    },
  },
  footerStyle3: {
    marginTop: "25px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "15px",
    },
  },
  explore: {
    position: "absolute",
    top: "6px",
    right: "10px",
    color: "#FDC114",
    zIndex: 900,
  },
  strikethroughoff: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "110px",
    marginLeft: "12px",
  },
  strikethrough: {
    display: "flex",
    fontSize: "12px",
    color: "#9C9C9C",
    justifyContent: "center",
    alignItems: "center",
  },
  imagesicons: {
    margin: "2px",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.08)",
      transition: "left 0.2s linear",
    },
  },
  divOfFooter: {
    fontWeight: "700",
    fontSize: "1.1rem",
    textAlign: "center",
    display: "block",
    marginBottom:"30px",
    marginLeft:"40px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  divOfFooter2: {
    fontWeight: "700",
    fontSize: "1.1rem",
    textAlign: "center",
    display: "block",
    marginTop:"75px",
    marginLeft:"40px",

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer style={{ backgroundColor: "#000000", color: "#FFFFFF" }}>
      <Grid container>
        <Grid item xs={12} md={3}>
          <div
            style={{ display: "flex", textAlign: "center", justifyContent: "center" }}
            className={classes.footerStyle}
          >
            <span>
              <a href="/">
                <img src="/images/logoLight.svg" height="65px" alt="icons" />
              </a>
            </span>
          </div>
          <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
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
              <img src="/icons/instagram.svg" className={classes.imagesicons} alt="icons" />
            </a>
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
              <img src="/icons/facebook.svg" className={classes.imagesicons} alt="icons"/>
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
              href="https://www.linkedin.com/company/bizbstore/?_ga=2.46482023.1960989760.1689242030-358638331.1683619134"
            >
              <img src="/icons/linkedin2.svg" className={classes.imagesicons} alt="icons"/>
            </a>
          </div>
        </Grid>
        <Grid item xs={12} md={1} >
          <div className={classes.divOfFooter}>
            <a href="/en">
              <div style={{ color: "#FDC114", cursor: "pointer" }} className={classes.footerStyle2}>
                <span
                  style={{
                    textDecoration: "line-through",
                    textDecorationColor: "rgba(255, 255, 255, 0.15)",
                    mixBlendMode: "pass-through",
                    textDecorationThickness: "8px",
                    width: "100%",
                    display: "inline-block",
                  }}
                >
                  Home
                </span>
              </div>
            </a>

            <a href="/en/explore" style={{ position: "relative" }}>
              <div style={{ cursor: "pointer", color: "white", position: "relative" }} className={classes.footerStyle3}>
                <span
                  style={{
                    textDecoration: "line-through",
                    textDecorationColor: "rgba(255, 255, 255, 0.15)",
                    mixBlendMode: "pass-through",
                    textDecorationThickness: "8px",
                    width: "100%",
                    display: "inline-block",
                  }}
                >
                  Explore
                </span>
              </div>
              {/* <img src="/images/footerbackground.webp" className={classes.explore}></img> */}
            </a>
            <a target="_blank" href="https://blog.bizb.store/how-to-sell/">
              <div style={{ cursor: "pointer", color: "white" }} className={classes.footerStyle3}>
                <span
                  style={{
                    textDecoration: "line-through",
                    textDecorationColor: "rgba(255, 255, 255, 0.15)",
                    mixBlendMode: "pass-through",
                    textDecorationThickness: "8px",
                    width: "100%",
                    display: "inline-block",
                  }}
                >
                  How to Sell
                </span>
              </div>
            </a>
            <a target="_blank" href="https://blog.bizb.store/blog/">
              <div style={{ cursor: "pointer", color: "white" }} className={classes.footerStyle3}>
                {" "}
                <span
                  style={{
                    textDecoration: "line-through",
                    textDecorationColor: "rgba(255, 255, 255, 0.15)",
                    mixBlendMode: "pass-through",
                    textDecorationThickness: "8px",
                    width: "100%",
                    display: "inline-block",
                  }}
                >
                  Our Blogs
                </span>
              </div>{" "}
            </a>
            <a target="_blank" href="https://blog.bizb.store/contact-us-2/">
              <div style={{ cursor: "pointer", color: "white" }} className={classes.footerStyle3}>
                {" "}
                <span
                  style={{
                    textDecoration: "line-through",
                    textDecorationColor: "rgba(255, 255, 255, 0.15)",
                    mixBlendMode: "pass-through",
                    textDecorationThickness: "8px",
                    width: "100%",
                    display: "inline-block",
                  }}
                >
                  Contact Us
                </span>
              </div>
            </a>
            </div>
            </Grid>
            <Grid item xs={12} md={1} lg={2}  >

            <div className={classes.divOfFooter2}>

            <a target="_blank" href="https://blog.bizb.store/about-us/">
              <div style={{ cursor: "pointer", color: "white" }} className={classes.footerStyle3}>
                {" "}
                <span
                  style={{
                    textDecoration: "line-through",
                    textDecorationColor: "rgba(255, 255, 255, 0.15)",
                    mixBlendMode: "pass-through",
                    textDecorationThickness: "8px",
                    width: "100%",
                    display: "inline-block",
                  }}
                >
                  About Us
                </span>
              </div>
            </a>
            <a target="_blank" href="https://blog.bizb.store/privacy-policy-2/">
              <div style={{ cursor: "pointer", color: "white" }} className={classes.footerStyle3}>
                {" "}
                <span
                  style={{
                    textDecoration: "line-through",
                    textDecorationColor: "rgba(255, 255, 255, 0.15)",
                    mixBlendMode: "pass-through",
                    textDecorationThickness: "8px",
                    width: "100%",
                    display: "inline-block",
                  }}
                >
                  Privacy Policy
                </span>
              </div>
            </a>
            <a target="_blank" href="https://blog.bizb.store/return-policy/">
              <div style={{ cursor: "pointer", color: "white" }} className={classes.footerStyle3}>
                {" "}
                <span
                  style={{
                    textDecoration: "line-through",
                    textDecorationColor: "rgba(255, 255, 255, 0.15)",
                    mixBlendMode: "pass-through",
                    textDecorationThickness: "8px",
                    width: "100%",
                    display: "inline-block",
                  }}
                >
                  Return Policy
                </span>
              </div>
            </a>
            <a target="_blank" href="/en/SellerTermsConditionPage">
              <div style={{ cursor: "pointer", color: "white" }} className={classes.footerStyle3}>
                {" "}
                <span
                  style={{
                    textDecoration: "line-through",
                    textDecorationColor: "rgba(255, 255, 255, 0.15)",
                    mixBlendMode: "pass-through",
                    textDecorationThickness: "8px",
                    width: "100%",
                    display: "inline-block",
                  }}
                >
                  Terms & Condition
                </span>
              </div>
            </a>
            <a target="_blank" href="https://g.co/kgs/eHpiuSF">
              <div style={{ marginBottom: "41px", cursor: "pointer", color: "white" }} className={classes.footerStyle3}>
                {" "}
                <span
                  style={{
                    textDecoration: "line-through",
                    textDecorationColor: "rgba(255, 255, 255, 0.15)",
                    mixBlendMode: "pass-through",
                    textDecorationThickness: "8px",
                    width: "100%",
                    display: "inline-block",
                  }}
                >
                  Find Us
                </span>
              </div>
            </a>
          </div>
        </Grid>
        <Grid sm={0} md={0} lg={2}></Grid>
        <Grid item xs={12} md={5} lg={4}>
          <div className={classes.footerthirdsec}>
            <div className={classes.footerStyle2}></div>
            <Typography variant="typography" style={{ fontWeight: 500 }}>
              FEEL FREE TO CONTACT US, ANYTIME, ANYWHERE
            </Typography>
            <div style={{ marginTop: "20px" }}>
              <a href="mailto:Hello@bizb.store" target="_blank">
                <span>
                  <img src="/images/emailIcon.svg" alt="icons"/>
                </span>
                <span style={{ marginLeft: "10px", color: "white", fontSize: "1rem" }}> hello@bizb.store </span>
              </a>
              <a href="tel:+92 319 4533032" target="_blank">
                <span style={{ marginLeft: "20px" }}>
                  <img src="/images/phoneIcon.svg" alt="icons" />
                </span>
                <span style={{ marginLeft: "10px", color: "white", fontSize: "1rem" }}>+92 319 4533032</span>
              </a>
            </div>
            <div
              style={{
                marginTop: "50px",

                fontWeight: "500",
                fontSize: "1rem",
              }}
            >
              DOWNLOAD OUR APP
              <div style={{ marginTop: "25px" }}>
                <a target="_blank" href="https://apps.apple.com/pk/app/bizb/id1571110423">
                  <span>
                    <img src="/images/appStoreIcon.svg" alt="icons"/>
                  </span>
                </a>
                <span style={{ marginLeft: "18px" }}>
                  <a
                    target="_blank"
                    href="https://play.google.com/store/apps/details?id=com.bizb_store&_ga=2.74994514.1337725914.1682938429-218131156.1681233136&_gac=1.86957418.1682759140.Cj0KCQjwgLOiBhC7ARIsAIeetVDrNuIWkimFzY2OMGgR1kIA3Jtu4RDwNAlEFpyiranTB0hEjTuqcZQaAjrAEALw_wcB"
                  >
                    <img src="/images/googlePlayIcon.svg" alt="icons"/>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #918d8ce6",
          padding: "10px",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: "500", fontSize: "0.8rem", marginLeft: "91px" }}>
          Copyright {date.getFullYear()}. All Rights Reserved.
        </span>
        <a href="https://www.codistan.org/" target="_blank">
          <span
            style={{
              paddingBottom: "10px",
              fontWeight: "500",
              fontSize: "0.8rem",
              marginRight: "90px",
              color: "white",
            }}
          >
            POWERED BY <span style={{ color: "#FDC114" }}>CODISTAN</span>
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
