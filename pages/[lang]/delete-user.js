import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Box, Typography, TextField } from "@material-ui/core";
import * as Yup from "yup";
import { useFormik } from "formik";
import Layout from "components/Layout";
import withCart from "containers/cart/withCart";
import { withApollo } from "lib/apollo/withApollo";
import { SendContactForm } from "../../hooks/sendForm/sendform";
import { useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@material-ui/icons/Close";
const useStyles = makeStyles((theme) => ({
  orderThankYou: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "inherit",
      paddingLeft: theme.spacing(5),

    },
    marginTop: theme.spacing(5),
    justifyContent: "center",
    paddingLeft: theme.spacing(50),
    alignItems: "center",
    width: "100%",
  },
  gridStyle: {
    display: "flex",

    [theme.breakpoints.down("sm")]: {
      display: "block"
      // display: "inherit",
      // paddingLeft: theme.spacing(5),

    },
  },
  img: {
    marginBottom: theme.spacing(3),
  },
  mainheading: {
    width: "90%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(5),
  },
  orderThankYoupara: {
    fontSize: "24px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
    color: "#333333",
    fontWeight: 500,
    marginTop: theme.spacing(2),

    fontFamily: "Lato",
    fontStyle: "normal",
    textAlign: "start",
    lineHeight: "29px",
  },
  sociallinks: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
  },
  connect: {
    fontSize: "34px",
    color: "#333333",
    fontWeight: 700,
    marginTop: theme.spacing(2),
    fontFamily: "Lato",
    fontStyle: "normal",
    textAlign: "center",
    lineHeight: "41px",
  },
  socialmedia: {
    display: "flex",
    marginTop: theme.spacing(2),
    justifyContent: "space-between",
    width: "190px",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: theme.spacing(5),
  },
  look: {
    height: "197px",
    width: "409px",
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",

    borderRadious: "0px",
    backgroundColor: "#F7F7F9",
  },
  imagemobile: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  register: {
    width: "263px",
    height: "48px",
    borderRadius: "40px",
    border: "none",
    marginBottom: theme.spacing(10),
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
  divStyle: { display: "flex", justifyContent: "center", alignItems: "center", },
  reviews: {
    display: "flex",
    marginTop: theme.spacing(),

    flexDirection: "row",
  },
  cardimage: {
    marginRight: theme.spacing(1),
  },
  facebookreview: {
    fontSize: "24px",
    color: "#333333",
    fontWeight: 500,

    fontFamily: "Lato",
    fontStyle: "normal",

    lineHeight: "29px",
  },
  ratingtime: {
    display: "flex",
    width: "180px",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  ratingday: {
    fontSize: "16px",
    color: "#969696",
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 500,
    weight: 100,
    lineHeight: "19px",
  },
  blogtext: {
    fontSize: "16px",
    color: "#333333",
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 500,
    marginTop: theme.spacing(1),
    lineHeight: "19px",
  },
  blogtextr: {
    color: theme.palette.secondary.selected,
  },
  imges: {
    width: "51px",
    height: "51px",
    marginRight: theme.spacing(2),

    "& .hover": {
      transform: "scale(1.2)",
    },
  },
  label: {
    display: "flex",
    marginTop: theme.spacing(1),
    color: "#333333",
    flexDirection: "column",
  },
  formerror: {
    paddingLeft: theme.spacing(1),
    fontSize: "16px",
    cursor: "pointer",
    color: "#b22b27",
    fontFamily: "Lato",
  },
  labelSpan: {
    paddingLeft: theme.spacing(2),
  },
  input: {
    width: "331px",
    [theme.breakpoints.down("sm")]: {
      width: "280px",


    },
    borderRadius: "6px",
    color: "red",
    justifyContent: "center",
    background: "#F7F7F9",
    borderBottomColor: "none",
    "& .MuiInputBase-input": {
      height: "48px",
      borderRadius: "6px",
      paddingLeft: theme.spacing(2),
      color: "#969696",
      fontSize: "17px",
      padding: "0px",
    },
    "& .MuiInputBase-root": {
      fontFamily: "Lato",
    },
  },
  password: {
    width: "331px",
    fontFamily: "Lato !important",
    borderRadius: "6px",
    color: "red",
    justifyContent: "center",
    background: "#F7F7F9",
    borderBottomColor: "none",
    "& .MuiInputBase-input": {
      height: "48px",
      borderRadius: "6px",
      paddingLeft: theme.spacing(2),
      color: "#969696",
      fontSize: "17px",
      padding: "0px",
    },
    "& .MuiInputBase-root": {
      fontFamily: "Lato",
    },
  },
  register: {
    width: "214px",
    height: "48px",
    borderRadius: "40px",
    border: "none",
    display: "flex",
    marginTop: theme.spacing(4),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(5),


    background: theme.palette.secondary.selected,
    "&:hover": {
      transform: "scale(1.08)",
      transition: "left 0.2s linear",
      background: "#FDC114",
    },
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
  },
  register2: {
    fontSize: "18px",
    color: "#333333",
    marginRight: "20px",
    fontFamily: "Ostrich Sans Black",
    fontWeight: 900,
    lineHeight: "24px",
    fontStyle: "normal",
  },
  socialmediafo: {
    width: "170px",
    height: "48px",
    borderRadius: "40px",
    marginTop: theme.spacing(10),
    border: "none",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),

    },
    display: "flex",
    justifyContent: "flex-start",
  },
  socialmedia2: {
    display: "flex",
    alignItems: "start",
    justifyContent: "start",
    flexWrap: "wrap",
  },
  switchEntryMode: {
    textAlign: "center",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  socialmediaAuth: {
    display: "flex",
    justifyContent: "space-between",
  },
  switchaccout: {
    color: "#FDC114",
  },
  inputorder: {
    width: "331px",
    height: "137px",
    borderRadius: "6px",
    color: "red",

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
  coneect: {
    marginLeft: theme.spacing(2),
  },
  contactus: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },

    flexDirection: "column",
  },
}));

const CheckoutComplete = () => {
  const classes = useStyles();
  const [sendContactForm] = useMutation(SendContactForm);
  const sendmail = Yup.object({
    FullName: Yup.string().min(3).max(25).required("Please enter your Full name"),
    email: Yup.string().email().required("Please enter your email"),
    orderNotes: Yup.string().min(5).max(50).required("Please enter your message "),
  });
  const initialValues = {
    FullName: "",
    email: "",
    orderNotes: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, errors, touched, resetForm } = useFormik({
    initialValues,
    validationSchema: sendmail,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      try {
        const { data } = await sendContactForm({
          variables: {
            name: values.FullName.toString(),
            email: values.email,
            message: values.orderNotes.toString(),
          },
        });
        // do something with the response data
        resetForm();
        toast.success("Email sent Successfully"); // reset the form after submitting
      } catch (error) {
        console.error(error);
      }
    },
  });
  const CustomCloseButton = () => <CloseIcon Style={{ backgroundColor: "#FDC114", color: "black", height: "15px" }} />;

  return (
    <>
      {typeof window !== "undefined" && (
        <Layout headerType={false}>
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
          />{" "}
          <div className={classes.orderThankYou}>
            <div className={classes.divStyle}>
              <Grid container xs={12} className={classes.gridStyle} >
                <Grid item xs={12} md={6} lg={6} className={classes.contactus}>
                  <Typography variant="h3">Submit Your Request to Delete Your Data</Typography>
                  <div className={classes.mainheading}>
                    <Typography variant="h4" className={classes.orderThankYoupara}>
                      {" "}
                      Fill up the form to request data deletion from server.
                    </Typography>
                  </div>
                  <div className={classes.sociallinks}>
                    <img src="/icons/email.svg" className={classes.email} alt="thanyou"></img>
                    <Typography className={classes.coneect} variant="h5">
                      Hello@bizb.store
                    </Typography>
                  </div>
                  <div className={classes.sociallinks}>
                    <img src="/icons/phone.svg" className={classes.email} alt="thanyou"></img>
                    <Typography className={classes.coneect} variant="h5">
                      +92 312 5253680
                    </Typography>
                  </div>
                  <div className={classes.socialmediafo}>
                    <a
                      target="_blank"
                      href="https://www.facebook.com/bizb.store/?_ga=2.46482023.1960989760.1689242030-358638331.1683619134"
                    >
                      <img src="/cart/facebook.svg" className={classes.imges} alt="thanyou"></img></a>
                    <a
                      target="_blank"
                      href="https://www.instagram.com/bizb.store/?_ga=2.46482023.1960989760.1689242030-358638331.1683619134"
                    >
                      <img src="/cart/insta.svg" className={classes.imges} alt="thanyou"></img></a>
                    <img src="/cart/twitter.svg" className={classes.imges} alt="thanyou"></img>
                  </div>
                </Grid>
                <Grid item xs={6} className={classes.contactus}>
                  <form className={classes.root} onSubmit={handleSubmit}>
                    <Grid container>
                      <Grid xs={12} item>
                        <label className={classes.label}>
                          <span className={classes.labelSpan} htmlFor="FullName">
                            Full Name <span style={{ color: "#FD1010" }}>*</span>
                          </span>
                          <TextField
                            placeholder="Enter Your User Name"
                            InputProps={{ disableUnderline: true }}
                            className={classes.input}
                            type="FullName"
                            autoComplete="off"
                            name="FullName"
                            id="FullName"
                            value={values.FullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </label>
                        {touched.FullName && errors.FullName ? (
                          <p className={classes.formerror}>{errors.FullName}</p>
                        ) : null}
                      </Grid>
                      <Grid xs={12} item>
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

                    
                    </Grid>

                    <div className={classes.socialmedia2}>
                      <Button
                        className={classes.register}
                        InputProps={{ disableUnderline: true }}
                        variant="h5"
                        type="submit"
                        role="button"
                      >
                        SUBMIT
                      </Button>
                    </div>
                  </form>
                </Grid>
              </Grid>
            </div>
          </div>
        </Layout >
      )}
    </>
  );
};


export default withApollo()(withCart(CheckoutComplete));
