import * as React from "react";
import { Box, Divider, Typography, Button, Modal, FormControl, TextField, CircularProgress } from "@material-ui/core";
import useViewer from "../../hooks/viewer/useViewer";
import { withApollo } from "lib/apollo/withApollo";
import { makeStyles } from "@material-ui/core/styles";
import useSellerRegistration from "../../hooks/SellerRegistration/useSellerRegistration";
import hashPassword from "../../lib/utils/hashPassword";
import { ToastContainer, toast } from "react-toastify";

import CloseIcon from "@material-ui/icons/Close";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";

const SellerRegistration = () => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  let SN = /^.{15}$/;
  let phoneNumreg = /^(?:\+92\d{10}|03\d{9})$/;
  const [sellerRegistrationFunction, loding] = useSellerRegistration();
  const [viewer, , refetch] = useViewer();

  const [loginDisable, setLoginDisable] = React.useState(false);

  const style2 = {
    disableUnderline: true,
    style: {
      margin: 5,
      padding: 5,
      fontWeight: 500,
      fontSize: "14px",
      color: "#969696",
      fontFamily: "Lato",
    },
  };
  // const styleBox = {
  //     boxShadow: " 0 3px 5px 0 #000",
  //     borderRadius: '18px',
  //     padding: 2,
  //     backgroundColor: '#FFFFFF',
  //     width: "90%",

  // }
  const style4 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "grey",
    borderRadius: "18px",
    boxShadow: "0 3px 5px 0 #000",
    padding: 4,
  };

  const useStyles = makeStyles((theme) => ({
    styleBox: {
      boxShadow: " 0 3px 5px 0 #000",
      borderRadius: "18px",
      padding: 2,
      backgroundColor: "#FFFFFF",
      width: "90%",
      [theme.breakpoints.down("sm")]: {
        width: "360px",
        boxShadow: "none",
        borderRadius: "0",
      },
    },
    style3: {
      fontWeight: 500,
      fontSize: "18px",
      fontStyle: "italic",
      marginRight: 3,
      [theme.breakpoints.down("sm")]: {
        fontSize: "13px",
      },
    },
    style: {
      height: "48px",
      width: "890px",
      backgroundColor: "#F7F7F9",
      borderRadius: "8px",
      //marginBottom: 7,
      justifyContent: "center",
      marginRight: "5%",
      [theme.breakpoints.down("sm")]: {
        width: "380px",
      },
    },
    terms: {
      fontWeight: 700,
      fontSize: "18px",
      fontStyle: "italic",
      marginTop: "6%",
      [theme.breakpoints.down("sm")]: {
        fontSize: "13px",
        marginTop: 0,
        marginLeft: 0,
      },
    },
    text1: {
      fontWeight: "700",
      fontSize: "27px",
      textAlign: "start",
      marginTop: 44,
      marginLeft: "50px",
      marginBottom: 33,
      [theme.breakpoints.down("sm")]: {
        fontSize: "24px",
        textAlign: "start",
        marginTop: 44,
        marginLeft: "20px",
        marginBottom: 33,
      },
    },

    styleofdiv: {
      marginLeft: "23%",
      marginTop: "2%",
      marginBottom: "3%",
      [theme.breakpoints.down("sm")]: {
        marginLeft: "0%",
        marginTop: "4%",
        marginBottom: "8%",
      },
    },
    style6: {
      display: "flex",
      alignItems: "start",
      justifyContent: "center",
      marginLeft: "50px",
      [theme.breakpoints.down("sm")]: {
        marginLeft: "19px",
      },
    },
    style11: {
      display: "flex",
      alignItems: "start",
      margin: 0,
      width: "30%",
      [theme.breakpoints.down("sm")]: {
        width: "70%",
      },
    },
    styleAgree: {
      display: "flex",
      alignItems: "start",
      margin: 0,
      width: "40%",
      [theme.breakpoints.down("sm")]: {
        width: "70%",
      },
    },
    style7: {
      display: "flex",
      alignItems: "center",
      margin: 10,
    },
    style8: {
      display: "flex",
      justifyContent: "center",
    },
    span: {
      color: "grey",
      fontSize: "13px",
      marginLeft: "24%",
      fontStyle: "Italic",
      margin: 0,
      fontWeight: "500",
      [theme.breakpoints.down("sm")]: {
        fontSize: "9px",
        marginLeft: "40%",
      },
    },
    style9: {
      color: "red",
      fontSize: "12px",
      marginLeft: "24%",
      margin: 0,
      fontWeight: "500",
      [theme.breakpoints.down("sm")]: {
        fontSize: "9px",
        marginLeft: "40%",
      },
    },
    style10: {
      color: "red",
      fontSize: "22px",
      margin: 0,
      fontWeight: "500",
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
      },
    },
    register: {
      width: "214px",
      height: "48px",
      borderRadius: "40px",
      border: "none",
      display: "flex",

      marginBottom: "2%",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "72%",
      background: theme.palette.secondary.selected,
      "&:hover": {
        transform: "scale(1.08)",
        transition: "left 0.2s linear",
        background: "#FDC114",
      },
      [theme.breakpoints.down("sm")]: {
        width: "120px",
        height: "30px",
        borderRadius: "10px",
        border: "none",
        display: "flex",

        marginBottom: "2%",
        justifyContent: "center",
        marginLeft: "60%",
      },
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
      marginLeft: "22%",
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
        justifyContent: "start",
        marginBottom: "auto",
      },
    },
  }));

  const classes = useStyles();
  const CustomCloseButton = () => <CloseIcon Style={{ backgroundColor: "#FDC114", color: "black", height: "15px" }} />;

  const [userName, setuserName] = React.useState({
    value: viewer?.firstName ? viewer?.firstName : "",
    isTouched: false,
  });
  const [storeName, setstoreName] = React.useState({
    value: "",
    isTouched: false,
  });
  const [useremail, setuseremail] = React.useState({
    value: viewer?.primaryEmailAddress ? viewer?.primaryEmailAddress : "",
    isTouched: false,
  });
  const [address1, setaddress1] = React.useState({
    value: "",
    isTouched: false,
  });
  const [address2, setaddress2] = React.useState({
    value: "",
    isTouched: false,
  });
  const [country, setcountry] = React.useState({
    value: "Pakistan",
    isTouched: false,
  });
  const [city, setcity] = React.useState({
    value: "",
    isTouched: false,
  });
  const [state, setstate] = React.useState({
    value: "",
    isTouched: false,
  });
  const [zipcode, setzipcode] = React.useState({
    value: "",
    isTouched: false,
  });
  const [contactnumber, setcontactnumber] = React.useState({
    value: "",
    isTouched: false,
  });
  const [refferalcode, setrefferalcode] = React.useState({
    value: "",
    isTouched: false,
  });
  const [password, setPassword] = React.useState({
    value: "",
    isTouched: false,
  });
  const [password2, setPassword2] = React.useState({
    value: "",
    isTouched: false,
  });
  const [isAuth, setIsAuth] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");

  const [userError, setuserError] = React.useState("");

  const [errors, seterros] = React.useState({
    valid: false,
    value: "",
  });
  const [open, setOpen] = React.useState(false);
  const [error, seterror] = React.useState("");
  const [checkTermsError, setcheckTermsError] = React.useState(false);

  const [checkTerms, setcheckTerms] = React.useState(false);

  const handleChangeTerms = (event) => {
    setcheckTerms(event.target.checked);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    seterros({ value: "", valid: false });
    seterror("");
    setuserError("");

    if (
      userName.value.trim() !== "" &&
      reg.test(useremail.value) === true &&
      phoneNumreg.test(contactnumber.value) === true &&
      contactnumber.value.trim() !== "" &&
      (isAuth || (!isAuth && password.value.length >= 8 && password.value === password2.value)) &&
      storeName.value.trim() !== "" &&
      address1.value.trim() !== "" &&
      country.value.trim() !== "" 
    ) {
      setcheckTermsError(false);

      handleSubmit2();
      seterros({ ...errors, value: "Done", valid: false });
    } else {
      setLoginDisable(false);
      setcheckTermsError(true);

      console.log("errors", errors);
      seterros({ ...errors, value: "Complete all required fields", valid: true });
    }
  };
  const handleSubmit2 = () => {
    seterros({ value: "", valid: false });
    seterror("");
    setuserError("");

    if (checkTerms === true) {
      setcheckTermsError(false);

      handlePublish();
      seterros({ ...errors, value: "Done", valid: false });
    } else {
      setLoginDisable(false);
      setcheckTermsError(true);
      console.log("errors", errors);
      seterros({ ...errors, value: "", valid: false });
    }
  };

  const handlePublish = async () => {
    try {
      setLoginDisable(true);
      const sellerRegistration = await sellerRegistrationFunction({
        variables: {
          input: {
            email: useremail.value,
            storeName: storeName.value,
            address1: address1.value,
            address2: address2.value,
            state: state.value,
            city: city.value,
            country: country.value,
            postalcode: zipcode.value,
            phone: contactnumber.value,
            fullName: userName.value,
            password: hashPassword(password.value),
            discountCode: refferalcode.value,
          },
        },
      });
      console.log("sellerRegistration:", sellerRegistration);
      const sellerInfo = {
        name: useremail.value, // Seller Name
        category: "Seller Category", // Seller Category
      };
      ReactGA.event({
        category: "Seller",
        action: "Registration",
        label: JSON.stringify(sellerInfo),
      });
      const sellerRegistrationData = {
        event: "newSellerRegistration", // Define a custom event name
        ecommerce: {
          seller: {
            email: useremail.value, // Replace with the seller's email
            // Add any other relevant seller information
          },
        },
      };

      TagManager.dataLayer({
        dataLayer: sellerRegistrationData,
      });

      ReactGA.event({
        category: "Referral",
        action: "Code Used",
        label: `Referral Code Used - ${refferalcode.value}`,
      });
      const eventObject = {
        event_name: "SellerRegistration",
        event_time: Math.floor(Date.now() / 1000),
        user_data: {
          // Include any user data, such as email, if applicable
          email: useremail.value,
        },
        // Include any custom data related to the event
        // custom_data: { key: value },
      };

      // Send the event data to Facebook CAPI using the Facebook Pixel
      fbq("track", "470474555213027", eventObject);
      setLoginDisable(false);
      clearForm();
      toast.success("You're successfully registered as a Seller!");
      setTimeout(() => {
        window.location.href = "https://bizb.store/dashboard/publishproduct";

        // window.location.href = "https://bizb.store/dashboard/publishproduct";
      }, 300);

      // clearForm()
    } catch (error) {
      setLoginDisable(false);
      seterror(error.message);
      console.log("error", error);
    }
  };

  const clearForm = () => {
    setuserName({ value: "", isTouched: false });
    setcontactnumber({ value: "", isTouched: false });
    setPassword({ value: "", isTouched: false });
    setPassword2({ value: "", isTouched: false });
    setuseremail({ value: "", isTouched: false });
    seterros({ value: "", valid: false });
    setuserError("");
  };
  const PasswordErrorMessage = () => {
    return <p className={classes.style9}>Password should have at least 8 characters</p>;
  };
  const MissmatchPasswordErrorMessage = () => {
    return <p className={classes.style9}>Password do not match</p>;
  };
  const EmailErrorMessage = () => {
    return <p className={classes.style9}>Email not valid</p>;
  };
  const PhoneErrorMessage = () => {
    return <p className={classes.style9}>Phone number not valid</p>;
  };
  const UserErrorMessage = () => {
    return <p className={classes.style9}>Name Field is required</p>;
  };
  const StoreErrorMessage = () => {
    return <p className={classes.style9}>Wardrobe Name Field is required</p>;
  };
  const StoreLengthErrorMessage = () => {
    return <p className={classes.style9}>Wardrobe Name should be less than 15 characters</p>;
  };
  const AddressErrorMessage = () => {
    return <p className={classes.style9}>Address Field is required</p>;
  };
  const CountryErrorMessage = () => {
    return <p className={classes.style9}>Country Field is required</p>;
  };
  const PostalErrorMessage = () => {
    return <p className={classes.style9}>Postal Code Field is required</p>;
  };
  const [deviceInfo, setDeviceInfo] = React.useState(null);
  const [deviceInfoType, setDeviceInfoType] = React.useState("");

  React.useEffect(() => {
    console.log("DeviceInfo1", deviceInfo ? deviceInfo : "");
    console.log("DeviceInfo1", deviceInfoType ? deviceInfoType : "");
  }, [deviceInfo, deviceInfoType]);

  React.useEffect(() => {
    // Access device information when the component mounts
    const userAgent = navigator.userAgent;
    const isMobileDevice = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(userAgent);
    const isTabletDevice = /Tablet|iPad/.test(userAgent);

    const deviceType = isMobileDevice ? "Mobile" : isTabletDevice ? "Tablet" : "Desktop";

    if (userAgent.includes("Android")) {
      setDeviceInfoType("Android");
    } else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
      setDeviceInfoType("iOS");
    } else {
      setDeviceInfoType("Unknown");
    }

    // Set the device information in the state
    setDeviceInfo({
      userAgent,
      isMobileDevice,
      isTabletDevice,
      deviceType,
    });
  }, []);

  React.useEffect(() => {
    if (viewer?._id) {
      console.log("isAuth", viewer);
      setIsAuth(true);
      setuseremail({ value: viewer?.primaryEmailAddress, isTouched: false });
      setuserName({ value: viewer?.name ? viewer?.name : "", isTouched: false });
      if (viewer?.isSeller) {
        window.location.href = "https://bizb.store/dashboard/publishproduct";
      }
    }
  }, [viewer]);

  return (
    <div className={classes.styleofdiv}>
      <div className={classes.styleBox}>
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box style={style4}>
            <Typography
              variant="body2"
              style={{
                fontWeight: "700",
                fontSize: "22px",
                textAlign: "center",
                marginTop: 3,
              }}
            >
              Information was successfully saved
            </Typography>
            <div className={classes.style8}>
              <Button
                color="#FDC114"
                height="35px"
                width="117px"
                text="Close"
                radius="40px"
                style={{
                  margin: 15,
                }}
                onClick={() => {
                  setOpen(false);
                }}
              />
            </div>
          </Box>
        </Modal>
        <div>
          <Typography variant="body2" className={classes.text1}>
            Register as a Seller
          </Typography>
          <Typography variant="p" className={classes.text1}></Typography>
        </div>
        <div className={classes.style6}>
          <FormControl>
          <div className={classes.style7}>
              <div className={classes.style11}>
                <Typography variant="body2" className={classes.style3} textAlign="left">
                  Full Name
                </Typography>
                <p id="nameError" className={classes.style10}>
                  *
                </p>
              </div>

              <TextField
                type="text"
                size="small"
                variant="standard"
                placeholder="Enter your Full Name"
                value={userName.value}
                onChange={(e) => setuserName({ ...userName, value: e.target.value })}
                onFocus={() => setuserName({ ...userName, isTouched: true })}
                InputProps={style2}
                className={classes.style}
              />
            </div>

            {userName.isTouched && userName.value.trim() === "" ? <UserErrorMessage /> : null}
            {userError ? <p className={classes.style9}>{userError}</p> : null}
            <div className={classes.style7}>
              <div className={classes.style11}>
                <Typography variant="body2" className={classes.style3} textAlign="left">
                  Email
                </Typography>
                <p id="nameError" className={classes.style10}>
                  *
                </p>
              </div>
              <TextField
                type="email"
                size="small"
                variant="standard"
                placeholder="Enter your Email"
                value={useremail.value}
                disabled={isAuth}
                onChange={(e) => setuseremail({ ...useremail, value: e.target.value })}
                onBlur={() => setuseremail({ ...useremail, isTouched: true })}
                InputProps={style2}
                className={classes.style}
              />
            </div>
            {useremail.isTouched && reg.test(useremail.value) !== true ? <EmailErrorMessage /> : null}

            <div className={classes.style7}>
              <div className={classes.style11}>
                <Typography variant="body2" className={classes.style3} textAlign="left">
                Wardrobe Name
                </Typography>
                <p id="nameError" className={classes.style10}>
                  *
                </p>
              </div>

              <TextField
                type="text"
                size="small"
                variant="standard"
                placeholder="Give your Wardrobe a name"
                value={storeName.value}
                onChange={(e) => setstoreName({ ...storeName, value: e.target.value })}
                onFocus={() => setstoreName({ ...storeName, isTouched: true })}
                InputProps={style2}
                className={classes.style}
              />
            </div>
            {storeName.isTouched && storeName.value.trim() === "" ? <StoreErrorMessage /> : null}
            {storeName.value.length > 15 ? <StoreLengthErrorMessage /> : null}

        

            {/* <div className={classes.style7}>
              <div className={classes.style11}>
                <Typography variant="body2" className={classes.style3} textAlign="left">
                  Address 2
                </Typography>
              </div>

              <TextField
                type="text"
                size="small"
                variant="standard"
                placeholder="Enter your Address 2"
                value={address2.value}
                onChange={(e) => setaddress2({ ...address2, value: e.target.value })}
                onFocus={() => setaddress2({ ...address2, isTouched: true })}
                InputProps={style2}
                className={classes.style}
              />
            </div> */}

            <div className={classes.style7}>
              <div className={classes.style11}>
                <Typography variant="body2" className={classes.style3} textAlign="left">
                  Country
                </Typography>
                <p id="nameError" className={classes.style10}>
                  *
                </p>
              </div>

              <TextField
                type="text"
                size="small"
                variant="standard"
                placeholder="Enter your Country"
                value={country.value}
                // onChange={(e) => setcountry({ ...country, value: e.target.value })}
                // onFocus={() => setcountry({ ...country, isTouched: true })}
                InputProps={style2}
                className={classes.style}
              />
            </div>
            {country.isTouched && country.value.trim() === "" ? <CountryErrorMessage /> : null}

            <div className={classes.style7}>
              <div className={classes.style11}>
                <Typography variant="body2" className={classes.style3} textAlign="left">
                  City/Town
                </Typography>
              </div>

              <TextField
                type="text"
                size="small"
                name="city"
                variant="standard"
                placeholder="Enter your City name"
                value={city.value}
                onChange={(e) => setcity({ ...city, value: e.target.value })}
                onFocus={() => setcity({ ...city, isTouched: true })}
                InputProps={style2}
                className={classes.style}
              />
            </div>

            <div className={classes.style7}>
              <div className={classes.style11}>
                <Typography variant="body2" className={classes.style3} textAlign="left">
                  Full Address 
                </Typography>
                <p id="nameError" className={classes.style10}>
                  *
                </p>
              </div>

              <TextField
                type="text"
                size="small"
                variant="standard"
                placeholder="Enter your Full Address"
                value={address1.value}
                onChange={(e) => setaddress1({ ...address1, value: e.target.value })}
                onFocus={() => setaddress1({ ...address1, isTouched: true })}
                InputProps={style2}
                className={classes.style}
              />
            </div>
            {address1.isTouched && address1.value.trim() === "" ? <AddressErrorMessage /> : null}

            {/* <div className={classes.style7}>
              <div className={classes.style11}>
                <Typography variant="body2" className={classes.style3} textAlign="left">
                  State/County
                </Typography>
              </div>

              <TextField
                type="text"
                size="small"
                name="state"
                variant="standard"
                placeholder="Enter your State name"
                value={state.value}
                onChange={(e) => setstate({ ...state, value: e.target.value })}
                onFocus={() => setstate({ ...state, isTouched: true })}
                InputProps={style2}
                className={classes.style}
              />
            </div> */}
{/* 
            <div className={classes.style7}>
              <div className={classes.style11}>
                <Typography variant="body2" className={classes.style3} textAlign="left">
                  Postcode/Zip
                </Typography>
                <p id="nameError" className={classes.style10}>
                  *
                </p>
              </div>

              <TextField
                type="text"
                size="small"
                variant="standard"
                name="zipcode"
                placeholder="Enter Postcode"
                value={zipcode.value}
                onChange={(e) => setzipcode({ ...zipcode, value: e.target.value })}
                onFocus={() => setzipcode({ ...zipcode, isTouched: true })}
                InputProps={style2}
                className={classes.style}
              />
            </div>
            {zipcode.isTouched && zipcode.value.trim() === "" ? <PostalErrorMessage /> : null} */}

            <div className={classes.style7}>
              <div className={classes.style11}>
                <Typography variant="body2" className={classes.style3} textAlign="left">
                  Contact Number
                </Typography>
                <p id="nameError" className={classes.style10}>
                  *
                </p>
              </div>

              <TextField
                type="text"
                size="small"
                variant="standard"
                placeholder="Enter your Contact Number"
                value={contactnumber.value}
                onChange={(e) => setcontactnumber({ ...contactnumber, value: e.target.value })}
                onFocus={() => setcontactnumber({ ...contactnumber, isTouched: true })}
                InputProps={style2}
                className={classes.style}
              />
            </div>
            <span className={classes.span}>eg. 03xx xxxxxxx</span>
            {contactnumber.isTouched && phoneNumreg.test(contactnumber.value) !== true ? <PhoneErrorMessage /> : null}

          

            <div className={classes.style7}>
              <div className={classes.style11}>
                <Typography variant="body2" className={classes.style3} textAlign="left">
                Referral Code
                </Typography>
              </div>

              <TextField
                type="text"
                size="small"
                variant="standard"
                placeholder="Enter Referral Code"
                value={refferalcode.value}
                onChange={(e) => setrefferalcode({ ...refferalcode, value: e.target.value })}
                onFocus={() => setrefferalcode({ ...refferalcode, isTouched: true })}
                InputProps={style2}
                className={classes.style}
              />
            </div>
            {isAuth ? (
              <></>
            ) : (
              <>
                <div className={classes.style7}>
                  <div className={classes.style11}>
                    <Typography variant="body2" className={classes.style3} textAlign="left">
                      Password
                    </Typography>
                    <p id="nameError" className={classes.style10}>
                      *
                    </p>
                  </div>

                  <TextField
                    type="password"
                    size="small"
                    variant="standard"
                    placeholder="Enter Password"
                    value={password.value}
                    onChange={(e) => setPassword({ ...password, value: e.target.value })}
                    onFocus={() => setPassword({ ...password, isTouched: true })}
                    InputProps={style2}
                    className={classes.style}
                  />
                </div>
                {password.isTouched && password.value.length < 8 ? <PasswordErrorMessage /> : null}
                <div className={classes.style7}>
                  <div className={classes.style11}>
                    <Typography variant="body2" className={classes.style3} textAlign="left">
                      Confirm Password
                    </Typography>
                    <p id="nameError" className={classes.style10}>
                      *
                    </p>
                  </div>

                  <TextField
                    type="password"
                    size="small"
                    variant="standard"
                    placeholder="Re-enter Password"
                    value={password2.value}
                    onChange={(e) => setPassword2({ ...password2, value: e.target.value })}
                    onFocus={() => setPassword2({ ...password2, isTouched: true })}
                    InputProps={style2}
                    className={classes.style}
                  />
                </div>
                {password2.isTouched && password.value !== password2.value ? <MissmatchPasswordErrorMessage /> : null}
              </>
            )}

            <p id="nameError" className={classes.style9}>
              {errors.valid ? errors.value : ""}
            </p>
            <p id="nameError" className={classes.style9}>
              {error ? error : ""}
            </p>
            <div className={classes.checkboxdiv}>
              <FormControlLabel
                control={<Checkbox checked={checkTerms} onChange={handleChangeTerms} className={classes.checkbox} />}
              />

              <div className={classes.styleAgree}>
                <a
                  style={{
                    color: "inherit",
                  }}
                  target="_blank"
                  href="/en/SellerTermsConditionPage"
                >
                  <Typography variant="body2" className={classes.terms} textAlign="left">
                    I agree to the BizB <span style={{ color: "#FDC114" }}>Terms & Conditions</span>
                  </Typography>
                </a>
              </div>
            </div>
            <p id="nameError" className={classes.style9}>
              {checkTermsError ? "You must accept the terms and conditions" : ""}
            </p>
            <Button
              className={classes.register}
              style={{ fontFamily: "Ostrich Sans Black", fontSize: "20px" }}
              InputProps={{ disableUnderline: true }}
              variant="h5"
              role="button"
              disabled={loginDisable}
              type="submit"
              onClick={handleSubmit}
            >
              {loginDisable ? <CircularProgress disableShrink size={24} style={{ color: "black" }} /> : "Register"}
            </Button>

            {/* <button type='submit' onClick={(e)}></button> */}
          </FormControl>
        </div>
      </div>
    </div>
  );
};
export default withApollo()(SellerRegistration);
