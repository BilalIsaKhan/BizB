import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "context/AuthContext";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
const Appsec = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      height: "auto",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "15px",
      marginTop: "60px",

      justifyContent: "center",
      marginBottom: "60px",
      [theme.breakpoints.down(700)]: {
        marginTop: "5px",
        marginBottom: "5px",
      },
    },
    img: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    maingrid: {
      width: "100%",
      display: "flex",

      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    grid1: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      width: "407px",
      height: "86px",
      display: "none",
      textAlign: "start",
      [theme.breakpoints.down(700)]: {
        display: "block",
        width: "95vw",
      },
    },
    maindivqrcodeappsex: {
      display: "flex",

      paddingTop: theme.spacing(5),
      height: "400px",
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.down(700)]: {
        justifyContent: "center",
        paddingTop: "0px",
        height: "300px",
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
      height: "290px",
      width: "166px",
    },
    imagetext: {
      height: "auto",
      width: "auto",
      marginTop: theme.spacing(4),
      [theme.breakpoints.down(700)]: {
        // height: "400px",
        // width: "300px",
        display: "none",
      },
    },
    image: {
      height: "84px",
      width: "277px",
      marginTop: theme.spacing(2),

      [theme.breakpoints.up(700)]: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
      },
    },
    imae: {
      height: "746px",
      marginTop: theme.spacing(6),
      width: "682px",
      [theme.breakpoints.down(700)]: {
        height: "400px",
        width: "320px",
      },
    },
    mobiletitle: {
      display: "none",
      [theme.breakpoints.down(700)]: {
        display: "block",
        fontSize: "50px",
        fontWeight: "700",
        color:"black"
      },
    },
    mobiletitle2: {
      display: "block",
      fontSize: "69px",
      fontWeight: "700",
      letterSpacing: "1px",

     
    },
    mobiletitle3: {
      display: "block",
      fontSize: "29px",
      fontWeight: "400",
      marginTop: "65px",
      width: "63%",
      color: "grey",
      letterSpacing: "2px",
      textAlign: "start",
      [theme.breakpoints.down(700)]: {
        textAlign:"center",

      },

      
    },
    divForText:{
      display:"block",
      justifyContent:"start",
      [theme.breakpoints.down(700)]: {
        display: "none",
        justifyContent:"center",

      },
    }
  }));

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <img src="/app-section/appsec1.svg" alt="Using our app" className={classes.img} /> */}

      <Grid
        container
        className={classes.maingrid}
        lg={12}
        sm={12}
        md={12}
        align="center"
        justify="center"
        alignItems="center"
      >
        <Grid item className={classes.grid1} lg={6} xs={6} sm={6} md={6}>
       
          <div className={classes.divForText}>
            <Typography variant="h5" className={classes.mobiletitle2}>
              Download Our App
            </Typography>
            <Typography variant="h4" className={classes.mobiletitle3}>
              Now you can revamp your daily wear wardrobe every month while saving more than 50% from your monthly
              budget!
            </Typography>
          </div>
          <img src="/app-section/Line-1.webp" className={classes.imagetext} alt="icons" />
          <div>
            <Typography   variant="h2" className={classes.mobiletitle}>Download Our App</Typography>
            <div className={classes.maindivqrcodeappsex}>
              <div className={classes.maindivapp}>
                <a
                  href="https://play.google.com/store/apps/details?id=com.bizb_store&hl=en&gl=US&pli=1"
                  target="_blank"
                >
                  <img src="/app-section/appstore2.svg" className={classes.image} alt="icons"/>
                </a>
                <a href="https://apps.apple.com/pk/app/bizb/id1571110423" target="_blank">
                  <img src="/app-section/appstore1.svg" className={classes.image} alt="icons" />
                </a>
              </div>
              <div className={classes.maindivqrcode}></div>
            </div>
          </div>
        </Grid>
        <Hidden smDown>
          <Grid item lg={6} sm={6} md={12} xs={12} className={classes.grid1}>
            <img src="/app-section/appsec.webp" className={classes.imae} alt="icons" />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
};

export default Appsec;
