import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import formatSize from "../../lib/utils/formatSize";
import { CircularProgress } from "@material-ui/core";
import Head from "next/head";

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
    // border: "2px solid red",
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

const ProductCard = ({
  item,
  isDisabled,
  isLoading,
  percentage,
  firstThreeWords,
  storeNameShort,
  size,
  handleOnClick,
  trackProductView,
}) => {
  const classes = useStyles();

  return (
    <>
      <Head>
        <meta name="description" content="Product" />

        {/* Add JSON-LD script for Product schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "Product",
              "name": "${firstThreeWords}",
              "url": "bizb.store/en/product/${item.node.product.slug},
              "image": "${
                item?.node?.product?.media[0]?.URLs?.thumbnail
                  ? item?.node?.product?.media[0]?.URLs?.thumbnail
                  : item?.node?.product?.variants[0]?.media[0]?.URLs?.thumbnail
              }",
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "PKR",
                "lowPrice": "${item?.node?.product?.variants[0]?.pricing[0]?.displayPrice}",
                "highPrice": "${item?.node?.product?.variants[0]?.pricing[0]?.compareAtPrice?.displayAmount}",
              }
            }
          `}
        </script>
      </Head>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className={classes.boxcontairproduct}
          onCick={() => {
            trackProductView ? trackProductView() : null;
          }}
        >
          <Link
            href={item.node.product.slug && "/en/product/[...slugOrId]"}
            as={item.node.product.slug && `/en/product/${item.node.product.slug}`}
          >
            <a target="_blank">
              {/* {console.log("Images", item?.node)} */}

              <img
                src={
                  item?.node?.product?.media[0]?.URLs?.medium
                    ? item?.node?.product?.media[0]?.URLs?.medium
                    : item?.node?.product?.media[0]?.URLs?.thumbnail
                    ? item?.node?.product?.media[0]?.URLs?.thumbnail
                    : item?.node?.product?.media[0]?.URLs?.large
                    ? item?.node?.product?.media[0]?.URLs?.large
                    : item?.node?.product?.variants[0]?.media && item?.node?.product?.variants[0]?.URLs?.medium
                    ? item?.node?.product?.variants[0]?.media[0]?.URLs?.medium
                    : item?.node?.product?.variants[0]?.media &&
                      item?.node?.product?.variants[0]?.media[0]?.URLs?.thumbnail
                    ? item?.node?.product?.variants[0]?.media[0]?.URLs?.thumbnail
                    : item?.node?.product?.variants[0]?.media && item?.node?.product?.variants[0]?.media[1]?.URLs?.large
                    ? item?.node?.product?.variants[0]?.media[1]?.URLs?.large
                    : item?.node?.product?.variants[0]?.media && item?.node?.product?.variants[0]?.media[1]?.URLs?.small
                    ? item?.node?.product?.variants[0]?.media[1]?.URLs?.small
                    : ""
                }
                className={classes.image}
                key={item?.node?.product?.id}
                alt={item?.node?.product?.title}
              />
            </a>
          </Link>

          <div>
            <div className={classes.cartButton}>
              <Button
                className={classes.cart}
                onClick={() => handleOnClick(item?.node?.product, item?.node?.product?.variants[0])}
                disabled={isDisabled || item?.node?.product?.isSoldOut}
              >
                {isLoading[item?.node?.product?.productId] ? (
                  <CircularProgress color="black" size="17px" className={classes.progressBar} />
                ) : (
                  <>
                    <div className={classes.cartButtonrowDiv}>
                      <img component="img" src="/icons/cart.svg" className={classes.cartimage} alt="icons" />
                      <Typography
                        style={{
                          fontFamily: "Ostrich Sans Black",
                        }}
                        variant="h5"
                        component="h2"
                        className={classes.cartText}
                      >
                        {isDisabled ? "Added" : item.node.product.isSoldOut ? "Sold" : "+ Cart"}
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
                        {item?.node?.product?.variants[0]?.pricing[0]?.compareAtPrice && `-${Math.abs(percentage)}%`}
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
                    href={item.node.product.slug && "/en/product/[...slugOrId]"}
                    as={item.node.product.slug && `/en/product/${item.node.product.slug}`}
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
                        as={`/en/profile/${item?.node?.product?.variants[0]?.uploadedBy?.userId}`}
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
                        {item?.node?.product?.variants[0]?.pricing[0]?.compareAtPrice?.displayAmount
                          ?.replace(/\.00$/, "")
                          .replace(/\$/g, "Rs. ")}
                      </Typography>
                      <div className={classes.strikethroughoff}>
                        {item?.node?.product?.variants[0]?.pricing[0]?.displayPrice
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
                {/* <div className={classes.cartbackground}>
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

                          </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
