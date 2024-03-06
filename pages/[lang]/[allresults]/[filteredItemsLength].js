import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Layout from "../../../components/Layout/Layout";
import withCatalogItems from "../../../containers/catalog/withCatalogItems";
import fetchPrimaryShop from "../../../staticUtils/shop/fetchPrimaryShop";
import { withApollo } from "../../../lib/apollo/withApollo";
import useShop from "../../../hooks/shop/useShop";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import variantById from "lib/utils/variantById";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import withCart from "./../../../containers/cart/withCart";
import Link from "next/link";
import inject from "../../../hocs/inject";
import { ToastContainer, toast } from "react-toastify";
import Box from "@material-ui/core/Box";
import formatSize from "../../../lib/utils/formatSize";
import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";
import ProductCard from "../../../components/ProductCard/ProductCard";
import PageStepper from "components/PageStepper/PageStepper";

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
    marginTop: "60px",
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
  loadmore: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    marginLeft: "0px",
  },
  cartbackground: {
    marginRight: "8px",
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
  spanofnextword: {
    color: "#FDC114",
  },
}));

function AllResults(props) {
  // console.log(props.cart, "new");
  const { allItems, totalLength, uiStore, catalogItems, cart, catalogItemsPageInfo } = props;
  const { items } = cart ? cart : {};
  const [soldOutProducts, setSoldOutProducts] = useState([]);
  const [isLoading, setIsLoading] = useState({});
  const { setPageSize, setSearchItems } = uiStore;
  const [addToCartQuantity, setAddToCartQuantity] = useState(1);
  const [lodingforNextPage, setlodingforNextPage] = useState(false);

  // useEffect(() => {

  //   uiStore?.setPageSize(500);
  // }, []);
  useEffect(() => {
    const updatedItems = items?.map((item) => {
      const isItemInCart = catalogItems?.some((product) => {
        return item?.productConfiguration?.productId === product?.node.product?.productId;
      });
      // setpageSize(20);
      return {
        ...item,
        disabled: item?.inCart || isItemInCart,
      };
    });
    const soldOutProducts = catalogItems?.filter((product) => product?.node?.product?.isSoldOut);
    setSoldOutProducts(soldOutProducts);
  }, [items, catalogItems]);
  useEffect(() => {
    setPageSize(allItems);
    setSearchItems(totalLength);
  }, [allItems, totalLength]);
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
    const selectedVariant = variantById(product.variants, variant._id);
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

  const handleOnClick = async (product, variant) => {
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
  const router = useRouter();
  const clickHandler = (item) => {
    const productSlug = item;

    const url = `/en/product/${productSlug}`;
    const newWindow = window.open(url, "_blank");
    newWindow.opener.focus();
  };
  const classes = useStyles();
  return (
    <Layout shop={shop}>
      {typeof window !== "undefined" && (
        <div className={classes.main}>
          <div className={classes.headermSain}>
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
            {/* Search Results for "Search word Here" */}
            <Typography variant="h3">
              Search <span className={classes.spanofnextword}>Results</span> for
              <span className={classes.spanofnextword}> {totalLength}</span>
            </Typography>
          </div>
          <div className={classes.gridroot}>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 900: 2, 1050: 3, 1280: 4, 1400: 5, 1750: 6, 1920: 6 }}
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <Masonry columnsCount={4} style={{ display: "flex", justifyContent: "flex-start" }}>
                {catalogItems?.map((item, index) => {
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

                  // Access the "size" property
                  const size = validOptionTitle ? JSON.parse(validOptionTitle)?.size : null;

                  // const size =validOptionTitle? validOptionTitle: null;
                  const str = item.node.product.title;
                  const words = str.match(/[a-zA-Z0-9]+/g);
                  const firstThreeWords = words.slice(0, 3).join(" ");
                  const storeNameShort = item?.node?.product?.variants[0]?.uploadedBy?.storeName?.slice(0, 15);
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
                      storeNameShort={storeNameShort}
                      size={size}
                      handleOnClick={handleOnClick}
                      // trackProductView={trackProductView}
                    />
               
                  );
                })}
              </Masonry>
            </ResponsiveMasonry>
          </div>
          <div className={classes.loadmore}>
          {lodingforNextPage ? (
            <CircularProgress /> // Show the circular progress bar when loading is true
          ) : (
            <></>
          )}
          {catalogItemsPageInfo?.hasNextPage && <PageStepper pageInfo={catalogItemsPageInfo}></PageStepper>}
        </div>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ params, query }) {
  // console.log("obj is ", params, query);
  const { lang, allresults, filteredItemsLength } = params;
  return {
    props: {
      ...(await fetchPrimaryShop(lang)),
      allItems: allresults,
      totalLength: filteredItemsLength,
    },
  };
}
export default withApollo()(withCart(withCatalogItems(inject("routingStore", "uiStore")(AllResults))));
