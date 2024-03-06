
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
const Mobileheader = (props) => {

  // console.log(props, "new products");
  const useStyles = makeStyles((theme) => ({
    mobileview: {
      height: "60px",
      width: "350px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      paddig: "8px",
      alignItems: "center",
      background: theme.palette.reaction.black80,
      borderRadius: "90px",
      zIndex: 9999,
      bottom: "10px",
      position: "fixed",
      display: "none",
      [theme.breakpoints.down(700)]: {
        display: "block",
        height: "60px",
        width: "90vw",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddig: "8px",
        alignItems: "center",
        background: theme.palette.reaction.black80,
        borderRadius: "90px",
        zIndex: 1,
        bottom: "10px",
        position: "fixed",
      },
    },
    mobileviewfixed: {
      display: "flex",
      flexDirection: "row",
      alignItems: "space-evenly",
      justifyContent: "sapce-between",
    },
    mobileviewfixedText: {
      color: "#ffffff",
    },
    imagess: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.mobileview}>
      <a href="/">
        <div className={classes.mobileviewfixed}>
          <img src="/app-section/home.svg" alt="icons"/>
          <Typography style={{ marginLeft: "5px" }} variant="h5" className={classes.mobileviewfixedText}>
            {" "}
            Home{" "}
          </Typography>
        </div>
      </a>

      <a href="/en/SellerRegistrationPage">
        <div className={classes.mobileviewfixed}>
          {" "}
          <img src="/app-section/sell-icn.svg" alt="icons" />
          <a target="_blank" href="/en/SellerRegistrationPage">
            <Typography style={{ marginLeft: "5px" }} variant="h5" className={classes.mobileviewfixedText}>
              {" "}
              Sell
            </Typography>
          </a>
        </div>
      </a>
      <a href="/en/categories/cmVhY3Rpb24vdGFnOjdKWVRGeGlZNXlKQkNwNENj">
        <div className={classes.mobileviewfixed}>
          {" "}
          <img src="/app-section/explore.svg" alt="icons"/>
          <Typography style={{ marginLeft: "5px" }} variant="h5" className={classes.mobileviewfixedText}>
            {" "}
            Explore
          </Typography>
        </div>
      </a>
    </div>
  );
};

export default Mobileheader;
