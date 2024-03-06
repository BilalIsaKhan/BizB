import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useCallback, useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import SwiperCore, { Autoplay } from "swiper";
import useGetAllSeller from "../../hooks/sellers/useGetAllSeller";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
const Caloborators = () => {
  const [sellers, loading, refetch] = useGetAllSeller();
  const [activeIndex, setActiveIndex] = useState(0);

  SwiperCore.use([Autoplay]);
  const useStyles = makeStyles((theme) => ({
    main: {
      backgroundColor: "rgba(156, 156, 156, 0.1)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
      marginBottom: "0px",
      marginTop: "100px",
      width: "100%",
    },
    root: {
      marginTop: "40px",
      marginBottom: "60px",
      display: "flex",
      justifyContent: "center",
      allignItems: "center",
      width: "80%",
    },
    image: {
      height: "100px",
      display: "flex",
      allignItems: "center",
      justifyContent: "center",
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
      bottom: "140px",
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
      bottom: "140px",
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

    title: {
      color: theme.palette.reaction.reactionBlue,
      marginRight: theme.spacing(),
      borderBottom: `solid 5px ${theme.palette.reaction.reactionBlue200}`,
    },
    box: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "start",
      width: "100%",
    },
    dark: {
      color: "#333333",
    },

    mainheading: {
      display: "flex",
      marginTop: "60px",
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
    heading: {
      display: "flex",
      justifyContent: "center",
      allignItems: "center",
      marginTop: theme.spacing(2),
    },
    swiperslide: {
      display: "flex",
      allignItems: "center",
      justifyContent: "center",
    },
  }));

  function Item({ item }) {
    const classes = useStyles();
    return (
      <>
        <SwiperSlide>
          <div className={classes.box}>
            <img
              src={!item?.picture || !item?.picture ? "/images/seller-placeholder.png" : item?.picture}
              className={classes.image}
              alt="icons"
            />
            <Typography style={{ textAlign: "center", marginBottom: "20px", marginTop: "10px" }} variant="h5">
              {item.storeName}
            </Typography>
          </div>
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
  //  console.log("active index is ", activeIndex);
  //  console.log("active index sellerlength", sellers?.length);
  const lastIndex = sellers?.length - 1;

  const classes = useStyles();
  return (
    <div className={classes.main}>
      <div className={classes.mainheadings}>
        <Typography variant="h3" className={classes.mainheading}>
          our collaborators <span className={classes.spanline}></span>
        </Typography>
      </div>

      <div>
        <Swiper
          ref={sliderRef}
          autoplay={{ delay: 3000 }}
          className={classes.root}
          loop={false}
          breakpoints={{
            1600: {
              slidesPerView: 9,
            },
            1200: {
              slidesPerView: 9,
            },
            1000: {
              width: 1000,
              slidesPerView: 6,
            },

            800: {
              width: 800,
              slidesPerView: 5,
            },
            600: {
              width: 800,
              slidesPerView: 4,
            },
            400: {
              width: 800,
              slidesPerView: 3,
            },
          }}
          onRealIndexChange={(element) => setActiveIndex(element.activeIndex)}
        >
          {sellers?.map((item) => (
            <SwiperSlide key={item.id} className={classes.swiperslide}>
              <Item item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={classes.controller}>
          {lastIndex && (
            <ArrowForwardIos className={classes.iconforwad} style={{ fill: "#FDC114" }} onClick={handleNext} />
          )}

          {activeIndex - 0 ? (
            <ArrowBackIos className={classes.iconback} style={{ fill: "#FDC114" }} onClick={handlePrev} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Caloborators;
