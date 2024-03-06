import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SwiperCore, { Pagination, Autoplay, Navigation } from "swiper";
import ScrollingMessage from "../ScrollingMessage/ScrollingMessage";
import Caloborators from "../Calloborators/calloborators";
import TopSelling from "../TopSelling/topselling";
import { Link } from "react-scroll";
import dynamic from 'next/dynamic'
import Button from "@material-ui/core/Button";
import FeaturedIn from "../FeaturedSection/featuredIn";
import Head from "next/head";

const Preloved = dynamic(() => import("../Preloved/prelovedSec"))
const Appsec = dynamic(() => import("../Appsection/appsec"))
const Story = dynamic(() => import("../Stories/story"))
const Justin = dynamic(() => import("../Justin/justin"))
const Instagram = dynamic(() => import("../Instagram/instagram"))
const BizbCalloborators = dynamic(() => import("../BizbCalloborators/bcallobrators"))
const OurBlogs = dynamic(() => import("../Ourblogs/ourblog"))


// import('../components/A'))

const MainSlider = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const products = props?.catalogItems;
  SwiperCore.use([Autoplay, Pagination, Navigation]);
  // console.log(props, "new products");
  const useStyles = makeStyles((theme) => ({
    main: {
      marginTop: "25px",
    },
    root: {
      position: "relative",
    },
    image: {
      height: "100%",
      width: "100%",
      objectPosition: "top",
      objectFit: "cover",
    },

    controller: {
      position: "absolute",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      mixBlendMode: "pass-through",
      zIndex: 2,
      opacity: 1,
      width: "100%",
      bottom: "5px",
      height: "60px",
      [theme.breakpoints.down(900)]: {
        height: "20px",
        bottom: "20px",
        display:"none"

      },
    },
    controllert: {
      position: "absolute",
      display: "flex",
      flexDirection: "row",
      zIndex: 9998,
      // width: "300px",
      bottom: "40px",
      [theme.breakpoints.down(900)]: {
        top: "84%",
        left: "30%",
      },
    },
    text: {
      fontSize: "18px",
      color: "white",
      [theme.breakpoints.down(900)]: {
        fontSize: "12px",
        alignSelf: "center",
      },
    },
    sliderr: {
      display: "none",
      position: "relative",
      width: "100%",

      display: "block",
      position: "relative",
      width: "100%",
    },
    imagedesktop: {
      display: "block",
      [theme.breakpoints.up(900)]: {
        display: "none",
      },
    },
    swiperPagination: {
      "& .swiper-pagination": {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        marginLeft: "60px",
        justifyContent: "center",
        transition: "0.3s opacity",
        zIndex: 10,
      },
      "& .swiper-pagination-bullet": {
        width: "20px",
        marginTop: "12px",
        marginBottom: "12px",
        height: "20px",
        background: "none",
        color: "none",
        border: "1px solid black",
        opacity: 1,
        [theme.breakpoints.down("xs")]: {
          display: "none",
        },
        // Add spacing at the top
      },
      "& .swiper-pagination-bullet-active": {
        width: "20px",
        height: "20px",
        marginTop: "12px",
        marginBottom: "12px",
        transition: "width 0.5s",
        background: "black",
        opacity: 1,
      },
    },
    mobileima: {
      marginTop: theme.spacing(6),
      width: "100%",
    },
    promoBtn: {
      position: "absolute",
      display: "flex",
      zIndex: 9998,
      left: "72%",
      bottom: "88px",
      width: "13%",
      height: "48px",
      borderRadius: "8px",
      border: "none",
      textTransform: "uppercase",
      cursor: "pointer",
      // marginLeft: "10px",
      background: "white",
      "&:hover": {
        transform: "scale(1.08)",
        transition: "left 0.2s linear",
        background: "white",
      }
      , [theme.breakpoints.up(900)]: {
       bottom:"50px"
      },
      [theme.breakpoints.down(600)]: {
        bottom:"14px",
        left:"63%",
        width: "95px",
        height: "20px",
       }

    },
    text2: {
      color: "#a12e63",
      [theme.breakpoints.up("lg")]: {
        fontSize: "20px",

      },
      [theme.breakpoints.down(600)]: {
        fontSize: "10px",
      }

    }

  }));
  const ITEMS = [
    // {
    //   image: "/profile/newbanner.jpg",
    //   id: 1,
    // },
    {
      image: "/profile/seller2.jpg",
      id: 2,
    },
    {
      image: "/Desktop-images/desktop11.png",
      id: 3,
    },
    {
      image: "/Desktop-images/desktop2.webp",
      id: 4,
    },

    {
      image: "/Desktop-images/desktop4.jpg",
      id: 5,
    },
  ];

  // const [swiper, setSwiper] = useState(null);

  // const handleBooking = () => {
  //   console.log("here 2765")
  //   window.open('https://forms.gle/v2ZGPiPfxUd6xC2L8', '_blank');

  // }

  // const handleSwiper = (swiper) => {
  //   // Store the Swiper instance to access its methods
  //   setSwiper(swiper);
  // };

  // const renderButton = () => {
  //   // Check if the current slide index is 0 (first slide)
  //   if (swiper && swiper.activeIndex === 0) {
  //     return <Button
  //       className={classes.promoBtn}
  //       onClick={handleBooking}
  //     >
  //       <Typography className={classes.text2} >
  //         Book your slot now
  //       </Typography>
  //     </Button>;
  //   }
  //   return null;
  // };
  function Item({ item }) {
    const classes = useStyles();
    return (
      <>
        <SwiperSlide>
          <img src={item.image} className={classes.image} alt="image" />
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
  const classes = useStyles();
  return (
    <>
     <Head>
        <meta name="description" content="Product" />

        {/* Add JSON-LD script for Product schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org/",
              "@type": "WebSite",
              "name": "Bizb",
              "url": "https://bizb.store/en?",
            }
          `}
        </script>
      </Head>
      <div className={classes.main}>
        <div className={classes.root}>
          <div className={classes.sliderr}>
            <div className={classes.controller}>
              <div className={classes.controllert}>
                <Link to="target-element" smooth={true} duration={2000}>
                  {" "}
                  <div style={{ display: "flex", cursor: "pointer" }}>
                    <img style={{ marginRight: "12px" }} src="/icons/scrolltodiscovermore.webp" alt="icons" />
                    <Typography style={{ fontFamily: "Circular Std" }} className={classes.text}>
                      Scroll to discover more
                    </Typography>
                  </div>
                </Link>
              </div>
            </div>
            <Swiper
              // onSwiper={handleSwiper}
              onRealIndexChange={(element) => setActiveIndex(element.activeIndex)}
              autoplay={{
                delay: 2000,
              }}
              ref={sliderRef}
              // direction="vertical"
              modules={[Pagination, Autoplay, Navigation]}
              pagination={{ clickable: true }}
              className={classes.swiperPagination}
            >
              {ITEMS.map((item, index) => (

                <SwiperSlide key={index}>
                  {/* {renderButton()} */}
                  <Item item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* <div className={classes.imagedesktop}>
            <img src="/Desktop-images/mobile.webp" className={classes.mobileima} />
          </div> */}
        </div>
      </div>
      <Preloved {...props} />
      <Justin {...props} />
      <Story {...props} />
      <BizbCalloborators />
      <Appsec />
      {/* <Caloborators /> */}
      <OurBlogs />
      {/* <Instagram {...props} /> */}
      <FeaturedIn/>
    </>
  );
};
export default MainSlider;
