import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import useViewer from "hooks/viewer/useViewer";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Router from "translations/i18nRouter";
import Box from "@material-ui/core/Box";
import getAccountsHandler from "../../lib/accountsServer.js";
import hashPassword from "../../lib/utils/hashPassword";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";
import useShop from "hooks/shop/useShop";
import useCart from "hooks/cart/useCart";

const useStyles = makeStyles((theme) => ({
  yellowHoverText: {
    textAlign: "center",
    marginLeft: "15px",
    fontSize: "0.9rem",
    marginTop: "5px",
    "&:hover": {
      color: "#FDC114",
      cursor: "pointer",
      textDecoration: "underline",
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
    margin: "0px",
    marginLeft: "5px",
    fontSize: "14px",
    color: "#b22b27",
    fontFamily: "Lato",
  },
  labelSpan: {
    paddingLeft: theme.spacing(2),
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
  iconButtonRoot: {
    "&:hover": {
      backgroundColor: "transparent", // Set the hover background to transparent to turn off the hover effect
    },
  },
  password: {
    width: "100%",
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
    "& .MuiInputAdornment-positionEnd": {
      marginRight: theme.spacing(1),
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
  socialmedia: {
    width: "250px",
    height: "48px",
    borderRadius: "40px",
    border: "none",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "10px",
    background: theme.palette.secondary.selected,
  },
  socialmedia2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
}));
export default function Login(props) {
  const { closeModal, openModal } = props;
  const classes = useStyles();

  const [error, setError] = useState("");
  const [loginDisable, setLoginDisable] = useState(false);
  const [viewer, , refetch] = useViewer();
  const { passwordClient } = getAccountsHandler();


  const shop = useShop();

  const { cart, refetchAccountCart, setEmailOnAnonymousCart } = useCart();
  const hasIdentity = !!((cart && cart.account) || (cart && cart.email));
  const pageTitle = `Login | ${shop && shop.name}`;

  useEffect(() => {

    // Skipping if the `cart` is not available
    if (!cart) refetchAccountCart();
    if (hasIdentity) {
      Router.push("/cart/checkout");
    }
  }, [cart, hasIdentity, Router, viewer?._id]);


  const handleOpenSignUp = () => {
    openModal("signup");
  };
  const signUpSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),

    password: Yup.string().min(5).max(35).required("Please enter your password"),
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const registerUser = async (values, action) => {
    // localStorage.clear();
    localStorage.removeItem("accounts:accessToken")
    localStorage.removeItem("accounts:refreshToken")

    setLoginDisable(true);
    const { email, password } = values;
    ReactGA.event({
      action: "login",
      category: "User",
      label: "User Logged In",
    });

    try {
      await passwordClient.login({
        user: {
          email: values.email.toLowerCase(),
        },

        password: hashPassword(password),
      });
      const dataLayer = {
        dataLayer: {
          event: "user_login",
          email: email,
        },
      };

      TagManager.dataLayer(dataLayer);

      closeModal();
      await refetch();
    } catch (err) {
      // if(err.message=="Password update required."){
      //  setError("Password update required, Check your regisetered email to resset password");

      // }
      setLoginDisable(false);

      setError(err.message);
    }
  };

  const handleForgotPasswordClick = () => {
    openModal("forgot-password");
  };
  const registerUser2 = async (values, action) => {
    try {
      // Creating user will login also
      await passwordClient.createUser({ email: values.email, password: hashPassword(values.password) });
      action.resetForm(); // to get rid of all the values after submitting the form
      closeModal();
      await refetch();
    } catch (err) {
      setError(err.message);
    }
  };
  const initialValues = {
    email: "",
    password: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    validateOnChange: true,
    validateOnBlur: true,
    //// By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: async (values, action) => {
      await registerUser(values, action);
      //// to get rid of all the values after submitting the form
    },
  });
  return (
    <>
      <>
        <Typography variant="body1">WELCOME BACK ! </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container>
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
              <label className={classes.label} htmlFor="password">
                <span className={classes.labelSpan} htmlFor="password">
                  Password <span style={{ color: "#FD1010" }}>*</span>
                </span>
                <TextField
                  placeholder="Enter Your Password"
                  style={{ fontFamily: "Lato" }}
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.password}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                          classes={{ root: classes.iconButtonRoot }}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </label>
              {errors.password && touched.password ? <p className={classes.formerror}>{errors.password}</p> : null}
            </Grid>
          </Grid>
          {!!error && <p className={classes.formerror}>{error}</p>}
          <div className={classes.socialmedia2}>
            <Button
              className={classes.register}
              style={{ fontFamily: "Ostrich Sans Black", fontSize: "20px" }}
              InputProps={{ disableUnderline: true }}
              variant="h5"
              role="button"
              disabled={loginDisable}
              type="submit"
            >
              {loginDisable ? <CircularProgress disableShrink size={24} style={{ color: "black" }} /> : "Login"}
            </Button>
          </div>
        </form>
        {/* <div style={{ textAlign: "center", marginTop: "15px", fontSize: "16px" }}>OR</div>
        <div className={classes.socialmediaAuth}>
          <Box className={classes.socialmedia}>
            <img style={{ marginLeft: "20px" }} src="/authentication/signup3.svg" alt="Login-SignUP" />
            <Typography
              style={{ fontFamily: "Ostrich Sans Black", fontSize: "20px" }}
              variant="h5"
              className={classes.register2}
            >
              {" "}
              Login With Google
            </Typography>
          </Box>
          <Box className={classes.socialmedia}>
            <img style={{ marginLeft: "20px" }} src="/authentication/signup4.svg" alt="Login-SignUP" />
            <Typography
              style={{ fontFamily: "Ostrich Sans Black", fontSize: "20px" }}
              variant="h5"
              className={classes.register2}
            >
              {" "}
              Login With Facebook
            </Typography>
          </Box>
        </div> */}
        <div
          className={classes.yellowHoverText}
          onClick={handleForgotPasswordClick}
          onKeyDown={handleForgotPasswordClick}
          role="button"
          tabIndex={0}
        >
          Forgot Your Password? Click Here
        </div>
        <div
          className={classes.switchEntryMode}
          onClick={handleOpenSignUp}
          onKeyDown={handleOpenSignUp}
          role="button"
          tabIndex={0}
        >
          <Typography variant="h5">
            {" "}
            Don't have an account? <span className={classes.switchaccout}> Sign Up</span>
          </Typography>
        </div>
      </>
    </>
  );
}

Login.propTypes = {
  closeModal: PropTypes.func,
  openModal: PropTypes.func,
};
// import useViewer from "hooks/viewer/useViewer";
// import { makeStyles } from "@material-ui/core/styles";
// import { Grid, TextField, Button, Typography } from "@material-ui/core";
// import React, { useState } from "react";
// import Checkbox from "@material-ui/core/Checkbox";
// import Box from "@material-ui/core/Box";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import PropTypes from "prop-types";
// import getAccountsHandler from "../../lib/accountsServer.js";
// import hashPassword from "../../lib/utils/hashPassword";

// const useStyles = makeStyles((theme) => ({
//   label: {
//     display: "flex",
//     marginTop: theme.spacing(1),
//     color: "#333333",
//     flexDirection: "column",
//   },
//   labelSpan: {
//     paddingLeft: theme.spacing(2),
//   },
//   switchEntryMode: {
//     textAlign: "center",
//     fontSize: "16px",
//     cursor: "pointer",
//     marginTop: theme.spacing(2),
//     marginBottom: theme.spacing(2),
//   },
//   input: {
//     width: "387px",
//     borderRadius: "6px",
//     color: "red",
//     justifyContent: "center",
//     background: "#F7F7F9",
//     borderBottomColor: "none",
//     "& .MuiInputBase-input": {
//       height: "48px",
//       borderRadius: "6px",
//       paddingLeft: theme.spacing(2),
//       color: "#969696",
//       fontSize: "17px",
//       padding: "0px",
//     },
//   },
//   register: {
//     width: "214px",
//     height: "48px",
//     borderRadius: "40px",
//     border: "none",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: theme.palette.secondary.selected,
//     "&:hover": {
//       background: theme.palette.secondary.selected,
//     },
//   },
//   socialmedia: {
//     width: "250px",
//     height: "48px",
//     borderRadius: "40px",
//     border: "none",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     margin: "10px",

//     background: theme.palette.secondary.selected,
//   },
//   topheader: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   terms: {
//     lineHeight: "100px",
//   },
//   checkbox: {
//     color: "green",
//     "& .MuiIconButton-label ": {
//       color: theme.palette.secondary.selected,
//     },
//   },
//   checkboxdiv: {
//     display: "flex",
//     flexDirection: "row",
//   },
//   register2: {
//     fontSize: "18px",
//     marginRight: "15px",
//     color: "#333333",
//     fontFamily: "Ostrich Sans Black",
//     fontWeight: 900,

//     lineHeight: "24px",
//     fontStyle: "normal",
//     // marginLeft: "15px",
//   },
//   socialmedia2: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     flexWrap: "wrap",
//   },
//   socialmediaAuth: {
//     display: "flex",
//     justifyContent: "space-between",
//   },
//   switchaccout: {
//     color: "#FDC114",
//   },
// }));

// /**
//  * Component to render when user tries to signup.
//  * @param {Object} props of structure { closeModal: func, openModal: func }
//  * @returns {Object} jsx
//  */
// export default function SignUp(props) {
//   const [checkedEmail, setCheckedEmail] = React.useState(true);

//   const { closeModal, openModal } = props;
//   const classes = useStyles();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [, , refetch] = useViewer();
//   const { passwordClient } = getAccountsHandler();
//   const [fullname, setFullname] = useState("");
//   const [phonenumber, setPhoneNumber] = useState("");

//   const [resetpassword, setResetPassword] = useState("");
//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handleresetpsssword = (event) => {
//     setResetPassword(event.target.value);
//   };
//   const handlephonenumber = (event) => {
//     setPhoneNumber(event.target.value);
//   };
//   const handleFullname = (event) => {
//     setFullname(event.target.value);
//   };

//   const handleChangeEmail = (event) => {
//     setCheckedEmail(event.target.checked);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleOpenLogIn = () => {
//     openModal("login");
//   };

//   const registerUser = async () => {
//     try {
//       // Creating user will login also
//       await passwordClient.createUser({ email, password: hashPassword(password) });
//       closeModal();
//       await refetch();
//     } catch (err) {
//       setError(err.message);
//     }
//   };
//   return (
//     <>
//       <Typography variant="body1">REGISTRATION </Typography>
//       <form className={classes.root} noValidate onSubmit={registerUser}>
//         <Grid container>
//           <Grid xs={12} item>
//             <label className={classes.label} required>
//               <span className={classes.labelSpan}>
//                 Full Name <span style={{ color: "#FD1010" }}>*</span>
//               </span>
//               <TextField
//                 placeholder="Enter Your User Name"
//                 InputProps={{ disableUnderline: true }}
//                 className={classes.input}
//                 onChange={handleFullname}
//                 value={fullname}
//               />
//             </label>
//           </Grid>
//           <Grid xs={12} item>
//             <label className={classes.label} variant="h6">
//               <span className={classes.labelSpan}>
//                 Email <span style={{ color: "#FD1010" }}>*</span>
//               </span>
//               <TextField
//                 placeholder="Enter Your Email Address"
//                 InputProps={{ disableUnderline: true }}
//                 required
//                 className={classes.input}
//                 onChange={handleEmailChange}
//                 value={email}
//                 type="email"
//               />
//             </label>
//           </Grid>

//           <Grid item xs={12}>
//             <label className={classes.label}>
//               <span className={classes.labelSpan}>
//                 Phone Number <span style={{ color: "#FD1010" }}>*</span>
//               </span>
//               <TextField
//                 placeholder="Enter Your Phone Number"
//                 InputProps={{ disableUnderline: true }}
//                 required
//                 className={classes.input}
//                 onChange={handlephonenumber}
//                 value={phonenumber}
//               />
//             </label>
//           </Grid>
//           <Grid item xs={12}>
//             <label className={classes.label}>
//               <span className={classes.labelSpan}>
//                 Password <span style={{ color: "#FD1010" }}>*</span>
//               </span>
//               <TextField
//                 placeholder="Enter Your Password"
//                 InputProps={{ disableUnderline: true }}
//                 required
//                 className={classes.input}
//                 onChange={handlePasswordChange}
//                 value={password}
//               />
//             </label>
//           </Grid>

//           <Grid item xs={12}>
//             <label className={classes.label}>
//               <span className={classes.labelSpan}>
//                 Re-Enter Password <span style={{ color: "#FD1010" }}>*</span>
//               </span>
//               <TextField
//                 placeholder="Re-Enter Your Password"
//                 InputProps={{ disableUnderline: true }}
//                 required
//                 className={classes.input}
//                 onChange={handleresetpsssword}
//                 value={resetpassword}
//               />
//             </label>{" "}
//           </Grid>
//         </Grid>
//         <div className={classes.checkboxdiv}>
//           <FormControlLabel
//             control={<Checkbox checked={checkedEmail} onChange={handleChangeEmail} className={classes.checkbox} />}
//           />
//           <Typography variant="body2" className={classes.terms}>
//             {" "}
//             Agree Term & Conditions
//           </Typography>
//         </div>
//         <div className={classes.socialmedia2}>
//           <Button
//             className={classes.register}
//             InputProps={{ disableUnderline: true }}
//             variant="h5"
//             type="submit"
//             role="button"
//           >
//             {" "}
//             Register
//           </Button>
//         </div>
//         <div style={{ textAlign: "center", marginTop: "15px", fontSize: "16px" }}>OR</div>
//         <div className={classes.socialmediaAuth}>
//           <Box className={classes.socialmedia}>
//             <img style={{ marginLeft: "15px" }} src="/authentication/signup3.svg" alt="Login-SignUP" />
//             <Typography variant="h5" className={classes.register2}>
//               {" "}
//               Register With Google
//             </Typography>
//           </Box>
//           <Box className={classes.socialmedia}>
//             <img style={{ marginLeft: "15px" }} src="/authentication/signup4.svg" alt="Login-SignUP" />
//             <Typography variant="h5" className={classes.register2}>
//               {" "}
//               Register With Facebook
//             </Typography>
//           </Box>
//         </div>

//         {!!error && <div className={classes.error}>{error}</div>}
//         <div
//           className={classes.switchEntryMode}
//           onClick={handleOpenLogIn}
//           onKeyDown={handleOpenLogIn}
//           role="button"
//           tabIndex={0}
//         >
//           <Typography variant="h5">
//             Don't have an account ? <span className={classes.switchaccout}>Login</span>
//           </Typography>
//         </div>
//       </form>
//     </>
//   );
// }

// SignUp.propTypes = {
//   closeModal: PropTypes.func,
//   openModal: PropTypes.func,
// };
