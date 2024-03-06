import { useEffect } from "react";

const CheckoutButton = ({ order }) => {
  useEffect(() => {
    window.dataLayer?.push("event", "Successful Checkout", {
      order,
    });
    console.log("Successful Checkout");
  }, [order]);

  return <span style={{ display: "none" }}>Checkout</span>;
};

export default CheckoutButton;
