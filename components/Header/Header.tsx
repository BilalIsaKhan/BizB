//@ts-ignore
//@ts-nocheck
import React, { useState, Fragment, useEffect } from "react";
import inject from "hocs/inject";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Mobileheader from "./mobileheader";
import { NavigationDesktop } from "components/NavigationDesktop";
import {
  NavigationMobile,
  NavigationToggleMobile,
} from "components/NavigationMobile";
import LocaleDropdown from "components/LocaleDropdown";
import AccountDropdown from "components/AccountDropdown";
import ShopLogo from "@reactioncommerce/components/ShopLogo/v1";
import Link from "components/Link";
import MiniCart from "components/MiniCart";
import Search from "components/Search";
import ScrollingMessage from "../ScrollingMessage/ScrollingMessage";
import type { FC } from "react";
import type { WithStyles, Theme } from "@material-ui/core";
import useViewer from "hooks/viewer/useViewer";

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      textTransform: "uppercase",
      height: "120px",
      width: "100%",
      background: "none",
      display: "flex",
      zIndex: 1200,
      "& .MuiAppBar-colorPrimary": {
        backgroud: "green",
        width: "100%",
      },
    },
    imgSize: {
      width: "29px",
      height: "29px",
    },
    controls: {
      alignItems: "inherit",
      display: "inherit",
      flex: 1,
    },
    title: {
      color: theme.palette.reaction.reactionBlue,
      marginRight: theme.spacing(),
      borderBottom: `solid 5px ${theme.palette.reaction.reactionBlue200}`,
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: "20px",
      height: "120px",
      zIndex: 1200,
      "& > *:last-child": {
        border: "none !important", // or any other custom styles you want to apply
      },
    },
    light: {
      color: "#FFFFFF",
      cursor: "pointer",
      zIndex: 1200,
    },
    dark: {
      color: "#333333",
      backgroundImage: "none !important",
    },
    iconsInHeader: {
      marginRight: "25px",
      marginLeft: "25px",
      [theme.breakpoints.down(700)]: {
        marginRight: "1px",
        marginLeft: "1px",
      },
    },
  });

interface HeaderProps extends WithStyles<typeof styles> {
  shop: {
    name: string;
  };
  uiStore: {
    toggleMenuDrawerOpen: Function;
  };
  viewer: any;
  tags: PropTypes.arrayOf;
}

{
  /* @ts-ignore TODO: Refactor link to address type error */
}
const Header: any = ({ classes, shop, uiStore, headerType, tags }) => {
  const [viewer, loading, refetch] = useViewer();

  const [modalFlag, setModalFlag] = useState(false);
  const handleOpenModal = () => {
    // console.log("ModalFlag",modalFlag);
    setModalFlag(true);
  };
  const handleNavigationToggleClick = () => {
    uiStore.toggleMenuDrawerOpen();
  };
  React.useEffect(() => {}, [viewer]);
  return (
    <>
      <ScrollingMessage message="Enjoy free delivery on orders above Rs. 3000" />

      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Mobileheader />
          {/* @ts-ignore TODO: Refactor link to address type error */}
          <div className={classes.dark}>
            <Hidden mdUp>
              <NavigationToggleMobile onClick={handleNavigationToggleClick} />
            </Hidden>
          </div>
          {/* <Hidden mdUp>
          <NavigationToggleMobile onClick={handleNavigationToggleClick} />
        </Hidden> */}
          {/* @ts-ignore TODO: Refactor link to address type error */}
          <div className={classes.controls}>
            <Typography className={classes.title} color="inherit" variant="h6">
              {/* @ts-ignore TODO: Refactor link to address type error */}
              {/* <Link route="/">
              {shop ? <ShopLogo shopName={shop.name} /> : "Example Storefront"}
            </Link> */}
            </Typography>
            {/* @ts-ignore TODO: Refactor link to address type error */}
            <Hidden smDown>
              <NavigationDesktop
                headerType={headerType}
                tags={tags}
                classes={classes}
                viewer={viewer}
              />
            </Hidden>
            {/* @ts-ignore TODO: Refactor link to address type error */}
          </div>
          {/* @ts-ignore TODO: Refactor link to address type error */}
          <div
            style={{
              zIndex: -1,
              width: "98%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
            }}
          >
            {/* @ts-ignore TODO: Refactor link to address type error */}
            {headerType ? (
              <Link href="/">
                <img
                  style={{
                    zIndex: 0,
                    width: "95px",
                    cursor: "pointer",
                  }}
                  src="/images/logolight.webp"
                  className="headerlogo"
                  alt="icons"
                />
              </Link>
            ) : (
              <Link href="/">
                <Hidden smDown>
                  <img
                    style={{
                      zIndex: 0,
                      width: "95px",
                      height: "80px",
                      cursor: "pointer",
                    }}
                    src="/images/logoDark.svg"
                    className="headerlogo"
                    alt="icons"
                  />
                </Hidden>
                <Hidden mdUp>
                  <img
                    style={{
                      zIndex: 0,
                      width: "60px",
                      cursor: "pointer",
                    }}
                    src="/images/logo-mobile.svg"
                    className="headerlogo"
                    alt="icons"
                  />
                </Hidden>
              </Link>
            )}
          </div>

          <AccountDropdown
            headerType={headerType}
            className={classes.iconsInHeader}
            // style={{ marginRight: "9px",marginBottom:"7px" }}
          />
          {/* @ts-ignore TODO: Refactor link to address type error */}
          {/* <Hidden smDown> */}
          <span
            onClick={handleOpenModal}
            className={classes.iconsInHeader}
          >
            {/* @ts-ignore TODO: Refactor link to address type error */}
            {headerType ? (
              <img src="/icons/search.png" className={classes.imgSize} alt="icons" />
            ) : (
              <img src="/icons/search.png" className={classes.imgSize} alt="icons" />
            )}
          </span>
          {/* </Hidden> */}
          {/* @ts-ignore TODO: Refactor link to address type error */}
          <Search modalFlag={modalFlag} setModalFlag={setModalFlag} />
          {/* @ts-ignore TODO: Refactor link to address type error */}
          <MiniCart
            headerType={headerType}
            className={classes.iconsInHeader}

            className="headerlogo"
          />
          {/* @ts-ignore TODO: Refactor link to address type error */}
          {/* <LocaleDropdown /> */}
          {/* @ts-ignore TODO: Refactor link to address type error */}
          {/* <AccountDropdown />
        <span><img src="/images/searchIcon.svg"/></span>
        <MiniCart /> */}
        </Toolbar>
        {/* @ts-ignore TODO: Refactor link to address type error */}
        <NavigationMobile shop={shop} viewer={viewer} />
      </AppBar>
    </>
  );
};

export default withStyles(styles)(inject("uiStore")(Header));
