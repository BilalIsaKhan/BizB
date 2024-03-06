import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import inject from "hocs/inject";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CartEmptyMessage from "@reactioncommerce/components/CartEmptyMessage/v1";
import CartSummary from "@reactioncommerce/components/CartSummary/v1";
import withCart from "containers/cart/withCart";
import CartItems from "components/CartItems";
import Box from "@material-ui/core/Box";
import withCatalogItems from "../../containers/catalog/withCatalogItems";
import Link from "next/link";
import Layout from "components/Layout";
import Router from "translations/i18nRouter";
import { withRouter } from "next/router";
import PageLoading from "components/PageLoading";
import { withApollo } from "lib/apollo/withApollo";
import { ToastContainer, toast } from "react-toastify";
import { CircularProgress } from "@material-ui/core";
import variantById from "lib/utils/variantById";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import formatCurrency from "lib/utils/formatCurrency";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     margin: theme.spacing(4),
//   },
//   topimage: {
//     width: "100%",
//     height: "100%",
//     position: "relative",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     opacity: 0.6,
//   },
//   topheading: {
//     position: "absolute",
//     top: "5px",
//     left: "50%",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",

//     justifyContent: "center",
//   },
//   heading: {
//     color: theme.palette.primary.contrastText,
//     margin: theme.spacing(2),
//   },
//   topgrid: {
//     margin: theme.spacing(4),
//     display: "flex",

//     justifyContent: "center",
//   },
//   headingtop: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     borderBottom: "1px solid #E5E5E5",
//   },
//   cartitem: {
//     padding: theme.spacing(1),
//     display: "flex",

//     alignItems: "center",
//     justifyContent: "center",
//   },
//   cartimage: {
//     height: "130px",
//     width: "120px",

//     borderRadius: "10px",
//   },
//   cartprice: {
//     paddingTop: theme.spacing(1),
//     color: theme.palette.secondary.selected,
//   },
// }));
const styles = (theme) => ({
  cartMain: {
    padding: "50px 50px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px 10px",
    },
  },
  cartEmptyMessageContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
    marginBottom: "60px",

    justifyContent: "center",
  },
  formerror: {
    paddingLeft: theme.spacing(1),
    fontSize: "16px",
    cursor: "pointer",
    color: "#b22b27",
    fontFamily: "Lato",
  },

  label: {
    display: "flex",
    marginTop: theme.spacing(1),

    fontSize: "24px",
    marginBottom: theme.spacing(1),
    color: "#333333",
    flexDirection: "column",
  },
  switchEntryMode: {
    textAlign: "center",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  input: {
    width: "430px",
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
  inputorder: {
    width: "430px",
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
      padding: "opx",
    },
    "& .MuiInputBase-input.active": {
      color: "#eeeeeeeeeee6",
      fontSize: "17px",
      padding: "opx",
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
    width: "430px",
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
  mainheading: {
    textTransform: "uppercase",
  },

  phone: {
    color: "#333333",
    fontSize: "17px",
  },
  mainheading: {
    textTransform: "uppercase",
  },
  ellipse: {
    height: "18px",
    width: "18px",
    borderRadius: "100%",
  },
  cartpayment: {
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  cartdelivery: {
    fontWeight: 400,

    color: "#333333",
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
    height: "391px",
    width: "391px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    boxShadow: "3px 3px 12px  rgba(0, 0, 0, 0.05)",
    borderRadius: "18px",
    padding: theme.spacing(2),
  },
  carttotalsummar: {
    display: "flex",
    width: "100%",

    alignItems: "center",
    justifyContent: "center",
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
    fontSize: "1rem",
  },
  subtotalamount: {
    fontWeight: 700,

    lineHeight: "34px",
    fontSize: "1rem",
  },
  orderbutn: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  summary: {
    display: "flex",
    flexDirection: "column",
  },
  register: {
    width: "261px",
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
  main: {
    width: "100%",
    padding: "75px",
    [theme.breakpoints.down("xs")]: {
      padding: "0",
    },
  },
  cardaction: {
    height: 312,
    width: 312,
  },
  root: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gridroot: {
    width: "100%",
    display: "flex",
    alignItems: "baseline",
    position: "relative",
    justifyContent: "space-between",
  },
  typography: {
    background: "#333333",
    opacity: "15%",
    height: "8px",
    width: "180px",
  },
  text: {
    position: "absolute",
    bottom: 60,
  },
  header: {
    height: "50px",
    position: "relative",
  },
  headermain: {
    display: "flex",
    justifyContent: "space-between",
  },
  image: {
    width: "312px",
    maxHeight: "400px",
    objectFit: "cover",
    borderRadius: "10px",
    cursor: "pointer",
  },
  size: {
    display: "flex",
    flexDirection: "row",
    marginLeft: theme.spacing(1),
  },
  cartimage2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  carttitle: {
    display: "flex",
    marginLeft: theme.spacing(1),
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  price: {
    marginLeft: "20px",
    fontWeight: "700",
    fontSize: "20px",
  },
  rootimg: {
    position: "relative",
    display: "inline-grid",
    width: "312px",

    maxWidth: "312px",
    marginLeft: "10px",
    marginRight: "10px",
  },
  cartbackground: {
    background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%)",
    borderRadius: "0px 0px 16px 16px",
    alignItems: "center",
    justifyContent: "initial",
    height: "75px",
    width: "100%",
    bottom: "20%",
    display: "inline-grid",
    width: "100%",
    marginTop: " -75px",
    padding: "13px 20px",
  },
  cart: {
    height: "35px",
    width: "84px",
    borderRadius: "40px",
    background: "#FDC114",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderColor: "none",
    zIndex: 1200,
    transition: "all 0.2s linear",
    "&:hover": {
      transform: "scale(1.08)",
      transition: "left 0.2s linear",
      background: "#FDC114",
    },
  },
  explore: {
    position: "absolute",
    top: "6px",
    right: "10px",
    color: "#FDC114",
    zIndex: 900,
  },
  maintitle: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "312px",
    flexDirection: "column",
  },
  spanofnextword: {
    color: "#FDC114",
  },
  toast: {
    background: "yellow",
    color: "black",
  },
  pricing: {
    display: "flex",
    flexDirection: "row",
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  checkoutButtonsContainer: {
    backgroundColor: theme.palette.reaction.black02,
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(8),
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  customerSupportCopy: {
    paddingLeft: `${theme.spacing(4)}px !important`,
  },
  phoneNumber: {
    fontWeight: theme.typography.fontWeightBold,
  },
  topimage: {
    width: "100%",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      // marginLeft: theme.spacing(4),
    },

    position: "relative",
  },
  image: {
    width: "100%",

    height: "100%",
    background: "rgba(0, 0, 0, 0.6)",
  },
  image2: {
    zIndex: 999,
    left: "50%",
    right: "50%",

    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    justifyContent: "center",
  },
  topheading: {
    position: "absolute",
    zIndex: 999,
    background: "rgba(0, 0, 0, 0.6)",
    [theme.breakpoints.down("sm")]: {
      alignItems: "inherit",
    },
    bottom: "0px",
    top: "0px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "99.2%",
  },
  heading: {
    color: theme.palette.primary.contrastText,
  },
  topgrid: {
    display: "flex",

    justifyContent: "center",
  },
  headingtop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid #E5E5E5",
  },
  cartitem: {
    padding: theme.spacing(1),
    display: "flex",

    alignItems: "center",
    justifyContent: "center",
  },
  cartimage: {
    height: "130px",
    width: "120px",

    borderRadius: "10px",
  },
  cartprice: {
    paddingTop: theme.spacing(1),
    color: theme.palette.secondary.selected,
  },
  title: {
    fontWeight: theme.typography.fontWeightRegular,
  },
  itemWrapper: {
    borderTop: theme.palette.borders.default,
    borderBottom: theme.palette.borders.default,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  register: {
    width: "261px",
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
  loader: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
});

class CartPage extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      totalItems: PropTypes.number,
      items: PropTypes.arrayOf(PropTypes.object),
      catalogItems: PropTypes.array,
      checkout: PropTypes.shape({
        fulfillmentTotal: PropTypes.shape({
          displayAmount: PropTypes.string,
        }),
        itemTotal: PropTypes.shape({
          displayAmount: PropTypes.string,
        }),
        taxTotal: PropTypes.shape({
          displayAmount: PropTypes.string,
        }),
      }),
    }),
    classes: PropTypes.object,
    hasMoreCartItems: PropTypes.bool,
    loadMoreCartItems: PropTypes.func,
    onChangeCartItemsQuantity: PropTypes.func,
    onRemoveCartItems: PropTypes.func,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: {},
      isLoading2: false,
    };
  }

  componentDidMount() {
    const { cart, classes, shop, catalogItems, uiStore } = this.props;
  }
  myfunction() {
    const { cart, classes, shop, catalogItems, uiStore } = this.props;
    const tagIds =
      cart?.items &&
      cart?.items[0] &&
      cart?.items[0]?.productTags?.nodes[0]?._id &&
      cart?.items[0]?.productTags?.nodes[0]?._id;
    uiStore?.setEndCursor(tagIds);
    // console.log("Testing my function...", uiStore?.endCursor);
  }

  componentDidUpdate(prevProps, prevState) {
    const { cart, classes, shop, catalogItems, uiStore } = this.props;
    // console.log("props useeffect", this.props);
    // console.log("catalogItems", cart.items);
    const tagIds =
      cart?.items &&
      cart?.items[0] &&
      cart?.items[0]?.productTags?.nodes[0]?._id &&
      cart?.items[0]?.productTags?.nodes[0]?._id;
    // console.log(tagIds, "cat");
    // console.log("endcursor.. didmount", catalogItems);
    // console.log("tag ids on component did update...", tagIds);
    this.myfunction();
    //  uiStore?.setEndCursor(tagIds);
    // console.log("endcursorx", uiStore?.endCursor);

    if (prevProps.cart !== this.props.cart) {
      // Only re-render if someProp has changed
      this.setState({});
    }
  }

  handleClick = () => Router.push("/");

  handleTagManager = () => {};

  // Your async logic here

  clickHandler = (item) => {
    const productSlug = item;

    const url = `/en/product/${productSlug}`;
    const newWindow = window.open(url, "_blank");
    newWindow.opener.focus();
  };
  handleAddToCartClick = async (product, variant) => {
    const { addItemsToCart } = this.props;
    // console.log("called", product);
    // Disable button after it has been clicked

    // console.log(pdpSelectedVariantId, "star");

    // Get selected variant or variant optiono
    const selectedVariant = variantById(product.variants, variant._id);

    // If variant is not already in the cart, add the new item
    const price = parseFloat(product?.variants[0]?.pricing[0]?.displayPrice?.replace(/[^0-9.-]+/g, ""), 10);
    await addItemsToCart([
      {
        price: {
          amount: price,
          currencyCode: "USD",
        },
        metafields: [
          {
            key: "media",
            value: product.media[0]?.URLs?.large,
          },
        ],
        productConfiguration: {
          productId: product.productId,
          productVariantId: selectedVariant.variantId,
        },
        quantity: 1,
      },
    ]);
  };

  handleOnClick = async (product, variant) => {
    // console.log("called");
    this.setState((prevState) => ({
      isLoading: {
        ...prevState.isLoading,
        [product.productId]: true,
      },
    }));

    await this.handleAddToCartClick(product, variant);
    toast.success(" added to cart successfully!");
    this.setState((prevState) => ({
      isLoading: {
        ...prevState.isLoading,
        [product.productId]: false,
      },
    }));
    // Scroll to the top
  };
  handleRemoveItem = async (itemId) => {
    ReactGA.send({
      hitType: "event",
      eventCategory: "Ecommerce",
      eventAction: "remove_from_cart",
      eventLabel: itemId,
    });
    const { onRemoveCartItems } = this.props;

    await onRemoveCartItems(itemId);
  };
  renderCartItems() {
    const { cart, classes, hasMoreCartItems, loadMoreCartItems, catalogItems } = this.props;

    if (cart && Array.isArray(cart.items) && cart.items.length) {
      return (
        <>
          <Grid item xs={12} md={8} sm={8}>
            <div className={classes.itemWrapper}>
              <CartItems
                hasMoreCartItems={hasMoreCartItems}
                onLoadMoreCartItems={loadMoreCartItems}
                items={cart.items}
                onChangeCartItemQuantity={this.handleItemQuantityChange}
                onRemoveItemFromCart={this.handleRemoveItem}
              />
            </div>
            <div></div>
          </Grid>
        </>
      );
    }

    if (cart === "undefined") {
      return (
        <Grid item xs={12} className={classes.cartEmptyMessageContainer}>
          <Link href="/">
            <Button className={classes.register}>Continue Shopping </Button>
          </Link>
        </Grid>
      );
    } else {
      return (
        <div className={classes.loader}>
          <PageLoading message="Loading ..." />
        </div>
      );
    }
  }

  renderCartSummary() {
    const { cart, classes, catalogItems } = this.props;
    const { isLoading2 } = this.state;

    if (cart && cart.checkout && cart.checkout.summary && Array.isArray(cart.items) && cart.items.length) {
      const { fulfillmentTotal, itemTotal, surchargeTotal, taxTotal, total } = cart.checkout.summary;

      return (
        <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
          <div className={classes.carttotalsummar}>
            <div className={classes.cartcard}>
              <Typography gutterBottom variant="h4" className={classes.cartdelivery2}>
                Cart Total
              </Typography>
              <div className={classes.empty}></div>
              <div className={classes.shipping}>
                <div className={classes.subtotal}>
                  <Typography gutterBottom variant="h4" style={{ fontSize: "1.1rem" }}>
                    Subtotal
                  </Typography>
                  <Typography gutterBottom variant="h4" className={classes.subtotalamount}>
                    {formatCurrency(cart.checkout.summary.itemTotal.amount)}
                  </Typography>
                </div>
                <div className={classes.subtotal}>
                  <Typography gutterBottom variant="h4" style={{ fontSize: "1.1rem" }}>
                    Shipping Cost
                  </Typography>
                  <Typography gutterBottom variant="h4" className={classes.subtotalamount}>
                    Calculated at checkout
                  </Typography>
                </div>
              </div>
              <div className={classes.empty}></div>
              <div className={classes.subtotal}>
                <Typography gutterBottom variant="h4" style={{ fontSize: "1.1rem" }}>
                  Total
                </Typography>
                <Typography gutterBottom variant="h4" className={classes.subtotalamount}>
                  {formatCurrency(cart.checkout.summary.itemTotal.amount)}
                </Typography>
              </div>
            </div>
          </div>
          <div className={classes.checkoutButtonsContainer}>
            <a href="/en/cart/checkout">
              <Button
                className={classes.register}
                InputProps={{ disableUnderline: true }}
                variant="h5"
                role="button"
                type="submit"
                onClick={() => {
                  this.setState((prevState) => ({ isLoading2: !prevState.isLoading2 }));

                  const productIds = cart?.items?.map((item) => item._id);
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
                        checkout: cart.items.map((item) => ({
                          id: item.productConfiguration.productId,
                          price: item.price.amount,
                          quantity: item.quantity, // Adjust the quantity for each product as needed
                        })),
                      },
                    },
                  };

                  TagManager.dataLayer(dataLayer);
                }}
              >
                {this.state.isLoading2 ? (
                  <CircularProgress color={"black"} />
                ) : (
                  <Typography gutterBottom variant="h5" component="h2">
                    Proceed to checkout
                  </Typography>
                )}
              </Button>
            </a>
          </div>
        </Grid>
      );
    }

    return null;
  }

  render() {
    const { cart, classes, shop, catalogItems } = this.props;
    // when a user has no item in cart in a new session, this.props.cart is null
    // when the app is still loading, this.props.cart is undefined
    const tagIds =
      cart?.items &&
      cart?.items[0] &&
      cart?.items[0]?.productTags?.nodes[0]?._id &&
      cart?.items[0]?.productTags?.nodes[0]?._id;
    // console.log(tagIds, "cat");
    const filteredProducts = catalogItems?.filter((product) => {
      const productTags = product?.node?.product?.tagIds;
      if (!Array.isArray(productTags)) {
        return false;
      }

      return productTags?.some((tag) => tag === tagIds);
    });
    // console.log("endcursor.. render", tagIds);
    // console.log(filteredProducts, "cat");
    if (typeof cart === "undefined") return <PageLoading delay={0} />;
    const { isLoading } = this.state;

    return (
      <>
        <Layout shop={shop}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
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
          <div className={classes.topimage}>
            <img src="/cart/viewcart.svg" alt="view cart" className={classes.image} />
            <div className={classes.topheading}>
              <img src="/cart/fashionsustainable.svg" alt="view cart" className={classes.heading} />
            </div>
          </div>
          <section>
            <Grid container className={classes.cartMain}>
              {this.renderCartItems()}
              {this.renderCartSummary()}
            </Grid>
            {filteredProducts && filteredProducts.length ? (
              <>
                <Typography variant="h3" className={classes.related}>
                  You <span className={classes.spanofnextword}>may</span>
                  Also <span className={classes.spanofnextword}>Like</span>
                </Typography>
                <div className={classes.root}>
                  <Grid container className={classes.gridroot} align="center" justify="center" alignItems="center">
                    {filteredProducts?.slice(0, 5)?.map((item, key) => {
                      const cartitem = cart?.items;
                      const isDisabled = cartitem?.some((data) => {
                        return data.productConfiguration.productId === item?.node?.product?.productId;
                      });
                      // console.log(cart?.items, "item");
                      // console.log(item?.node?.product?.productId, "ssss", props.cart.items[0]?.productConfiguration?.productId);
                      const optionTitle = item?.node?.product?.variants[0]?.optionTitle;
                      const validOptionTitle = optionTitle
                        ? optionTitle
                            ?.replace(/['"\\]/g, "")
                            .replace("{", '{"')
                            .replace(/:/g, '":"')
                            .replace("}", '"}')
                            .replace(",", '","')
                        : null;
                      const size = validOptionTitle ? JSON.parse(validOptionTitle)?.size : null;
                      const str = item.node.product.title;
                      const words = str.match(/[a-zA-Z0-9]+/g);
                      const firstThreeWords = words.slice(0, 3).join(" ");
                      return (
                        <>
                          <Grid item lg={3} sm={6} md={4} xs={12} className={classes.rootimg}>
                            <img
                              src={
                                !item?.node?.product?.media || !item?.node?.product?.media[0]?.URLs
                                  ? item?.node?.product?.media[0]?.URLs?.thumbnail
                                  : item?.node?.product?.media[0]?.URLs?.large
                              }
                              className={classes.image}
                              key={item?.node?.product?.id}
                              alt={"hhhh"}
                              onClick={() => this.clickHandler(item.node.product.slug)}
                            />

                            <div className={classes.cartbackground}>
                              <Button
                                className={classes.cart}
                                onClick={() =>
                                  this.handleOnClick(item?.node?.product, item?.node?.product?.variants[0])
                                }
                                disabled={isDisabled}
                              >
                                <img component="img" src="/icons/cart.svg" className={classes.cartimage2} alt="icon"/>
                                <Typography
                                  style={{ fontFamily: "Ostrich Sans Black", fontSize: "18px" }}
                                  variant="h5"
                                  component="h2"
                                >
                                  {isDisabled ? "Added" : "+ Cart"}
                                </Typography>
                              </Button>
                            </div>
                            <Box
                              className={classes.maintitle}
                              onClick={() => this.clickHandler(item.node.product.slug)}
                            >
                              <Typography
                                style={{ fontWeight: "700", fontSize: "24px" }}
                                gutterBottom
                                variant="h4"
                                component="h2"
                                className={classes.carttitle}
                              >
                                {firstThreeWords}
                              </Typography>
                              <div className={classes.size}>
                                <Typography
                                  style={{ fontWeight: "700", fontSize: "24px", fontFamily: "lato" }}
                                  gutterBottom
                                  variant="h4"
                                >
                                  Size :
                                </Typography>
                                <Typography
                                  style={{
                                    fontWeight: "700",
                                    fontSize: "24px",
                                    fontFamily: "lato",
                                    marginLeft: "10px",
                                  }}
                                  gutterBottom
                                  variant="h4"
                                >
                                  {size == 0
                                    ? "Extra Large"
                                    : "Small" || size == 1
                                    ? "Large"
                                    : "Small" || size == 2
                                    ? "Medium"
                                    : "Small" || size == 3
                                    ? "Small"
                                    : "Small"}
                                </Typography>
                              </div>
                              <div className={classes.pricing}>
                                {" "}
                                <strike>
                                  {item?.node?.product?.variants[0]?.pricing[0]?.compareAtPrice?.displayAmount
                                    ?.replace(/\.00$/, "")
                                    .replace(/\$/g, "RS ")}
                                </strike>
                                <Typography gutterBottom variant="h5" className={classes.price}>
                                  {item?.node?.product?.variants[0]?.pricing[0]?.displayPrice
                                    ?.replace(/\.00$/, "")
                                    .replace(/\$/g, "RS ")}
                                </Typography>
                              </div>
                            </Box>
                          </Grid>
                        </>
                      );
                    })}
                  </Grid>
                </div>
              </>
            ) : (
              ""
            )}
          </section>
        </Layout>
      </>
    );
  }
}

/**
 *  Server props for the cart route
 *
 * @param {String} lang - the shop's language
 * @returns {Object} props
 */
export async function getServerSideProps({ params: { lang } }) {
  return {
    props: {
      ...(await fetchPrimaryShop(lang)),
      ...(await fetchTranslations(lang, ["common"])),
    },
  };
}

export default withApollo()(withStyles(styles)(withCart(inject("uiStore")(CartPage))));
