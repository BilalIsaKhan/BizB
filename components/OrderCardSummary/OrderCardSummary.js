import React, { Component } from "react";
import PropTypes from "prop-types";
import CartSummary from "@reactioncommerce/components/CartSummary/v1";

class OrderCardSummary extends Component {
  static propTypes = {
    classes: PropTypes.object,
    summary: PropTypes.shape({
      fulfillmentTotal: PropTypes.shape({
        displayAmount: PropTypes.string,
      }),
      itemTotal: PropTypes.shape({
        displayAmount: PropTypes.string,
      }),
      surchargeTotal: PropTypes.shape({
        displayAmount: PropTypes.string,
      }),
      taxTotal: PropTypes.shape({
        displayAmount: PropTypes.string,
      }),
      discountTotal: PropTypes.shape({
        displayAmount: PropTypes.string,
      }),
      total: PropTypes.shape({
        displayAmount: PropTypes.string,
      }),
    }),
  };

  render() {
    const { summary } = this.props;

    if (summary) {
      const { fulfillmentTotal, itemTotal, surchargeTotal, taxTotal, discountTotal, total } = summary;

      return (
        <>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
        <span>Discount: </span>
        <span>{discountTotal && discountTotal.amount ?discountTotal.amount: 0 }</span>
        </div>
        <CartSummary
          isDense
          displayShipping={
            fulfillmentTotal && fulfillmentTotal.displayAmount?.replace(/\.00$/, "").replace(/\$/g, "RS ")
          }
          displaySubtotal={itemTotal && itemTotal.displayAmount?.replace(/\.00$/, "").replace(/\$/g, "RS ")}
          displaySurcharge={surchargeTotal && surchargeTotal.displayAmount?.replace(/\.00$/, "").replace(/\$/g, "RS ")}
          displayTax={taxTotal && taxTotal.displayAmount?.replace(/\.00$/, "").replace(/\$/g, "RS ")}
          displaydiscount={discountTotal && discountTotal.displayAmount?.replace(/\.00$/, "").replace(/\$/g, "RS ")}
          displayTotal={total && total.displayAmount?.replace(/\.00$/, "").replace(/\$/g, "RS ")}

          />
          </>
      )
    }

    return null;
  }
}

export default OrderCardSummary;
