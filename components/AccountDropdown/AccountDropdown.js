import React, { useState, Fragment, useEffect } from "react";
import inject from "hocs/inject";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
// import AccountIcon from "mdi-material-ui/Account";
import Popover from "@material-ui/core/Popover";
import useViewer from "hooks/viewer/useViewer";
import ViewerInfo from "../../reaction-plugins/reaction-component-library/package/src/components/ViewerInfo/v1";
import Link from "components/Link";
import useStores from "hooks/useStores";
import EntryModal from "../Entry/EntryModal";
import getAccountsHandler from "../../lib/accountsServer.js";
import TagManager from "react-gtm-module";
import ReactGA from "react-ga4";
import useCreateWallet from "../../hooks/wallet/createWallet.js";
import useGetUserWallet from "../../hooks/wallet/getWalletsByUserId.js";


const useStyles = makeStyles((theme) => ({
  accountDropdown: {
    boxShadow: " 0 3px 5px 0 #000",
    // zIndex: "99999999",
    width: "150px",
    background: "#fff",
    padding: theme.spacing(2),
    "& .MuiPopover-paper": {
      display: "none",
    },
    "& .MuiPaper-root": {
      display: "none",
    },
  },
  "& .MuiPaper-elevation0": { background: "black" },
  "& .MuiPopover-paper": {
    background: "none",
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  imgSize: {
    width: "33px",
    height: "33px",
    marginTop: "3px",
  },
  authbutton: {
    background: theme.palette.secondary.selected,
    margin: "5px",
    color: "#ffffff",
    borderRadius: "40px",
    "&:hover": { background: theme.palette.secondary.selected },
  },
  popover: {
    marginTop: "70px",
    "& .MuiPopover-paper": {
      borderBottomLeftRadius: "20px",
      borderBottomRightRadius: "20px",
    },
  },
  profile: {
    color: "#333333",
    cursor: "pointer",
    "&:hover": {
      color: "#fdc114",
    },
  },
  dropdownButton: {
    [theme.breakpoints.down(700)]: {
      marginRight: "9px",
      marginBottom: "7px",
    },
  },
}));

const AccountDropdown = ({ headerType }) => {
  const router = useRouter();
  const { uiStore } = useStores();
  const { setEntryModal } = uiStore;
  const resetToken = router?.query?.resetToken;
  const classes = useStyles();
  const [anchorElement, setAnchorElement] = useState(null);
  const [viewer, loading, refetch] = useViewer();
  const { accountsClient } = getAccountsHandler();
  const isAuthenticated = viewer && viewer._id;
  const [createWallet, loading2] = useCreateWallet();
  const [getUserWallet, loading3, refecth] = useGetUserWallet(viewer?.userId);



  useEffect(() => {
    console.log("viewer loading state", loading)
    // Open the modal in case of reset-password link
    
    if (!resetToken) {
      return;
    }
    setEntryModal("reset-password");
  }, [resetToken]);

  useEffect(() => {
    console.log("getUserWalletgetUserWallet", getUserWallet)
    // Open the modal in case of reset-password link
      }, [viewer]);

  

  useEffect(() => {
    const fetchData = async () => {
      if (viewer?._id) {
        try {
          const createWalletOfUser = await createWallet({
            variables: {
              userId: viewer?.userId,
              amount: 0,
              paymentProcessor: "easyapisa"
            },
          });
  
          console.log("createWalletOfUsercreateWalletOfUser", createWalletOfUser);
        } catch (error) {
          console.error("Error creating wallet:", error);
        }
      }
    };
  
    fetchData();
  }, [viewer]);
  

  const onClose = () => {
    setAnchorElement(null);
  };

  const handleSignOut = async () => {
    // Track "User Logout" event with Google Analytics 4
    ReactGA.send({
      hitType: "event",
      eventCategory: "User",
      eventAction: "logout",
    });
    await accountsClient.logout();
    await refetch();
    onClose();
  };

  const toggleOpen = (event) => {
    setAnchorElement(event.currentTarget);
  };
  const handleProfile = () => {
    window.location.href = "https://bizb.store/dashboard/myprofile?role=1";
  };
  const handleDashboard = () => {
    window.location.href = "https://bizb.store/dashboard/publishproduct";
  };
  return (
    <Fragment headerType>
      <EntryModal onClose={onClose} resetToken={resetToken} />
      {loading?
      <></>:
      <>
      {isAuthenticated ? (
        <ButtonBase onClick={toggleOpen} className={classes.dropdownButton}>
          <ViewerInfo viewer={viewer} headerType={headerType} />
        </ButtonBase>
      ) : (
        <IconButton
          color="inherit"
          onClick={() => setEntryModal("login")}
          style={{
            background: anchorElement ? "#fdc114" : "",
          }}
        >
          <span>
            {headerType ? (
              <img src="/icons/user.png" className={classes.imgSize} alt="icons" />
            ) : (
              <img src="/icons/user.png" className={classes.imgSize} alt="icons" />
            )}
          </span>
        </IconButton>
      )}
      </>
      }

      <Popover
        className={classes.popover}
        anchorEl={anchorElement}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
          marginTop: "100px",
        }}
        // elevation={0}
        open={Boolean(anchorElement)}
        onClose={onClose}
      >
        <div className={classes.accountDropdown}>
          {isAuthenticated ? (
            <Fragment>
              <div style={{ marginBottom: "20px" }}>
                <div onClick={handleProfile}>
                  <span className={classes.profile}>Profile</span>
                </div>
              </div>
              <div style={{ cursor: "pointer", marginBottom: "24px" }} onClick={handleSignOut}>
                <span className={classes.profile} style={{ cursor: "pointer" }}>
                  Log out
                </span>
              </div>{" "}
            </Fragment>
          ) : (
            <></>
          )}
        </div>
      </Popover>
    </Fragment>
  );
};

export default inject("authStore")(AccountDropdown);
