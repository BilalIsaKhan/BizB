import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
const OurBlogs = () => {
  const useStyles = makeStyles((theme) => ({
    root: {

      // paddingRight: "50px",
    },
    look: {
      overflow: "hidden",
      height: "225px",
      width: "426px",
      marginTop: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadious: "0px",
      backgroundColor: theme.palette.reaction.blog1,
      transition: "left 0.8s linear",
      [theme.breakpoints.down(600)]: {
        width: "92vw",
        paddingRight: "0",
        paddingLeft: "0",
      },
    },
    wardrobe: {
      overflow: "hidden",
      height: "225px",
      width: "426px",
      marginTop: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadious: "0px",
      backgroundColor: theme.palette.reaction.blog2,
      [theme.breakpoints.down(600)]: {
        width: "92vw",
        paddingRight: "0",
        paddingLeft: "0",
      },
    },
    trend: {
      overflow: "hidden",
      height: "225px",
      width: "426px",
      marginTop: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadious: "0px",
      backgroundColor: theme.palette.reaction.blog3,
      [theme.breakpoints.down(600)]: {
        width: "92vw",
        paddingRight: "0",
        paddingLeft: "0",
      },
    },
    mainheading: {
      display: "flex",
      marginTop: "30px",
      marginBottom: "30px",
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
    blogtext: {
      padding: "20px",
    },
    blogtextr: {
      color: theme.palette.secondary.selected,
    },
    gridroot: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      [theme.breakpoints.down(600)]: {
        paddingLeft: "10%",
      },

    },
    spanofnextword: {
      color: "#FDC114",
      marginLeft: "10px",
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.mainheadings}>
        <Typography variant="h3" className={classes.mainheading}>
          our blogs <span className={classes.spanline}></span>
        </Typography>
      </div>
      <Grid container spacing={3} className={classes.gridroot}>
        <Grid item>
          <Box className={classes.look}>
            <Typography variant="h4" className={classes.blogtext}>
              Get the perfect Look
            </Typography>

            <Typography variant="h6" className={classes.blogtext}>
              Constantly hustling day in day out and still putting a smile on your face is what makes you a Queen. But
              even the queen needs some…{" "}
              <a
                target="_blank"
                href="https://blog.bizb.store/summer-fashion-tips-2/"
              >
                <span className={classes.blogtextr}>Read More</span>
              </a>
            </Typography>
          </Box>

        </Grid>
        <Grid item>
          <Box className={classes.wardrobe}>
            <Typography variant="h4" className={classes.blogtext}>
              Circular Economy
            </Typography>
            <Typography variant="h6" className={classes.blogtext}>
              Why is second hand apparel so important for the planet? Because sustainability and ethical consumerism is
              one of the biggest issues …{" "}
              <a
                target="_blank"
                href="https://blog.bizb.store/shopping-for-thrift-clothing/"
              >
                <span className={classes.blogtextr}>Read More</span>
              </a>
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box className={classes.trend}>
            <Typography variant="h4" className={classes.blogtext}>
              Making Sustainability Stylish
            </Typography>
            <Typography variant="h6" className={classes.blogtext}>
              Second-hand market has been on the rise across the globe for years with the COVID-19 pandemic providing an
              additional boost bringing…
              <a target="_blank" href="https://blog.bizb.store/making-sustainability-stylish-breaking-cliches-about-buying-second-hand-apparel/">
                <span className={classes.blogtextr}>Read More</span>
              </a>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default OurBlogs;
