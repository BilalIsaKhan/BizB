import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import variantById from "lib/utils/variantById";
import { useState, useEffect, useContext } from "react";
import priceByCurrencyCode from "lib/utils/priceByCurrencyCode";
import inject from "hocs/inject";
import CloseIcon from "@material-ui/icons/Close";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import PageLoading from "../PageLoading";
import { JSON } from "global";
import { CircularProgress } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { UIContext } from "../../context/UIContext.js";
import formatSize from "../../lib/utils/formatSize";
import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";
import SkeletonLoader from "./skeletonLoader";
import Skeleton from "@material-ui/lab/Skeleton";
import ProductCard from "../ProductCard/ProductCard.js";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
    padding: "75px",
    [theme.breakpoints.down("xs")]: {
      padding: "0",
    },
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
    marginTop: "10px",
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
      width: "275", // Reduced by 1px to create space for the border
    },
    [theme.breakpoints.down("lg")]: {
      width: "calc(15rem - 0.5vw)", // Reduced by 1px to create space for the border
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%", // Reduced by 1px to create space for the border
      height: "200px",
    },
  },
  storeNameStyle: {
    marginLeft: "5px",
    fontFamily: "lato",
    fontStyle: "semibold",
    fontSize: "12px",
    lineHeight: "0px",
    padding: "8px",
    display: "flex",
    color: "#FDC114",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
      fontSize: "10px",
      padding: "4px",
    },
  },
  sizes: {
    height: "24px",
    width: "24px",
    marginLeft: "5px",
    fontFamily: "lato",
    fontStyle: "semibold",
    fontSize: "12px",
    lineHeight: "0px",
    padding: "10px",
    display: "flex",
    color: "#FDC114",
    justifyContent: "center",
    border: "1px solid #000000",
  },
  cartimage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginRight: 3,
  },
  cartText: {
    fontSize: "18px",

    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
  },
  cartsize: {
    display: "flex",
    marginLeft: theme.spacing(0.5),
    justifyContent: "end",
    alignItems: "center",
  },
  storeName: {
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
    fontWeight: "600",
    fontSize: "0.8rem",
    fontFamily: "lato",
    marginLeft: "0px",
    marginTop: "0px",

    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
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
    paddingBottom: "14px",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      paddingBottom: "8px",
    },
  },
  cartcontenttext: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  progressBar: {
    justifyContent: "center",
    display: "flex",
    marginLeft: "50%",
    [theme.breakpoints.down("sm")]: {
      size: "10px",
    },
  },
  cart: {
    height: "35px",
    width: "100%",
    borderRadius: "5px",
    background: "#FDC114",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
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
      width: "100%", // Reduced by 1px to create space for the border
      height: "29px",
      // marginLeft: theme.spacing(4),
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
    display: "flex",
    flexDirection: "column",
    // marginLeft: "70px",
    justifyContent: "end",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
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
    marginTop: "40px",
    marginBottom: "40px",
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
  cartButton: {
    width: "100%",
  },
  cartButtonrowDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  cartButtonrowDiv2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "baseline",
  },
}));

const Justin = (props) => {
  // const UIContextJustInPage = useContext(UIContext);

  const catalogdata = props?.catalogItems;

  console.log("props in justin category here", props?.catalogItems)
  const [soldOutProducts, setSoldOutProducts] = useState([]);

  const [queue, setQueue] = useState([]);
  const [processing, setProcessing] = useState(false);

  const { uiStore,routingStore } = props;
  const [found, setFound] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState({});
  const [addToCartQuantity, setAddToCartQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState({});
  const [getLoading, setLoading] = useState(false);

  useEffect(() => {
    routingStore.setTagId("");
  }, []);

  // useEffect(() => {
  //   processQueue();
  // }, [queue, props?.cart?.items, catalogdata]);

  const trackProductView = () => {
    const dataLayer = {
      dataLayer: {
        event: "product_view",
        ecommerce: {
          detail: {
            products: [
              {
                id: productId,
                name: productName,
              },
            ],
          },
        },
      },
    };

    TagManager.dataLayer(dataLayer);
  };
  //
  useEffect(() => {
    uiStore?.setPageSize(15);
  }, []);
  // useEffect(() => {
  //   if (cart?.items?.length) {
  //     const filteredProducts = catalogdata?.filter((product) => {
  //       const productTags = product?.productId;
  //       if (!productTags) {
  //         return false;
  //       }
  //       console.log("------------------------------------------------------------------------------------");
  //       console.log(productTags, "nweee");
  //       return cart.items.find((tag) => tag?.productConfiguration.productId === filteredProducts);
  //     });
  //     console.log(filteredProducts, "rrrrrrrrr");
  //   }

  // }, [cart, cart.items, catalogdata]);
  // console.log(catalogdata,"data")
  useEffect(() => {
    const updatedItems = props?.cart?.items?.map((item) => {
      const isItemInCart = catalogdata?.some((product) => {
        return item?.productConfiguration?.productId === product?.node.product?.productId;
      });

      // setpageSize(20);
      return {
        ...item,
        disabled: item?.inCart || isItemInCart,
      };
    });
    const soldOutProducts = catalogdata?.filter((product) => product?.node?.product?.isSoldOut);
    setSoldOutProducts(soldOutProducts);

    // do something with updatedItems
  }, [props?.cart?.items, catalogdata]);
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
    return;

    // setQueue((prevQueue) => [...prevQueue, item]);
   

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
  const CustomCloseButton = () => <CloseIcon Style={{ backgroundColor: "#FDC114", color: "black", height: "15px" }} />;

  const classes = useStyles();
  return (
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
      <div className={classes.mainheadings}>
        <Typography variant="h3" className={classes.mainheading}>
          Just IN <span className={classes.spanline}></span>
        </Typography>
      </div>

      {catalogdata?.length > 0 ? (
        <div className={classes.gridroot}>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 2, 900: 2, 1050: 3, 1280: 4, 1400: 5, 1750: 6, 1920: 6 }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <Masonry columnsCount={4} style={{ display: "flex", justifyContent: "flex-start" }}>
              {catalogdata?.map((item, index) => {
                // console.log(index, "nodde");
                const cartitem = props?.cart?.items;
                const isDisabled = cartitem?.some((data) => {
                  return data.productConfiguration.productId === item?.node?.product?.productId;
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
                const str = item.node.product.title;
                const words = str.match(/[a-zA-Z0-9]+/g);
                const firstThreeWords = words.slice(0, 3).join(" ");
                const storeNameShort = item?.node?.product?.variants[0]?.uploadedBy?.storeName?.slice(0, 15);

                const displayPrice = item?.node?.product?.variants[0]?.pricing[0]?.displayPrice?.replace(
                  /[^0-9.]/g,
                  "",
                );

                const compareAtPrice =
                  item?.node?.product?.variants[0]?.pricing[0]?.compareAtPrice?.displayAmount?.replace(/[^0-9.]/g, "");
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
                    storeNameShort={storeNameShort}
                    size={size}
                    handleOnClick={handleOnClick}
                    trackProductView={trackProductView}
                  />
                  // <div style={{ display: "flex", justifyContent: "center" }}>
                  //   <div
                  //     className={classes.boxcontairproduct}
                  //     onCick={() => {
                  //       trackProductView();
                  //     }}
                  //   >
                  //     <Link
                  //       href={item.node.product.slug && "en/product/[...slugOrId]"}
                  //       as={item.node.product.slug && `en/product/${item.node.product.slug}`}
                  //     >
                  //       <a target="_blank">
                  //         {/* {console.log("Images", item?.node)} */}

                  //         <img
                  //           src={
                  //             item?.node?.product?.media[0]?.URLs?.medium
                  //               ? item?.node?.product?.media[0]?.URLs?.medium
                  //               : item?.node?.product?.media[0]?.URLs?.thumbnail
                  //               ? item?.node?.product?.media[0]?.URLs?.thumbnail
                  //               : item?.node?.product?.media[0]?.URLs?.large
                  //               ? item?.node?.product?.media[0]?.URLs?.large
                  //               : item?.node?.product?.variants[0].media[0]?.URLs?.medium
                  //               ? item?.node?.product?.variants[0].media[0]?.URLs?.medium
                  //               : item?.node?.product?.variants[0].media[0]?.URLs?.thumbnail
                  //               ? item?.node?.product?.variants[0].media[0]?.URLs?.thumbnail
                  //               : item?.node?.product?.variants[0].media[1]?.URLs?.large
                  //               ? item?.node?.product?.variants[0].media[1]?.URLs?.large
                  //               : item?.node?.product?.variants[0].media[1]?.URLs?.medium
                  //           }
                  //           className={classes.image}
                  //           key={item?.node?.product?.id}
                  //           alt={item?.node?.product?.title}
                  //         />
                  //       </a>
                  //     </Link>

                  //     <div>
                  //       <div className={classes.cartButton}>
                  //         <Button
                  //           className={classes.cart}
                  //           onClick={() => handleOnClick(item?.node?.product, item?.node?.product?.variants[0])}
                  //           disabled={isDisabled || item?.node?.product?.isSoldOut}
                  //         >
                  //           {isLoading[item?.node?.product?.productId] ? (
                  //             <CircularProgress color="black" size="17px" className={classes.progressBar} />
                  //           ) : (
                  //             <>
                  //               <div className={classes.cartButtonrowDiv}>
                  //                 <img component="img" src="/icons/cart.svg" className={classes.cartimage} alt="icons" />
                  //                 <Typography
                  //                   style={{
                  //                     fontFamily: "Ostrich Sans Black",
                  //                   }}
                  //                   variant="h5"
                  //                   component="h2"
                  //                   className={classes.cartText}
                  //                 >
                  //                   {isDisabled ? "Added" : item.node.product.isSoldOut ? "Sold" : "+ Cart"}
                  //                 </Typography>
                  //               </div>
                  //               <div>
                  //                 <Typography
                  //                   style={{
                  //                     fontWeight: "600",
                  //                     fontSize: "0.9rem",
                  //                     fontFamily: "lato",
                  //                     marginLeft: "0px",
                  //                   }}
                  //                   variant="h4"
                  //                   component="h2"
                  //                   className={classes.carttitle2}
                  //                 >
                  //                   {item?.node?.product?.variants[0]?.pricing[0]?.compareAtPrice &&
                  //                     `-${Math.abs(percentage)}%`}
                  //                 </Typography>
                  //               </div>
                  //             </>
                  //           )}
                  //         </Button>
                  //       </div>
                  //       <div>
                  //         <div className={classes.cartcontent}>
                  //           <div
                  //             className={classes.cartcontenttext}
                  //             onCick={() => {
                  //               trackProductView();
                  //             }}
                  //           >
                  //             <Link
                  //               href={item.node.product.slug && "en/product/[...slugOrId]"}
                  //               as={item.node.product.slug && `en/product/${item.node.product.slug}`}
                  //             >
                  //               <a target="_blank">
                  //                 <Typography
                  //                   style={{
                  //                     fontWeight: "600",
                  //                     fontSize: "1rem",
                  //                     fontFamily: "lato",
                  //                     // marginTop: "10px",
                  //                     textTransform: "capitalize",
                  //                     marginLeft: "0px",
                  //                   }}
                  //                   variant="h4"
                  //                   component="h2"
                  //                   className={classes.carttitle}
                  //                 >
                  //                   {firstThreeWords}
                  //                 </Typography>
                  //               </a>
                  //             </Link>
                  //             <Typography className={classes.storeName}>
                  //               Store Name:{" "}
                  //               <Link
                  //                 href={"/en/profile/[slugOrId]"}
                  //                 as={`/en/profile/${item?.node?.product?.variants[0]?.uploadedBy?.userId}`}
                  //               >
                  //                 <a target="_blank">
                  //                   <span className={classes.storeNameStyle}>{storeNameShort} </span>
                  //                 </a>
                  //               </Link>
                  //             </Typography>
                  //             <div className={classes.cartButtonrowDiv2}>
                  //               <div>
                  //                 <Typography
                  //                   className={classes.price}
                  //                   style={{
                  //                     fontWeight: "600",
                  //                     fontSize: "1rem",
                  //                     fontFamily: "lato",
                  //                     color: "#FDC114",
                  //                     marginLeft: "0px",
                  //                     textDecoration: "line-through",
                  //                   }}
                  //                 >
                  //                   {item?.node?.product?.variants[0]?.pricing[0]?.compareAtPrice?.displayAmount
                  //                     ?.replace(/\.00$/, "")
                  //                     .replace(/\$/g, "Rs. ")}
                  //                 </Typography>
                  //                 <div className={classes.strikethroughoff}>
                  //                   {item?.node?.product?.variants[0]?.pricing[0]?.displayPrice
                  //                     ?.replace(/\.00$/, "")
                  //                     .replace(/\$/g, "Rs. ")}
                  //                 </div>
                  //               </div>
                  //               <div className={classes.cartbackground}>
                  //                 <Typography
                  //                   style={{
                  //                     fontWeight: "600",
                  //                     fontSize: "0.8rem",
                  //                     fontFamily: "lato",
                  //                   }}
                  //                   variant="h4"
                  //                   component="h2"
                  //                   className={classes.cartsize}
                  //                 >
                  //                   Size <span className={classes.sizes}>{formatSize(size, true)}</span>
                  //                 </Typography>
                  //               </div>
                  //             </div>
                  //           </div>
                  //           {/* <div className={classes.cartbackground}>
                  //           <Typography
                  //             style={{
                  //               fontWeight: "600",
                  //               fontSize: "0.8rem",
                  //               fontFamily: "lato",
                  //               left: "5px",
                  //             }}
                  //             variant="h4"
                  //             component="h2"
                  //             className={classes.cartsize}
                  //           >
                  //             Size <span className={classes.sizes}>{formatSize(size, true)}</span>
                  //           </Typography>

                  //         </div> */}
                  //         </div>
                  //       </div>
                  //     </div>
                  //   </div>
                  // </div>
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      ) : (
        <SkeletonLoader></SkeletonLoader>
      )}

      <div className={classes.header}>
        {" "}
        {getLoading ? (
          <CircularProgress />
        ) : (
          <>
            <h1 className={classes.typography}></h1>
            <a
              href="/en/explore"
              onClick={() => {
                setLoading(true);
              }}
            >
              <Typography gutterBottom variant="body1" className={classes.explore}>
                Explore More
              </Typography>
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default inject("routingStore", "uiStore")(Justin);
