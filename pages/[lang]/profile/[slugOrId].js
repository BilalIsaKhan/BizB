import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import {
  Box,
  Divider,
  Typography,
  Button,
  Modal,
  FormControl,
  InputLabel,
  TextField,
  CircularProgress,
  InputAdornment,
  Avatar,
  MenuItem,
  Grid,
  Hidden,
  Select,
} from "@material-ui/core";
import PageLoading from "../../../components/PageLoading/PageLoading";
import Link from "next/link";
import withCart from "containers/cart/withCart";
import PageStepper from "../../../components/PageStepper/PageStepper";
import { withApollo } from "lib/apollo/withApollo";
import useShop from "hooks/shop/useShop";
import SellersCatalogItems from "../../../containers/catalog/withSellerCatalogItem";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import variantById from "../../../lib/utils/variantById";
import useTagsQuery from "../../../hooks/categoryTags/getTags";
import formatSize from "../../../lib/utils/formatSize";
import { makeStyles } from "@material-ui/core/styles";
import inject from "../../../hocs/inject";
import CloseIcon from "@material-ui/icons/Close";
import fetchPrimaryShop from "../../../staticUtils/shop/fetchPrimaryShop";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";
import SkeletonLoader from "../../../components/Justin/skeletonLoader";
import Skeleton from "@material-ui/lab/Skeleton";
import useprimaryShop from "../../../hooks/primaryShop/useprimaryShop";
import IconButton from "@material-ui/core/IconButton";
import Sort from "@material-ui/icons/Sort";
import ProductCard from "../../../components/ProductCard/ProductCard";
import useSoldProductsSeller from "../../../hooks/soldProductsSeller/useSoldProductsSeller"

function SellerPublicProfile(props) {
  console.log("props", props?.router?.query?.slugOrId);

  const [soldProducts, loading, refetch] = useSoldProductsSeller(props?.router?.query?.slugOrId);

  const { uiStore, routingStore, filters, cart, addItemsToCart, sellerCatalogItemsPageInfo } = props;
  const [soldOutProducts, setSoldOutProducts] = useState([]);
  const [isLoading, setIsLoading] = useState({});
  const [primaryShopId, refetch2] = useprimaryShop();

  const [categoryTags] = useTagsQuery(primaryShopId, "category-");
  const [categoryID, setcategoryID] = React.useState("");

  const [queue, setQueue] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [categoryProduct, setcategoryProduct] = React.useState("Select a Category");

  const [found, setFound] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState({});
  const [addToCartQuantity, setAddToCartQuantity] = useState(1);
  React.useEffect(() => {
    if (!categoryTags && !primaryShopId) {
      refetch2();
    }

    console.log("categoryTags in component is", props);
  }, [primaryShopId, categoryTags]);

  // useEffect(() => {
  //   processQueue();
  // }, [queue, props?.cart?.items, props?.catalogItems]);

  const useStyles = makeStyles((theme) => ({
    main: {
      width: "100%",
      padding: "75px",

      [theme.breakpoints.down("xs")]: {
        padding: "0",
      },
    },
    profilebaner: {
      width: "100%",
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
        width: "150px", // Reduced by 1px to create space for the border
        height: "200px",
      },
    },
    image2: {
      width: "475px", // Reduced by 1px to create space for the border
      maxHeight: "600px",
      height: "300px",
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
        width: "150px", // Reduced by 1px to create space for the border
        height: "200px",
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
      overflow: "hidden",

      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        paddingBottom: "5px",
      },
    },
    cartcontenttext: {
      display: "flex",
      flexDirection: "column",
      marginRight: "30px",
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
      [theme.breakpoints.down("sm")]: {
        width: "34px", // Reduced by 1px to create space for the border
        height: "20px",
        marginLeft: theme.spacing(2),
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
      [theme.breakpoints.down("sm")]: {
        width: "90%",
        marginBottom: "10px",
      },
    },
    cartText: {
      fontSize: "18px",

      [theme.breakpoints.down("sm")]: {
        fontSize: "10px",
      },
    },

    price: {
      marginLeft: "12px",
    },
    strikethroughoff: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "110px",
      marginLeft: "0px",
    },
    cartbackground: {
      marginRight: "8px",
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "row",
        marginRight: "2px",
      },
    },
    strikethrough: {
      display: "flex",
      fontSize: "12px",
      color: "#9C9C9C",
      justifyContent: "center",
      alignItems: "center",
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
    progressBar: {
      [theme.breakpoints.down("sm")]: {
        size: "10px",
        marginLeft: theme.spacing(3),
      },
    },
    centerDiv: {
      display: "flex",
      justifyContent: "center",
    },
    notfoundtext: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    divForSearch: {
      flexDirection: "column",
    },
    sortdiv: {
      display: "flex",
      flexDirection: "row",
    },
    selectDropdown: {
      borderBottom: "none",

      // boxShadow: "none",
      // border:"none",
      // backgroundColor:"none",
      //  "& .MuiInputLabel-root": { display:"none"},
      //   "& .MuiInput-notchedOutline": { border: 0 },
      "&&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: 0,
      },
      "& .MuiSelect-select.MuiSelect-select": {
        padding: "10px",
      },
      "&&.MuiInput-underline:before": {
        borderBottom: "none",
      },
      "&&.MuiInput-underline:after": {
        borderBottom: "none",
      },
      // "& .MuiInput-underline:after":{
      //   borderBottom:"none"
      // }
    },
    imgdiv:{
      display:"flex",
      alignItems:"center",
      flexDirection:"column"
      
    },
    imgSize: {
      width: "41%",
      height: "18%",
      marginTop: "3px",
    },
    textstyle: {
      fontFamily: "Ostrich Sans Black",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      color: "black",
     
    },
    countdiv:{
      [theme.breakpoints.down(600)]: {

      display:"flex",
      justifyContent:"center"}
    }
  }));
  // console.log(props.totalcount, "propertiese");
  const router = useRouter();

  const shop = useShop();
  const { slugOrId } = router.query;
  useEffect(() => {
    uiStore?.setPageSize(15);

    uiStore?.setsellerId(slugOrId);
  }, [slugOrId, props]);
  useEffect(() => {
    console.log("props?.catalogItems?", props?.catalogItems?.totalCount);

    console.log("total count", props);
    const updatedItems = props?.cart?.items?.map((item) => {
      const isItemInCart = props?.catalogItems.some((product) => {
        return item?.productConfiguration?.productId === product?.node.product?.productId;
      });

      // setpageSize(20);
      return {
        ...item,
        disabled: item?.inCart || isItemInCart,
      };
    });
    const soldOutProducts = props?.catalogItems?.filter((product) => product?.node?.product?.isSoldOut);
    setSoldOutProducts(soldOutProducts);

    // console.log(updatedItems, "all");
    // do something with updatedItems
  }, [props?.cart?.items, props?.catalogItems]);
  function selectVariant(variant, optionId) {
    const { product, uiStore, cart } = props;

    function determineProductPrice() {
      const { currencyCode, product } = props;
      const { pdpSelectedVariantId, pdpSelectedOptionId } = props.uiStore;
      const selectedVariant = variantById(product.variants, pdpSelectedVariantId);
      let productPrice = {};

      if (pdpSelectedOptionId && selectedVariant) {
        const selectedOption = variantById(selectedVariant.options, pdpSelectedOptionId);
        productPrice = priceByCurrencyCode(currencyCode, selectedOption.pricing);
      } else if (!pdpSelectedOptionId && selectedVariant) {
        productPrice = priceByCurrencyCode(currencyCode, selectedVariant.pricing);
      }

      return productPrice;
    }

    // Select the variant, and if it has options, the first option
    const variantId = variant._id;
    let selectOptionId = optionId;
    if (!selectOptionId && variant.options && variant.options.length) {
      selectOptionId = variant.options[0]._id;
    }

    uiStore.setPDPSelectedVariantId(variantId, selectOptionId);

    Router.replace("/product/[...slugOrId]", `/product/${product.slug}/${selectOptionId || variantId}`);
  }

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
    // parseFloat(price.replace(/[^0-9.-]+/g, "")).toFixed(2);
    const price = parseFloat(product.variants[0]?.pricing[0]?.displayPrice?.replace(/[^0-9.-]+/g, ""), 10);
    try {
      const additemtocart = await addItemsToCart([
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
      // toast.success(" added to cart successfully!");

      console.log("carcart", additemtocart?.data?.addCartItems?.cart?._id);

      // if (additemtocart?.data?.addCartItems?.cart?._id) {
        toast.success(" added to cart successfully!");
        // setIsLoading((prevState) => ({
        //   ...prevState,
        //   [product.productId]: false,
        // }));
        setIsLoading((prevState) => ({
          ...prevState,
          [product.productId]: false,
        }));
      // }
    } catch (error) {
      console.log("carcart error for cart", error);
      toast.error("Something went wrong, try again");
      // setIsLoading((prevState) => ({
      //   ...prevState,
      //   [product.productId]: false,
      // }));
      setIsLoading((prevState) => ({
        ...prevState,
        [product.productId]: false,
      }));
    }
  };

  const handleOnClick = async (product, variant) => {
    const item = {
      product,
      variant,
    };
    setIsLoading((prevState) => ({
      ...prevState,
      [item?.product.productId]: true,
    }));

    await handleAddToCartClick(1, item?.product, item?.variant);


    // setQueue((prevQueue) => [...prevQueue, item]);
    ReactGA.event({
      category: "Ecommerce",
      action: "add_to_cart",
      label: product?.productId,
      value: product?.variants[0]?.pricing[0]?.displayPrice,
    });
    const addToCartData = {
      event: "addToCart",
      ecommerce: {
        add: {
          products: [
            {
              id: product.productId,
              name: product.title,
              price: product?.variants[0]?.pricing[0]?.displayPrice,
              quantity: 1, // You can adjust this based on your needs
            },
          ],
        },
      },
    };

    TagManager.dataLayer({
      dataLayer: addToCartData,
    });

    // Scroll to the top
  };

  // const processQueue = async () => {
  //   if (queue.length > 0 && !processing) {
  //     setProcessing(true);

  //     const item = queue[0];
  //     console.log("itemitemitem", item);

  //     // Simulate an asynchronous process (e.g., making an API request to add the item to the cart)

  //     await handleAddToCartClick(1, item?.product, item?.variant);

  //     setQueue((prevQueue) => prevQueue.slice(1)); // Remove the processed item from the queue
  //     setProcessing(false);
  //   }
  // };

  const parseJSON = (jsonString) => {
    try {
      let parsedData;

      // Attempt to parse as JSON with double quotes
      try {
        parsedData = JSON.parse(jsonString);
      } catch (error1) {
        // If parsing with double quotes fails, try parsing with single quotes
        try {
          const validJsonString = jsonString.replace(/'/g, '"');
          parsedData = JSON.parse(validJsonString);
        } catch (error2) {
          console.error("Error parsing JSON:", error2);
          return null;
        }
      }

      return parsedData.size || null;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  };
  const CustomCloseButton = () => <CloseIcon Style={{ backgroundColor: "#FDC114", color: "black", height: "15px" }} />;
  const classes = useStyles();
  const profile = props.catalogItems[0]?.node?.product?.variants[0]?.uploadedBy;
  const clickHandler = (item) => {
    const productSlug = item;

    const url = `/en/product/${productSlug}`;
    const newWindow = window.open(url, "_blank");
    newWindow.opener.focus();
  };
  useEffect(() => {
    // Simulate an asynchronous data loading process
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay as needed
  }, []);
  return (
    <Layout shop={shop}>
      <div className={classes.main}>
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
        <img src="/profile/profilebanner.webp" className={classes.profilebaner} alt="icon" />
        <div className="sellerProfile">
          <Grid container className="publicProfile__profileInfoWrapper">
            <Grid xs={12} item className="publicProfile__profileInfoSection">
              <div
                className="sellerProfile__img"
                style={{
                  backgroundImage: profile
                    ? profile?.image
                      ? "URL(" + profile?.profilePhoto + ")"
                      : "URL(" + "/images/seller-placeholder.png" + ")"
                    : "URL(" + "/images/seller-placeholder.png" + ")",
                }}
              >
                {/* <div className="sellerProfile__badge"> 
                          <img src={profile ? profile.profilePhoto?profile.profilePhoto:"/icons/medal.svg":"/icons/medal.svg"} />
                        </div> */}
              </div>
              <div className="publicProfile__infoContainer">
                <div className="sellerProfile__infoRow publicProfile__infoRow">
                  {profile ? (
                    <Typography className="publicProfile__name" variant="h1">
                      <span>
                        {profile && profile?.storeName
                          ? profile?.storeName
                          : profile?.name
                          ? profile?.name
                          : profile?.name}
                      </span>
                      {profile && profile && <img src="/icons/tickIcon.png" />}
                    </Typography>
                  ) : (
                    <Skeleton width={210} />
                  )}
                </div>
                <Hidden xsDown>
                  <>
                    {profile && profile?.name && (
                      <Typography className="sellerProfile__status" variant="h5">
                        {profile?.uname}
                      </Typography>
                    )}
                  </>
                </Hidden>
                <Hidden xsDown>
                  <Grid container>
                    <Grid item xs={12} md={8} lg={6} xl={4}>
                      <div className="publicProfile__infoMeta">
                        <div className="sellerProfile__infoMetaRow">
                          <Typography className="sellerProfile__infoMetaContent" variant="h5">
                            {props?.totalcount}
                          </Typography>
                          <Typography className="sellerProfile__infoMetaTitle" variant="h5">
                            {" "}
                            Products
                          </Typography>
                        </div>
                        {/* <div className="sellerProfile__infoMetaRow">
                          <Typography className="sellerProfile__infoMetaContent" variant="h5">
                            o
                          </Typography>
                          <Typography className="sellerProfile__infoMetaTitle" variant="h5">
                            {" "}
                            Followers
                          </Typography>
                        </div>
                        <div className="sellerProfile__infoMetaRow">
                          <Typography className="sellerProfile__infoMetaContent" variant="h5">
                            0
                          </Typography>
                          <Typography className="sellerProfile__infoMetaTitle" variant="h5">
                            {" "}
                            Following
                          </Typography>
                        </div> */}
                      </div>
                      <div className="publicProfile__infoMeta">
                        <div className="sellerProfile__infoMetaRow">
                          <Typography className="sellerProfile__infoMetaContent" variant="h5">
                            {soldProducts}
                          </Typography>
                          <Typography className="sellerProfile__infoMetaTitle" variant="h5">
                            {" "}
                           Sold Products
                          </Typography>
                        </div>
                      
                      </div>
                    </Grid>
                  </Grid>
                </Hidden>
              </div>
              <div className={classes.divForSearch}>
              <div className={classes.sortdiv}>
                <IconButton>
                <img
                src="/categoriestypes/Vector.svg"
                alt="vector"
                className={classes.vector}
              />
                </IconButton>
                <FormControl
                  style={{
                    width: "260px",
                    borderRadius: "8px",
                    backgroundColor: "#F7F7F9",
                    marginTop: "5px",
                    borderBottom: "none",
                  }}
                >
                  <Select
                    notched={false}
                    className={classes.selectDropdown}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // onChange={(event) => handleChange(event, 'Category')}
                    // error={!!categoryError}

                    label="Sort By"
                  >
                    {categoryTags?.slice(0, 9).map((category) => (
                      <MenuItem
                        key={category._id}
                        value={category.displayTitle}
                        onClick={() => {
                          setcategoryID(category._id);
                          uiStore.settagIdfiltersSeller(category._id)
                          console.log("key", category._id);
                        }}
                      >
                        <Typography variant="body2" style={{ fontWeight: 500, fontSize: "17px", marginTop:"5px" }}>
                          {category.displayTitle}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              </div>
            </Grid>
            <Grid xs={12}>
              <Hidden smUp>
                <Grid container>
                  <Grid item xs={12} md={8} lg={6} xl={4}>
                    <div className={classes.countdiv}>
                      <div className="sellerProfile__infoMetaRow">
                        <Typography className="sellerProfile__infoMetaContent" variant="h5">
                          {props?.totalcount}
                        </Typography>
                        <Typography className="sellerProfile__infoMetaTitle" variant="h5">
                          {" "}
                          Products
                        </Typography>
                      </div>
                   
                    </div>
                    <div className={classes.countdiv}>
                    <div className="publicProfile__infoMeta">
                        <div className="sellerProfile__infoMetaRow">
                          <Typography className="sellerProfile__infoMetaContent" variant="h5">
                            {soldProducts}
                          </Typography>
                          <Typography className="sellerProfile__infoMetaTitle" variant="h5">
                            {" "}
                           Sold Products
                          </Typography>
                        </div>
                      
                      </div>
                    </div>
                    
                  </Grid>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
        </div>

        <div className={classes.headermain}>
          {/* <button onClick={notify}>Notify!</button>
        <ToastContainer
          position="bottom-left"
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
          toastStyle={{ backgroundColor: "#FDC114", color: "black", fontSize: "18px" }}
        /> */}
        </div>
        {props?.catalogItems?.length > 0 ? (
          <div className={classes.gridroot}>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 2, 900: 2, 1050: 3, 1280: 4, 1400: 5, 1750: 6, 1920: 6 }}
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <Masonry columnsCount={4} style={{ display: "flex", justifyContent: "flex-start" }}>
                {props?.catalogItems?.map((item, key) => {
                  const cartitem = cart?.items;
                  const isDisabled = cartitem?.some((data) => {
                    return data?.productConfiguration?.productId === item?.node?.product?.productId;
                  });
                  let optionTitle = item?.node?.product?.variants[0]?.optionTitle;
                  let validOptionTitle = optionTitle
                    ? optionTitle
                        ?.replace(/['"\\]/g, "")
                        .replace("{", '{"')
                        .replace(/:/g, '":"')
                        .replace("}", '"}')
                        .replace(",", '","')
                    : null;

                  // Access the "size" property
                  const size = validOptionTitle ? JSON.parse(validOptionTitle)?.size : null;
                  {
                    console.log("validOptionTitle", item);
                  }
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

                  // console.log(optionTitle, "fil");
                  return (
                    <ProductCard
                      item={item}
                      isDisabled={isDisabled}
                      isLoading={isLoading}
                      percentage={percentage}
                      firstThreeWords={firstThreeWords}
                      // storeNameShort={storeNameShort}
                      size={size}
                      handleOnClick={handleOnClick}
                      // trackProductView={trackProductView}
                    />
          
                  );
                })}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        ) : props?.loading ? (
          <SkeletonLoader />
        ) : (
          props?.totalcount === 0 && (
            <div className={classes.imgdiv}>
              <img src="/images/noimage.jpg" className={classes.imgSize} alt="icons" />
              <Typography variant="h6" className={classes.textstyle}>
                No Products Found
              </Typography>
            </div>
          )
        )}

        <div className={classes.loadmore}>
          {sellerCatalogItemsPageInfo?.hasNextPage && <PageStepper pageInfo={sellerCatalogItemsPageInfo}></PageStepper>}
        </div>
      </div>
    </Layout>
  );
}
export async function getServerSideProps({ params, query }) {
  // console.log("obj is ", params, query);
  const { lang, allresults, filteredItemsLength } = params;
  return {
    props: {
      ...(await fetchPrimaryShop(lang)),
    },
  };
}
export default withApollo()(withCart(SellersCatalogItems(inject("routingStore", "uiStore")(SellerPublicProfile))));
