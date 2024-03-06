import useViewer from "hooks/viewer/useViewer";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import getAccountsHandler from "../../lib/accountsServer.js";
import hashPassword from "../../lib/utils/hashPassword";
import InputAdornment from "@material-ui/core/InputAdornment";
import * as Yup from "yup";
import { useFormik } from "formik";
import TagManager from "react-gtm-module";
import ReactGA from "react-ga4";

const useStyles = makeStyles((theme) => ({
  label: {
    display: "flex",
    marginTop: theme.spacing(1),
    color: "#333333",
    flexDirection: "column",
  },
  labelSpan: {
    paddingLeft: theme.spacing(2),
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
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "space-between",
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
    lineHeight: "55px",
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
    marginRight: "15px",
    color: "#333333",
    fontFamily: "Ostrich Sans Black",
    fontWeight: 900,

    lineHeight: "24px",
    fontStyle: "normal",
    // marginLeft: "15px",
  },
  socialmedia2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  socialmediaAuth: {
    display: "flex",
    justifyContent: "space-between",
  },
  switchaccout: {
    color: "#FDC114",
  },
  formerror: {
    paddingLeft: theme.spacing(1),
    margin: "0px",
    fontSize: "14px",
    color: "#b22b27",
    fontFamily: "Lato",
  },
  phone: {
    paddingLeft: "10px",
  },
}));

/**
 * Component to render when user tries to signup.
 * @param {Object} props of structure { closeModal: func, openModal: func }
 * @returns {Object} jsx
 */
export default function SignUp(props) {
  const [checkedEmail, setCheckedEmail] = React.useState(false);
  const [regiseterDisable, setRegisterDisable] = useState(false);

  const { closeModal, openModal } = props;
  const classes = useStyles();

  const [error, setError] = useState("");
  const [getCheckedEmailError, setCheckedEmailError] = useState(false);

  const [, , refetch] = useViewer();
  const { passwordClient } = getAccountsHandler();

  const handleChangeEmail = (event) => {
    setCheckedEmail(event.target.checked);
  };

  const handleOpenLogIn = () => {
    openModal("login");
  };

  // const registerUser = async () => {
  //   try {
  //     // Creating user will login also
  //     await passwordClient.createUser({ email, password: hashPassword(password) });
  //     closeModal();
  //     await refetch();
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  const initialValues = {
    FullName: "",
    email: "",
    password: "",
    confirm_password: "",
    phonenumber: "",
    // checkedEmail: false,
  };
  const signUpSchema = Yup.object({
    FullName: Yup.string().min(3).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    phonenumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Please Enter 10 digits phone Number")
      .required("Please Enter your mobile number  without 0"),
    password: Yup.string().min(6).required("Please enter your password"),
    confirm_password: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Password must match"),
    // checkedEmail: Yup.boolean()
    //   .oneOf([true], "You must accept the terms and conditions")
    //   .required("You must accept the terms and conditions"),
  });
  const registerUser2 = async (values, action) => {
    // localStorage.clear();
    localStorage.removeItem("accounts:accessToken")
    localStorage.removeItem("accounts:refreshToken")


    if (checkedEmail === true) {
      setCheckedEmailError(false);

      setRegisterDisable(true);
      setError("");
      try {
        // Creating user will login also
        await passwordClient.createUser({
          email: values.email.toLowerCase(),
          password: hashPassword(values.password),
          firstName: values.FullName,
          phoneNumber: values.phonenumber,
        });
        action.resetForm(); // to get rid of all the values after submitting the form
        ReactGA.event({
          category: "User",
          action: "Sign Up",
          label: "New User Signed Up",
          user: {
            email: values.email.toLowerCase(),
            firstName: values.FullName,
            
          }
        });
        const dataLayer = {
          dataLayer: {
            event: "sign_in", // The name of the custom event
            category: "User",
            action: "Sign In",
            label: "Successful",
            user: {
              email: values.email.toLowerCase(),
              firstName: values.FullName,
              
            }
          },
        };
  
        TagManager.dataLayer(dataLayer);
        closeModal();
        await refetch();
      } catch (err) {
        setRegisterDisable(false);

        setError(err.message);
      }
    } else {
      setCheckedEmailError(true);
    }
  };
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    validateOnChange: true,
    validateOnBlur: false,
    //// By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: async (values, action) => {
      console.log("Signups", values);
     
      await registerUser2(values, action);
      //// to get rid of all the values after submitting the form
      // action.resetForm();
    },
  });

  return (
    <>
      <Typography variant="body1">REGISTRATION </Typography>
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
            {touched.FullName && errors.FullName ? <p className={classes.formerror}>{errors.FullName}</p> : null}
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

          <Grid item xs={12}>
            <label className={classes.label} htmlFor="phonenumber">
              <span className={classes.labelSpan}>
                Phone Number <span style={{ color: "#FD1010" }}>*</span>
              </span>
              <TextField
                placeholder="Enter your Phone Number"
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
          <Grid item xs={12}>
            <label className={classes.label} htmlFor="password">
              <span className={classes.labelSpan}>
                Password <span style={{ color: "#FD1010" }}>*</span>
              </span>
              <TextField
                placeholder="Enter Your Password"
                InputProps={{ disableUnderline: true }}
                className={classes.input}
                type="password"
                autoComplete="off"
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
            {errors.password && touched.password ? <p className={classes.formerror}>{errors.password}</p> : null}
          </Grid>

          <Grid item xs={12}>
            <label className={classes.label} htmlFor="confirm_password">
              <span className={classes.labelSpan}>
                Re-Enter Password <span style={{ color: "#FD1010" }}>*</span>
              </span>
              <TextField
                placeholder="Re-Enter Your Password"
                InputProps={{ disableUnderline: true }}
                required
                className={classes.input}
                type="password"
                autoComplete="off"
                name="confirm_password"
                id="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
            {errors.confirm_password && touched.confirm_password ? (
              <p className={classes.formerror}>{errors.confirm_password}</p>
            ) : null}
          </Grid>
        </Grid>
        {!!error && <div className={classes.formerror}>{error}</div>}

        <div className={classes.checkboxdiv}>
          <FormControlLabel
            control={<Checkbox checked={checkedEmail} onChange={handleChangeEmail} className={classes.checkbox} />}
          />
            <a
                  style={{
                    color: "inherit",
                  }}
                  target="_blank"
                  href="/en/SellerTermsConditionPage"
                >
          <Typography variant="body2" className={classes.terms}>
            {" "}
            I understand and agree to <span style={{ color: "#FDC114" }}> Terms & Conditions.</span>
          </Typography>
          </a>
        </div>
        {getCheckedEmailError ? <p className={classes.formerror}>You must accept the terms and conditions</p> : null}

        <div className={classes.socialmedia2}>
          <Button
            className={classes.register}
            InputProps={{ disableUnderline: true }}
            variant="h5"
            type="submit"
            role="button"
            disabled={regiseterDisable}
          >
            {regiseterDisable ? <CircularProgress disableShrink size={24} style={{ color: "black" }} /> : "Register"}
          </Button>
        </div>
        {/* <div style={{ textAlign: "center", marginTop: "10px", fontSize: "16px" }}>OR</div>
        <div className={classes.socialmediaAuth}>
          <Box className={classes.socialmedia}>
            <img style={{ marginLeft: "15px" }} src="/authentication/signup3.svg" alt="Login-SignUP" />
            <Typography variant="h5" className={classes.register2}>
              Register With Google
            </Typography>
          </Box>
          <Box className={classes.socialmedia}>
            <img style={{ marginLeft: "15px" }} src="/authentication/signup4.svg" alt="Login-SignUP" />
            <Typography variant="h5" className={classes.register2}>
              Register With Facebook
            </Typography>
          </Box>
        </div> */}

        <div
          className={classes.switchEntryMode}
          onClick={handleOpenLogIn}
          onKeyDown={handleOpenLogIn}
          role="button"
          tabIndex={0}
        >
          <Typography variant="h5">
            Already have an account ? <span className={classes.switchaccout}>Login</span>
          </Typography>
        </div>
      </form>
    </>
  );
}

SignUp.propTypes = {
  closeModal: PropTypes.func,
  openModal: PropTypes.func,
};
