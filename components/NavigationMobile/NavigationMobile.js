import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import ShopLogo from "@reactioncommerce/components/ShopLogo/v1";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuList from "@material-ui/core/MenuList";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "mdi-material-ui/Close";
import Link from "components/Link";
import NavigationItemMobile from "./NavigationItemMobile";
import NavigationSubMenuMobile from "./NavigationSubMenuMobile";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import Checkroom from '@material-ui/icons/LocalOffer';
import Store from '@material-ui/icons/Store';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import BallotOutlinedIcon from '@material-ui/icons/BallotOutlined';
import LocationOn from '@material-ui/icons/LocationOn';
import ArrowDropDownCircleOutlined from '@material-ui/icons/ArrowDropDownCircleOutlined';
import AllInboxOutlined from '@material-ui/icons/AllInboxOutlined';
import Collapse from '@material-ui/core/Collapse';
import useprimaryShop from "../../hooks/primaryShop/useprimaryShop";
import useTagsQuery from "../../hooks/categoryTags/getTags";
import useViewer from "hooks/viewer/useViewer";
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    flex: "0 0 auto",
    // color: "red",
    // backgroundColor: "green",
  },
  toolbarTitle: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
  },
  title: {
    display: "inline-block",
    color: theme.palette.reaction.reactionBlue,
    borderBottom: `solid 5px ${theme.palette.reaction.reactionBlue200}`,
  },
  here: {
    backgroundColor: "red",
    color: "blue",
  },
  menu: {
    flex: "1 1 auto",
    overflowY: "auto",
    width: 240,
    padding: 0,
  },
  subNav: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 320,
    height: "100vh",
    backgroundColor: theme.palette.background.default,
  },
  navButtonActive: {
    boxShadow: " inset 0 0 0 0 #FDC114",
    color: "black",
    // margin: "0 -.25rem",
    // padding: "0 .25rem",
    transition: "color .3s ease-in-out, box-shadow .3s ease-in-out",
    fontSize: "18px",
    background: "none",
    '&:hover': { backgroundColor: '#FDC114' },
    border: "none",
    fontWeight: 500,
    padding: 0,
    paddingTop: 1,
    marginTop: "6px",
    marginRight: "10px",
    cursor: "pointer",
  },
  categoryTagsLink: {
    borderBottom: "1px solid #59595940",
  },
  navButtonActive2: {
    boxShadow: " inset 0 0 0 0 #FDC114",
    color: "black",
    // margin: "0 -.25rem",
    // padding: "0 .25rem",
    transition: "color .3s ease-in-out, box-shadow .3s ease-in-out",
    fontSize: "18px",
    background: "none",
    '&:hover': { backgroundColor: '#FDC114' },
    border: "none",
    fontWeight: 500,
    padding: 0,
    paddingTop: 1,
    marginTop: "6px",
    marginRight: "10px",
    cursor: "pointer",
    marginLeft: "15px",
    marginBottom: "8px"

  },
  rowDiv: {
    display: "flex",
    justifyContent: "center"
  },
  input: {
    justifyContent: "end"
  }
});

const NavigationMobile = ({ classes, navItems, uiStore, shop, props }) => {
  const [navItem, setNavItem] = useState(null);
  const [viewer, loading4, refetch4] = useViewer();
  const [open, setOpen] = useState(false);
  const [primaryShopId, refetch2] = useprimaryShop();
  const [categoryTags] = useTagsQuery(primaryShopId, "category-");
  console.log("propsjd here in this", props)



  const [state, setState] = useState({
    customOrder: ["Casuals", "Western", "Party Wear", "BizB Kids", "Accessories", "Shoes", "Deals", "Deal", "Upcycled", "EXPRESS DELIVERY",],
    mappedData: [],
    // Other state variables...
  });
  useEffect(() => {
    mapData();
    console.log("categoryTagscategoryTags", categoryTags, primaryShopId);
    // Additional useEffect logic...
  }, [categoryTags, primaryShopId, viewer]);

  const mapData = () => {
    const { customOrder } = state;
    console.log("user 1 data tem", categoryTags);

    const maData = customOrder
      .map((item) => {
        console.log("user 1 data tem", categoryTags);
        const dataItem = categoryTags?.find((originalItem) => originalItem.displayTitle === item);
        console.log("user 1 category tem dataItem", dataItem);

        return dataItem ? { ...dataItem } : null;
      })
      .filter(Boolean);
    console.log("user 1vvbm", maData, categoryTags);

    setState((prevState) => ({ ...prevState, mappedData: maData }));
  };

  const handleNavItemClick = (navItem) => {
    setNavItem(navItem);
  };

  const handleClick = () => {
    setOpen(!open);
  }

  const handleCloseSubMenu = () => {
    setNavItem(null);
  };

  const handleClose = () => {
    handleCloseSubMenu();
    uiStore.closeMenuDrawer();
  };
  const { mappedData } = state;

  return (
    // <Drawer open={uiStore.isMenuDrawerOpen} onClose={handleClose}>
    //   <div className={classes.header}>
    //     <Toolbar disableGutters className={classes.input}>
    //       <IconButton onClick={handleClose} >
    //         <ChevronLeftIcon style={{ color: "black" }} />
    //       </IconButton>
    //     </Toolbar>
    //     <Divider />
    //   </div>
    //   <nav className={classes.menu}>
    //     <Link href="/">
    //       <MenuList className={classes.navButtonActive}>
    //         <IconButton  >
    //           <HomeIcon style={{ color: "black" }} />
    //         </IconButton>
    //         Home
    //       </MenuList>
    //     </Link>
    //     <a href="/en/explore" className={{ "&:hover": { backgroundColor: "red" } }}>
    //       <MenuList className={classes.navButtonActive}>
    //         <IconButton  >
    //           <ExploreOutlinedIcon style={{ color: "black" }} />
    //         </IconButton>
    //         Explore
    //       </MenuList>
    //     </a>
    //     <a>
    //       <MenuList
    //         onClick={handleClick}
    //         className={classes.navButtonActive}
    //       >
    //         <IconButton>
    //           <AllInboxOutlined style={{ color: "black" }} />
    //         </IconButton>
    //         Categories
    //         <IconButton>
    //           {open ? <ArrowDropDownCircleOutlined style={{ color: "black" }} /> : ''}
    //         </IconButton>
    //       </MenuList>
    //     </a>
    //     <Collapse in={open} timeout='auto' unmountOnExit>
    //       {/* Additional code for the Collapse */}
    //     </Collapse>
    //     {/* Other MenuList items */}
    //   </nav>
    //   <Slide direction="left" in={!!navItem}>
    //     <nav className={classes.subNav}>
    //       <NavigationSubMenuMobile navItem={navItem} onBackButtonClick={handleCloseSubMenu} />
    //     </nav>
    //   </Slide>
    // </Drawer>
    <Drawer open={uiStore.isMenuDrawerOpen} onClose={handleClose}>
      <div className={classes.header}>
        <Toolbar disableGutters className={classes.input}>

          <IconButton onClick={handleClose} >
            <ChevronLeftIcon style={{ color: "black" }} />
          </IconButton>


        </Toolbar>

        <Divider />
      </div>
      <nav className={classes.menu}>
        <Link href="/">
          {/* <MenuList disablePadding>{navItems.items.map(this.renderNavItem)}</MenuList> */}

          <MenuList className={classes.navButtonActive}>
            <IconButton  >
              <HomeIcon style={{ color: "black" }} />
            </IconButton>
            Home
            {/* @ts-ignore TODO: Refactor link to address type error */}
          </MenuList>
        </Link>
        <a href="/en/explore" className={{ "&:hover": { backgroundColor: "red" } }}>
          <MenuList className={classes.navButtonActive}>
            <IconButton  >
              <ExploreOutlinedIcon style={{ color: "black" }} />
            </IconButton>
            Explore
            {/* @ts-ignore TODO: Refactor link to address type error */}
          </MenuList>
        </a>
        <a>
          <MenuList
            onClick={handleClick}
            className={classes.navButtonActive}
          >
            <IconButton>
              <AllInboxOutlined style={{ color: "black" }} />
            </IconButton>
            Categories
            <IconButton>
              {open ? <ArrowDropDownCircleOutlined style={{ color: "black" }} /> : ''}
            </IconButton>
          </MenuList>
        </a>
        <Collapse in={open} timeout='auto' unmountOnExit>
          {mappedData?.map((itemtitle, i) => (
            <a
              href={
                itemtitle.displayTitle === "Upcycled"
                  ? `/en/tmucpage/${itemtitle._id}`
                  : `/en/categories/${itemtitle._id}`
              }
              className={classes.categoryTagsLink}
            >
              <MenuList className={classes.navButtonActive2}>
                {itemtitle.displayTitle}
              </MenuList>
            </a>
          ))}
        </Collapse>
        <a href="/en/brands" className={{ "&:hover": { backgroundColor: "red" } }}>
          <MenuList className={classes.navButtonActive}>
            <IconButton  >
              <Checkroom style={{ color: "black" }} />
            </IconButton>
            Brands
            {/* @ts-ignore TODO: Refactor link to address type error */}
          </MenuList>
        </a>
        <a href="/en/wardrobe" className={{ "&:hover": { backgroundColor: "red" } }}>
          <MenuList className={classes.navButtonActive}>
            <IconButton  >
              <Store style={{ color: "black" }} />
            </IconButton>
            Wardrobes
            {/* @ts-ignore TODO: Refactor link to address type error */}
          </MenuList>
        </a>
        <a href="https://bizb.store/dashboard/uploadproductdetail">
          <MenuList className={classes.navButtonActive}>
            <IconButton  >
              <PublishOutlinedIcon style={{ color: "black" }} />
            </IconButton>
            Upload Product
            {/* @ts-ignore TODO: Refactor link to address type error */}
          </MenuList>
        </a>
        {viewer?.isSeller === true ?
          <a href="https://bizb.store/dashboard/home">
            <MenuList className={classes.navButtonActive}>
              <IconButton  >
                <SupervisedUserCircleOutlinedIcon style={{ color: "black" }} />
              </IconButton>
              Dashboard
              {/* @ts-ignore TODO: Refactor link to address type error */}
            </MenuList>
          </a>
          :
          <a href="/en/SellerRegistrationPage">
            <MenuList className={classes.navButtonActive}>
              <IconButton  >
                <SupervisedUserCircleOutlinedIcon style={{ color: "black" }} />
              </IconButton>
              Become a Seller
              {/* @ts-ignore TODO: Refactor link to address type error */}
            </MenuList>
          </a>}
        <a target="_blank" href="https://old.bizb.store/how-to-sell/">
          <MenuList className={classes.navButtonActive}>
            <IconButton  >
              <ContactSupportOutlinedIcon style={{ color: "black" }} />
            </IconButton>
            How to Sell
            {/* @ts-ignore TODO: Refactor link to address type error */}
          </MenuList>
        </a>
        <a target="_blank" href="https://old.bizb.store/blog/">
          <MenuList className={classes.navButtonActive}>
            <IconButton  >
              <LibraryBooksOutlinedIcon style={{ color: "black" }} />
            </IconButton>
            Our Blogs
            {/* @ts-ignore TODO: Refactor link to address type error */}
          </MenuList>
        </a>

        <a target="_blank" href="https://blog.bizb.store/contact-us-2/">
          <MenuList className={classes.navButtonActive}>
            <IconButton  >
              <PhoneOutlinedIcon style={{ color: "black" }} />
            </IconButton>
            Contact Us
            {/* @ts-ignore TODO: Refactor link to address type error */}
          </MenuList>
        </a>
        <a target="_blank" href="https://blog.bizb.store/privacy-policy-2/">
          <MenuList className={classes.navButtonActive}>
            <IconButton  >
              <AssignmentOutlinedIcon style={{ color: "black" }} />
            </IconButton>
            Privacy Policy
            {/* @ts-ignore TODO: Refactor link to address type error */}
          </MenuList>
        </a>
        <a target="_blank" href="https://blog.bizb.store/return-policy/">
          <MenuList className={classes.navButtonActive}>
            <IconButton  >
              <AssignmentOutlinedIcon style={{ color: "black" }} />
            </IconButton>
            Return Policy
            {/* @ts-ignore TODO: Refactor link to address type error */}
          </MenuList>
        </a>
        <a target="_blank" href="https://blog.bizb.store/return-policy/">
          <MenuList className={classes.navButtonActive}>
            <IconButton  >
              <BallotOutlinedIcon style={{ color: "black" }} />
            </IconButton>
            Terms & Condition
            {/* @ts-ignore TODO: Refactor link to address type error */}
          </MenuList>
        </a>
        <a target="_blank" href="https://g.co/kgs/eHpiuSF">
          <MenuList className={classes.navButtonActive}>
            <IconButton  >
              <LocationOn style={{ color: "black" }} />
            </IconButton>
            Find Us
            {/* @ts-ignore TODO: Refactor link to address type error */}
          </MenuList>
        </a>

        {/* <MenuList className={classes.navButtonActive}>
              Byol
              
            </MenuList> */}
      </nav>
      <Slide direction="left" in={!!navItem}>
        <nav className={classes.subNav}>
          <NavigationSubMenuMobile navItem={navItem} onBackButtonClick={handleCloseSubMenu} />
        </nav>
      </Slide>
    </Drawer>
  );
};

NavigationMobile.propTypes = {
  classes: PropTypes.object,
  navItems: PropTypes.object,
  shop: PropTypes.shape({
    name: PropTypes.string,
  }),
  uiStore: PropTypes.shape({
    closeMenuDrawer: PropTypes.func,
  }).isRequired,
};

NavigationMobile.defaultProps = {
  classes: {},
  navItems: {},
};

export default withStyles(styles)(inject("navItems", "uiStore")(NavigationMobile));
