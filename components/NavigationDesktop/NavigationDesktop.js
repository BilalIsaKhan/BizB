import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import { NavigationItemDesktop } from "components/NavigationDesktop";
import Link from "components/Link/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "@apollo/react-hooks";
import categoryTags from "../../hooks/categoryTags/getTags.gql";
import { sendGraphQLQuery } from "./graphqlUtils";
import Router from "next/router";
import useTagsQuery from "../../hooks/categoryTags/getTags";
import useprimaryShop from "../../hooks/primaryShop/useprimaryShop";
import useGetAllBrands from "../../hooks/brands/useGetAllBrands";
import useGetAllStores from "../../hooks/sellers/useGetAllStores";
import useViewer from "hooks/viewer/useViewer";
import { PlayArrow } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

const styles = (theme) => ({
  light: {
    color: "#FFFFFF",
    cursor: "pointer",
    zIndex: 1200,
  },
  dark: {
    color: "#333333",
    cursor: "pointer",
    zIndex: 1200,
  },
  categoryavatar: {
    height: "25px",
    width: "25px",
    marginBottom: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  modalitems: {
    display: "flex",
    flexDirection: "row",
  },
  modalitemsimage: {
    display: "flex",
    flexDirection: "column",
  },
  modalitemstitle: {
    display: "flex",
    flexDirection: "column",
  },
  categoryTagsLink: {
    borderBottom: "1px solid #59595940",
  },
  catgorytitle: {
    letterSpacing: "0.85px",
    fontFamily: "Ostrich Sans Black",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: "0px 15px",
    boxShadow: " inset 0 0 0 0 #FDC114",
    color: "black",
    // margin: "0 -.25rem",
    // padding: "0 .25rem",
    transition: "color .3s ease-in-out, box-shadow .3s ease-in-out",
    
    "&:hover": {
      color: "white",
      boxShadow: "inset 160px 0 0 0 #FDC114",
    },

  },
  currentCategory: {
    textDecorationColor: "#FDC114",
    textDecorationThickness: "3px", // Adjust the underline thickness
    textDecorationLine: "underline",
  },
  popover: {
    // pointerEvents: "none",
    top: "0",
  },
  paper: {
    padding: theme.spacing(0),
  },
  paper2: {
    padding: 0,
    top: "20px",
  },
  headerHeadings: {
    marginRight: "40px",
    padding: "9px 11px",
    marginLeft: "30px",
    fontSize: "18px",
    fontFamily: '"Ostrich Sans Black"',
    fontWeight: 900,
    "&:hover": {
      color: "white",
      boxShadow: "inset 150px 0 0 0 #FDC114",
      borderRadius: "18px",
    },
    [theme.breakpoints.down(1700)]: {
      fontSize: "13px",
      marginLeft: "2px",
    },
  },
});

const tagsCategory = () => {
  const { loading, error, data } = useQuery(categoryTags, {
    errorPolicy: "all",
    variables: {
      shopId: process.env.SHOP_ID,
      filter: "category-",
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { viewer } = data;
  return <NavigationDesktop data={data} />;
};

const NavigationDesktop = (props) => {
  const [selectedPage, setselectedPage] = useState("");
  const [primaryShopId, refetch2] = useprimaryShop();
  const [viewer, loading4, refetch4] = useViewer();

  const [categoryTags] = useTagsQuery(primaryShopId, "category-");
  const [brands, totalCount, loading, refetch] = useGetAllBrands(3, 0);
  const [sellers, totalCount2, loading2, refetch3] = useGetAllStores(3, 0);

  const [state, setState] = useState({
    anchorEl: null,
    anchorEl2: null,
    anchorEl3: null,
    anchorEl4: null,
    anchorEl5: null,
    categoryTagsInfo: null,
    selectedPage: null,
    currentLink: null,
    customOrder: ["Casuals", "Western", "Party Wear", "BizB Kids", "Accessories", "Shoes", "Deals", "Deal", "Upcycled", "EXPRESS DELIVERY",  ],
    mappedData: [],
    mappedData2: [
      { name: "Brands", url: "/en/brands" },
      { name: "Wardrobes", url: "/en/wardrobe" },
    ],
    // Other state variables...
  });

  const style = {
    borderRadius: "8px",
    "&::before": {
      backgroundColor: "#fdc114",
      content: '""',
      display: "block",
      position: "absolute",
      width: 12,
      height: 12,
      top: -6,
      transform: "rotate(45deg)",
      left: "calc(50% - 6px)",
    },
    left: "15%",
    bgcolor: "#ffffff",
    outline: "none",
    padding: "10px 0px",
    boxShadow: 24,
  };
  const style2 = {
    borderRadius: "8px",
    "&::before": {
      backgroundColor: "#fdc114",
      content: '""',
      width: 12,
      height: 12,
      top: 21,
     
      left: "-6px",
    },
    left: "15%",
    bgcolor: "#ffffff",
    outline: "none",
    padding: "10px 0px",
    boxShadow: 24,
  };

  useEffect(() => {
    mapData();
    console.log("categoryTagscategoryTags", categoryTags, primaryShopId);
    // Additional useEffect logic...
  }, [categoryTags, primaryShopId]);

  const setAnchorEl = (value) => {
    setState((prevState) => ({ ...prevState, anchorEl: value }));
  };

  // Other setAnchorEl functions...

  const handlePopOverClose = () => {
    setState((prevState) => ({ ...prevState, anchorEl: null }));
  };

  // Other handlePopOverClose functions...

  const handlePopOverOpen = (event) => {
    console.log("hello here in this popover")
    setState((prevState) => ({ ...prevState, anchorEl: event.currentTarget }));
  };
  const handlePopOverClose2 = () => {
    setState((prevState) => ({ ...prevState, anchorEl2: null }));
  };

  // Other handlePopOverClose functions...

  const handlePopOverOpen2 = (event) => {
    setState((prevState) => ({ ...prevState, anchorEl2: event.currentTarget }));
  };
  const handlePopOverClose3 = () => {
    setState((prevState) => ({ ...prevState, anchorEl3: null }));
  };

  // Other handlePopOverClose functions...

  const handlePopOverOpen3 = (event) => {
    setState((prevState) => ({ ...prevState, anchorEl3: event.currentTarget }));
  };
  const handlePopOverClose4 = () => {
    setState((prevState) => ({ ...prevState, anchorEl4: null }));
  };

  // Other handlePopOverClose functions...

  const handlePopOverOpen4 = (event) => {
    setState((prevState) => ({ ...prevState, anchorEl4: event.currentTarget }));
  };
  const handlePopOverClose5 = () => {
    setState((prevState) => ({ ...prevState, anchorEl5: null }));
  };

  // Other handlePopOverClose functions...

  const handlePopOverOpen5 = (event) => {
    setState((prevState) => ({ ...prevState, anchorEl5: event.currentTarget }));
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await sendGraphQLQuery();
  //     console.log("user 1", response);
  //     setState((prevState) => ({
  //       ...prevState,
  //       categoryTagsInfo: response.data.tags.nodes,
  //     }));
  //     mapData();
  //   } catch (error) {
  //     console.error("user", error);
  //   }
  // };

  // Other handlePopOverOpen functions...
  const mapData = () => {
    const { originalData, customOrder } = state;
    console.log("user 1 data tem", categoryTags);

    const maData = customOrder
      .map((item) => {
        console.log("user 1 data tem", categoryTags);
        const dataItem = categoryTags?.find((originalItem) => originalItem.displayTitle === item);
        console.log("user 1 category tem dataItem", dataItem);

        return dataItem ? { ...dataItem } : null;
      })
      .filter(Boolean);
      console.log("user 1vvbm", maData, categoryTags);

    setState((prevState) => ({ ...prevState, mappedData: maData }));
  };

  

  // Other functions...

  const { classes, navItems, tags, headerType } = props;
  const { mappedData, mappedData2, anchorEl, anchorEl2, anchorEl3, anchorEl4, anchorEl5, categoryTagsInfo } = state;
  console.log("user 1 categoryTagsInfo", categoryTagsInfo);

  // Other component logic...
  const tagsData = categoryTags;

  return (
    <>
      <nav>
        <div className={headerType ? classNames(classes.light) : classNames(classes.dark)}>
          <Link
            href="/"
            onClick={() => {
              setselectedPage("/[lang]");
            }}
          >
            <span
              className={classes.headerHeadings}
              style={{
                marginBottom: "-4px",

                textDecorationColor: Router.pathname === "/[lang]" ? "#FDC114" : null,
                textDecorationThickness: Router.pathname === "/[lang]" ? "3px" : null, // Adjust the underline thickness
                textDecorationLine: Router.pathname === "/[lang]" ? "underline" : null, // Add an underline style for compatibility
              }}
            >
              Home
            </span>
          </Link>
            <Button
              onMouseEnter={handlePopOverOpen}
              onClick={handlePopOverOpen}
              aria-haspopup="true"
              // onMouseLeave={this.handlePopOverClose}
              className={classes.headerHeadings}
              style={{
                borderRadius:"18px",
                textDecorationColor:
                  Router.pathname === "/[lang]/categories/[tagId]" || Router.pathname === "/[lang]/explore"
                    ? "#FDC114"
                    : null,
                textDecorationThickness:
                  Router.pathname === "/[lang]/categories/[tagId]" || Router.pathname === "/[lang]/explore"
                    ? "3px"
                    : null, // Adjust the underline thickness
                textDecorationLine:
                  Router.pathname === "/[lang]/categories/[tagId]" || Router.pathname === "/[lang]/explore"
                    ? "underline"
                    : null, // Add an underline style for compatibility
              }}
            >
              Explore
            </Button>
            <Popover
              className={classes.popover}
              classes={{
                paper: classes.paper,
              }}
              anchorEl={anchorEl}
              transformOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
              anchorOrigin={{
                vertical: "center",
                horizontal: "center",
                marginTop: "50px",
              }}
              open={Boolean(anchorEl)}
              onClose={handlePopOverClose}
              style={{ marginTop: "100px" }}
              // onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Box sx={style}>
                <div className={classes.modalitems}>
                  <div className={classes.modalitemstitle}>
                    <a className={classes.categoryTagsLink}>
                      <span onClick={handlePopOverOpen3}>
                        <Typography variant="h6" className={classes.catgorytitle}>
                          Shop By Category
                          <IconButton style={{ padding:"0px"}}>
                            <PlayArrow style={{ color: "#FDC114", fontSize: "20px" }} />
                          </IconButton>
                        </Typography>
                      </span>

                      <Popover
                        className={classes.popover}
                        classes={{
                          paper: classes.paper,
                        }}
                        anchorEl={anchorEl3}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                          marginTop: "0px",
                        }}
                        open={Boolean(anchorEl3)}
                        onClose={handlePopOverClose3}
                        style={{ marginTop: "0" }}
                        // onClose={handlePopoverClose}
                        disableRestoreFocus
                      >
                        <Box sx={style2}>
                          <div className={classes.modalitems}>
                            <div className={classes.modalitemstitle}>
                              {console.log("user 1", mappedData)}
                              {mappedData?.map((itemtitle, i) => (
                                <a
                                  href={
                                    itemtitle.displayTitle === "Upcycled"
                                      ? `/en/tmucpage/${itemtitle._id}`
                                      : `/en/categories/${itemtitle._id}`
                                  }
                                  className={tagsData.length !== i + 1 ? classes.categoryTagsLink : ""}
                                >
                                  <Typography variant="h6" className={classes.catgorytitle}>
                                    {itemtitle.displayTitle}
                                  </Typography>
                                </a>
                              ))}
                            </div>
                          </div>
                        </Box>
                      </Popover>
                    </a>
                    <a className={classes.categoryTagsLink}>
                      <span onClick={handlePopOverOpen4}>
                        <Typography variant="h6" className={classes.catgorytitle} >
                          Shop By Wardrobe
                          <IconButton style={{ padding:"0px"}}>
                            <PlayArrow style={{ color: "#FDC114", fontSize: "20px" }} />
                          </IconButton>
                        </Typography>
                      </span>

                      <Popover
                        className={classes.popover}
                        classes={{
                          paper: classes.paper,
                        }}
                        anchorEl={anchorEl4}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                          marginTop: "0px",
                        }}
                        open={Boolean(anchorEl4)}
                        onClose={handlePopOverClose4}
                        style={{ marginTop: "0" }}
                        // onClose={handlePopoverClose}
                        disableRestoreFocus
                      >
                        <Box sx={style2}>
                          <div className={classes.modalitems}>
                            <div className={classes.modalitemstitle}>
                              {sellers?.map((item, i) => (
                                <a target="_blank" href={`/en/profile/${item?._id}`}>
                                  <Typography
                                    variant="h6"
                                    className={classes.catgorytitle}
                                    style={{ borderBottom: "1px solid #59595940" }}
                                  >
                                    {item?.storeName && item?.storeName.trim()
                                      ? item?.storeName.slice(0, 15)
                                      : "User Wardrobe"}
                                  </Typography>
                                </a>
                              ))}
                              <a target="_blank" href="/en/wardrobe">
                                <Typography
                                  variant="h6"
                                  className={classes.catgorytitle}
                                  style={{ borderBottom: "1px solid #59595940" }}
                                >
                                  See More
                                </Typography>
                              </a>
                            </div>
                          </div>
                        </Box>
                      </Popover>
                    </a>

                    <a className={classes.categoryTagsLink}>
                      <span onClick={handlePopOverOpen5}>
                        <Typography variant="h6" className={classes.catgorytitle}>
                          Shop By Brand
                          <IconButton style={{ padding:"0px", marginLeft:"30px"}}>
                            <PlayArrow style={{ color: "#FDC114", fontSize: "20px" }} />
                          </IconButton>
                        </Typography>
                      </span>

                      <Popover
                        className={classes.popover}
                        classes={{
                          paper: classes.paper,
                        }}
                        anchorEl={anchorEl5}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                          marginTop: "0px",
                        }}
                        open={Boolean(anchorEl5)}
                        onClose={handlePopOverClose5}
                        style={{ marginTop: "0" }}
                        // onClose={handlePopoverClose}
                        disableRestoreFocus
                      >
                        <Box sx={style2}>
                          <div className={classes.modalitems}>
                            <div className={classes.modalitemstitle}>
                              {brands?.map((item, i) => (
                                <a target="_blank" href={`/en/brand/${item?.slug}/${item?._id}`}>
                                  <Typography
                                    variant="h6"
                                    className={classes.catgorytitle}
                                    style={{ borderBottom: "1px solid #59595940" }}
                                  >
                                    {item?.displayTitle ? item?.displayTitle : "Brand"}
                                  </Typography>
                                </a>
                              ))}
                              <a target="_blank" href="/en/brands">
                                <Typography
                                  variant="h6"
                                  className={classes.catgorytitle}
                                  style={{ borderBottom: "1px solid #59595940" }}
                                >
                                  See More
                                </Typography>
                              </a>
                            </div>
                          </div>
                        </Box>
                      </Popover>
                    </a>
                  </div>
                </div>
              </Box>
            </Popover>
          {/* <span
            className="hoverable"
            style={{
              marginRight: "40px",
              padding: "9px 11px",
              marginLeft: "30px",
              fontSize: "18px",
              fontFamily: '"Ostrich Sans Black"',
              fontWeight: 900,
            }}
          >
            Byol
          </span> */}

          <a
            style={{
              color: "inherit",
            }}
            target="_blank"
            href="https://bizb.store/dashboard/uploadproductdetail"
          >
            <span className={classes.headerHeadings}>Upload Product</span>
          </a>
          {loading4 ? (
            <></>
          ) : (
            <>
              {props.viewer?.isSeller === true ? (
                <a
                  style={{
                    color: "inherit",
                  }}
                  target="_blank"
                  href="https://bizb.store/dashboard/home"
                >
                  <span className={classes.headerHeadings}>Dashboard</span>
                </a>
              ) : (
                <a
                  style={{
                    color: "inherit",
                  }}
                  target="_blank"
                  href="/en/SellerRegistrationPage"
                >
                  <span className={classes.headerHeadings}>Become a Seller</span>
                </a>
              )}
            </>
          )}
        </div>
      </nav>
    </>
  );
};

NavigationDesktop.propTypes = {
  classes: PropTypes.object,
  navItems: PropTypes.object,
  tags: PropTypes.arrayOf(),
  viewer: PropTypes.object,
};

NavigationDesktop.defaultProps = {
  classes: {},
  navItems: {},
  headerType: false,
  viewer: {},
};

export default withStyles(styles)(inject("navItems", "uiStore")(NavigationDesktop));
