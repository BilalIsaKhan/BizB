import * as React from "react";
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
} from "@material-ui/core";
import useViewer from "../../hooks/viewer/useViewer";
import { withApollo } from "lib/apollo/withApollo";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Hidden } from "@material-ui/core";
import useGetAllStores from "../../hooks/sellers/useGetAllStores";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Link from "next/link";
import { Search } from "@material-ui/icons";
import Pagination from "../Pagination/Pagination";
// import Select, { components } from "react-select";
import useprimaryShop from "../../hooks/primaryShop/useprimaryShop";
import useTagsQuery from "../../hooks/categoryTags/getTags";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import Sort from "@material-ui/icons/Sort";
import Skeleton from "@material-ui/lab/Skeleton";
import SkeletonLoader from "../Justin/skeletonLoader";

const StorePage = ({...props}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    square: {
      width: "200px", // Reduced by 1px to create space for the border
      height: "200px",
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
        height: "150px",
      },
      color: "white",
      fontSize: "54px",
      backgroundColor: "black",
    },
    square2: {
      width: "200px", // Reduced by 1px to create space for the border
      height: "200px",
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
        height: "150px",
      },
      color: "white",
      fontSize: "54px",
      backgroundColor: "#FDC114",
    },
    textFieldStyle: {
      height: "38px",
      width: "200px",
      backgroundColor: "#EEEDED",
      borderRadius: "8px",
    },

    styleofdiv: {
      justifyContent: "center",
      width: "100%",
    },
    profilebaner: {
      width: "100%",
    },
    profilebaner2: {
      width: "99px",
      height: "120px",
      paddingBottom: "3%",
    },
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
    boxcontairproduct2: {
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
    image: {
      width: "275px", // Reduced by 1px to create space for the border
      maxHeight: "600px",
      height: "200px",
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
    vector: {
      marginTop: theme.spacing(2),
    },
    loadmore: {
      display: "flex",
      justifyContent: "center",
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
    carttitle: {
      display: "flex",
      marginLeft: theme.spacing(1),
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    selectDesktop: {
      marginRight: theme.spacing(3),
    },
    reactselect: {},
    divForSearch: {
      flexDirection: "column",
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
        margin: "10px",
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
    sortdiv: {
      display: "flex",
      flexDirection: "row",
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
  }));

  const classes = useStyles();
  const [getSearch, setSearch] = React.useState("");
  const [getSearch2, setSearch2] = React.useState("");
  const [itemsPerPage, setitemsPerPage] = React.useState(72);
  const [page, setPage] = React.useState(0);
  const [categoryProduct, setcategoryProduct] = React.useState("Select a Category");
  const [primaryShopId, refetch2] = useprimaryShop();
  const [categoryTags] = useTagsQuery(primaryShopId, "category-");
  const [categoryID, setcategoryID] = React.useState("");

 
  const handleChangePage = (currentPage) => {
    setPage(currentPage);
  };
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <img src="/colors/vector.svg" alt="icon" />
      </components.DropdownIndicator>
    );
  };
  const customStyles = {
    indicatorSeparator: () => ({
      height: "48px",
      color: "black",
    }),
    control: (provided, state) => ({
      ...provided,
      height: "48px",
      marginTop: "30px",
      background: "#F7F7F9",
      borderRadius: "6px",
      border: state.isFocused ? "none" : "none",
      boxShadow: state.isFocused ? "none" : "none",
      width: "200px", // Change this to the desired width
    }),
    menu: (provided, state) => ({
      ...provided,
      // Set the width of the menu to the full viewport width
      maxWidth: "none",

      // Ensure that the menu can extend beyond the width of the container
    }),
    menuList: (provided, state) => ({
      ...provided,
      border: "none",
    }),
    option: (provided, state) => ({
      fontFamily: "Lato",
      fontStyle: "normal",
      fontWeight: state.isFocused ? 800 : 500,
      fontSize: "14px",
      lineHeight: "19px",
      textTransform: "capitalize",
      letterSpacin: "0.05em",
      padding: "13px",
      borderBottom: state.isLastOption ? "none" : "1px solid #01010136",
      color: state.isFocused ? "#000000" : "#989898",
      "&:hover": {
        color: "#FDC114",
      },
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      icon: state.isFocused ? "url('/colors/vectordark.svg')" : "url('/colors/vectoryellow.svg')",
      "&:hover": {
        color: "green",
      },
    }),
    input: (provided) => ({
      ...provided,
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "19px",
        textTransform: "capitalize",
        color: "#969696",
        "&:hover": {
          color: "blue",
        },
      };
    },
  };
  const [sellers, totalCount, loading, refetch] = useGetAllStores(itemsPerPage, page, getSearch2);

  React.useEffect(() => {
    if (!categoryTags && !primaryShopId) {
      refetch2();
    }

    console.log("categoryTags in component is", categoryTags);
  }, [primaryShopId, categoryTags]);

  React.useEffect(() => {
    console.log("search2 2", props.search)
    setSearch(props?.search?.trim())
  

  }, [props.search]);

  React.useEffect(() => {
    console.log("sellerssellers", totalCount);
  }, [sellers, loading, refetch, itemsPerPage, page]);

  React.useEffect(() => {
    console.log("sss", getSearch);

    const delayDebounceFn = setTimeout(() => {
      setSearch2(getSearch);
    }, 900);

    return () => clearTimeout(delayDebounceFn);
  }, [getSearch, loading, sellers]);

  return (
    <div className={classes.main}>
      <img src="/profile/profilebanner.webp" className={classes.profilebaner} alt="icon" />

      <div className="sellerProfile">
        <Grid container className="publicProfile__profileInfoWrapper">
          <Grid xs={12} item className="publicProfile__profileInfoSection">
            <div
              className="sellerProfile__img"
              style={{
                backgroundImage: "/icons/tickIcon.png",
              }}
            >
              <img src="/favicons/Logo2.svg" className={classes.profilebaner2} alt="icon" />
            </div>
            <div className="publicProfile__infoContainer">
              <div className="sellerProfile__infoRow publicProfile__infoRow">
                {sellers?.length > 0 ? (
                  <Typography className="publicProfile__name" variant="h1">
                    <span>All Wardrobes</span>
                    {<img src="/icons/tickIcon.png" alt="icon" />}
                  </Typography>
                ) : (
                  <Skeleton width={210} />
                )}
              </div>
            </div>
            <div className={classes.divForSearch}>
              <div className={classes.sortdiv}>
                <IconButton>
                  <Search style={{ color: "black" }} />
                </IconButton>
                <TextField
                  type="text"
                  size="small"
                  variant="standard"
                  placeholder="Search..."
                  value={getSearch}
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      margin: 0,
                      padding: 10,
                      width:"260px",
                      backgroundColor: "#f7f7f9",
                      borderRadius: "8px",
                      fontSize: "19px",
                    },
                  }}
                  className={classes.textFieldStyle}
                />
              </div>
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
        </Grid>
      </div>
     {sellers?.length > 0 ? (
        <div className={classes.gridroot}>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 2, 900: 2, 1050: 3, 1280: 4, 1400: 5, 1750: 6, 1920: 6 }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <Masonry columnsCount={4} style={{ display: "flex", justifyContent: "flex-start" }}>
              {sellers?.map((item, key) => {
                // console.log(optionTitle, "fil");
                return (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className={classes.boxcontairproduct}>
                      {/* {console.log("Images", item?.node)} */}
                      {item?.storeLogo ? (
                        <Link href={"/en/profile/[slugOrId]"} as={`/en/profile/${item?._id}`}>
                          <a target="_blank">
                            <img
                              src={item?.storeLogo}
                              className={classes.image}
                              key={item?._id}
                              alt={item?.storeName}
                            />{" "}
                          </a>
                        </Link>
                      ) : (
                        <Link href={"/en/profile/[slugOrId]"} as={`/en/profile/${item?._id}`}>
                          <a target="_blank">
                            <Avatar variant="square" className={key % 2 ? classes.square : classes.square2}>
                              {item?.storeName? item?.storeName?.charAt(0).toUpperCase(): item?.profile?.firstName?.charAt(0).toUpperCase() }
                            </Avatar>
                          </a>
                        </Link>
                      )}

                      <div className={classes.cartcontent}>
                        <div className={classes.cartcontenttext}>
                          <Typography
                            style={{
                              fontWeight: "600",
                              fontSize: "1rem",
                              fontFamily: "lato",
                              // marginTop: "10px",
                              textTransform: "capitalize",
                              marginLeft: "5px",
                            }}
                            variant="h4"
                            component="h2"
                            className={classes.carttitle}
                          >
                            {item?.storeName && item?.storeName.trim() ? item?.storeName.slice(0, 15) : "User Wardrobe"}
                          </Typography>
                          <Typography className="sellerProfile__infoMetaTitle" variant="h5">
                            {" "}
                            {item?.profile?.firstName && item?.profile?.firstName?.trim() ? item?.profile?.firstName.slice(0, 15) : "User"}
                          </Typography>
                          <Typography className="sellerProfile__infoMetaTitle" variant="h5">
                            {" "}
                            Products: {item?.noOfProduct?.count}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        </div>
     ) : loading? (
      <SkeletonLoader />
    ) : (
      totalCount === 0 && (
        <div className={classes.imgdiv}>
          <img src="/images/noimage.jpg" className={classes.imgSize} alt="icons" />
          <Typography variant="h6" className={classes.textstyle}>
            No Results Found
          </Typography>
        </div>
      )
    )}

{totalCount > itemsPerPage && (
        <div className={classes.loadmore}>
          <Pagination
            totalCount={totalCount}
            /* @ts-ignore TODO: Refactor link to address type error */
            changePage={handleChangePage}
            currentPage={page}
            itemsPerPage={itemsPerPage}
            /* @ts-ignore TODO: Refactor link to address type error */
            setItemsPerPage={setitemsPerPage}
          />
        </div>
      )}
    </div>
  );
};
export default withApollo()(StorePage);
