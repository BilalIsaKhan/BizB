/* eslint-disable react/no-multi-comp */

import { useMutation } from "@apollo/client";
import Router from "translations/i18nRouter";
import CloseIcon from "@material-ui/icons/Close";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import { useFormik, useFormikContext } from "formik";
import Link from "components/Link";
import useGetShipping from "../../hooks/shippingprice/usegetShipping";
import Select, { components } from "react-select";
import formatCurrency from "lib/utils/formatCurrency";
import { placeOrderQuery } from "../../hooks/orders/query";
import TagManager from "react-gtm-module";
import GTMCheckout from "components/GTMCheckout";
import useApplyPromoCode from "../../hooks/promoCode/useApplyPromoCode";
import ReactGA from "react-ga4";
import useViewer from "../../hooks/viewer/useViewer";
import useMakeTransaction from "../../hooks/wallet/makeTransaction.js";

const useStyles = makeStyles((theme) => ({
  formerror: {
    paddingLeft: theme.spacing(1),
    fontSize: "16px",
    cursor: "pointer",
    color: "#b22b27",
    fontFamily: "Lato",
  },
  label: {
    width: "100%",
    display: "flex",
    marginTop: theme.spacing(1),
    fontSize: "24px",
    marginBottom: theme.spacing(1),
    color: "#333333",
    flexDirection: "column",
  },
  toast: {
    background: "yellow",
    color: "black",
  },
  switchEntryMode: {
    textAlign: "center",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  input: {
    width: "100%",
    height: "48px",
    borderRadius: "6px",
    color: "red",
    justifyContent: "center",
    paddingLeft: theme.spacing(2),
    background: "#F7F7F9",
    borderBottomColor: "none",
    "& .MuiInputBase-input": {
      color: "#969696",
      fontSize: "16px",
      fontFamily: "lato",
      padding: "opx",
    },
    "& .MuiInputBase-input.active": {
      color: "#eeeeeeeeeee6",
      fontSize: "17px",
      padding: "opx",
    },
  },
  promoField: {
    width: "100%",
    height: "48px",
    borderRadius: "6px",
    color: "red",
    justifyContent: "center",
    paddingLeft: theme.spacing(2),
    background: "#F7F7F9",
    borderBottomColor: "none",
    "& .MuiInputBase-input": {
      color: "#969696",
      fontSize: "16px",
      fontFamily: "lato",
      padding: "opx",
    },
    "& .MuiInputBase-input.active": {
      color: "#eeeeeeeeeee6",
      fontSize: "17px",
      padding: "opx",
    },
  },
  inputitem: {
    width: "100%",
  },
  inputitem2: {
    width: "100%",
  },
  inputorder: {
    width: "100%",
    height: "218px",
    borderRadius: "6px",
    color: "red",
    paddingLeft: theme.spacing(2),
    background: "#F7F7F9",
    borderBottomColor: "none",
    "& .MuiInputBase-input": {
      color: "#969696",
      fontSize: "16px",
      fontFamily: "lato",
      padding: "0px",
    },
    "& .MuiInputBase-input.active": {
      color: "#eeeeeeeeeee6",
      fontSize: "17px",
      padding: "0px",
    },
  },
  register: {
    width: "214px",
    height: "48px",
    borderRadius: "40px",
    border: "none",
    display: "flex",
    background: theme.palette.secondary.selected,
    "&:hover": {
      transform: "scale(1.08)",
      transition: "left 0.2s linear",
      background: "#FDC114",
    },
  },
  promoBtn: {
    width: "100%",
    height: "48px",
    borderRadius: "8px",
    border: "none",
    display: "flex",
    textTransform: "uppercase",
    // marginLeft: "10px",
    background: theme.palette.secondary.selected,
    "&:hover": {
      transform: "scale(1.08)",
      transition: "left 0.2s linear",
      background: "#FDC114",
    },
  },
  socialmedia: {
    width: "250px",
    height: "48px",
    borderRadius: "40px",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px",

    background: theme.palette.secondary.selected,
  },
  topheader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  terms: {
    lineHeight: "100px",
  },
  checkbox: {
    color: "green",
    "& .MuiIconButton-label ": {
      color: theme.palette.secondary.selected,
    },
  },

  checkboxdiv: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderBottom: `solid 1px  #00000030 `,
  },
  register2: {
    fontSize: "18px",
    color: "#333333",
    fontFamily: "Ostrich Sans Black",
    fontWeight: 900,
    lineHeight: "24px",
    fontStyle: "normal",
    marginLeft: "15px",
  },
  socialmedia2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  switchaccout: {
    color: "#FDC114",
  },
  mainheadingp: {
    textTransform: "lowercase",
    alignItems: "center",
    width: "100%",
    fontSize: "1.5rem",
    marginBottom: 20,
  },

  phone: {
    color: "#333333",
    fontSize: "17px",
  },
  mainheading: {
    fontSize: "1.5rem",
    textTransform: "uppercase",
    alignItems: "center",
    width: "100%",
  },
  ellipse: {
    height: "18px",
    width: "18px",
    borderRadius: "100%",
  },
  cartpayment: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  cartdelivery: {
    fontWeight: 500,
    fontSize: "1rem",
    color: "#333333",
    marginLeft: theme.spacing(2),
  },
  storeName: {
    fontSize: "0.9rem",
    "&:hover": {
      color: "#FDC114",
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  cartname: {
    fontWeight: 500,
    textTransform: "capitalize",
    fontSize: "1rem",
    color: "#333333",
    marginLeft: theme.spacing(2),
  },
  cartdescription: {
    fontWeight: 400,
    marginTop: "0px",

    marginLeft: theme.spacing(2),
  },
  cartdelivery2: {
    width: "350px",
    marginTop: theme.spacing(3),
    fontWeight: 700,
    lineHeight: "39px",
    marginBottom: "10px",
  },
  cartcard: {
    width: "100%",
    boxShadow: "3px 3px 12px  rgba(0, 0, 0, 0.05)",
    borderRadius: "18px",
    padding: theme.spacing(2),
  },
  cartcard3: {
    width: "100%",
    // boxShadow: "3px 3px 12px  rgba(0, 0, 0, 0.05)",
    // borderRadius: "18px",
    padding: theme.spacing(2),
    borderBottom: "1px solid #f6f6f6",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  cartcard2: {
    width: "100%",
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
    fontSize: "1rem",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
  },
  subtotalamount: {
    fontSize: "1rem",
    fontWeight: 700,
    lineHeight: "34px",
  },
  orderbutn: {
    width: "100%",
    display: "flex",
    // marginLeft: "75px",
  },
  summary: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingRight: "5%",
    paddingLeft: "5%",
  },
  shippingdetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    paddingRight: "5%",
    paddingLeft: "5%",
  },
  gridshipp: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  saveinfoordernotes: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  labelSpan: {
    width: "100%",
    fontSize: "1rem",
  },
  register: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "261px",
    height: "48px",
    borderRadius: "40px",
    border: "none",

    display: "flex",
    marginTop: theme.spacing(4),

    background: theme.palette.secondary.selected,
    "&:hover": {
      transform: "scale(1.08)",
      transition: "left 0.2s linear",
      background: "#FDC114",
    },
  },
  Gridmain: {
    display: "flex",

    justifyContent: "center",
  },
  displayCart: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    marginRight: 40,
  },
  displayCartGrid: {
    margin: 0,
    justifyContent: "flex-start",
  },
  divider: {
    marginVertical: 10,
    height: 6,
    backgroundColor: "#e0e0e0",
  },
}));

const CheckoutActions = (prop) => {
  const [viewer, , refetch2] = useViewer();

  const [makeTransaction, loading2] = useMakeTransaction();


  console.log("props", prop);
  const { cart, apolloClient, cartStore } = prop;
  const CustomCloseButton = () => <CloseIcon Style={{ backgroundColor: "#FDC114", color: "black", height: "15px" }} />;

  const [selectedOption, setSelectedOption] = useState(null);
  const { fulfillmentTotal, itemTotal, surchargeTotal, taxTotal, total } = cart.checkout.summary;
  const cartId = cartStore.hasAccountCart ? cartStore.accountCartId : cartStore.anonymousCartId;
  // console.log(cart.checkout.summary.itemTotal.amount + 10, "prop");
  // const [checkedEmail, setCheckedEmail] = React.useState(false);
  const [placeOrder] = useMutation(placeOrderQuery);
  const [getValue, setValue] = useState({});
  const [orderDisable, setOrderDisable] = useState(false);
  const [orderDisable2, setOrderDisable2] = useState(false);

  const [promoCode, setPromoCode] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorPromo, setErrorPromo] = useState("");
  const [applyPromo, data, loadingAfterPromo] = useApplyPromoCode();
  const [isDisabledPromo, setIsDisabledPromo] = useState(false);

  console.log("checkout actions page");

  React.useEffect(() => {
    if (viewer?._id) {
      console.log("isAuth here in cart", viewer);
    }
  }, [viewer]);

  useEffect(() => {
    setIsDisabledPromo(!promoCode || isDisabled || cart?.checkout?.summary?.discountTotal?.amount !== 0);
  }, [promoCode, isDisabled, cart]);

  // console.log("helo", afterPromo, data, loadingAfterPromo);
  const classes = useStyles();
  // console.log("class", cart?.checkout?.summary?.itemTotal?.amount);
  useEffect(() => {
    console.log("cart is ", cart);
    setIsDisabled(false);
    setPromoCode("");
  }, [cart]);

  useEffect(() => {
    if ((cart?.checkout?.summary?.discountTotal?.amount) === 0) {
      console.log("running this condition");
      setSubTotal((cart?.checkout?.summary?.total?.amount));
    } else {
      setSubTotal((cart?.checkout?.summary?.total?.amount));
    }
  }, [cart, getValue?.phonenumber]);

  const [subtotal, setSubTotal] = useState((cart?.checkout?.summary?.total?.amount));
  console.log("subtotalsubtotal", subtotal);
  const [error, setError] = useState("");

  const items = cart.items.map((item) => ({
    addedAt: item.addedAt,
    price: item.price.amount,
    productConfiguration: item.productConfiguration,
    quantity: item.quantity,
  }));

  useEffect(() => {
    console.log("itemitems", items);
    // Track "Checkout Initiated" event with Google Analytics 4
  }, []);
  // console.log(cart);
  const handlepay = async (values, action) => {
    try {
      setOrderDisable(true);
      console.log("getValue.phonenumber", values);
      ReactGA.send({
        category: "Ecommerce",
        action: "checkout_initiated",
        label: "Checkout Initiated", // Optional event label
        nonInteraction: true, // Optional: Set to true if this event is non-interactive
        value: 0, // Optional: Set a numeric value for the event
        products: cart.items.map((item) => ({
          id: item.productConfiguration.productId,
          price: item.price.amount,
          quantity: item.quantity, // Adjust the quantity for each product as needed
        })), // Include the product details here as an array
      });
      const initiatedCheckoutData = {
        event: "initiatedCheckout",
        ecommerce: {
          checkout: {
            products: cart.items.map((item) => ({
              id: item.productConfiguration.productId,
              price: item.price.amount,
              quantity: item.quantity, // Adjust the quantity for each product as needed
            })),
          },
        },
      };

      TagManager.dataLayer({
        dataLayer: initiatedCheckoutData,
      });

      const { data } = await placeOrder({
        variables: {
          order: {
            cartId: cartStore.accountCartId,
            currencyCode: cart.shop.currency.code,

            email: values.email,

            fulfillmentGroups: [
              {
                data: {
                  shippingAddress: {
                    address1: values.CompleteAddress,
                    address2: values.orderNotes,
                    city: values.city,
                    company: null,
                    country: "pakistan",
                    fullName: values.FullName,
                    isBillingDefault: false,
                    isCommercial: false,
                    isShippingDefault: false,
                    phone: values.phonenumber,
                    postal: "",
                    region: "",
                  },
                },
                //                  const initialValues = {
                //    email: "",
                //    FullName: "",
                //    phonenumber: "",
                //    CompleteAddress: "",
                //    orderNotes: "",

                //    city:"",
                //  };
                items,
                // displayShipping: fulfillmentTotal && fulfillmentTotal.displayAmount,
                // displaySubtotal: itemTotal.displayAmount,
                // displaySurcharge: surchargeTotal.displayAmount,
                // displayTotal: total.displayAmount,
                // displayTax: taxTotal && taxTotal.displayAmount,
                shopId: cart.shop._id,
                totalPrice: subtotal + shippingData?.cost,
                type: "shipping",
                selectedFulfillmentMethodId: shippingData?._id,
              },
            ],
            shopId: cart.shop._id,
          },
          payments: [
            {
              amount: subtotal + shippingData?.cost,

              method: "iou_example",
            },
          ],

          total: subtotal + shippingData?.cost,
          totalItemQuantity: 1,
        },
      });
      setOrderDisable(false);

      console.log("Order", placeOrder);

      const {
        placeOrder: { orders, token },
      } = data;
      toast.success("Order placed successfully!");
      window.dataLayer?.push("event", "Order placed", {
        price: subtotal + shippingData?.cost,
      });
      console.log("Order placed successfully");
      // ReactGA.send({
      //   hitType: "event",
      //   eventCategory: "Ecommerce",
      //   eventAction: "successful_checkout",
      // });
      ReactGA.event({
        category: "Ecommerce",
        action: "successful_checkout",
        label: "Successful  Checkout", // Optional event label
        nonInteraction: true, // Optional: Set to true if this event is non-interactive
        value: 0, // Optional: Set a numeric value for the event
        products: cart.items.map((item) => ({
          id: item.productConfiguration.productId,
          price: item.price.amount,
          quantity: item.quantity, // Adjust the quantity for each product as needed
        })), // Include the product details here as an array
      });

      // Send user to order confirmation page
      Router.push(`/checkout/order?orderId=${orders[0].referenceId}${token ? `&token=${token}` : ""}`);

      cartStore.clearAnonymousCartCredentials();
      clearAuthenticatedUsersCart();

      // Also destroy the collected and cached payment input
      cartStore.resetCheckoutPayments();
    } catch (error) {
      // ReactGA.send({
      //   hitType: "event",
      //   eventCategory: "Ecommerce",
      //   eventAction: "failed_checkout",
      // });
      ReactGA.event({
        category: "Ecommerce",
        action: "failed_checkout",
        label: "Failed Checkout", // Optional event label
        nonInteraction: true, // Optional: Set to true if this event is non-interactive
        value: 0, // Optional: Set a numeric value for the event
        products: cart.items.map((item) => ({
          id: item.productConfiguration.productId,
          price: item.price.amount,
          quantity: item.quantity, // Adjust the quantity for each product as needed
        })), // Include the product details here as an array
      });
      setOrderDisable(false);

      console.log(error);
    }
  };
  const [initialValues, setInitialValues] = useState({
    email: viewer && viewer?.primaryEmailAddress ? viewer.primaryEmailAddress : "",
    FullName: viewer && viewer?.name ? viewer.name : "",
    phonenumber: viewer && viewer?.phoneNumber ? viewer.phoneNumber : "",
    CompleteAddress: viewer && viewer?.storeInfo?.pickUpAddress ? viewer.storeInfo?.pickUpAddress : "",
    orderNotes: "",
    city: viewer && viewer?.storeInfo?.city ? viewer.storeInfo?.city : "",
  });
  // setSubTotal(formatCurrency(cart?.checkout?.summary?.itemTotal?.amount));
  const handleApplyPromo = async () => {
    makeYourTransaction()

    setOrderDisable2(true);
    try {
      setErrorPromo("");
      // console.log("")
      const response = await applyPromo({
        variables: {
          input: {
            discountCode: promoCode,
            cartId: prop?.cartStore?.anonymousCartId || prop.cartStore?.accountCartId,
            shopId: prop.cart?.shop?._id,
            token: prop?.cartStore?.anonymousCartToken || null,
          },
        },
      });
      console.log("response", response);
      setSubTotal(response?.data?.applyDiscountCodeToCart?.cart?.checkout?.summary?.discountTotal?.amount);
      setOrderDisable2(false);
    } catch (err) {
      console.log("response", err.message);
      setErrorPromo(err?.message);
      setOrderDisable2(false);
      console.log(err.message);
    }
  };
  const addressSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    FullName: Yup.string().min(3).max(25).required("Please enter your Full name"),
    phonenumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Please Enter 10 digits phone Number")
      .required("Phone number is required"),

    city: Yup.string().trim().min(5).required("Please Enter Your City"),
    CompleteAddress: Yup.string().min(5).required("Please enter your address"),
    orderNotes: Yup.string(),
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue, formik } = useFormik({
    initialValues,
    validationSchema: addressSchema,
    validateOnChange: true,
    validateOnBlur: false,

    onSubmit: async (values, action) => {
      // setValue(values)
      // console.log("values", values);
      await handlepay(values, action);
      action.resetForm();
    },
  });
  const customStyles = {
    indicatorSeparator: () => ({
      height: "48px",
      color: "black",
    }),
    control: (provided, state) => ({
      ...provided,
      height: "48px",
      width: "430px",
      marginTop: "10px",
      background: "#F7F7F9",
      borderRadius: "6px",
      border: state.isFocused ? "none" : "none",
      boxShadow: state.isFocused ? "none" : "none",
      // Change this to the desired width
    }),
    menu: (provided, state) => ({
      ...provided,
      // Set the width of the menu to the full viewport width
      maxWidth: "none",
      width: "430px",

      // Ensure that the menu can extend beyond the width of the container
    }),
    menuList: (provided, state) => ({
      ...provided,
      width: "430px",
      border: "none",
    }),
    option: (provided, state) => ({
      fontFamily: "Lato",
      fontStyle: "normal",
      fontWeight: state.isFocused ? 800 : 500,
      color: "#969696",
      fontSize: "16px",
      fontFamily: "lato",
      padding: "opx",
      width: "430px",
      letterSpacin: "0.05em",
      padding: "13px",
      borderBottom: state.isLastOption ? "none" : "1px solid #01010136",
      color: state.isFocused ? "#000000" : "#989898",
      "&:hover": {
        color: "#000000",
      },
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      icon: state.isFocused ? "url('/colors/vectordark.svg')" : "url('/colors/vectoryellow.svg')",
      "&:hover": {
        color: "green",
      },
    }),
    input: (provided) => ({
      width: "430px !important",
      color: "#969696",
      color: "#969696",
      fontSize: "16px",
      fontFamily: "lato",
      padding: "opx",
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        fontFamily: "Lato",
        fontStyle: "normal",
        color: "#969696",
        fontSize: "16px",
        fontFamily: "lato",
        padding: "opx",

        color: "#969696",
        "&:hover": {
          color: "#FDC114",
        },
      };
    },
  };
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <img src="/colors/vector.svg" alt="icons" />
      </components.DropdownIndicator>
    );
  };

  // const handleChangeEmail = (event) => {
  //   setCheckedEmail(event.target.checked);
  // };

  // const address = values.CompleteAddress;
  // const city = values.city;
  const amount = cart.checkout.summary.itemTotal.amount;

  const [shippingData, loading, refetch] = useGetShipping(values.CompleteAddress, values.city, amount);

  useEffect(() => {
    setValue(values);
    // console.log("props here", prop?.cart.items);

    if (values.city) {
      refetch();
    }
  }, [values.city, refetch]);

  useEffect(() => {
    // console.log("shippingData", shippingData);
    // console.log("setValue", values);
    // console.log("shippingData _id", shippingData?._id);
  }, [values.city, shippingData]);

  const makeYourTransaction = async () => {
    if (viewer?._id) {
      try {
        const maketransaction = await makeTransaction({
          variables: {
            userId: viewer?.userId,
            amount: 1000,
            transactions: outBound
          },
        });

        console.log("maketransaction", maketransaction);
      } catch (error) {
        console.error("Error making transaction:", error);
      }
    }
  };


  const clickHandler = (item) => {
    const productSlug = item;

    const url = `/en/product/${productSlug}`;
    window.lo;
  };

  const CartDataDisplay = () => {
    return (
      <Box
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          width: "100%",

          // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
        }}
      >
        {prop?.cart.items?.map((prod) => (
          <div className={classes.cartcard3}>
            <div className={classes.displayCart} key={prod.id}>
              <img src={prod.metafields[0].value} style={{ borderRadius: "5px", width: "75px", ojectFit: "contain" }} alt="icons" />
              <div className={classes.displayCartGrid}>
                <Typography gutterBottom variant="h4" className={classes.cartname}>
                  <span onClick={() => clickHandler(prod.productSlug)} className={classes.storeName}>
                    {prod.title.toString().toLowerCase()}
                  </span>
                </Typography>
                <Typography gutterBottom variant="h5" className={classes.cartdescription}>
                  {formatCurrency(prod.price.amount)}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </Box>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container xs={12} justifyContent="center" className={classes.Gridmain}>
          <Grid item xs={12} sm={12} md={12} lg={6} className={classes.gridshipp}>
            <div className={classes.shippingdetails}>
              <Typography variant="h3" className={classes.mainheading}>
                Shipping Details
              </Typography>

              <Grid xs={12} style={{ width: "100%" }}>
                <Grid item className={classes.inputitem}>
                  <label className={classes.label} htmlFor="FullName">
                    <span className={classes.labelSpan} htmlFor="FullName">
                      Full Name <span style={{ color: "#FD1010" }}>*</span>
                    </span>
                    <TextField
                      placeholder="Enter Your User Name"
                      InputProps={{ disableUnderline: true }}
                      className={classes.input}
                      type="text"
                      autoComplete="off"
                      name="FullName"
                      id="FullName"
                      value={values.FullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </label>
                  {touched.FullName && errors.FullName ? <p className={classes.formerror}>{errors.FullName}</p> : null}
                </Grid>
                <Grid xs={12} item style={{ width: "100%" }} className={classes.inputitem}>
                  <label className={classes.label} htmlFor="phonenumber">
                    <span className={classes.labelSpan} htmlFor="phonenumber">
                      Phone Number <span style={{ color: "#FD1010" }}>*</span>
                    </span>
                    <TextField
                      placeholder="Enter Your Phone Number Without Zero"
                      type="tel"
                      InputProps={{
                        style: { color: "black" },
                        disableUnderline: true,
                        startAdornment: (
                          <InputAdornment position="start" className={classes.phone}>
                            +92
                          </InputAdornment>
                        ),
                      }}
                      name="phonenumber"
                      id="phonenumber"
                      value={values.phonenumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={classes.input}
                    />
                  </label>
                  {touched.phonenumber && errors.phonenumber ? (
                    <p className={classes.formerror}>{errors.phonenumber}</p>
                  ) : null}
                </Grid>
                <Grid xs={12} item className={classes.inputitem}>
                  <label className={classes.label} variant="h6" htmlFor="email">
                    <span className={classes.labelSpan}>
                      Email <span style={{ color: "#FD1010" }}>*</span>
                    </span>
                    <TextField
                      placeholder="Enter Your Email Address"
                      InputProps={{ disableUnderline: true }}
                      className={classes.input}
                      type="email"
                      autoComplete="off"
                      name="email"
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </label>
                  {errors.email && touched.email ? <p className={classes.formerror}>{errors.email}</p> : null}
                </Grid>
                <Grid item xs={12} className={classes.inputitem}>
                  <label className={classes.label} variant="h6" htmlFor="CompleteAddress">
                    <span className={classes.labelSpan}>
                      Complete Address <span style={{ color: "#FD1010" }}>*</span>
                    </span>
                    <TextField
                      placeholder="Enter your complete address"
                      InputProps={{ disableUnderline: true }}
                      autoComplete="off"
                      type="text"
                      name="CompleteAddress"
                      id="CompleteAddress"
                      value={values.CompleteAddress}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={classes.input}
                      inputProps={{ style: { color: "black" } }}
                    />
                  </label>
                  {errors.CompleteAddress && touched.CompleteAddress ? (
                    <p className={classes.formerror}>{errors.CompleteAddress}</p>
                  ) : null}
                </Grid>

                <Grid item xs={12} className={classes.inputitem}>
                  <label className={classes.label} variant="h4">
                    <span className={classes.labelSpan}>
                      City <span style={{ color: "#FD1010" }}>*</span>
                    </span>
                    <TextField
                      placeholder="Please Enter Your City Name"
                      InputProps={{ disableUnderline: true }}
                      autoComplete="off"
                      type="text"
                      name="city"
                      id="city"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={classes.input}
                      inputProps={{ style: { color: "black" } }}
                    />
                  </label>
                  {errors.city && touched.city ? <p className={classes.formerror}>{errors.city}</p> : null}
                </Grid>
              </Grid>
              <div className={classes.inputitem2}>
                {/* <div className={classes.checkboxdiv}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={checkedEmail} onChange={handleChangeEmail} className={classes.checkbox} />
                    }
                  />

                  <Typography variant="body2" className={classes.terms}>
                    Save this Information for next time
                  </Typography>
                </div> */}
                <Grid item xs={12} className={classes.inputitem}>
                  <label className={classes.label} variant="h4" htmlFor="orderNotes">
                    <span className={classes.labelSpan}>Order Notes</span>
                    <TextField
                      placeholder="Enter additional notes here."
                      InputProps={{ disableUnderline: true }}
                      className={classes.inputorder}
                      inputProps={{ style: { color: "black" } }}
                      autoComplete="off"
                      type="text"
                      name="orderNotes"
                      id="orderNotes"
                      value={values.orderNotes}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      multiline={true}
                      maxRows={4}
                    />
                  </label>
                  {errors.orderNotes && touched.orderNotes ? (
                    <p className={classes.formerror}>{errors.orderNotes}</p>
                  ) : null}
                </Grid>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} justifyContent="center">
            <div className={classes.summary}>
              <Typography variant="h3" className={classes.mainheadingp}>
                ORDER
              </Typography>
              <div className={classes.cartcard2}>
                <CartDataDisplay />
              </div>

              <div className={classes.cartpayment}>
                <div style={{ display: "flex" }}>
                  <img src="/cart/ellipse.svg" alt="icons" />
                  <Typography gutterBottom variant="h4" className={classes.cartdelivery}>
                    Cash On Delivery
                  </Typography>
                </div>
                {!prop?.cartStore?.anonymousCartToken ? (
                  <>
                    <Grid item xs={12} className={classes.inputitem}>
                      <label className={classes.label} variant="h6" htmlFor="PromoCode">
                        <span className={classes.labelSpan}>
                          Promo <span style={{ color: "#FD1010" }}></span>
                        </span>
                        <span style={{ display: "flex" }}>
                          <TextField
                            placeholder="Enter Promo Code"
                            InputProps={{ disableUnderline: true }}
                            autoComplete="off"
                            type="text"
                            name="PromoCode"
                            id="PromoCode"
                            value={promoCode}
                            onChange={(e) => {
                              setPromoCode(e.target.value);
                            }}
                            // onBlur={handleBlur}
                            className={classes.promoField}
                            inputProps={{ style: { color: "black" } }}
                          />
                          <span>
                            <Button
                              className={classes.promoBtn}
                              onClick={handleApplyPromo}
                              InputProps={{ disableUnderline: true }}
                              variant="h6"
                              role="button"
                              disabled={isDisabledPromo}
                            >
                              {/* {console.log("",cart?.checkout?.summary?.discountTotal?.amount)} */}
                              {orderDisable2 ? (
                                <CircularProgress disableShrink size={24} style={{ color: "black" }} />
                              ) : (
                                "Apply"
                              )}
                            </Button>
                          </span>
                        </span>
                      </label>
                      {errorPromo ? <p className={classes.formerror}>{errorPromo}</p> : null}
                      {/* {console.log("error", errorPromo)} */}
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className={classes.cartcard}>
                <Typography gutterBottom variant="h4" className={classes.cartdelivery2}>
                  Cart Total
                </Typography>
                <div className={classes.empty}></div>
                <div className={classes.shipping}>
                  <div className={classes.subtotal}>
                    <Typography gutterBottom variant="h4" style={{ fontSize: "1.1rem" }}>
                      Original Price
                    </Typography>
                    <Typography gutterBottom variant="h4" className={classes.subtotalamount}>
                      {/* {formatCurrency(cart.checkout.summary.itemTotal.amount)} */}
                      Rs. {cart?.checkout?.summary?.itemTotal?.amount}
                      {/* {console.log("subtotal,", subtotal)} */}
                    </Typography>
                  </div>
                  {!prop?.cartStore?.anonymousCartToken ? (
                    <>
                      <div className={classes.subtotal}>
                        <Typography gutterBottom variant="h4" style={{ fontSize: "1.1rem" }}>
                          Discount
                        </Typography>
                        <Typography gutterBottom variant="h4" className={classes.subtotalamount}>
                          {/* {formatCurrency(cart.checkout.summary.itemTotal.amount)} */}
                          -(Rs.{" "}
                          {cart?.checkout?.summary?.discountTotal?.amount == 0
                            ? 0
                            :
                            cart?.checkout?.summary?.discountTotal?.amount}
                          ){/* {console.log("subtotal,", subtotal)} */}
                        </Typography>
                      </div>
                      <div className={classes.subtotal}>
                        <Typography gutterBottom variant="h4" style={{ fontSize: "1.1rem" }}>
                          Subtotal
                        </Typography>
                        <Typography gutterBottom variant="h4" className={classes.subtotalamount}>
                          {/* {formatCurrency(cart.checkout.summary.itemTotal.amount)} */}
                          Rs. {cart?.checkout?.summary?.total?.amount}
                          {/* {console.log("subtotal,", subtotal)} */}
                        </Typography>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div className={classes.subtotal}>
                    <Typography gutterBottom variant="h4" style={{ fontSize: "1.1rem" }}>
                      Shipping Cost
                    </Typography>
                    <Typography gutterBottom variant="h4" className={classes.subtotalamount}>
                      {formatCurrency(shippingData ? shippingData?.cost.toFixed(2) : "0")}
                    </Typography>
                  </div>
                </div>
                <div className={classes.empty}></div>
                <div className={classes.subtotal}>
                  <Typography gutterBottom variant="h4" style={{ fontSize: "1.1rem" }}>
                    Total
                  </Typography>
                  <Typography gutterBottom variant="h4" className={classes.subtotalamount}>
                    {/* {console.log(
                      "this is the issue",
                      shippingData?.cost,
                      subtotal?.replace(/\.00$/, "").replace(/[^0-9]/g, ""),
                      formatCurrency(parseInt(shippingData?.cost) + parseInt(subtotal)),
                    )} */}
                    Rs. {shippingData?.cost ? cart?.checkout?.summary?.total?.amount + shippingData?.cost : cart?.checkout?.summary?.total?.amount}
                  </Typography>
                  {/* <GTMCheckout price={shippingData?.cost ? shippingData?.cost + subtotal : subtotal} /> */}
                </div>
              </div>
              <div className={classes.orderbutn}>
                <Button
                  className={classes.register}
                  InputProps={{ disableUnderline: true }}
                  variant="h6"
                  type="submit"
                  role="button"
                  disabled={orderDisable}
                >
                  {orderDisable ? (
                    <CircularProgress disableShrink size={24} style={{ color: "black" }} />
                  ) : (
                    "Place Order"
                  )}
                </Button>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeButton={<CustomCloseButton />}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                  background="green"
                  toastStyle={{
                    backgroundColor: "#FDC114",
                    color: "black",
                    fontSize: "16px",
                    fontFamily: "Lato",
                    textTransform: "capitalize",
                  }}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CheckoutActions;
