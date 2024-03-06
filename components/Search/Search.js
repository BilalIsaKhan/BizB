import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { InputAdornment, IconButton, TextField, Avatar } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactGA from "react-ga4";
import { CircularProgress } from "@material-ui/core";
import useGetAllStores from "../../hooks/sellers/useGetAllStores";
import useGlobalSearch from "../../hooks/globalSearch/useglobalSearch";

import withCatalogItems from "containers/catalog/withCatalogItems";
const useStyles = makeStyles((theme) => ({
  inputrootdiv: {
    padding: "47px",
    borderRadius: "5px",
  },
  inputRoot: {
    "& .MuiOutlinedInput-root": {
      outline: "none",
      borderColor: "none",
      border: "none",
    },
    "& .MuiInputBase-root": {
      fontFamily: "Lato",
      color: "green",
    },
    width: "100%",
    borderRadius: "5px",
    "& div.MuiFormControl-root": {
      width: "100%",
      borderRadius: "5px",
    },
    "& :focus": {
      outline: "none",
      color: "blue",
    },
  },
  input2: {
    "&::placeholder": {
      fontSize: "30px",

      [theme.breakpoints.down(600)]: {
        fontSize: "15px",
        fontWeight: "500",
      },
    },
  },
  input: {
    borderRadius: "5px",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    textTransform: "none",

    "& .MuiInputBase-root": {
      fontFamily: "Lato",
      color: "green",
    },
    "&.MuiOutlinedInput-root": {
      outline: "none",
      borderColor: "none",
    },
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "none !important",
      },
      "&:hover fieldset": {
        borderColor: "none",
      },
      "&.Mui-focused fieldset": {
        borderColor: "transparent !important",
      },
    },
  },
  // paper: {
  //   position: "absolute",
  //   outline: "none",
  //   width: "92%",
  //   height: "",
  //   borderRadius: "18px",
  //   backgroundColor: "transparent",
  //   // transform: "translate(-50%, -50%)",
  //   top: "170px",
  //   left: "62px",
  // },
  // icon: {
  //   cursor: "pointer",
  //   "&:hover": {
  //     transform: "scale(1.08)",
  //     transition: "left 0.2s linear",
  //   },
  // },
  CloseIcon: {
    cursor: "pointer",
    height: "33px",
    width: "33px",
    color: "black",
    "&:hover": {
      transform: "scale(1.08)",
      transition: "left 0.2s linear",
    },
    [theme.breakpoints.down(600)]: {
      height: "23px",
      width: "23px",
    },
  },
  pricing: {
    display: "flex",
    flexDirection: "column",
    marginTop: 0,
    marginBottom: 0,
  },
  cartitem: {
    display: "flex",
    // justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: "10px",
  },
  // cartimage: {
  //   height: "188px",
  //   width: "254px",
  //   borderRadius: "10px",
  // },
  cartitemtext: {
    display: "flex",
    flexDirection: "column",
    fontSize: "1.1rem",
    textTransform: "capitalize",
    padding: 0,
    marginTop: "4px",
  },
  cartprice: {
    color: theme.palette.secondary.selected,
    fontSize: "15px",
    [theme.breakpoints.down(600)]: {
      fontSize: "10px",
    },
  },
  totatlproducts: {
    color: theme.palette.secondary.selected,
    fontSize: "1.1rem",
    marginLeft: "39px",
    marginBottom: "16px",
  },

  storeName: {
    paddingTop: 0,
    fontSize: "12px",
    color: "#FDC114",
    [theme.breakpoints.down(600)]: {
      fontSize: "11px",
    },

    "&:hover": {
      color: "#FDC114",
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  cartpric: {
    paddingTop: 0,
    fontSize: "0.9rem",
  },
  price: {
    fontSize: "15px",
    [theme.breakpoints.down(600)]: {
      fontSize: "10px",
    },

    // marginLeft: theme.spacing(2),
  },
  image: {
    width: "120px",
    height: "100px",
    objectFit: "contain",
    borderRadius: "10px",
    cursor: "pointer",
    marginRight: "10px",
    [theme.breakpoints.down(600)]: {
      width: "90px",
      height: "110px",
    },
  },
  image2: {
    width: "120px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "10px",
    cursor: "pointer",
    marginRight: "10px",
    [theme.breakpoints.down(600)]: {
      width: "90px",
      height: "110px",
    },
  },
  filteritemsfromsearch: {
    backgroundColor: "white",
    marginRight: "47px",
    marginLeft: "47px",
    borderRadius: "18px",
    overflowY: "auto",
    [theme.breakpoints.down(600)]: {
      overflow: "auto",
      maxHeight: "490px",
      marginRight: "7px",
      marginLeft: "7px",
      marginBottom: "10px",
    },
  },
  searchdiv: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down(600)]: {
      flexDirection: "column",
    },
  },
  search: {
    outline: "none",
    border: "none",
  },
  headerlogo: {
    height: "33px",
    width: "33px",
    [theme.breakpoints.down(600)]: {
      height: "23px",
      width: "23px",
    },
  },
  productTitle: {
    [theme.breakpoints.down(600)]: {
      fontSize: "16px",
      fontWeight: "600",
    },
  },
  productTitle3: {
    fontSize: "14px",
    fontWeight: "300",

    [theme.breakpoints.down(600)]: {
      fontSize: "12px",
      fontWeight: "300",
    },
  },
  productTitle2: {
    marginLeft: "39px",
    marginTop: "10px",
    [theme.breakpoints.down(600)]: {
      fontSize: "16px",
      fontWeight: "600",
    },
  },
}));
const Search = ({ modalFlag, setModalFlag, catalogItems, searchQuery, uiStore }) => {
  const [searchLocal, setSearchLocal] = useState();
  const [searchText, setsearchText] = useState(false);
  const [getSearch2, setSearch2] = React.useState("");
  // const [sellers, totalCount, loading, refetch] = useGetAllStores(5, 0, getSearch2);
  const [result, loading2, refetch2] = useGlobalSearch(null, getSearch2, 0, );

  React.useEffect(() => {
    console.log("sss", searchLocal);

    const delayDebounceFn = setTimeout(() => {
      setSearch2(searchLocal);
    }, 900);

    return () => clearTimeout(delayDebounceFn);
  }, [searchLocal]);

  // fetch products and update catalogItems
  const router = useRouter();
  const filteredItems = catalogItems?.filter((product) => {
    const title = product?.node?.product.title.trim().toLowerCase();
    return title.includes(searchLocal) || title.indexOf(searchLocal) !== -1;
  });

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // prevent default submit action
    const trimmedValue = searchLocal?.trim(); // remove leading/trailing spaces
    if (trimmedValue) {
      uiStore?.setSearchItems(trimmedValue);
      // console.log(trimmedValue, "query2");
    }
  };
  const handleSearchChange = (event) => {
    console.log("workwork");
    const searchQuery = event.target.value.toLowerCase();
    setsearchText(true);
    setSearchLocal(searchQuery);
    ReactGA.send({
      hitType: "event",
      eventCategory: "Ecommerce",
      eventAction: "product_search",
      eventLabel: searchQuery,
    });
  };
  React.useEffect(() => {
    console.log("workwork 2 on key up", result?.storeData);

   
  }, [ result, loading2]);

  const handleProductDetail = (productSlug) => {
    const url = `/en/product/${productSlug}`;
    const newWindow = window.open(url, "_blank");
    newWindow.opener.focus();
  };

  const classes = useStyles();
  // IF ITS NOT WORKIS THEN I HAVE TO ADD '\"'+searchTitle+'\"';
  // console.log(searchLocal, "query");
  return (
    <>
      <></>
      <Modal open={modalFlag} onClose={() => setModalFlag(false)}>
        <div className={classes.search}>
          {/* <form onSubmit={handleSearchSubmit}>
              <input type="text" value={searchLocal} onChange={handleSearchChange} onKeyUp={handleSearchSubmit} />
              <button type="submit" onClick={() => setModalFlag(false)}>
                Search
              </button>
            </form> */}
          <form onSubmit={handleSearchSubmit}>
            <div className={classes.inputrootdiv}>
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "18px",
                  height: "65px",
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                }}
                className={classes.inputRoot}
              >
                <TextField
                  type="text"
                  id="outlined-basic"
                  variant="outlined"
                  value={searchLocal}
                  className={classes.input}
                  onInput={handleSearchChange}
                  // onKeyUp={handleSearchSubmit}
                  // onBlur={() => {
                  //   setsearchText(true);
                  // }}
                  placeholder="What are you looking for..." // add placeholder text
                  InputProps={{
                    classes: { input: classes.input2 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton>
                          <img
                            src="/images/searchIconDark.svg"
                            className={classes.headerlogo}
                            onClick={() => setModalFlag(false)}
                            alt="icon"
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {loading2 ? (
                          <IconButton>
                            <CircularProgress />
                          </IconButton>
                        ) : (
                          <IconButton>
                            <CloseIcon onClick={() => setModalFlag(false)} className={classes.CloseIcon} />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </form>

          {result ? (
            <div className={classes.filteritemsfromsearch}>
              <>
                <div style={{ display: "flex" }}>
                  <div style={{ marginTop: "20px", width: "100%", marginRight: "25px" }}>
                    <Typography variant="h4" className={classes.productTitle2}>
                      Products
                    </Typography>
                    <ul className={classes.searchdiv}>
                      {result?.catalog?.slice(0, 4)?.map((product) => {
                        // console.log(filteredItems, "fil");
                        return (
                          <div
                            key={product?._id}
                            className={classes.cartitem}
                            onClick={() => handleProductDetail(product?.slug)}
                          >
                            <Link
                              href={product.slug && "en/product/[...slugOrId]"}
                              as={product.slug && `en/product/${product.slug}`}
                            >
                              <a target="_blank">
                                <img
                                  src={product?.variant[0]?.media[0]?.URLs?.thumbnail}
                                  alt={product?.title?.slice(0, 5)}
                                  className={classes.image}
                                />
                              </a>
                            </Link>
                            <div className={classes.cartitemtext}>
                              <Link
                                href={product.slug && "en/product/[...slugOrId]"}
                                as={product.slug && `en/product/${product.slug}`}
                              >
                                <a target="_blank">
                                  <Typography variant="h5" className={classes.productTitle}>
                                    {product?.title?.slice(0, 15)}
                                  </Typography>
                                </a>
                              </Link>
                              <Link href={`/en/profile/${product?.variant[0]?.uploadedBy?.userId}`}>
                                <a style={{ color: "#FDC114" }}>
                                  <Typography variant="h5" className={classes.cartpric}>
                                  Wardrobe:{" "}
                                    <span className={classes.storeName}>
                                      {product?.variant[0]?.uploadedBy
                                        ? product?.variant[0]?.uploadedBy?.storeName
                                        : product?.variant[0]?.uploadedBy?.name}
                                    </span>
                                  </Typography>
                                </a>
                              </Link>
                              <div className={classes.pricing}>
                                {" "}
                                <strike className={classes.cartprice}>
                                  {product?.variant[0]?.pricing[0]?.compareAtPrice?.displayAmount
                                    ?.replace(/\.00$/, "")
                                    .replace(/\$/g, "Rs. ")}
                                </strike>
                                <Typography gutterBottom variant="h5" className={classes.price}>
                                  {product?.variant[0]?.pricing[0]?.displayPrice
                                    ?.replace(/\.00$/, "")
                                    .replace(/\$/g, "Rs. ")}
                                </Typography>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                {result?.catalog?.length > 0 ? (
                  <Typography variant="h5" className={classes.totatlproducts}>
                    {searchLocal === "" ? (
                      <></>
                    ) : (
                      <Link href={{ pathname: "/en/SearchResult", query: { search: JSON.stringify(searchLocal) } }}>
                      {/* // <Link href={`/en/search/${searchLocal}`}> */}
                        <a style={{ color: "#FDC114" }}> {`See all results`}</a>
                      </Link>
                    )}
                  </Typography>
                ) : (
                  <Typography variant="h5" className={classes.totatlproducts}>
                    No result
                  </Typography>
                )}
              </>
              <>
                <div style={{ display: "flex" }}>
                  <div style={{ marginTop: "20px", width: "100%", marginRight: "25px" }}>
                    <Typography variant="h4" className={classes.productTitle2}>
                    Wardrobes
                    </Typography>
                    <ul className={classes.searchdiv}>
                      {result?.storeData?.slice(0, 4)?.map((item) => {
                        // console.log(filteredItems, "fil");
                        return (
                          <div key={item._id} className={classes.cartitem}>
                            {item?.image ? (
                              <Link href={"/en/profile/[slugOrId]"} as={`/en/profile/${item?._id}`}>
                                <a target="_blank">
                                  <img
                                    src={item?.image}
                                    className={classes.image2}
                                    key={item?._id}
                                    alt={item?.storeName?.charAt(0).toUpperCase()}
                                  />{" "}
                                </a>
                              </Link>
                            ) : (
                              <Link href={"/en/profile/[slugOrId]"} as={`/en/profile/${item?._id}`}>
                                <a target="_blank">
                                  <Avatar variant="square" className={classes.image}>
                                    {item?.storeName
                                      ? item?.storeName?.charAt(0).toUpperCase()
                                      : item?.name?.charAt(0).toUpperCase()}
                                  </Avatar>
                                </a>
                              </Link>
                            )}
                            <div className={classes.cartitemtext}>
                              <Typography variant="h5" className={classes.productTitle}>
                                {item?.storeName ? item?.storeName : "User Wardrobe"}
                              </Typography>
                              <Typography variant="h5" className={classes.productTitle3}>
                                {item?.name ? item?.name : "User"}
                              </Typography>
                            </div>
                          </div>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                {result?.storeData?.length > 0 ? (
                  <Typography variant="h5" className={classes.totatlproducts}>
                    {searchLocal === "" ? (
                      <></>
                    ) : (
                      <Link href={{ pathname: "/en/wardrobe", query: { search: JSON.stringify(searchLocal) } }}>
                        <a style={{ color: "#FDC114" }}> {`See all results `}</a>
                      </Link>
                    )}
                  </Typography>
                ) : (
                  <Typography variant="h5" className={classes.totatlproducts}>
                    No result
                  </Typography>
                )}
              </>
            </div>
          ) : (
            ""
          )}
         
        </div>
      </Modal>
    </>
  );
};

export default withCatalogItems(Search);
