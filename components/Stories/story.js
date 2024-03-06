import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useCallback, useState, useEffect } from "react";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import useGetAllSeller from "../../hooks/sellers/useGetAllSeller";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import useGetAllSellers from "../../hooks/sellerByID/useGetAllproductsbySeller";
import Storyslider from "./storiesslide";
import Tooltip from "@material-ui/core/Tooltip";
import { DoubleArrow } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";

const Story = (props) => {
  const { addItemsToCart } = props;
  // console.log("all props....", props);
  const [show, setShow] = useState(false);
  const [sellers, loading, refetch] = useGetAllSeller();
  const [sellerToGet, setSellerToGet] = useState(sellers ? sellers[1]?._id : "");
  const [intialvalues, setIntial] = useState(sellers ? sellers[1]?._id : "");
  const [sellerss, loadingSellerss, refetchSellerss] = useGetAllSellers(sellerToGet ? sellerToGet : intialvalues);

  // const { edges } = sellers?.sellerCatalogItems ?? {};
  // useEffect(() => {
  //   console.log("Sellers All", sellers);
  // }, [sellers]);
  const catagories = props?.nodes;
  const catgormobile = catagories?.slice(0, 3);
  const [activeIndex, setActiveIndex] = useState(0);
  const useStyles = makeStyles((theme) => ({
    image: {
      height: "100px",
      display: "flex",
      allignItems: "center",
      justifyContent: "center",
      objectFit: "contain",
      width: "100px",
      margin: "10px",
      borderRadius: "100%",
      transition: ".3s ease-in-out",
      "&:hover": {
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        transition: ".3s ease-in-out",
        margin: "0px",
        marginBottom: "10px",
        height: "110px",
        width: "110px",
      },
    },
    controller: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    iconforwad: {
      position: "absolute",
      bottom: "120px",
      right: "20px",
      height: "50px",
      width: "50px",
      padding: "18px",
      background: "#000000",
      color: "FDC114",
      borderRadius: "4px",
      cursor: "pointer",
      zIndex: 1251,
    },
    iconback: {
      position: "absolute",
      bottom: "120px",
      height: "50px",
      padding: "18px",
      width: "50px",
      left: "20px",
      borderRadius: "5px",
      color: "FDC114",
      background: "#000000",
      cursor: "pointer",
      zIndex: 1251,
    },
    catgorytag: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      marginTop: theme.spacing(3),
      [theme.breakpoints.down(700)]: {
        display: "none",
        marginTop: theme.spacing(0),
      },
    },
    catgorytagm: {
      display: "none",
      [theme.breakpoints.down(700)]: {
        display: "flex",
        flexDirection: "row",
        marginTop: theme.spacing(3),
      },
    },
    title: {
      color: theme.palette.reaction.reactionBlue,
      marginRight: theme.spacing(),
      borderBottom: `solid 5px ${theme.palette.reaction.reactionBlue200}`,
    },
    box: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      width: "100%",
    },
    catagoriesinactive: {
      color: "#000000",
      cursor: "pointer",
      fontSize: "1.4rem",
      marginRight: "36px",
    },
    catagoriesactive: {
      color: "#000000",
      fontSize: "1.4rem",
      display: "inline-block",
      marginRight: "36px",
      position: "relative",
      textDecoration: "none",
      "&::before": {
        content: '""',
        position: "absolute",
        left: 0,
        bottom: "-5px",
        width: "100%",
        height: "5px",
        backgroundColor: "#FDC114",
      },
      "&:hover": {
        color: "#000000",
      },
    },
    dark: {
      color: "#333333",
    },
    main: {
      backgroundColor: "rgba(156, 156, 156, 0.1)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
    },
    root: {
      background: theme.palette.reaction.gradient,
      marginTop: "30px",

      display: "flex",
      justifyContent: "center",
      width: "90%",
    },
    mainheading: {
      display: "flex",
      marginTop: "40px",
      justifyContent: "center",
      position: "relative",
      marginLeft:"25%",
      [theme.breakpoints.down(600)]: {
        marginLeft:"0px",
      },
      width: "100%",
      marginBottom:"15px"
    },
    mainheading2: {
      display: "flex",
      marginTop: "40px",
      justifyContent: "center",
      position: "relative",
      marginBottom:"15px",
      width: "37%",
      [theme.breakpoints.down(600)]: {
        width: "100%",

      },
      fontSize:"22px"
    },
     linkstyle: {  
      width:"50%",
      display:"flex",
      justifyContent:"end",
      [theme.breakpoints.down(600)]: {
        justifyContent:"center",
      width:"100%",


      },
      margin: "0",
      padding:"0",
      cursor:"pointer"
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
      flexDirection: "row",
      position: "relative",
      allignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    heading: {
      display: "flex",
      justifyContent: "center",
      allignItems: "center",
      marginTop: theme.spacing(2),
    },
    storeName: {
      color: "black",
    },
  }));
  const ITEMS = [
    {
      image: "/stories/story.svg",
      id: 1,
      title: "Charizma Store",
      Catagory: "Juniors",
      store: "Charizma Store",
    },
    {
      image: "/stories/story1.svg",
      id: 2,
      title: "Charizma Store",
      Catagory: "Juniors",
      store: "Westrn",
    },
    {
      image: "/images/seller-placeholder.png",
      id: 3,
      title: "Charizma Store",
      Catagory: "Casuals",
      store: "Charizma Store",
    },
    {
      image: "/stories/story.svg",
      id: 4,
      title: "Charizma store",
      Catagory: "Party Wear",
      store: "Charizma Store",
    },
    {
      image: "/stories/story.svg",
      id: 5,
      title: "Charizma Store",
      Catagory: "Shoes",
      store: "Charizma Store",
    },
    {
      image: "/images/seller-placeholder.png",
      id: 6,
      title: "Charizma Store",
      Catagory: "Accessories",
      store: "Charizma Store",
    },
    {
      image: "/images/seller-placeholder.png",
      id: 7,
      title: "Westrn",
      Catagory: "Western",
      store: "Charizma Store",
    },
    {
      image: "/stories/story.svg",
      id: 8,
      title: "Westrn",
      Catagory: "Western",
      store: "Charizma Store",
    },
    {
      image: "/stories/story.svg",
      id: 9,
      title: "Charizma Store",
      Catagory: "Western",
      store: "Western",
    },
    {
      image: "/images/seller-placeholder.png",
      id: 10,
      title: "Western",
      store: "Western",
      Catagory: "Westrn",
    },
  ];
  const itemData = [
    {
      image: "/justin/justin1.svg",
      store: "Westrn",
      id: 1,
      title: "new",

      size: "large",
    },
    {
      image: "/justin/justin2.svg",
      title: "jwellry",
      store: "Westrn",
      id: 2,
      size: "large",
    },
    {
      image: "/justin/justin3.svg",
      id: 3,
      title: "Heels for sale",
      store: "Charizma Store",
      size: "large",
    },
    {
      image: "/justin/justin4.svg",
      id: 4,
      title: "floral shirt for",
      store: "Charizma Store",
      size: "large",
    },
    {
      image: "/justin/justin1.svg",
      id: 5,
      title: "floral shirt for",
      store: "Charizma Store",
      size: "large",
    },
    {
      image: "/justin/justin2.svg",
      id: 6,
      title: "Bag for sale",
      store: "Charizma Store",
      size: "large",
    },
    {
      image: "/justin/justin3.svg",
      id: 7,
      title: "Heels for sale",
      store: "Charizma Store",
      size: "large",
    },
    {
      image: "/justin/justin4.svg",
      id: 8,
      title: "floral shirt for",
      store: "Charizma Store",
      size: "large",
    },
    {
      image: "/justin/justin1.svg",
      id: 9,
      title: "floral shirt for",
      size: "large",
      store: "Charizma Store",
    },
    {
      image: "/justin/justin2.svg",
      id: 10,
      title: "Bag for sale",
      store: "Charizma Store",
      size: "large",
    },
    {
      image: "/justin/justin3.svg",
      id: 11,
      title: "Heels for sale",
      store: "Westrn",
      size: "large",
    },
    {
      image: "/justin/justin4.svg",
      id: 12,
      title: "floral shirt for",
      store: "Westrn",
      size: "large",
    },
    {
      image: "/justin/justin1.svg",
      store: "Westrn",
      id: 13,
      title: "floral shirt for",
      size: "large",
    },
    //   {
    //     image: '/justin/justin2.svg',
    //  id:14,
    //  title:"Bag for sale",
    //  store:"Westrn",
    //  size:"large",
    //  size:"large"
    //   },
    //   {
    //     image: '/justin/justin3.svg',
    //  id:15,
    //  title:"Heels for sale",

    //  store:"Westrn",
    //  size:"large"
    //   },
    //   {
    //     image: '/justin/justin4.svg',
    //  id:16,
    //  title:"floral shirt for",
    //  store:"Westrn",
    //  size:"large"
    //   },
  ];

  function Filter({ name, onClick, active }) {
    // console.log(active, "name");
    return (
      <Typography
        onClick={onClick}
        variant="h4"
        className={active ? classes.catagoriesactive : classes.catagoriesinactive}
      >
        {name}
      </Typography>
    );
  }

  const [resouce, setResource] = useState("OUR PRODUCTS");
  const [filter, setFilter] = useState(catagories?.[0]?.displayTitle || catgormobile?.[0]?.displayTitle);
  const [filterproducts, setFilterProducts] = useState(null);
  const filteredItems = !filter ? ITEMS : ITEMS.filter((item) => item.Catagory.includes(filter));
  const filteredproducts = !filterproducts ? itemData : itemData.filter((item) => item.store.includes(filterproducts));
  // console.log(filteredItems, "dddddddddddddddddddddd");
  function Item({ item, active }) {
    const classes = useStyles();
    return (
      <>
        <SwiperSlide>
          <Tooltip disableFocusListener disableTouchListener title="Please click to display items in store">
            <div className={classes.box}>
              <img
                src={!item?.picture || !item?.picture ? "/images/seller-placeholder.png" : item?.picture}
                className={classes.image}
                alt="icon"
              />
              <Typography
                style={{
                  textAlign: "center",
                  marginBottom: "40px",
                  marginTop: "10px",
                  color: "#000000",
                  cursor: "pointer",
                }}
                variant="h5"
                // className={active ? classes.catagoriesactive : classes.catagoriesinactive}
              >
                {item.storeName}
              </Typography>
            </div>
          </Tooltip>
        </SwiperSlide>
      </>
    );
  }

  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);
  useEffect(() => {
    // if (!sellers) {
    //   refetch();
    // }
    refetchSellerss();
    setIntial(sellers ? sellers[1]?._id : "");
    //  console.log("data in sellerss bhjjknkn", sellers);
  }, [sellerToGet, intialvalues]);

  const classes = useStyles();
  return (
    <div className={classes.main}>
      <div className={classes.mainheadings}>
        <Typography variant="h3" className={classes.mainheading}>
          WARDROBES <span className={classes.spanline}></span>
        </Typography>
        
        <Hidden smDown>
          <a target="_blank" href="/en/wardrobe" className={classes.linkstyle}>
        <Typography variant="h3" className={classes.mainheading2}>
          VIEW ALL    
                <DoubleArrow style={{ marginTop:"5px",color: "#FDC114" }} />
              
        </Typography>
        </a>
        </Hidden>
        {/* <div className={classes.catgorytag}>
          {catagories?.slice(0, 6)?.map((filterName) => (
            <Filter
              name={filterName.displayTitle}
              onClick={() => setFilter(filterName.displayTitle) + setResource(filterName.displayTitle)}
              active={filterName.displayTitle === filter}
            />
          ))}
        </div> */}
      </div>

      {/* <div className={classes.mainheadings}>
        <Swiper
          spaceBetween={0}
          ref={sliderRef}
          className={classes.root}
          breakpoints={{
            1600: {
              slidesPerView: 7,
            },
            1200: {
              slidesPerView: 6,
            },
            1000: {
              slidesPerView: 5,
            },
            800: {
              slidesPerView: 4,
            },
            600: {
              slidesPerView: 3,
            },
            400: {
              slidesPerView: 2,
            },
          }}
          onRealIndexChange={(element) => setActiveIndex(element.activeIndex)}
        >
          {sellers?.map((item) => (
            <SwiperSlide
              key={item.id}
              onClick={() => {
                setSellerToGet(item?._id);
                setShow(true);
              }}
              active={item.store === filterproducts}
            >
              <Item item={item} active={item.storeName === filterproducts} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={classes.controller}>
          {activeIndex < ITEMS.length - 1 ? (
            <ArrowForwardIos className={classes.iconforwad} style={{ fill: "#FDC114" }} onClick={handleNext} />
          ) : (
            ""
          )}
          {activeIndex && sellers.length - 0 ? (
            <ArrowBackIos className={classes.iconback} style={{ fill: "#FDC114" }} onClick={handlePrev} />
          ) : (
            ""
          )}
        </div>
      </div> */}
      <Storyslider
        show={show}
        storeId={sellerToGet}
        sellerss={sellerss}
        cart={props?.cart}
        addItemsToCart={addItemsToCart}
      />
      <Hidden smUp>
      <a target="_blank" href="/en/wardrobe" className={classes.linkstyle}>

      <Typography variant="h3" className={classes.mainheading2}>
          VIEW ALL    
        <DoubleArrow style={{ marginTop:"5px",color: "#FDC114" }} />
              
        </Typography>
        </a>
        </Hidden>
    </div>
  );
};

export default Story;
