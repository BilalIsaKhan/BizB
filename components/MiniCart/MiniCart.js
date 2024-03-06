import React, { Component, Fragment, useState } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import { withStyles } from "@material-ui/core/styles";
import MiniCartComponent from "../../reaction-plugins/reaction-component-library/package/src/components/MiniCart/v1";
import CartItems from "components/CartItems";
import CartEmptyMessage from "@reactioncommerce/components/CartEmptyMessage/v1";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import Router from "translations/i18nRouter";
import Badge from "@material-ui/core/Badge";
import formatCurrency from "../../lib/utils/formatCurrency";
import withCart from "containers/cart/withCart";
import Link from "components/Link";
import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";
import { CircularProgress, Hidden } from "@material-ui/core";

const styles = (theme) => ({
  popper: {
    marginTop: "0.5rem",
    marginRight: "1rem",
  },
  cart: {
    backgroundColor: theme.palette.common.white,
    cursor: "pointer",
    "&.MuiButton-root:hover": {
      transform: "scale(1.08)",
      transition: "left 0.2s linear",
      backgroundColor: theme.palette.common.white,
    },
  },
  emptyCart: {
    display: "flex",

    border: "green",
  },
  storeName: {
    textTransform: "uppercase",
    fontSize: "0.9rem",
    "&:hover": {
      // color:"#FDC114",
      // cursor:"pointer",
      // textDecoration:"underline"
    },
  },
  badge: {
    width: 20,
    height: 20,
    top: 5,
    left: 15,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    height: "100%",
    width: "468px",
    [theme.breakpoints.down("sm")]: {
      width: "350px",
    },
    position: "absolute",
    top: "0px",
    right: "0px",

    border: "",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  cartmodal: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",

    borderBottom: "1px solid #E5E5E5",
  },
  cartitems: {
    height: "66vh",
    overflowY: "auto",
 
  },
  paper2: {
    backgroundColor: theme.palette.background.paper,
    height: "100vh",
    width: "400px",
    position: "absolute",
    top: "0px",
    right: "0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  cartitem: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderBottom: "1px solid #e5e5e5",
  },
  cartitemimage: {
    width: "140px",
    height: "120px",
    marginBottom: theme.spacing(2),
  },
  cartimage: {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    objectFit: "cover",
  },
  cartitemtext: {
    display: "flex",
    width: "240px",
    flexDirection: "column",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  cartprice: {
    fontSize: "1rem",
    paddingTop: theme.spacing(1),
    color: theme.palette.secondary.selected,
  },
  cartpric: {
    paddingTop: theme.spacing(1),
  },
  total: {
    borderTop: "1px solid #E5E5E5",
    position: "fixed",
    width: "390px",
    padding: "10px 0px",
    bottom: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
  },
  total1: {
    display: "flex",
    justifyContent: "space-around",
    padding: "5px 0px",
    [theme.breakpoints.down("sm")]: {
      padding: "0px 0px",
    },
  },
  imgSize: {
    width: "28px",
    height: "28px",
  },
  cart1: {
    height: "48px",
    width: "140px",
    borderRadius: "40px",
    background: "#333333",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "10px",

    "&:hover": {
      transform: "scale(1.08)",
      transition: "left 0.2s linear",
      background: theme.palette.reaction.black,
    },
  },
  cart2: {
    position: "fixed",
    padding: "10px 0px",
    bottom: "149px",
    height: "38px",
    width: "120px",
    borderRadius: "40px",
    background: "#333333",
    display: "flex",
    alignItems: "center",
    marginRight: "45px",


    "&:hover": {
      transform: "scale(1.08)",
      transition: "left 0.2s linear",
      background: theme.palette.reaction.black,
    },
  },
  cartDiv:{
    display: "flex",
    cursor: "pointer",
    height:"80px",
    alignItems: "flex-end",
    justifyContent:"flex-end",
    [theme.breakpoints.down("sm")]: {
      width: "118%",
    },
  },
  cart: {
    height: "48px",
    width: "140px",
    borderRadius: "40px",
    marginTop: "10px",
    background: theme.palette.secondary.selected,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    "&:hover": {
      transform: "scale(1.08)",
      transition: "left 0.2s linear",
      background: theme.palette.secondary.selected,
    },
  },
  carttext: {
    color: theme.palette.primary.contrastText,
  },
  paper2: {
    backgroundColor: theme.palette.background.paper,
    marginTop: "15vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  emptycart: {
    marginTop: theme.spacing(5),
    width: "239px",
    height: "58px",
    textAlign: "center",
  },
  continue: {
    width: "250px",
    height: "48px",
    borderRadius: "40px",
    marginTop: theme.spacing(5),
    border: "none",
    display: "flex",
    textTransform: "uppercase",
    justifyContent: "center",
    alignItems: "center",
    background: theme.palette.secondary.selected,
    "&:hover": {
      transform: "scale(1.08)",
      transition: "left 0.2s linear",
      background: "#FDC114",
    },
    "&.MuiButton-root": {
      fontSize: "20px",
      color: "#333333",
      fontFamily: "Ostrich Sans Black",
      fontWeight: 900,

      lineHeight: "24px",
      fontFamily: "Ostrich Sans Black",
    },
  },
  bagecontet: {
    marginBottom: "30px",
    marginLeft: "35px",
    borderRadius: "50px",
    height: "20px",
    width: "20px",
    background: "#fdc114",
    position: "absolute",
    color: "black",
    fontSize: "1rem",
    fontWeight: "400",
    fontFamily: "Lato",
  },
  bagecontetd: {
    marginBottom: "50px",
    marginLeft: "40px",
    position: "absolute",
    color: "white",
    fontSize: "25px",
    fontWeight: "400",
    fontFamily: "Lato",
  },
  lastDiv: {
    border: "none",
  },
});

const MiniCart = React.memo(({ ...props }) => {
  const [anchorElement, setAnchorElement] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
  const [isLoading3, setisLoading3] = useState(false);
  const [isLoading4, setisLoading4] = useState({});


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckoutButtonClick = () => {
    const productIds = cart?.items?.map((item) => item._id);
    setisLoading2(true);
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

    const dataLayer = {
      dataLayer: {
        event: "checkout_initiated",
        ecommerce: {
          currencyCode: "PK", // Replace with your currency code
          checkout: {
            actionField: { step: 1 },
            products: cart.items.map((item) => ({
              id: item.productConfiguration.productId,
              price: item.price.amount,
              quantity: item.quantity, // Adjust the quantity for each product as needed
            })),
          },
        },
      },
    };

    TagManager.dataLayer(dataLayer);
    Router.push("/cart/checkout");
    // console.log("button clicked");
  };

  const handleOnClick = () => {
    const { closeCart } = props.uiStore;
    const productIds = cart?.items.map((item) => item._id);
    setisLoading(true);
    const dataLayer = {
      dataLayer: {
        event: "cart_view",
        ecommerce: {
          currencyCode: "USD", // Replace with your currency code
          cart: {
            products: productIds,
          },
        },
      },
    };

    TagManager.dataLayer(dataLayer);

    Router.push("/cart");
  };
  const handleOnClick2 = async (cart) => {
    setisLoading3(true);

    const { onRemoveCartItems } = props;

    const itemID = cart?.items?.map((item) => {
      return item?._id;
    });
    console.log("newids", itemID);
    await onRemoveCartItems(itemID);
    setisLoading3(false)
  };

  const handleRemoveItem = async (itemID) => {
   

    ReactGA.send({
      hitType: "event",
      eventCategory: "Ecommerce",
      eventAction: "remove_from_cart",
      eventLabel: itemID,
    });
  
    const { onRemoveCartItems } = props;
  
    console.log(itemID, "me");
  
    // Assuming onRemoveCartItems returns a Promise after removing the item
    try {
      await onRemoveCartItems(itemID);
      setisLoading4((prevState) => ({
        ...prevState,
        [itemID]: false,
      }))
      // Additional logic after successful removal if needed
    } catch (error) {
      // Handle error, if any
      console.error("Error removing item:", error);
      setisLoading4((prevState) => ({
        ...prevState,
        [itemID]: false,
      }))
    }
  };
  

  function renderMiniCart() {
    const { cart, classes, hasMoreCartItems, loadMoreCartItems } = props;
    // console.log(cart, "cart");
    if (cart && Array.isArray(cart.items) && cart.items.length) {
      return (
        <MiniCartComponent
          cart={cart}
          onCheckoutButtonClick={handleCheckoutButtonClick}
          components={{
            QuantityInput: "div",
            CartItems: (cartItemProps) => (
              <>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <div className={classes.paper}>
                      <div className={classes.cartmodal}>
                        {" "}
                        <Typography
                          style={{ fontWeight: "700", fontFamily: "Lato", fontSize: "1.1rem" }}
                          variant="subtitle1"
                        >
                          Cart
                        </Typography>
                        <CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
                      </div>
                      <div className={classes.cartitems}>
                        {cart?.items?.map((item) => {
                          return (
                            <div className={classes.cartitem}>
                              <div className={classes.cartitemimage}>
                                {console.log("images here ",item)}
                                <img
                                  src={item?.metafields[0]?.value}
                                  alt={item.title}
                                  className={classes.cartimage}
                                ></img>
                              </div>
                              {/* <h1>{cart?.checkout?.summary?inventoryavala}</h1> */}
                              <div className={classes.cartitemtext}>
                                {" "}
                                <Typography variant="h4" style={{ textTransform: "capitalize", fontSize: "0.9rem" }}>
                                  {item.title.toString().toLowerCase()}
                                </Typography>
                                <Typography variant="h4" style={{ fontSize: "1rem" }}>
                                Wardrobe:&nbsp;
                                  <span className={classes.storeName}>
                                    {item?.storeNameValue?.storeName.slice(0, 15)}
                                    {console.log("itemite", item)}
                                  </span>
                                </Typography>{" "}
                                <Typography variant="h4" className={classes.cartprice}>
                                  {formatCurrency(item?.price?.amount)}
                                </Typography>
                              </div>
                              {isLoading4[item._id]? (
                            <CircularProgress size={20} />
                          ) : (
                              <img
                                style={{ cursor: "pointer" }}
                                src={`/cart/icon.svg`}
                                alt={"Delete"}
                                onClick={() =>{
                                  setisLoading4((prevState) => ({
                                    ...prevState,
                                    [item._id]: true,
                                  }))
                                 handleRemoveItem(item._id)}
                                }
                              />
                          )}
                            </div>
                          );
                        })}
                      </div>
                      <div
                        className={classes.cartDiv}
                      >
                        <Button
                          className={classes.cart2}
                          onClick={() => {
                            
                            handleOnClick2(cart);
                          }}
                        >
                          {isLoading3 ? (
                            <CircularProgress size={20} />
                          ) : (
                            <Typography gutterBottom variant="h5" component="h2" className={classes.carttext}>
                              Clear All
                            </Typography>
                          )}
                        </Button>
                      </div>
                      <div className={classes.total}>
                        <div className={classes.total1}>
                          <Typography variant="h4" style={{ fontSize: "1.2rem" }}>
                            Total Price
                          </Typography>
                          <Typography variant="h4" style={{ fontSize: "1.2rem" }}>
                            {formatCurrency(cart?.checkout?.summary?.total?.amount)}
                          </Typography>
                        </div>
                        <div className={classes.total1}>
                          <div style={{ cursor: "pointer" }}>
                            <Button className={classes.cart1} onClick={handleOnClick}>
                              {isLoading ? (
                                <CircularProgress />
                              ) : (
                                <Typography gutterBottom variant="h5" component="h2" className={classes.carttext}>
                                  VIEW CART{" "}
                                </Typography>
                              )}
                            </Button>
                          </div>
                          <div style={{ cursor: "pointer" }}>
                            <Button onClick={handleCheckoutButtonClick} className={classes.cart}>
                              {isLoading2 ? (
                                <CircularProgress color={"black"} />
                              ) : (
                                <Typography gutterBottom variant="h5" component="h2">
                                  CHECKOUT
                                </Typography>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fade>
                </Modal>
              </>
            ),
          }}
        />
      );
    }

    return (
      <>
        {" "}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          // closeAfterTransition
          // BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <div className={classes.cartmodal}>
                {" "}
                <Typography style={{ fontWeight: "700", fontFamily: "Lato" }} variant="subtitle1">
                  Cart
                </Typography>
                <CloseIcon onClick={handleClose} />
              </div>
              <div className={classes.paper2}>
                <img src="/cart/empty.svg" alt="empty cart" />
                <div className={classes.emptycart}>
                  <Typography variant="h4">You haven’t added any pre-loved item</Typography>
                </div>
                <a href="/">
                  <Button className={classes.continue} InputProps={{ disableUnderline: true }} variant="h6">
                    {" "}
                    Continue Shopping
                  </Button>
                </a>
              </div>
            </div>
          </Fade>
        </Modal>
      </>
    );
  }

  const { cart, classes, uiStore, headerType } = props;

  return (
    <Fragment>
      <div className={classes.lastDiv} headerType>
        <IconButton color="none" borderBottom="none" onClick={handleOpen} className={classes.lastDiv} headerType>
          {cart && cart.totalItemQuantity > 0 ? (
            <>
              {" "}
              {headerType ? (
                <span className={classes.bagecontetd}>{cart.totalItemQuantity} </span>
              ) : (
                <span className={classes.bagecontet}>{cart.totalItemQuantity} </span>
              )}
              <Badge color="none" border="none" classes={{ badge: classes.badge }}>
                <span>
                  {headerType ? (
                    <img src="/icons/shop.png" className={classes.imgSize} alt="icons" />
                  ) : (
                    <img src="/icons/shop.png" className={classes.imgSize} alt="icons" />
                  )}
                </span>
              </Badge>
            </>
          ) : (
            <span>
              {headerType ? (
                <img src="/icons/shop.png" className={classes.imgSize} alt="icons" />
              ) : (
                <img src="/icons/shop.png" className={classes.imgSize} alt="icons" />
              )}
            </span>
          )}
        </IconButton>
      </div>
      {renderMiniCart()}
    </Fragment>
  );
})

MiniCart.propTypes = {
  cart: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object),
    checkout: PropTypes.shape({
      itemTotal: PropTypes.shape({
        displayAmount: PropTypes.string,
      }),
      taxTotal: PropTypes.shape({
        displayAmount: PropTypes.string,
      }),
    }),
  }),
  classes: PropTypes.object.isRequired,
  hasMoreCartItems: PropTypes.bool,
  loadMoreCartItems: PropTypes.func,
  onChangeCartItemsQuantity: PropTypes.func,
  onRemoveCartItems: PropTypes.func,
  clearAuthenticatedUsersCart: PropTypes.func,
  uiStore: PropTypes.shape({
    isCartOpen: PropTypes.bool.isRequired,
    openCart: PropTypes.func.isRequired,
    closeCart: PropTypes.func.isRequired,
  }),
};

export default withStyles(styles, { name: "SkMiniCart" })(withCart(inject("uiStore")(MiniCart)));
