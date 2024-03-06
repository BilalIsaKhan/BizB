
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Button from "@reactioncommerce/components/Button/v1";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { CircularProgress } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";


const styles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  loadmore: {
    width: "165px",
    cursor: "pointer",
    height: "50px",
    borderRadius: "40px",
    border: "none",
    display: "flex",
    fontSize: "1.3rem",
    color: "#333333",
    lineHeight: "32px",
    fontFamily: "Ostrich Sans Black",
    fontWeight: 900,
    fontStyle: "normal",
    justifyContent: "center",
    alignItems: "center",
    background: theme.palette.secondary.selected,
    "&:hover": {
      transform: "scale(1.08)",
      transition: "left 0.2s linear",
      background: "#FDC114",
    },
  },
}));

const PageStepper = ({  pageInfo, theme }) => {

  

  const [loading, setLoading] = useState(false);
  const buttonRef = useRef(null);
  const isButtonInView = useState(false);
  const isRefInFocus = useState(false);
  const isComponentMounted = useRef(false);

  const classes = styles();

  const handleNextClick = () => {
    setLoading(true);

    // Simulate an asynchronous loading operation
    

    if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
      const windowHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      const scrollToPosition = (documentHeight - windowHeight) / 2;

      window.scrollTo({ bottom: scrollToPosition, behavior: "smooth" });
    }

    pageInfo.loadNextPage();
    console.log("categoryTags in component is 22", pageInfo)
    setTimeout(() => {
      if (pageInfo.hasNextPage === true) {
        setLoading(false);
      }
    }, 7000);
  };

  const handlePreviousClick = () => {
    if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
      const windowHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      const scrollToPosition = (documentHeight - windowHeight) / 2;

      window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
    }

    pageInfo.loadPreviousPage();
  };

  useEffect(() => {
    console.log("buttonred",buttonRef, "loading state:",loading)
    

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.click();
          isButtonInView.current = true;
          isRefInFocus.current = true;
          isComponentMounted.current = true;
        } else {
          isRefInFocus.current = false;
        }
      });
    }, options);

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => {
      observer.disconnect();
      isButtonInView.current = false;
    };
  }, [pageInfo, buttonRef, loading]);

  return (
    <Grid className={classes.root} container justify="center">
      <Grid item>
        {loading ? (
          <CircularProgress />
        ) : pageInfo.hasNextPage ? (
          <button className={classes.loadmore} onClick={handleNextClick} ref={buttonRef}>
            Load More
          </button>
        ) : null}
      </Grid>
    </Grid>
  );
};

PageStepper.propTypes = {
  classes: PropTypes.object,
  pageInfo: PropTypes.shape({
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool,
    loadNextPage: PropTypes.func,
    loadPreviousPage: PropTypes.func,
  }).isRequired,
  theme: PropTypes.object,
};

export default PageStepper;
