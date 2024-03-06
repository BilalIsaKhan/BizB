import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import { withApollo } from "lib/apollo/withApollo";
import Typography from "@material-ui/core/Typography";

const FeaturedIn = (props) => {
  // console.log("instagram props", props.feed);

 


  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    maindiv: {
      maxWidth: "1300px",
      marginTop: "40px",
    },
    gridroot: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      position: "relative",
    },
    image: {
      maxWidth: "300px",
      maxHeight: "440px",

      [theme.breakpoints.down(600)]: {
        width: "32vw",
        paddingRight: "0",
        paddingLeft: "0",
        marginBottom: "0",
      },
    },

    mainheading: {
      display: "flex",
      marginTop: "30px",
      marginBottom: "10px",
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
    text: {
      position: "absolute",
      top: "8px",
      left: "8px",
      width: "440px",
      height: "440px",
      color: "white",
      padding: "1rem",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      [theme.breakpoints.down(600)]: {
        width: "32vw",
        height: "auto",
        paddingRight: "0",
        paddingLeft: "0",
        top: "0",
        padding: "0",
        left: "0",
      },
    },
    main: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
      marginBottom: "60px",
      marginTop: "50px",
      width: "100%",
    },
    instagramdiv: {
      maxWidth: "1390px",
    },
  }));

  const images = [
    {
      image: "/featuredInLogos/Voice-of-america.png",
      id: 1,
    },
    {
      image: "/featuredInLogos/thenews-international.webp",
      id: 2,
    }, 
    {
      image: "/featuredInLogos/tech-in-asia.png",
      id: 3,
    }, 
    {
      image: "/featuredInLogos/profit-by-pakistan.png",
      id: 4,
    },
    {
      image: "/featuredInLogos/BBC-News-Urdu.jpg",
      id: 5,
    },
    {
      image: "/featuredInLogos/Business-recorder-logo-png.png",
      id: 6,
    }, 
    {
      image: "/featuredInLogos/Broadcast-republic.png",
      id: 7,
    },
  
  
  ];

  const lastImageIndex = images?.length - 1;
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <div className={classes.mainheadings}>
        <Typography variant="h3" className={classes.mainheading}>
          Featured In <span className={classes.spanline}></span>
        </Typography>
      </div>
      <div className={classes.root}>
        <Hidden smDown>
          <div className={classes.instagramdiv}>
            <Grid container xs={12} spacing={1} alignItems="center" justify="center" maxWidth={1260}>
              {images?.map((item, i) => (
                <Grid item className={classes.gridroot} xs={3}>
                    <img src={item.image} className={classes.image} alt="icons" />
                </Grid>
              ))}
            </Grid>
          </div>
        </Hidden>
        <Hidden mdUp>
          <Grid container xs={12} spacing={2} alignItems="center" justify="center" className={classes.maindiv}>
            {images?.map((item, i) => (
              <Grid item className={classes.gridroot}>
                    <img src={item.image} className={classes.image} alt="icons" />
              </Grid>
            ))}
          </Grid>
        </Hidden>
      </div>
    </div>
  );
};

export default withApollo()(FeaturedIn);
