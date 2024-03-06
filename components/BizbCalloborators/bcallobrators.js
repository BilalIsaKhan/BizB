import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

const BizbCalloborators = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      background: theme.palette.action.main,

      position: "relative",
      width: "100%",
    },
    buttonshop: {
      background: theme.palette.secondary.selected,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "40px",
      width: "120px",
      height: "48px",
      // right: "50px",

      transition: "all 0.2s linear",
      "&:hover": {
        transform: "scale(1.08)",
        transition: "left 0.2s linear",
      },
      [theme.breakpoints.down(600)]: {
        width: "10px",
        height: "10px",
      },
      [theme.breakpoints.down(600)]: {
        width: "10px",
        height: "10px",
      },
    },
    buttonshop: {
      background: theme.palette.secondary.selected,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      borderRadius: "40px",
      width: "120px",
      height: "48px",
      right: "50px",

      transition: "all 0.2s linear",
      "&:hover": {
        transform: "scale(1.08)",
        transition: "left 0.2s linear",
      },
      [theme.breakpoints.down(600)]: {
        width: "60px",
        height: "15px",
      },
      [theme.breakpoints.down(600)]: {
        width: "60px",
        height: "15px",
      },
    },
    buttonshopt: {
      cursor:"pointer",
      fontSize: "22px",
      fontFamily: "Ostrich Sans Black",
      color: "#000000",
      fontWeight: 900,
      fontStyle: "Black",
      lineHeight: "26px",

      background: "none",
      border: "none",
      [theme.breakpoints.down(600)]: {
        fontSize: "10px",
        lineHeight: "6px",
      },
    },

    image: {
      position: "relative",
      marginTop: "40px",
      width: "100%",
    },
    collobarotors: {
      width: "100%",
      // height:"200px",
      position: "relative",
      marginBottom: "40px",
    },
    cart: {
      display:"flex",
      flexDirextion:"row",
      width: "2%",
      height: "6%",
      position: "absolute",
      left: "63%",
      // right: "10px",
      bottom: "8%",
      fontFamily: "Ostrich Sans Black",
      [theme.breakpoints.down(600)]: {
        left: "25%",
      },
      
    },
    cart1: {
      display:"flex",
      flexDirextion:"row",
      width: "10%",
      height: "6%",
      position: "absolute",
      right: "11%",
      bottom: "8%",
      fontFamily: "Ostrich Sans Black",
      [theme.breakpoints.down(600)]: {
        marginRight: "65px",
      },
      marginRight: "100px",
     
    },
    cart2: {
      display:"flex",
      flexDirextion:"row",
      width: "10%",
      height: "6%",
      position: "absolute",
      right: "28%",
      bottom: "8%",
      fontFamily: "Ostrich Sans Black",
      [theme.breakpoints.down(600)]: {
        right: "64%",
      },
      
      // marginLeft:"160px",
    },
    textclass: {
      height: "6%",
      position: "absolute",
      bottom: "28%",
      marginBottom: "10px",
      display: "block",
      left: "20px",
      fontFamily: "Ostrich Sans Black",
      [theme.breakpoints.down(600)]: {
        height: "3%",
      },
    },
    textclass2: {
      height: "6%",
      position: "absolute",
      bottom: "23%",
      display: "block",
      marginBottom: "10px",
      left: "20px",
      fontFamily: "Ostrich Sans Black",
      [theme.breakpoints.down(600)]: {
        bottom: "20%",
      },
    },
    textclass3: {
      width: "87%",
      position: "absolute",
      borderBottom: "3px solid white",
      bottom: "17%",
      display: "block",
      left: "20px",
      [theme.breakpoints.down(600)]: {
        bottom: "16%",
        width: "67%",
        borderBottom: "1px solid white",
      },
    },

    text: {
      color: "white",
      textShadow: "2px 2px 2px rgba(0, 0, 0, 1)",
      textTransform: "uppercase",
      fontSize: "30px",
      padding: "1px",
      textAlign: "center",
      [theme.breakpoints.down(600)]: {
        fontSize: "10px",
        padding: 0,
      },
    },
    text2: {
      color: "#FDC114",
      textShadow: "2px 2px 2px rgba(0, 0, 0, 1)",
      textTransform: "uppercase",
      fontSize: "40px",
      letterSpacing: "1px",
      padding: "1px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "11px",
        letterSpacing: "0",
        padding: 0,
      },
    
      [theme.breakpoints.up("xl")]: {
        fontSize: "54px",
        letterSpacing: "0",
        padding: 0,
      },
    },
    textbg: {
      backgroundColor: "red",
      width: "120%",
    },
  
    imagesicons: {
      height: "40px",
      width: "40px",
      marginTop:"5px",
      marginLeft:"5px",
      [theme.breakpoints.down(600)]: {
        height: "13px",
      width: "13px",
      marginLeft:"2px",
      marginTop:"2px",


      },
    },
    buttonIcon: {
      background: theme.palette.secondary.selected,
      display: "flex",
      marginRight:"5px",  
      borderRadius: "40px",
      width: "50px",
      height: "50px",
      [theme.breakpoints.down(600)]: {
        height: "17px",
      width: "17px",
      marginRight:"7px",
      marginTop:"0px",

      },

    },
  }));

  const classes = useStyles();
  return (
    <Box display={{ xs: "block", lg: "block", xl: "block" }} style={{ position: "relative" }}>
      <Grid
        container
        xs={12}
      >
        <Grid item xs={4} style={{}}>
          <div className={classes.collobarotors}>
            <img src="/BizbCollaborator/Sumona .jpg" className={classes.image} alt="influencers" />
            <div className={classes.textclass}>
              <div className={classes.textbg}>
                <Typography gutterBottom className={classes.text}>
                  Fashion
                </Typography>
              </div>
            </div>
            <div className={classes.textclass2}>
              <Typography gutterBottom className={classes.text2}>
                Influencers are choosing sustainable!
              </Typography>
            </div>
            <div className={classes.textclass3}></div>
              <div className={classes.cart1}>
                <a href="https://www.instagram.com/sumonazhd/" target="_blank">
                <div className={classes.buttonIcon}>
                  <img src="/icons/instalogo.png" className={classes.imagesicons} alt="influencers" />
                  </div>
                </a>
                <a href="https://bizb.store/en/profile/802e349eb3bd4c49">
                  <div className={classes.buttonshop}>
                    <button className={classes.buttonshopt}>SHOP NOW</button>
                  </div>
                </a>
              </div>
          </div>
        </Grid>
        <Grid item xs={4} style={{}}>
          <div className={classes.collobarotors}>
            <img src="/BizbCollaborator/Maria.jpg" className={classes.image} alt="influencers" />
            <div className={classes.textclass}>
              <div className={classes.textbg}>
                <Typography gutterBottom className={classes.text}>
                  Fashion
                </Typography>
              </div>
            </div>
            <div className={classes.textclass2}>
              <Typography gutterBottom className={classes.text2} style={{ width: "80%" }}>
                Buy From Influencer Wardrobes
              </Typography>
            </div>
            <div className={classes.textclass3}></div>
              <div className={classes.cart2}>
              <a href="https://www.instagram.com/mariaammarandson/" target="_blank">
              <div className={classes.buttonIcon}>
                  <img src="/icons/instalogo.png" className={classes.imagesicons} alt="icons" />
                  </div>                </a>
                <a href="https://bizb.store/en/profile/260bf9d48d9347e9" >

                <div className={classes.buttonshop}>
                  <button className={classes.buttonshopt} variant="h4">
                    SHOP NOW
                  </button>
                </div>
                </a>

              </div>
          </div>
        </Grid>
        <Grid item xs={4} style={{}}>
          <div className={classes.collobarotors}>
            <img src="/BizbCollaborator/Roha.jpg" className={classes.image} alt="influencers" />
            <div className={classes.textclass}>
              <div className={classes.textbg}>
                <Typography gutterBottom className={classes.text}>
                  Fashion
                </Typography>
              </div>
            </div>
            <div className={classes.textclass2}>
              <Typography gutterBottom className={classes.text2} style={{ color: "white" }}>
                Influencers-de-clutter with bizb!
              </Typography>
            </div>
            <div className={classes.textclass3}></div>
              <div className={classes.cart}>
              <a href="https://www.instagram.com/teatimewithroha/" target="_blank">
              <div className={classes.buttonIcon}>
                  <img src="/icons/instalogo.png" className={classes.imagesicons} alt="icons" />
                  </div>                </a>
                <a href="https://bizb.store/en/profile/65bc957f17dac5e257937a4c" >
                <div className={classes.buttonshop}>
                  <button className={classes.buttonshopt} variant="h4">
                    SHOP NOW
                  </button>
                </div>
                </a>
              </div>
          </div>
        </Grid>
      </Grid>
      {/* <Grid container xs={12}>
        <div className={classes.collobarotors}>
          <img src="/BizbCollaborator/sheefa.webp" className={classes.image} />

          {/* <a href="/en/categories/cmVhY3Rpb24vdGFnOnR1VExZUzQ5aEhUQmtoZldF">
            <div className={classes.cart}>
              <div className={classes.buttonshop}>
                <button className={classes.buttonshopt} variant="h4">
                  SHOP NOW
                </button>
              </div>
            </div>
          </a> */}
      {/* </div>
      </Grid> */}
      {/* </div>
      </Grid> */}
    </Box>
  );
};

export default BizbCalloborators;
