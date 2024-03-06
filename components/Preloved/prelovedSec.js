import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useRouter } from "next/router";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Element } from "react-scroll";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "40px",
  },
  PrelovedHeader: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "12px",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "40px",
    [theme.breakpoints.down(600)]: {
      fontSize: "2.4rem",
    },
  },
  preloved: {
    [theme.breakpoints.down(600)]: {
      fontSize: "2.4rem",
    },
  },
  PrelovedHeader2: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  subtitle: {
    width: "534px",
    height: "87px",
    display: "flex",
    align: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  subtitlet: {
    color: "#1F1F1F",
    fontFamily: "Lato",
    textAlign: "center",
    [theme.breakpoints.down(600)]: {
      fontSize: "20px",
    },
  },
  carts: {
    position: "relative",
  },
  cart: {
    height: "35px",
    width: "200px",
    bottom: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    flexDirection: "column",
    left: "20px",
    position: "absolute",
  },
  cart2: {
    height: "35px",
    width: "250px",
    bottom: "50%",
    top: "50%",
    right: "2%",
    position: "absolute",
    display: "flex",
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    [theme.breakpoints.down(600)]: {
      top: "50%",
      right: "2%",
    },
  },
  mobileicon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up(900)]: {
      display: "none",
    },
  },
  text: {
    color: theme.palette.primary.contrastText,
    textShadow: "2px 2px 2px rgba(0, 0, 0, 1)",
    textTransform: "uppercase",
    "&:hover": {
      color: theme.palette.primary.contrastText,
    },
  },
  buttonshop: {
    background: theme.palette.secondary.selected,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "150px",
    height: "35px",
    position: "relative",
    border: "none",
    zIndex: 1200,
    right: "50px",
    position: "initial",
    borderRadius: "40px",
    transition: "all 0.2s linear",
    "&:hover": {
      transform: "scale(1.08)",
      transition: "left 0.2s linear",
      background: theme.palette.secondary.selected,
    },
  },
  buttonshopt: {
    fontSize: "22px",
    color: "#000000",
    fontWeight: 900,
    fontStyle: "Black",
    lineHeight: "26px",
    cursor: "pointer",
    fontFamily: "Ostrich Sans Black",
  },
  imagess: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const Preloved = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState({});

  console.log("tags here new", props?.nodes);
  var res = props?.nodes?.reduce((acc, item, index) => {
    acc[`page${index}`] = item;
    return acc;
  }, {});

  const clickHandler = (id) => {
    router.push("/en/categories/" + id);
  };
  const clickHandler2 = (id) => {
    router.push("/en/tmucpage/" + id);
  };

  function FormRow1() {
    return (
      <React.Fragment>
        <Grid item xs={12} md={6} sm={12} lg={6} className={classes.carts}>
          <img src={res?.page1?.heroMediaUrl} className={classes.imagess} alt="category" />
          <div className={classes.cart}>
            <Typography gutterBottom variant="h3" className={classes.text}>
              {res?.page1?.displayTitle}
            </Typography>
            <Button className={classes.buttonshop} onClick={() => clickHandler(res?.page1?._id)}>
              {" "}
              <h4 className={classes.buttonshopt}>SHOP NOW</h4>
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={6} sm={12} lg={6} className={classes.carts}>
          <img src={res?.page8?.heroMediaUrl} className={classes.imagess} alt="category" />

          <div className={classes.cart2}>
            <Typography gutterBottom variant="h3" className={classes.text}>
              {res?.page8?.displayTitle}
            </Typography>
            <Button className={classes.buttonshop} onClick={() => clickHandler(res?.page8?._id)}>
              {" "}
              <h4 className={classes.buttonshopt}>SHOP NOW</h4>
            </Button>
          </div>
        </Grid>
      </React.Fragment>
    );
  }
  function FormRow4() {
    return (
      <React.Fragment>
        <Grid item xs={12} md={5} sm={12} lg={5} className={classes.carts}>
          <img src={res?.page2?.heroMediaUrl} className={classes.imagess} alt="category" />

          <div className={classes.cart2}>
            <Typography gutterBottom variant="h3" className={classes.text}>
              {res?.page2?.displayTitle}
            </Typography>

            <Button className={classes.buttonshop} onClick={() => clickHandler(res?.page2?._id)}>
              <h4 className={classes.buttonshopt}>SHOP Now</h4>
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={7} sm={12} lg={7} className={classes.carts}>
          <img src={res?.page0?.heroMediaUrl} className={classes.imagess} alt="category" />

          <div className={classes.cart2}>
            <Typography gutterBottom variant="h3" className={classes.text}>
              {res?.page0?.displayTitle}
            </Typography>
            <Button className={classes.buttonshop} onClick={() => clickHandler(res?.page0?._id)}>
              <h4 className={classes.buttonshopt}>SHOP NOW</h4>
            </Button>
          </div>
        </Grid>
      </React.Fragment>
    );
  }
  function FormRow3() {
    return (
      <React.Fragment>
        <Grid item xs={12} md={6} sm={12} lg={6} className={classes.carts}>
          <img src={res?.page5?.heroMediaUrl} className={classes.imagess} alt="category" />

          <div className={classes.cart2}>
            <Typography gutterBottom variant="h3" className={classes.text}>
              {res?.page5?.displayTitle}
            </Typography>
            <Button className={classes.buttonshop} onClick={() => clickHandler(res?.page5?._id)}>
              {" "}
              <h4 className={classes.buttonshopt}>SHOP NOW</h4>
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={6} sm={12} lg={6} className={classes.carts}>
          <img src={res?.page7?.heroMediaUrl} className={classes.imagess} alt="category" />

          <div className={classes.cart2}>
            <Typography gutterBottom variant="h3" className={classes.text}>
              {res?.page7?.displayTitle}
            </Typography>
            <Button className={classes.buttonshop} onClick={() => clickHandler(res?.page7?._id)}>
              {" "}
              <h4 className={classes.buttonshopt}>SHOP NOW</h4>
            </Button>
          </div>
        </Grid>
      </React.Fragment>
    );
  }
  function FormRow2() {
    return (
      <React.Fragment>
        <Grid item xs={12} className={classes.carts}>
          <img src={res?.page6?.heroMediaUrl} className={classes.imagess} alt="category" />

          <div className={classes.cart2}>
            <Typography gutterBottom variant="h3" className={classes.text}>
              {res?.page6?.displayTitle}
            </Typography>
            <Button className={classes.buttonshop} onClick={() => clickHandler(res?.page6?._id)}>
              {" "}
              <h4 className={classes.buttonshopt}>SHOP NOW</h4>
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} container className={classes.carts}>
          <img src={res?.page4?.heroMediaUrl} className={classes.imagess} alt="category" />

          <div className={classes.cart}>
            <Typography gutterBottom variant="h3" className={classes.text}>
              {res?.page4?.displayTitle}
            </Typography>
            <Button className={classes.buttonshop} onClick={() => clickHandler(res?.page4?._id)}>
              {" "}
              <Element name="target-element"></Element>
              <h4 className={classes.buttonshopt}>SHOP NOW</h4>
            </Button>
          </div>
        </Grid>

        <Grid item xs={12} container className={classes.carts}>
          <img src={res?.page3?.heroMediaUrl} className={classes.imagess} alt="category" />

          <div className={classes.cart2}>
            <Typography gutterBottom variant="h3" className={classes.text}>
              {res?.page3?.displayTitle}
            </Typography>
            <Button className={classes.buttonshop} onClick={() => clickHandler2(res?.page3?._id)}>
              {" "}
              <Element name="target-element"></Element>
              <h4 className={classes.buttonshopt}>SHOP NOW</h4>
            </Button>
          </div>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <>
      <Container className={classes.PrelovedHeader}>
        <Typography className={classes.preloved} style={{ fontFamily: "Ostrich Sans Black" }} variant="h1">
          Share Your
        </Typography>
        <Container className={classes.PrelovedHeader2}>
          <Typography
            className={classes.preloved}
            style={{ fontFamily: "Ostrich Sans Black", marginRight: "10px" }}
            variant="h2"
          >
            PRE-LOVED
          </Typography>
          <Typography className={classes.preloved} style={{ fontFamily: "Ostrich Sans Black" }} variant="h1">
            Fashion
          </Typography>
        </Container>
      </Container>
      <div className={classes.root2}>
        <Box className={classes.subtitle}>
          <Typography variant="h4" className={classes.subtitlet}>
            Now you can revamp your daily wear wardrobe every month while saving more than 50% from your monthly budget!
          </Typography>
        </Box>
      </div>

      <div>
        <Grid container>
          <Grid container item xs={12} md={12} sm={12} lg={12}>
            <FormRow1 />
          </Grid>
          <Grid container item xs={12} md={8} sm={12} lg={8}>
            <FormRow4 />
            <FormRow3 />
          </Grid>
          <Grid container item xs={12} md={4} sm={12} lg={4}>
            <FormRow2 />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Preloved;
