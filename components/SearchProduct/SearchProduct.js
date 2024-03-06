import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState, useRef } from "react";
import { withApollo } from "../../lib/apollo/withApollo";
import useShop from "../../hooks/shop/useShop";
import CloseIcon from "@material-ui/icons/Close";
import variantById from "lib/utils/variantById";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { ToastContainer, toast } from "react-toastify";
import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";
import ProductCard from "../ProductCard/ProductCard";
import { locales } from "translations/config";
import SkeletonLoader from "../Justin/skeletonLoader";
import Link from "next/link";
import formatSize from "../../lib/utils/formatSize";
import { Grid, Button, Box, Typography } from "@material-ui/core";
import withCatalogItems from "containers/catalog/withCatalogItems";
import withCart from "containers/cart/withCart";
import inject from "hocs/inject";
import CircularProgress from "@material-ui/core/CircularProgress";
import useProductSearch from "../../hooks/globalSearch/useProductSearch";

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
  loadmore2: {
    width: "165px",
    cursor: "pointer",
    height: "50px",
    borderRadius: "40px",
    border: "none",
    display: "flex",
    fontSize: "1.3rem",
    color: "#333333",
    lineHeight: "32px",
    fontFamily: "Ostrich Sans Black",
    fontWeight: 900,
    fontStyle: "normal",
    justifyContent: "center",
    alignItems: "center",
    background: theme.palette.secondary.selected,
    "&:hover": {
      transform: "scale(1.08)",
      transition: "left 0.2s linear",
      background: "#FDC114",
    },
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
  cartButton: {
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
  loadmore: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  cartText: {
    fontSize: "18px",

    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
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
  spanofnextword: {
    color: "#FDC114",
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
  textsearch:{
    [theme.breakpoints.down("sm")]: {
        fontSize: "29px",
        margin:"15px"
      },
  }
  
}));

const SearchProduct = (props) => {
  // console.log(props.cart, "new");
  const { catalogItems, cart } = props;
  const { items } = cart ? cart : {};
  const [soldOutProducts, setSoldOutProducts] = useState([]);
  const [getSearch, setSearch] = useState("");
  const [itemsperpage, setItemsPerPage] = useState(50);
  const [isLoading, setIsLoading] = useState({});
  const [addToCartQuantity, setAddToCartQuantity] = useState(1);
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef(null);
  const isButtonInView = useState(false);
  const isRefInFocus = useState(false);
  const isComponentMounted = useRef(false);

  const [allData, setAllData] = useState([]);

  const [result, loading2, refetch2] = useProductSearch(null, getSearch, offset * itemsperpage, itemsperpage);

  console.log("search22 props result", result);

  const shop = useShop();
  const CustomCloseButton = () => <CloseIcon Style={{ backgroundColor: "#FDC114", color: "black", height: "15px" }} />;
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
    const selectedVariant = variantById(product.variant, variant._id);
    console.log("selectedVariantproduct", product);

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
    // If variant is not already in the cart, add the new item
    const price = parseFloat(product.variant[0]?.pricing[0]?.displayPrice?.replace(/[^0-9.-]+/g, ""), 10);
    await addItemsToCart([
      {
        price: {
          amount: price,
          currencyCode: "USD",
        },
        metafields: [
          {
            key: "media",
            value: product?.variant[0].media[0]?.URLs?.thumbnail
              ? product.variant[0].media[0]?.URLs?.thumbnail
              : product.variant[0].media[0]?.URLs?.medium,
          },
        ],
        productConfiguration: {
          productId: product._id,
          productVariantId: selectedVariant.variantId,
        },
        quantity,
      },
    ]);
  };

  const handleOnClick = async (product, variant) => {
    ReactGA.event({
      category: "Ecommerce",
      action: "add_to_cart",
      label: product?.productId,
      value: product?.variant[0]?.pricing[0]?.displayPrice,
    });
    const addToCartData = {
      event: "addToCart",
      ecommerce: {
        add: {
          products: [
            {
              id: product.productId,
              name: product.title,
              price: product?.variant[0]?.pricing[0]?.displayPrice,
              quantity: 1, // You can adjust this based on your needs
            },
          ],
        },
      },
    };

    TagManager.dataLayer({
      dataLayer: addToCartData,
    });
    setIsLoading((prevState) => ({
      ...prevState,
      [product._id]: true,
    }));

    await handleAddToCartClick(addToCartQuantity, product, variant);
    toast.success(" added to cart successfully!", {});
    setIsLoading((prevState) => ({
      ...prevState,
      [product._id]: false,
    }));
    // Scroll to the top
  };
  const clickHandler = (item) => {
    const productSlug = item;

    const url = `/en/product/${productSlug}`;
    const newWindow = window.open(url, "_blank");
    newWindow.opener.focus();
  };

  const handleNextClick = () => {
    setLoading(true);

    // Simulate an asynchronous loading operation

    if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
      const windowHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight,
      );
      const scrollToPosition = (documentHeight - windowHeight) / 2;

      window.scrollTo({ bottom: scrollToPosition, behavior: "smooth" });
    }

    setTimeout(() => {
      setOffset((prev) => prev + 1);

      // setOffset((prevOffset) => (prevOffset *itemsperpage));

      setLoading(false);
    }, 7000);
  };
  
  useEffect(() => {
    setSearch(props?.search?.trim());
  }, [props.search, result]);

  useEffect(() => {
    const newData = result?.catalog?.map((prod) => {
      return prod;
    });

    if (newData?.length > 0) {
      setAllData((prevData) => [...prevData, ...newData]);
    }

    console.log("newData new", newData);
  }, [offset, itemsperpage, result]);

  useEffect(() => {
    console.log("buttonred", buttonRef, "loading state:", loading, isButtonInView);

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.click();
          isButtonInView.current = true;
          isRefInFocus.current = true;
          isComponentMounted.current = true;
        } else {
          isRefInFocus.current = false;
        }
      });
    }, options);

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => {
      observer.disconnect();
      isButtonInView.current = false;
    };
  }, [result?.catalog, buttonRef, loading]);

  const classes = useStyles();

  console.log("newData alldata", allData);
  return (
    <div className={classes.main}>
      <div className={classes.headermSain}>
        <Typography variant="h3" className={classes.textsearch}>
          Search <span className={classes.spanofnextword}>Results</span> for
          <span className={classes.spanofnextword}> {props?.search}</span>
        </Typography>
      </div>
      {allData?.length > 0 ? (
        <Grid item lg={12} xs={12} sm={6} md={12}>
          <div className={classes.gridroot}>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 2, 900: 2, 1050: 3, 1280: 4, 1400: 5, 1750: 6, 1920: 6 }}
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <Masonry columnsCount={4} style={{ display: "flex", justifyContent: "flex-start" }}>
                {allData?.map((item, index) => {
                  // console.log(index, "nodde");
                  const cartitem = props?.cart?.items;
                  console.log("selectedVariant", cartitem);
                  const isDisabled = cartitem?.some((data) => {
                    console.log("selectedVaria65", data, item);

                    return data.productConfiguration.productVariantId === item?.variant[0]?.variantId;
                  });

                  const optionTitle = item?.variant[0]?.optionTitle;

                  const validOptionTitle = optionTitle
                    ? optionTitle
                        ?.replace(/['"\\]/g, "")
                        .replace("{", '{"')
                        .replace(/:/g, '":"')
                        .replace("}", '"}')
                        .replace(",", '","')
                    : null;

                  // Access the "size" property
                  const size = validOptionTitle ? JSON.parse(validOptionTitle)?.size : null;

                  // const size =validOptionTitle? validOptionTitle: null;
                  const str = item?.title;
                  const words = str.match(/[a-zA-Z0-9]+/g);
                  const firstThreeWords = words.slice(0, 3).join(" ");
                  const storeNameShort = item?.variant[0]?.uploadedBy?.storeName?.slice(0, 15);
                  const displayPrice = item?.variant[0]?.pricing[0]?.displayPrice?.replace(/[^0-9.]/g, "");

                  const compareAtPrice = item?.variant[0]?.pricing[0]?.compareAtPrice?.displayAmount?.replace(
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
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div
                        className={classes.boxcontairproduct}
                        onCick={() => {
                          trackProductView ? trackProductView() : null;
                        }}
                      >
                        <Link
                          href={item.slug && "/en/product/[...slugOrId]"}
                          as={item.slug && `/en/product/${item.slug}`}
                        >
                          <a target="_blank">
                            {/* {console.log("Images", item?.node)} */}

                            <img
                              src={
                                item?.media[0]?.URLs?.medium
                                  ? item?.media[0]?.URLs?.medium
                                  : item?.media[0]?.URLs?.thumbnail
                                  ? item?.media[0]?.URLs?.thumbnail
                                  : item?.media[0]?.URLs?.large
                                  ? item?.media[0]?.URLs?.large
                                  : item?.variant[0].media[0]?.URLs?.medium
                                  ? item?.variant[0].media[0]?.URLs?.medium
                                  : item?.variant[0].media[0]?.URLs?.thumbnail
                                  ? item?.variant[0].media[0]?.URLs?.thumbnail
                                  : item?.variant[0].media[1]?.URLs?.large
                                  ? item?.variant[0].media[1]?.URLs?.large
                                  : item?.variant[0].media[1]?.URLs?.medium
                              }
                              className={classes.image}
                              key={item?.id}
                              alt={item?.title?.slice(0, 5)}
                            />
                          </a>
                        </Link>

                        <div>
                          <div className={classes.cartButton}>
                            <Button
                              className={classes.cart}
                              onClick={() => handleOnClick(item, item?.variant[0])}
                              disabled={isDisabled || item?.isSoldOut}
                            >
                              {isLoading[item?._id] ? (
                                <CircularProgress color="black" size="17px" className={classes.progressBar} />
                              ) : (
                                <>
                                  <div className={classes.cartButtonrowDiv}>
                                    <img
                                      component="img"
                                      src="/icons/cart.svg"
                                      className={classes.cartimage}
                                      alt="icons"
                                    />
                                    <Typography
                                      style={{
                                        fontFamily: "Ostrich Sans Black",
                                      }}
                                      variant="h5"
                                      component="h2"
                                      className={classes.cartText}
                                    >
                                      {isDisabled ? "Added" : item.isSoldOut ? "Sold" : "+ Cart"}
                                    </Typography>
                                  </div>
                                  <div>
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
                                    >
                                      {item?.variant[0]?.pricing[0]?.compareAtPrice && `-${Math.abs(percentage)}%`}
                                    </Typography>
                                  </div>
                                </>
                              )}
                            </Button>
                          </div>
                          <div>
                            <div className={classes.cartcontent}>
                              <div
                                className={classes.cartcontenttext}
                                onCick={() => {
                                  trackProductView();
                                }}
                              >
                                <Link
                                  href={item.slug && "/en/product/[...slugOrId]"}
                                  as={item.slug && `/en/product/${item.slug}`}
                                >
                                  <a target="_blank">
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
                                      {firstThreeWords}
                                    </Typography>
                                  </a>
                                </Link>
                                {storeNameShort && (
                                  <Typography className={classes.storeName}>
                                    Wardrobe Name:{" "}
                                    <Link
                                      href={"/en/profile/[slugOrId]"}
                                      as={`/en/profile/${item?.variant[0]?.uploadedBy?.userId}`}
                                    >
                                      <a target="_blank">
                                        <span className={classes.storeNameStyle}>{storeNameShort} </span>
                                      </a>
                                    </Link>
                                  </Typography>
                                )}
                                <div className={classes.cartButtonrowDiv2}>
                                  <div>
                                    <Typography
                                      className={classes.price}
                                      style={{
                                        fontWeight: "600",
                                        fontSize: "1rem",
                                        fontFamily: "lato",
                                        color: "#FDC114",
                                        marginLeft: "0px",
                                        textDecoration: "line-through",
                                      }}
                                    >
                                      {item?.variant[0]?.pricing[0]?.compareAtPrice?.displayAmount
                                        ?.replace(/\.00$/, "")
                                        .replace(/\$/g, "Rs. ")}
                                    </Typography>
                                    <div className={classes.strikethroughoff}>
                                      {item?.variant[0]?.pricing[0]?.displayPrice
                                        ?.replace(/\.00$/, "")
                                        .replace(/\$/g, "Rs. ")}
                                    </div>
                                  </div>
                                  <div className={classes.cartbackground}>
                                    <Typography
                                      style={{
                                        fontWeight: "600",
                                        fontSize: "0.8rem",
                                        fontFamily: "lato",
                                      }}
                                      variant="h4"
                                      component="h2"
                                      className={classes.cartsize}
                                    >
                                      Size <span className={classes.sizes}>{formatSize(size, true)}</span>
                                    </Typography>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Masonry>
            </ResponsiveMasonry>
          </div>
          <div className={classes.loadmore}>
            {loading ? (
              <CircularProgress />
            ) : result?.catalog?.length >0 ? (
              <button className={classes.loadmore2} onClick={handleNextClick} ref={buttonRef}>
                Load More
              </button>
            ) : null}
          </div>
        </Grid>
      ) : (
        <SkeletonLoader />
      )}
    </div>
  );
};

export default withApollo()(withCart(withCatalogItems(inject("routingStore", "uiStore")(SearchProduct))));
