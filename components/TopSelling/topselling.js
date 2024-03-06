import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useCallback, useState } from "react";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
const TopSelling = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "30px",
    },
    gridroot: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      position: "relative",
      justifyContent: "center",
    },
    typography: {
      background: "#333333",
      opacity: "15%",
      height: "4px",

      width: "200px",
    },
    main: {
      margin: "3vh",
    },
    text: {
      position: "absolute",
      bottom: 60,
    },
    header: {
      height: "50px",
    },

    headermain: {
      display: "flex",
      justifyContent: "space-between",
    },
    image: {
      width: "290px",
      borderRadius: "10px",
    },
    size: {
      display: "flex",
      flexDirection: "row",
    },
    price: {
      marginLeft: "20px",
    },
    rootimg: {
      position: "relative",
    },
    cart: {
      height: "35px",
      width: "84px",
      borderRadius: "40px",
      background: "#FDC114",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      bottom: "15px",
      left: "10px",
      position: "absolute",
    },
    controller: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    iconforwad: {
      position: "absolute",
      bottom: "202px",
      right: "10px",
      background: "#333333",
      color: "FDC114",
      borderRadius: "4px",
      cursor: "pointer",
      zIndex: 1251,
    },
    iconback: {
      position: "absolute",
      bottom: "202px",
      left: "20px",
      borderRadius: "4px",
      color: "FDC114",
      background: "#333333",
      cursor: "pointer",
      zIndex: 1251,
    },

    title: {
      color: theme.palette.reaction.reactionBlue,
      marginRight: theme.spacing(),
      borderBottom: `solid 5px ${theme.palette.reaction.reactionBlue200}`,
    },
    box: {
      display: "flex",
      flexDirection: "column",
    },
    dark: {
      color: "#333333",
    },
  }));

  const itemData = [
    {
      image: "/justin/justin1.svg",
      id: 1,
      title: "floral shirt for ",
      size: "large",
    },
    {
      image: "/justin/justin2.svg",
      title: "Bag for sale",
      id: 2,
      size: "large",
    },
    {
      image: "/justin/justin3.svg",
      id: 3,
      title: "Heels for sale",
      size: "large",
    },
    {
      image: "/justin/justin4.svg",
      id: 4,
      title: "floral shirt for",
      size: "large",
    },
    {
      image: "/justin/justin1.svg",
      id: 5,
      title: "floral shirt for",
      size: "large",
    },
    {
      image: "/justin/justin2.svg",
      id: 6,
      title: "Bag for sale",
      size: "large",
    },
    {
      image: "/justin/justin3.svg",
      id: 7,
      title: "Heels for sale",
      size: "large",
    },
    {
      image: "/justin/justin4.svg",
      id: 8,
      title: "floral shirt for",
      size: "large",
    },
    {
      image: "/justin/justin1.svg",
      id: 9,
      title: "floral shirt for",
      size: "large",
    },
    {
      image: "/justin/justin2.svg",
      id: 10,
      title: "Bag for sale",
      size: "large",
    },
    {
      image: "/justin/justin3.svg",
      id: 11,
      title: "Heels for sale",
      size: "large",
    },
    {
      image: "/justin/justin4.svg",
      id: 12,
      title: "floral shirt for",
      size: "large",
    },
    {
      image: "/justin/justin1.svg",
      id: 13,
      title: "floral shirt for",
      size: "large",
    },
    {
      image: "/justin/justin2.svg",
      id: 14,
      title: "Bag for sale",
      size: "large",
      size: "large",
    },
    {
      image: "/justin/justin3.svg",
      id: 15,
      title: "Heels for sale",
      size: "large",
    },
    {
      image: "/justin/justin4.svg",
      id: 16,
      title: "floral shirt for",
      size: "large",
    },
  ];

  function Item({ item }) {
    const classes = useStyles();

    return (
      <>
        <div className={classes.rootimg}>
          <img component="img" alt="loading" src={item.image} className={classes.image} />
          <div className={classes.cart}>
            <img component="img" src="/icons/cart.svg" alt="icon"/>
            <Typography gutterBottom variant="h5" component="h2">
              + Cart{" "}
            </Typography>
          </div>
        </div>
        <Typography gutterBottom variant="h5" component="h2">
          {item.title}
        </Typography>
        <div className={classes.size}>
          <Typography gutterBottom variant="h4">
            size
          </Typography>
          <Typography gutterBottom variant="h4">{`:${item.size}`}</Typography>
        </div>

        <div className={classes.size}>
          {" "}
          <strike>Rs 600</strike>
          <Typography gutterBottom variant="h5" className={classes.price}>
            Rs 600
          </Typography>
        </div>
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

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Swiper
        ref={sliderRef}
        breakpoints={{
          1200: {
            width: 1200,
            slidesPerView: 4,
          },
          1000: {
            width: 1000,
            slidesPerView: 3,
          },

          800: {
            width: 800,
            slidesPerView: 2,
          },
          600: {
            width: 800,
            slidesPerView: 1,
          },
        }}
        onRealIndexChange={(element) => setActiveIndex(element.activeIndex)}
      >
        {" "}
        <div className={classes.controller}>
          {activeIndex - 0 ? (
            <ArrowBackIos className={classes.iconback} style={{ fill: "#FDC114" }} onClick={handlePrev} />
          ) : (
            ""
          )}
        </div>
        {itemData.map((item) => (
          <SwiperSlide key={item.id}>
            <Item item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      {activeIndex < itemData.length + 1 ? (
        <ArrowForwardIos className={classes.iconforwad} style={{ fill: "#FDC114" }} onClick={handleNext} />
      ) : (
        ""
      )}
    </div>
  );
};

export default TopSelling;
