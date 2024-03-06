import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import variantById from "lib/utils/variantById";
import { useState, useEffect, useContext } from "react";
import priceByCurrencyCode from "lib/utils/priceByCurrencyCode";
import inject from "hocs/inject";
import CloseIcon from "@material-ui/icons/Close";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import PageLoading from "../PageLoading";
import { JSON } from "global";
import { CircularProgress } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { UIContext } from "../../context/UIContext.js";
import formatSize from "../../lib/utils/formatSize";
import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
    padding: "75px",
    [theme.breakpoints.down("xs")]: {
      padding: "0",
    },
  },
  gridroot: {
    maxWidth: "100%",
    justifyContent: "space-between",
  },

  typography: {
    background: "#333333",
    opacity: "15%",
    height: "8px",
    width: "180px",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
    height: "50px",
    position: "relative",
  },
  image: {
    width: "275px", // Reduced by 1px to create space for the border
    marginTop: "1px",
    borderRadius: "13px",
    marginRight: "2px",
    marginLeft: "1px",

    [theme.breakpoints.down("sm")]: {
      width: "100%", // Reduced by 1px to create space for the border
    },
  },
  storeNameStyle: {
    marginLeft: "5px",
    fontFamily: "lato",
    fontStyle: "semibold",
    fontSize: "12px",
    lineHeight: "0px",
    padding: "8px",
    display: "flex",
    color: "#FDC114",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
      fontSize: "10px",
      padding: "4px",
    },
  },
  sizes: {
    height: "24px",
    width: "24px",
    marginLeft: "5px",
    fontFamily: "lato",
    fontStyle: "semibold",
    fontSize: "12px",
    lineHeight: "0px",
    padding: "10px",
    display: "flex",
    color: "#FDC114",
    justifyContent: "center",
    border: "1px solid #000000",
  },
  cartimage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginRight: 3,
  },
  cartText: {
    fontSize: "18px",

    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
  },
  cartsize: {
    display: "flex",
    marginLeft: theme.spacing(0.5),
    justifyContent: "end",
    alignItems: "center",
  },
  storeName: {
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
    fontWeight: "600",
    fontSize: "0.8rem",
    fontFamily: "lato",
    marginLeft: "0px",
    marginTop: "0px",

    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
  },
  carttitle: {
    display: "flex",
    marginLeft: theme.spacing(1),
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  carttitle2: {
    display: "flex",
  },
  cartcontent: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom: "14px",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      paddingBottom: "8px",
    },
  },
  cartcontenttext: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  progressBar: {
    justifyContent: "center",
    display: "flex",
    marginLeft: "50%",
    [theme.breakpoints.down("sm")]: {
      size: "10px",
    },
  },
  cart: {
    height: "35px",
    width: "100%",
    borderRadius: "5px",
    background: "#FDC114",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "none",
    zIndex: 1,
    transition: "all 0.2s linear",
    "&:hover": {
      transform: "scale(1.08)",
      transition: "left 0.2s linear",
      background: "#FDC114",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%", // Reduced by 1px to create space for the border
      height: "29px",
      // marginLeft: theme.spacing(4),
    },
  },
  explore: {
    position: "absolute",
    top: "25px",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#FDC114",
    zIndex: 900,
  },
  boxcontairproduct: {
    maxHeight: "700px",
    width: "315px",
    borderRadius: "5px",
    // border: "1px solid #9C9C9C",
    gridRowEnd: "span 1",
    marginBottom: "20px",
    marginRight:"30px",
    [theme.breakpoints.down("sm")]: {
        marginRight:"0px",

      width: "90%",
      marginBottom: "10px",
    },
  },

  price: {
    marginLeft: "12px",
  },
  strikethroughoff: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "110px",
    marginLeft: "0px",
  },
  cartbackground: {
    display: "flex",
    flexDirection: "column",
    // marginLeft: "70px",
    justifyContent: "end",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
    },
  },
  strikethrough: {
    display: "flex",
    fontSize: "12px",
    color: "#9C9C9C",
    justifyContent: "center",
    alignItems: "center",
  },

  mainheading: {
    display: "flex",
    marginTop: "40px",
    marginBottom: "40px",
    justifyContent: "center",
    textTransform: "uppercase",
    position: "relative",
    width: "100%",
  },
  spanline: {
    marginTop: "20px",
    bottom: 0,
    left: 0,
    height: "5px",
    marginLeft: "10px",
    width: "50px",
    backgroundColor: "#FDC114",
  },
  mainheadings: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    allignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  cartButton: {
    width: "100%",
    marginBottom:'10px'
  },
  cartButtonrowDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  cartButtonrowDiv2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "baseline",
  },
}));

const SkeletonLoader = (props) => {
  // const UIContextJustInPage = useContext(UIContext);

  const classes = useStyles();
  return (
    <div className={classes.gridroot}>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 2, 900: 2, 1050: 3, 1280: 4, 1400: 5, 1750: 6, 1920: 6 }}
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Masonry columnsCount={4} style={{ display: "flex", justifyContent: "flex-start" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={classes.boxcontairproduct}>
              <div className={classes.image}>
                <Skeleton variant="rectangular" style={{borderRadius:"10px", marginBottom:"10px"}} width={"100%"} height={118}/>
              </div>

              <div>
                <div className={classes.cartButton}>
                  <Button className={classes.cart}></Button>
                </div>
                <div>
                  <div className={classes.cartcontent}>
                    <Skeleton style={{ width: "100%" }} />
                  </div>
                  <div className={classes.cartcontent}>
                    <Skeleton style={{ width: "80%" }} />
                  </div>
                  <div className={classes.cartcontent}>
                    <Skeleton style={{ width: "90%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={classes.boxcontairproduct}>
              <div className={classes.image}>
                <Skeleton variant="rectangular" style={{borderRadius:"10px", marginBottom:"10px"}} height={198}/>
              </div>

              <div>
                <div className={classes.cartButton}>
                  <Button className={classes.cart}></Button>
                </div>
                <div>
                  <div className={classes.cartcontent}>
                    <Skeleton style={{ width: "100%" }} />
                  </div>
                  <div className={classes.cartcontent}>
                    <Skeleton style={{ width: "80%" }} />
                  </div>
                  <div className={classes.cartcontent}>
                    <Skeleton style={{ width: "90%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={classes.boxcontairproduct}>
              <div className={classes.image}>
                <Skeleton variant="rectangular" style={{borderRadius:"10px", marginBottom:"10px"}} height={158}/>
              </div>

              <div>
                <div className={classes.cartButton}>
                  <Button className={classes.cart}></Button>
                </div>
                <div>
                  <div className={classes.cartcontent}>
                    <Skeleton style={{ width: "100%" }} />
                  </div>
                  <div className={classes.cartcontent}>
                    <Skeleton style={{ width: "80%" }} />
                  </div>
                  <div className={classes.cartcontent}>
                    <Skeleton style={{ width: "90%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={classes.boxcontairproduct}>
              <div className={classes.image}>
                <Skeleton variant="rectangular" style={{borderRadius:"10px", marginBottom:"10px"}} height={148}/>
              </div>

              <div>
                <div className={classes.cartButton}>
                  <Button className={classes.cart}></Button>
                </div>
                <div>
                  <div className={classes.cartcontent}>
                    <Skeleton style={{ width: "100%" }} />
                  </div>
                  <div className={classes.cartcontent}>
                    <Skeleton style={{ width: "80%" }} />
                  </div>
                  <div className={classes.cartcontent}>
                    <Skeleton style={{ width: "90%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={classes.boxcontairproduct}>
              <div className={classes.image}>
                <Skeleton variant="rectangular" style={{borderRadius:"10px", marginBottom:"10px"}} height={168}/>
              </div>

              <div>
                <div className={classes.cartButton}>
                  <Button className={classes.cart}></Button>
                </div>
                <div>
                  <div className={classes.cartcontent}>
                    <Skeleton style={{ width: "100%" }} />
                  </div>
                  <div className={classes.cartcontent}>
                    <Skeleton style={{ width: "80%" }} />
                  </div>
                  <div className={classes.cartcontent}>
                    <Skeleton style={{ width: "90%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={classes.boxcontairproduct}>
              <div className={classes.image}>
                <Skeleton variant="rectangular" style={{borderRadius:"10px", marginBottom:"10px"}} height={198}/>
              </div>

              <div>
                <div className={classes.cartButton}>
                  <Button className={classes.cart}></Button>
                </div>
                <div>
                  <div className={classes.cartcontent}>
                    <Skeleton style={{ width: "100%" }} />
                  </div>
                  <div className={classes.cartcontent}>
                    <Skeleton style={{ width: "80%" }} />
                  </div>
                  <div className={classes.cartcontent}>
                    <Skeleton style={{ width: "90%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default SkeletonLoader;
