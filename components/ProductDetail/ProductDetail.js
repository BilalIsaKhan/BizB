import React, { Component, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import inject from "hocs/inject";
import Router from "translations/i18nRouter";
import priceByCurrencyCode from "lib/utils/priceByCurrencyCode";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import variantById from "lib/utils/variantById";
import CloseIcon from "@material-ui/icons/Close";
import { useMediaQuery } from "react-responsive";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs, Mousewheel, Pagination } from "swiper";
import ReactImageMagnify from "react-image-magnify";
import Box from "@material-ui/core/Box";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useRef, useCallback, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Tab from "@material-ui/core/Tab";
import MagnifyImage from "./imageMagnify";
import { ToastContainer, toast } from "react-toastify";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { CircularProgress } from "@material-ui/core";
import formatSize from "../../lib/utils/formatSize";
import { useRouter } from "next/router";
import ReactGA from "react-ga4";

import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import TagManager from "react-gtm-module";

// import ReactImageMagnify from "react-image-magnify";
SwiperCore.use([Navigation, Thumbs, Mousewheel, Pagination]);
const styles = (theme) => ({
  slider: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.down(700)]: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(2),
    },
  },
  sliderflex: {
    display: "flex",
    alignItems: "flex-start",
  },

  slidercol: {
    display: "flex",
    flexDirection: "column",
    display: "contents",
    [theme.breakpoints.down(1100)]: {
      display: "none",
      width: "0px",
      height: "0px",
    },
  },
  container1: {
    width: "100%",
    height: "100%",
  },

  thumb: {
    height: "600px",
    justifySelf: "end",
    width: "200px",
  },
  controller: {
    // width: "90vh",

    position: "relative",
    display: "inline-grid",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconforwad: {
    cursor: "pointer",
    position: "absolute",
    right: "0",
    top: "50%",
    background: "#333333",
    color: "FDC114",
    borderRadius: "4px",
    zIndex: 10,
  },
  iconback: {
    position: "absolute",
    cursor: "pointer",
    top: "50%",
    borderRadius: "4px",
    color: "FDC114",
    background: "#333333",

    zIndex: 1251,
  },
  pricing: {
    display: "flex",
    flexDirection: "row",
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  size2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  size: {
    display: "flex",
    flexDirection: "row",
  },
  price: {
    marginLeft: theme.spacing(3),
  },
  price2: {
    color: "#333333",
    opacity: 0.5,
  },
  storeText: {
    fontSize: "1.1rem",
    fontFamily: "Lato",
  },
  storeName: {
    textTransform: "uppercase",
    fontSize: "1.1rem",
    "&:hover": {
      color: "#FDC114",
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  offer: {
    display: "flex",
    background: "#E16452",
    padding: "10px",
    borderBotom: "1px solid red",
    color: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      margin: "25px",
      paddingRight: "15px",
    },
  },
  cartimageJustIn: {
    height: "16px",
    width: "14px",
    // paddingLeft: "1px",
  },
  sizeimage: {
    display: "flex",
    marginTop: theme.spacing(3),
    borderBottom: "1px solid #E5E5E5",
    marginBottom: theme.spacing(3),
    justifyContent: "space-between",
  },
  tabs: {
    borderBottom: "1px solid #E5E5E5",
    "& .MuiTab-root": {
      textTransform: "none",
    },
    "& .tabs-active": {
      borderBottom: "1px solid #FDC114",
    },
  },
  main: {
    padding: "3vh",
    width: "100%",
    padding: theme.spacing(4),
  },
  cardaction: {
    height: 312,
    width: 312,
  },

  root: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  gridroot: {
    width: "100%",
    display: "flex",
    alignItems: "baseline",
    position: "relative",
    justifyContent: "center",
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
    background: "green",
    color: "white",
  },
  related: {
    color: "#000000",
    marginLeft: theme.spacing(2),
    margin: theme.spacing(5),
  },
  centerDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cart2: {
    height: "35px",
    width: "100%",
    borderRadius: "40px",
    background: "#FDC114",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    "&.MuiButton-root:hover": {
      transform: "scale(1.08)",
      transition: "left 0.2s linear",
      backgroundColor: "#FDC114",
    },
  },
  carttext: {
    justifySelf: "end",
    maxWidth: "533px",
    width: "100%",
    zIndex: 1,
  },
  sliderimage2: {
    borderRadius: "18px",
    position: "relative",
    // display: "inlie-grid",
    margin: "0 auto",
    width: "560px",
    // minHeight: "600px",
    height: "550px",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "600px",
    objectFit: "contain",
  },
  thumbimage: {
    height: "160px",
    width: "180px",
    // paddingTop: "10px",
  },
  thumbimages: {
    objectFit: "cover",
    maxHeight: "160px",
    width: "180px",
    borderRadius: "18px",
    objectPosition: "top",
    // paddingTop: "10px",
  },
  carttex: {
    fontSize: "18px",
    color: "#333333",
    fontFamily: "lato",
    fontStyle: "normal",
    fontWeight: 900,
    lineHeight: "22px",
  },
  sizechart: {
    fontSize: "18px",
    color: "#333333",
    fontFamily: "lato",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "22px",
  },
  swiperimag: {
    display: "flex",
    // position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  magnifyContainer: {
    width: "1000px",
  },
  gridroot: {
    maxWidth: "100%",
    justifyContent: "space-between",
  },

  typography: {
    background: "#333333",
    opacity: "15%",
    height: "8px",
    width: "180px",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "60px",
    height: "50px",
    position: "relative",
  },
  image: {
    width: "275px", // Reduced by 1px to create space for the border
    maxHeight: "600px",
    marginTop: "1px",
    borderRadius: "10px",
    marginRight: "2px",
    marginLeft: "1px",
    objectFit: "cover",
    cursor: "pointer",
    [theme.breakpoints.up("lg")]: {
      width: "275px", // Reduced by 1px to create space for the border
    },
    [theme.breakpoints.down("lg")]: {
      width: "calc(15rem - 0.5vw)", // Reduced by 1px to create space for the border
    },
    [theme.breakpoints.down("sm")]: {
      width: "275px", // Reduced by 1px to create space for the border
    },
  },
  // image: {
  //   width: "275px", // Reduced by 1px to create space for the border
  //   maxHeight: "600px",
  //   marginTop: "1px",
  //   borderRadius: "10px",
  //   marginRight: "2px",
  //   marginLeft: "1px",
  //   objectFit: "cover",
  //   cursor: "pointer",
  // },

  sizes: {
    height: "30px",
    width: "30px",
    marginLeft: "12px",
    fontFamily: "lato",
    fontStyle: "semibold",
    fontSize: "12px",

    display: "flex",
    color: "#FDC114",
    justifyContent: "center",
    border: "1px solid #000000",
  },
  cartimage: {
    display: "flex",
    height: "20px",
    width: "31px",
    paddingRight: "5px",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  cartsize: {
    display: "flex",
    marginLeft: theme.spacing(0.5),
    justifyContent: "end",
    alignItems: "center",
  },
  carttitle: {
    display: "flex",
    marginLeft: theme.spacing(1),
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  carttitle2: {
    display: "flex",
  },
  cartcontent: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom: "10px",
  },
  cartcontenttext: {
    display: "flex",
    flexDirection: "column",
  },
  cart: {
    height: "35px",
    width: "84px",
    borderRadius: "5px",
    background: "#FDC114",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "10px",
    borderColor: "none",
    zIndex: 1,
    transition: "all 0.2s linear",
    "&:hover": {
      transform: "scale(1.08)",
      transition: "left 0.2s linear",
      background: "#FDC114",
    },
  },
  explore: {
    position: "absolute",
    top: "25px",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#FDC114",
    zIndex: 900,
  },
  boxcontairproduct: {
    maxHeight: "700px",
    width: "315px",
    borderRadius: "5px",

    // border: "1px solid #9C9C9C",
    gridRowEnd: "span 1",
    flexBasis: "calc(33.33% - 10px)", // Adjust the percentage based on your desired layout
    marginBottom: "20px",
  },

  price: {
    marginLeft: "12px",
  },
  strikethroughoff: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "110px",
    marginLeft: "12px",
  },
  cartbackground: {
    marginRight: "8px",
  },
  strikethroughoff: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "110px",
    marginLeft: "0px",
  },

  mainheading: {
    display: "flex",
    marginTop: "60px",
    marginBottom: "60px",
    justifyContent: "center",
    textTransform: "uppercase",
    position: "relative",
    width: "100%",
  },
  spanline: {
    marginTop: "20px",
    bottom: 0,
    left: 0,
    height: "5px",
    marginLeft: "10px",
    width: "50px",
    backgroundColor: "#FDC114",
  },
  mainheadings: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    allignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

const slides = [
  {
    image: "/cart/cart1.svg",
    id: 1,
    price: "Rs 1200",
    newprice: "Rs 600",
    title: "floral shirt for ",
    size: "large",
  },
  {
    image: "/cart/cart3.svg",
    title: "Bag for sale",
    id: 2,
    price: "Rs 1200",
    newprice: "Rs 600",
    size: "large",
  },
  {
    image: "/cart/cart3.svg",
    title: "Bag for sale",
    id: 2,
    price: "Rs 1200",
    newprice: "Rs 600",
    size: "large",
  },
];
const slide = [
  {
    image: "/cart/cartlarge.svg",
    id: 1,
    price: "Rs 1200",
    newprice: "Rs 600",
    title: "floral shirt for ",
    size: "large",
  },
  {
    image: "/cart/cartlarge.svg",
    title: "Bag for sale",
    id: 2,
    price: "Rs 1200",
    newprice: "Rs 600",
    size: "large",
  },
  {
    image: "/cart/cartlarge.svg",
    id: 1,
    price: "Rs 1200",
    newprice: "Rs 600",
    title: "floral shirt for ",
    size: "large",
  },
];

const ProductDetail = ({ ...props }) => {
  const { product, catalogItems, cart } = props;
  console.log("product", product);
  // console.log(product, "product");
  const tagIds = product?.tags?.nodes?.[0]?._id || [1]?._id || [2]?._id;
  // console.log("dddd",props)
  const { uiStore } = props;
  const filteredProducts = catalogItems?.filter((product) => {
    const productTags = product?.node?.product?.tagIds;
    if (!productTags) {
      return false;
    }

    return productTags?.some((tag) => tag === tagIds);
  });
  const isSix = useMediaQuery({ query: "(min-width: 1750px)" });
  const isFour = useMediaQuery({ query: "(min-width: 1440px)" });
  const isFive = useMediaQuery({ query: "(min-width: 1300px)" });
  const isTwo = useMediaQuery({ query: "(min-width: 700px)" });
  let spliceBy = 4;
  if (isSix) {
    spliceBy = 6;
  } else if (isFive) {
    spliceBy = 5;
  } else if (isFour) {
    spliceBy = 4;
  } else if (isTwo) {
    spliceBy = 2;
  }

  const relatedProducts = filteredProducts.slice(0, spliceBy);
  // console.log(filteredProducts, "fil");
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const clickHandler = (item) => {
    const productSlug = item;

    const url = `/en/product/${productSlug}`;
    const newWindow = window.open(url, "_blank");
    newWindow.opener.focus();
  };

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);
  const [isLoading, setIsLoading] = useState({});
  const [soldOutProducts, setSoldOutProducts] = useState([]);
  const [imagesNavSlider, setImagesNavSlider] = useState(null);
  const [value, setValue] = React.useState("1");
  const [activeIndex, setActiveIndex] = useState(0);
  const [addToCartQuantity, setAddToCartQuantity] = useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const CustomCloseButton = () => <CloseIcon Style={{ backgroundColor: "#FDC114", color: "black", height: "15px" }} />;

  useEffect(() => {
    console.log("props", props);
    ReactGA.send({
      hitType: "pageview",
      page: `/product/${props?.product?._id}`,
      title: `Product View - ${props?.product?.title}`,
    });
    // ReactGA.pageview(`/product/${props?.product?._id}`, {
    //   title: `Product View - ${props?.product?.title}`,
    // });
    // console.log("usjbjbde", props)
    const updatedItems = cart?.items.map((item) => {
      const isItemInCart = filteredProducts?.some((product) => {
        return item.productConfiguration?.productId === product?.node.product?.productId;
      });
      return {
        ...item,
        disabled: item.inCart || isItemInCart,
      };
    });
    const soldOutProducts = filteredProducts?.filter((product) => product?.node?.product?.isSoldOut);
    setSoldOutProducts(soldOutProducts);
    // console.log(updatedItems, "all");
    // do something with updatedItems
  }, [cart?.items, product]);

  useEffect(() => {
    selectVariant(product?.variants[0]);
    uiStore.setEndCursor(tagIds);
  }, []);
  useEffect(() => {}, [uiStore]);

  function selectVariant(variant, optionId) {
    const { uiStore } = props;

    // Select the variant, and if it has options, the first option
    const variantId = variant._id;
    let selectOptionId = optionId;
    if (!selectOptionId && variant.options && variant.options.length) {
      selectOptionId = variant.options[0]._id;
    }

    uiStore.setPDPSelectedVariantId(variantId, selectOptionId);

    Router.replace("/product/[...slugOrId]", `/product/${product.slug}/${selectOptionId || variantId}`);
  }

  /**
   * @name handleSelectVariant
   * @summary Called when a variant is selected in the variant list
   * @private
   * @ignore
   * @param {Object} variant The variant object that was selected
   * @returns {undefined} No return
   */
  const handleSelectVariant = (variant) => {
    selectVariant(variant);
  };

  /**
   * @name handleAddToCartClick
   * @summary Called when the add to cart button is clicked
   * @private
   * @ignore
   * @param {Number} quantity - A positive integer from 0 to infinity, representing the quantity to add to cart
   * @returns {undefined} No return
   */

  const handleAddToCartClick = async (quantity, product, variant) => {
    const {
      addItemsToCart,
      currencyCode,
      cart,
      uiStore: { openCartWithTimeout, pdpSelectedOptionId, pdpSelectedVariantId, setPDPSelectedVariantId },
    } = props;

    // Disable button after it has been clicked

    // console.log(pdpSelectedVariantId, "star");

    // Get selected variant or variant optiono
    const selectedVariant = variantById(product.variants, variant._id);

    // If variant is not already in the cart, add the new item
    const price = parseFloat(product.variants[0]?.pricing[0]?.displayPrice?.replace(/[^0-9.-]+/g, ""), 10);
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
        quantity,
      },
    ]);
  };
  /**
   * @name handleSelectOption
   * @summary Called when an option is selected in the option list
   * @private
   * @ignore
   * @param {Object} option The option object that was selected
   * @returns {undefined} No return
   */
  const handleSelectOption = (option) => {
    const { uiStore } = props;

    // If we are clicking an option, it must be for the current selected variant
    const variant = product?.variants?.find((vnt) => vnt._id === uiStore.pdpSelectedVariantId);

    selectVariant(variant, option._id);
  };

  /**
   * @name determineProductPrice
   * @description Determines a product's price given the shop's currency code. It will
   * use the selected option if available, otherwise it will use the selected variant.
   * @returns {Object} An pricing object
   */

  const {
    classes,
    currencyCode,

    routingStore,
    uiStore: { pdpSelectedOptionId, pdpSelectedVariantId },
    width,
  } = props;

  // Set the default media as the top-level product's media
  // (all media on all variants and objects)
  let pdpMediaItems = product.media;

  // If we have a selected variant (we always should)
  // check to see if media is available, and use this media instead
  // Revert to original media if variant doesn't have specific media
  const selectedVariant = product?.variants?.find((variant) => variant._id === pdpSelectedVariantId);
  if (selectedVariant) {
    if (selectedVariant.media && selectedVariant.media.length) {
      pdpMediaItems = selectedVariant.media;
    }

    // If we have a selected option, do the same check
    // Will revert to variant check if no option media is available
    if (Array.isArray(selectedVariant.options) && selectedVariant.options.length) {
      const selectedOption = selectedVariant?.options?.find((option) => option._id === pdpSelectedOptionId);
      if (selectedOption) {
        if (selectedOption.media && selectedOption.media.length) {
          pdpMediaItems = selectedOption.media;
        }
      }
    }
  }

  const handleOnClick = async (product, variant) => {
    ReactGA.event({
      category: "Ecommerce",
      action: "add_to_cart",
      label: product?.productId,
      value: product?.variants[0]?.pricing[0]?.displayPrice,
    });
    const dataLayer = {
      dataLayer: {
        event: "add_to_cart",
        ecommerce: {
          add: {
            products: [
              {
                id: product.productId,
                name: product.title,
              },
            ],
          },
        },
      },
    };

    TagManager.dataLayer(dataLayer);
    setIsLoading((prevState) => ({
      ...prevState,
      [product.productId]: true,
    }));

    await handleAddToCartClick(addToCartQuantity, product, variant);
    toast.success(" added to cart successfully!", {});
    setIsLoading((prevState) => ({
      ...prevState,
      [product.productId]: false,
    }));
    // Scroll to the top
  };
  const handleAddToCartClickforsingle = async (quantity) => {
    const {
      addItemsToCart,
      currencyCode,
      product,
      uiStore: { openCartWithTimeout, pdpSelectedOptionId, pdpSelectedVariantId },
      width,
    } = props;
    // console.log(pdpSelectedVariantId, "star");
    // console.log(product.variants, "op");
    // Get selected variant or variant option
    const selectedVariant = variantById(product.variants, pdpSelectedVariantId);
    const selectedOption = variantById(selectedVariant.options, pdpSelectedOptionId);
    const selectedVariantOrOption = selectedOption || selectedVariant;

    if (selectedVariantOrOption) {
      // Get the price for the currently selected variant or variant option
      const price = priceByCurrencyCode(currencyCode, selectedVariantOrOption.pricing);

      // Call addItemsToCart with an object matching the GraphQL `CartItemInput` schema
      await addItemsToCart([
        {
          price: {
            amount: price.price,
            currencyCode,
          },

          metafields: [
            {
              key: "media",
              value: product?.media[0]?.URLs?.large,
            },
          ],
          productConfiguration: {
            productId: product.productId, // Pass the productId, not to be confused with _id
            productVariantId: selectedVariantOrOption.variantId, // Pass the variantId, not to be confused with _id
          },
          quantity,
        },
      ]);
    }
  };

  const handleOnClickforsingle = async () => {
    // Pass chosen quantity to onClick callback
    setIsLoading((prevState) => ({
      ...prevState,
      [product.productId]: true,
    }));
    await handleAddToCartClickforsingle(addToCartQuantity);
    setIsLoading((prevState) => ({
      ...prevState,
      [product.productId]: false,
    }));

    // Scroll to the top
  };
  const router = useRouter();
  // const clickHandler = (item) => {

  //   router.replace("/en/product/" + item);
  // };
  const optionTitle = product?.variants[0]?.optionTitle;

  const validOptionTitle = optionTitle
    ? optionTitle
        ?.replace(/['"\\]/g, "")
        .replace("{", '{"')
        .replace(/:/g, '":"')
        .replace("}", '"}')
        .replace(",", '","')
    : null;
  const size = validOptionTitle ? JSON.parse(validOptionTitle)?.size : null;
  const isDisabled = cart?.items?.some((data) => {
    return data?.productConfiguration?.productId === product?.productId;
  });

  const rimProps = {
    enlargedImagePortalId: "portal",
    enlargedImageContainerDimensions: {
      width: "200%",
      height: "100%",
    },
  };
  const displayPrice = product?.variants[0]?.pricing[0]?.displayPrice?.replace(/[^0-9.]/g, "");
  const compareAtPrice = product?.variants[0]?.pricing[0]?.compareAtPrice?.displayAmount?.replace(/[^0-9.]/g, "");

  const parsedDisplayPrice = parseFloat(displayPrice);
  const parsedCompareAtPrice = parseFloat(compareAtPrice);
  const percentage = Math.floor(((parsedCompareAtPrice - parsedDisplayPrice) / parsedCompareAtPrice) * 100);
  return (
    <>
    
      {typeof window !== "undefined" && (
        <div>
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
              fontFamily: "lato",
            }}
          />{" "}
          <Box className={classes.slider}>
            <Grid
              container
              spacing={0}
              className={classes.sliderflex}
              xs={12}
              md={12}
              sm={12}
              lg={12}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={0} md={0} sm={0} lg={0}></Grid>
              <Grid style={{ display: "content" }} item xs={0} md={2} sm={0} lg={2} className={classes.slidercol}>
                <div className={`${classes.thumb} thumb-swiper-container`}>
                  <Swiper
                    onSwiper={setImagesNavSlider}
                    direction="vertical"
                    spaceBetween={24}
                    slidesPerView={3}
                    loop={true}
                    navigation={{
                      nextEl: ".slider__next",
                      prevEl: ".slider__prev",
                    }}
                    className={classes.container1}
                    breakpoints={{
                      0: {
                        direction: "horizontal",
                      },
                      768: {
                        direction: "vertical",
                      },
                    }}
                    modules={[Navigation, Thumbs, Mousewheel, Pagination]}
                    onRealIndexChange={(element) => setActiveIndex(element.activeIndex)}
                  >
                    {product?.variants[0].media[1] &&
                      product?.variants[0]?.media.map((slide, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <div className={classes.thumbimage}>
                              <img
                                src={slide?.URLs?.large ? slide?.URLs?.large : slide?.URLs?.thumbnail}
                                alt=""
                                className={classes.thumbimages}
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </div>
              </Grid>
              <Grid style={{}} item xs={0} md={12} sm={0} lg={8}>
                <div style={{}} className="fluid react-slick">
                  <Swiper
                    thumbs={{ swiper: imagesNavSlider }}
                    direction="horizontal"
                    ref={sliderRef}
                    loop={true}
                    pagination={{
                      clickable: false,
                    }}
                    mousewheel={true}
                    navigation={true}
                    modules={[Navigation, Thumbs, Mousewheel, Pagination]}
                    onRealIndexChange={(element) => setActiveIndex(element.activeIndex)}
                  >
                    {product?.variants[0]?.media?.map((slide, index) => {
                      return (
                        <SwiperSlide className={classes.sliderimage2} key={index}>
                          <div style={{ borderRadius: "18px", overflow: "hidden" }}>
                            <ReactImageMagnify
                              {...{
                                smallImage: {
                                  alt: "Wristwatch by Versace",
                                  isFluidWidth: true,
                                  width: 600,
                                  className: "images",
                                  height: 550,
                                  src: slide.URLs.large ? slide.URLs.large : slide.URLs.thumbnail,
                                  sizes: "(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px",
                                },
                                largeImage: {
                                  src: slide.URLs.large ? slide.URLs.large : slide.URLs.thumbnail,
                                  isFluidWidth: true,
                                  width: 1426,
                                  marginLeft: "100px",
                                  height: 1600,
                                },
                                lensStyle: {
                                  backgroundColor: "rgba(0,0,0,.6)",
                                },
                              }}
                              enlargedImagePosition="over"
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                  <div className="fluid__instructions" style={{ position: "relative" }}>
                    <div id="portal" className="portal" />
                    <div className={classes.carttext}>
                      <Typography
                        style={{
                          fontWeight: "700",
                          textTransform: "capitalize",
                        }}
                        variant="subtitle1"
                      >
                        {product?.title}
                      </Typography>
                      <div className={classes.size2}>
                        {" "}
                        <div className={classes.size}>
                          {" "}
                          <strike>
                            {" "}
                            <Typography
                              style={{ fontWeight: "500", padding: "4px" }}
                              gutterBottom
                              variant="h4"
                              className={classes.price2}
                            >
                              {product?.variants[0]?.pricing[0]?.compareAtPrice?.displayAmount
                                ?.replace(/\.00$/, "")
                                ?.replace(/\$/g, "Rs. ")}
                            </Typography>
                          </strike>
                          <Typography
                            style={{ fontWeight: "700", padding: "4px" }}
                            gutterBottom
                            variant="h4"
                            className={classes.price}
                          >
                            {product?.variants[0]?.pricing[0]?.displayPrice
                              ?.replace(/\.00$/, "")
                              .replace(/\$/g, "Rs. ")}
                          </Typography>
                        </div>
                        {product?.variants[0]?.pricing[0]?.compareAtPrice && (
                          <Typography gutterBottom variant="h5" className={classes.offer}>
                            {`-${Math.abs(percentage)}%`}
                          </Typography>
                        )}
                      </div>
                      <div className={classes.sizeimage}>
                        <img style={{ paddingLeft: "10px" }} src="/cart/available.svg" alt="available" />
                        <Typography
                          style={{ fontWeight: "700", paddingRight: "10px" }}
                          variant="h5"
                          className={classes.offr}
                        >
                          {formatSize(size)}
                        </Typography>
                      </div>
                      <div className={classes.sizeimage}>
                        <Typography
                          style={{ fontWeight: "500", paddingLeft: "10px" }}
                          variant="h4"
                          className={classes.storeText}
                        >
                          Wardrobe Name
                        </Typography>
                        <Link
                          href={"/en/profile/[slugOrId]"}
                          as={`/en/profile/${product?.variants[0]?.uploadedBy?.userId}`}
                        >
                          <Typography
                            style={{ fontWeight: "700", cursor: "pointer", paddingRight: "10px", color: "#FDC114" }}
                            variant="h4"
                            className={classes.storeName}
                          >
                            {product?.variants[0]?.uploadedBy?.storeName}
                          </Typography>
                        </Link>
                      </div>
                      <div>
                        {isLoading[product?.productId] ? (
                          <div className={classes.centerDiv}>
                            <CircularProgress />
                          </div>
                        ) : (
                          <Button
                            className={classes.cart2}
                            onClick={handleOnClickforsingle}
                            disabled={isDisabled || product?.isSoldOut}
                          >
                            <img component="img" src="/icons/cart.svg" className={classes.cartimage} alt="icon"/>
                            <Typography style={{ fontFamily: "Ostrich Sans Black", fontSize: "18px" }} variant="h4">
                              {isDisabled ? "Added" : product?.isSoldOut ? "Sold" : " + Cart"}
                            </Typography>
                          </Button>
                        )}
                      </div>
                      <TabContext value={value}>
                        <TabList onChange={handleChange} className={classes.tabs}>
                          <Tab label="Description" value="1" />
                        </TabList>

                        <TabPanel value="1" className={classes.sizechart}>
                          {product?.description}
                        </TabPanel>
                      </TabContext>
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid item xs={0} md={0} sm={0} lg={1}></Grid>
            </Grid>
          </Box>
          {isTwo && (
            <Box style={{ padding: "0px 50px" }}>
              <Typography variant="h3" className={classes.related}>
                <div className="text"></div>
                Related <span className={classes.spanofnextword}>Products</span>
              </Typography>
              <div className={classes.gridroot}>
                <ResponsiveMasonry
                  columnsCountBreakPoints={{ 350: 1, 900: 2, 1050: 3, 1280: 4, 1400: 5, 1750: 6, 1920: 6 }}
                  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                  <Masonry columnsCount={4} style={{ display: "flex", justifyContent: "flex-start" }}>
                    {relatedProducts?.map((item, key) => {
                      const cartitem = cart?.items;
                      const isDisabled = cartitem?.some((data) => {
                        return data?.productConfiguration?.productId === item?.node?.product?.productId;
                      });
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
                      const str = item?.node?.product?.title;
                      const words = str.match(/[a-zA-Z0-9]+/g);
                      const firstThreeWords = words.slice(0, 3).join(" ");
                      const displayPrice = item?.node?.product?.variants[0]?.pricing[0]?.displayPrice?.replace(
                        /[^0-9.]/g,
                        "",
                      );

                      const compareAtPrice =
                        item?.node?.product?.variants[0]?.pricing[0]?.compareAtPrice?.displayAmount?.replace(
                          /[^0-9.]/g,
                          "",
                        );

                      const parsedDisplayPrice = parseFloat(displayPrice);
                      const parsedCompareAtPrice = parseFloat(compareAtPrice);

                      const percentage = Math.floor(
                        ((parsedCompareAtPrice - parsedDisplayPrice) / parsedCompareAtPrice) * 100,
                      );

                      return (
                        <>
                          <div style={{ display: "flex", justifyContent: "center" }}>
                            <div className={classes.boxcontairproduct}>
                              <div onClick={() => clickHandler(item.node.product.slug)}>
                                <a target="_blank">
                                  {/* {console.log("Images", item?.node)} */}
                                  <img
                                    src={
                                      !item?.node?.product?.media || !item?.node?.product?.media[0]?.URLs
                                        ? item?.node?.product?.media[0]?.URLs?.thumbnail
                                        : item?.node?.product?.media[0]?.URLs?.large
                                    }
                                    className={classes.image}
                                    key={item?.node?.product?.id}
                                    alt={"hhhh"}
                                  />
                                </a>
                              </div>
                              <div className={classes.cartcontent}>
                                <div className={classes.cartcontenttext}>
                                  <Typography
                                    style={{
                                      fontWeight: "600",
                                      fontSize: "1rem",
                                      fontFamily: "lato",
                                      // marginTop: "10px",
                                      textTransform: "capitalize",
                                      marginLeft: "0px",
                                    }}
                                    variant="h4"
                                    component="h2"
                                    className={classes.carttitle}
                                  >
                                    {firstThreeWords.toString().toLowerCase()}
                                  </Typography>
                                  <Typography
                                    className={classes.price}
                                    style={{
                                      fontWeight: "600",
                                      fontSize: "1rem",
                                      fontFamily: "lato",
                                      color: "#FDC114",
                                      marginLeft: "0px",
                                    }}
                                  >
                                    {item?.node?.product?.variants[0]?.pricing[0]?.displayPrice
                                      ?.replace(/\.00$/, "")
                                      .replace(/\$/g, "Rs. ")}
                                  </Typography>
                                  <div className={classes.strikethroughoff}>
                                    <strike className={classes.strikethrough}>
                                      {item?.node?.product?.variants[0]?.pricing[0]?.compareAtPrice?.displayAmount
                                        ?.replace(/\.00$/, "")
                                        .replace(/\$/g, "Rs. ")}
                                    </strike>
                                    <Typography
                                      style={{
                                        fontWeight: "600",
                                        fontSize: "0.9rem",
                                        fontFamily: "lato",
                                        marginLeft: "0px",
                                      }}
                                      variant="h4"
                                      component="h2"
                                      className={classes.carttitle2}
                                    >{`-${percentage}%`}</Typography>
                                  </div>
                                </div>
                                <div className={classes.cartbackground}>
                                  <Typography
                                    style={{
                                      fontWeight: "600",
                                      fontSize: "0.8rem",
                                      fontFamily: "lato",
                                      left: "5px",
                                    }}
                                    variant="h4"
                                    component="h2"
                                    className={classes.cartsize}
                                  >
                                    Size <span className={classes.sizes}>{formatSize(size, true)}</span>
                                  </Typography>
                                  {isLoading[item?.node?.product?.productId] ? (
                                    <CircularProgress />
                                  ) : (
                                    <Button
                                      className={classes.cart}
                                      onClick={() => {
                                        console.log("problem", item?.node?.product);
                                        handleOnClick(item?.node?.product, item?.node?.product?.variants[0]);
                                      }}
                                      disabled={isDisabled || item?.node?.product?.isSoldOut}
                                    >
                                      <img component="img" src="/icons/cart.svg" className={classes.cartimageJustIn} alt="icon" />
                                      <Typography
                                        style={{ fontFamily: "Ostrich Sans Black", fontSize: "18px" }}
                                        variant="h5"
                                        component="h2"
                                      >
                                        {isDisabled ? "Added" : item?.node?.product?.isSoldOut ? "Sold" : " + Cart"}
                                      </Typography>
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </Masonry>
                </ResponsiveMasonry>
              </div>
            </Box>
          )}
        </div>
      )}
    </>
  );
};

ProductDetail.propTypes = {
  /**
   * Function to add items to a cart.
   * Implementation may be provided by addItemsToCart function from the @withCart decorator
   *
   * @example addItemsToCart(CartItemInput)
   * @type Function
   */
  addItemsToCart: PropTypes.func,
  classes: PropTypes.object,

  product: PropTypes.object,
  routingStore: PropTypes.object.isRequired,
  shop: PropTypes.object.isRequired,
  theme: PropTypes.object,
  uiStore: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  cart: PropTypes.array,
  catalogItems: PropTypes.array,
};
export default withWidth({ initialWidth: "md" })(
  withStyles(styles, { withTheme: true })(inject("routingStore", "uiStore")(ProductDetail)),
);
