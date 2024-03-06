import React, { Component } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography } from "@material-ui/core";
import Router from "translations/i18nRouter";
const useStyles = makeStyles((theme) => ({
  mainheading: {
    textTransform: "uppercase",
  },
  ellipse: {
    height: "18px",
    width: "18px",
    borderRadius: "100%",
  },
  cartpayment: {
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
  },
  cartdelivery: {
    fontWeight: 400,
    marginLeft: theme.spacing(3),
    color: "#333333",
  },
  cartdelivery2: {
    width: "350px",
    marginTop: theme.spacing(3),
    fontWeight: 700,
    lineHeight: "39px",
    marginBottom: "10px",
  },
  cartcard: {
    height: "391px",
    width: "391px",
    boxShadow: "3px 3px 12px  rgba(0, 0, 0, 0.05)",
    borderRadius: "18px",
    padding: theme.spacing(2),
  },
  shipping: {
    display: "flex",
    flexDirection: "column",
  },
  empty: {
    height: "1px",
    width: "100%",
    marginTop: theme.spacing(3),
    borderBottom: "1px solid #E5E5E5",
    color: "#000000",
    opacity: "1",
  },
  subtotal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
  },
  subtotalamount: {
    fontWeight: 700,
    lineHeight: "34px",
  },
  orderbutn: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  register: {
    width: "261px",
    height: "48px",
    borderRadius: "40px",
    border: "none",

    display: "flex",
    marginTop: theme.spacing(4),
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
const CartSummary = (props) => {
  const {
    className,
    displayDiscount,
    displayShipping,
    displaydiscount,
    displaySubtotal,
    displaySurcharge,
    displayTax,
    displayTotal,
    isDense,
    isFreeShipping,
    freeText,
    itemLabelText,
    orderTotalLabelText,
    shippingLabelText,
    handlepay,
    surchargesLabelText,
    taxLabelText,
  } = props;
  const classes = useStyles();
  // console.log(displayShipping, "shipp");
  const handleSubmit = () => {
    Router.push("/checkout/order");
  };
  // console.log(props);
  return (
    <>
      {/* <Typography variant="h3" className={classes.mainheading}>
        PAYMENT
      </Typography>
      <div className={classes.cartpayment}>
        <img src="/cart/ellipse.svg" />
        <Typography gutterBottom variant="h4" className={classes.cartdelivery}>
          Cash On Delivery
        </Typography>
      </div>
      <div className={classes.cartcard}>
        <Typography gutterBottom variant="h4" className={classes.cartdelivery2}>
          Cart Total
        </Typography>
        <div className={classes.empty}></div>
        <div className={classes.shipping}>
          <div className={classes.subtotal}>
            <Typography gutterBottom variant="h4">
              Subtotal
            </Typography>
            <Typography gutterBottom variant="h4" className={classes.subtotalamount}>
              {displaySubtotal}
            </Typography>
          </div>
          <div className={classes.subtotal}>
            <Typography gutterBottom variant="h4">
              Shipping Cost
            </Typography>
            <Typography gutterBottom variant="h4" className={classes.subtotalamount}>
              {displayShipping}
            </Typography>
          </div>
        </div>
        <div className={classes.empty}></div>
        <div className={classes.subtotal}>
          <Typography gutterBottom variant="h4">
            Total
          </Typography>
          <Typography gutterBottom variant="h4" className={classes.subtotalamount}>
            {displayTotal}
          </Typography>
        </div>
        <div className={classes.orderbutn}>
          <Button
            className={classes.register}
            InputProps={{ disableUnderline: true }}
            variant="h6"
            role="button"
            type="submit"
            onClick={handlepay()}
          >
            Place Order
          </Button>
        </div>
      </div> */}
    </>
  );
};
export default CartSummary;
CartSummary.propTypes = {
  /**
   * The text for the "Cart" title text.
   */
  cartTitleText: PropTypes.string,
  /**
   * You can provide a `className` prop that will be applied to the outermost DOM element
   * rendered by this component. We do not recommend using this for styling purposes, but
   * it can be useful as a selector in some situations.
   */
  className: PropTypes.string,
  /**
   * Discount amount associated with promo code
   */
  /**
   * Shipping cost
   */
  displayShipping: PropTypes.string,
  /**
   * Subtotal amount
   */
  displaySubtotal: PropTypes.string.isRequired,
  /**
   * Surcharge amount
   */
  displaySurcharge: PropTypes.string,
  /**
   * Calculated tax amount
   */
  displayTax: PropTypes.string,
  /**
   *  /**
   * Calculated discount amount
   */
  displaydiscount: PropTypes.string.isRequired,
  /**
   * Disxount amount
   */
  displayTotal: PropTypes.string.isRequired,
  /**
   * The text for the "FREE" label text.
   */
  freeText: PropTypes.string,
  /**
   * Dense layout with a transparent background color
   */
  isDense: PropTypes.bool,
  /**
   * If a product qualifies for free shipping, display "FREE" for shipping method
   */
  isFreeShipping: PropTypes.bool,
  /**
   * The text for the "Items" label text.
   */
  itemLabelText: PropTypes.string,
  /**
   * Quantity of products in shopping cart
   */
  itemsQuantity: PropTypes.number,
  /**
   * The text for the "items" header text.
   */
  itemsText: PropTypes.string,
  /**
   * The text for the "Order total" label text.
   */
  orderTotalLabelText: PropTypes.string,
  /**
   * The text for the "Promo code applied" text.
   */
  promoCodeText: PropTypes.string,
  /**
   * The text for the "Shipping" label text.
   */
  shippingLabelText: PropTypes.string,
  /**
   * The text for the "Surcharges" label text.
   */
  surchargesLabelText: PropTypes.string,
  /**
   * The text for the "Tax" label text.
   */
  taxLabelText: PropTypes.string,
};
