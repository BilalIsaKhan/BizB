import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
  },
  topimage: {
    width: "100%",
    height: "100%",
    position: "relative"
  },
  image: {
    width: "100%",
    height: "100%",
    opacity: 0.6,
  },
  topheading: {
    position: "absolute",
    top: "5px",
    left: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    justifyContent: "center",

  },
  heading: {
    color: theme.palette.primary.contrastText,
    margin: theme.spacing(2),
  },
  topgrid: {
    margin: theme.spacing(4),
    display: "flex",

    justifyContent: "center",


  },
  headingtop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid #E5E5E5",




  },
  cartitem: {
    padding: theme.spacing(1),
    display: "flex",

    alignItems: "center",
    justifyContent: "center",

  },
  cartimage: {
    height: "130px",
    width: "120px",

    borderRadius: "10px"
  },
  cartprice: {
    paddingTop: theme.spacing(1),
    color: theme.palette.secondary.selected,
  },
}));

function MainSlider() {
  const classes = useStyles();
  return (
    <div className={classes.root}>

      <div className={classes.topimage}>
        <img src="/cart/viewcart.svg" alt="view cart" className={classes.image} />
        <div className={classes.topheading}>
          <Typography variant="subtitle1" className={classes.heading}>BUY THIS NOW
          </Typography>
          <Typography variant="subtitle1" className={classes.heading}>
            &

          </Typography>
          <Typography variant="subtitle1" className={classes.heading}>Make Fashion Sustainable
          </Typography>
        </div>
      </div>
      <Grid container spacing={3} className={classes.topgrid}>

        <Grid item xs={2} spacing={3}>
          <Typography variant="h4" className={classes.headingtop}>Products
          </Typography>

          <div className={classes.cartitem}>
            <img src='/cart/cart2.svg' alt="CART" className={classes.cartimage}></img>
            <div className={classes.cartitemtext}>      <Typography variant="h4">floral shirt</Typography>
              <Typography variant="h4" className={classes.cartpric}>Store:mariamz</Typography>
              <img src="/cart/icon.svg" alt="dlete" />
            </div>
          </div>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h4" className={classes.headingtop}>Price
          </Typography>
          <Typography variant="h4" className={classes.cartprice}>Rs. 500</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h4" className={classes.headingtop}>Quantity
          </Typography>
          <Typography variant="h4" >1</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h4" className={classes.headingtop}>SubTotal
          </Typography>
          <Typography variant="h4" >Rs. 500</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h4" className={classes.headingtop}>Cart Total
          </Typography>
        </Grid>
      </Grid>

    </div>
  );
}


export default MainSlider;