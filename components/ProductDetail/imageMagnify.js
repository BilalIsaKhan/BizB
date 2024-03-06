// import React, { useState } from "react";
// import Slider from "@material-ui/core/Slider";
// import Drawer from "@material-ui/core/Drawer";

// import { makeStyles } from "@material-ui/core/styles";
// import { Typography, Button } from "@material-ui/core";
// import Grid from "@mui/material/Grid";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { width } from "@mui/system";

// const useStyles = makeStyles((theme) => ({
//   dropdownicon: {
//     color: "#000000",
//     marginLeft: "5px",
//   },
//   resetbutton: {
//     width: "73px",
//     height: "32px",
//     borderRadius: "40px",
//     fontSize: "18px",
//     lineHeight: "22px",
//     color: "#333333",
//     border: "none",
//     font: "Ostrich Sans",
//     fontStyle: "normal",
//     fontWeight: 900,
//     display: "flex",
//     marginTop: theme.spacing(4),
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: "30px",
//   },
//   register: {
//     width: "73px",
//     height: "32px",
//     borderRadius: "40px",
//     fontSize: "18px",
//     lineHeight: "22px",
//     color: "#333333",
//     border: "none",
//     font: "Ostrich Sans",
//     fontStyle: "normal",
//     fontWeight: 900,
//     display: "flex",
//     marginTop: theme.spacing(4),
//     justifyContent: "center",
//     alignItems: "center",
//     background: "#FDC114",
//     "&:hover": {
//       background: "#FDC114",
//     },
//   },
//   dropdowntext: {
//     color: "#000000",
//   },
//   dropdowntextactive: {
//     color: "#FDC114",
//   },
//   dropdowniconactive: {
//     color: "#FDC114",
//     textAlign: "center",
//     marginLeft: "5px",
//   },
//   filterFooter: {
//     display: "flex",
//     borderTop: "1px solid #000000",
//     height: "63px",
//     position: "absolute",
//     bottom: "0px",
//     width: "100%",
//     alignItems: "flex-end",
//     justifyContent: "space-between",
//     border: "1px solid opacity:#000000",
//     marginLeft: "20px",
//   },
//   filterFooterproduct: {
//     display: "flex",
//     flexDirection: "column",
//     textAlign: "center",
//   },
//   buttonresetdone: {
//     display: "flex",
//     flexDirection: "row",
//     marginRight: "50px",
//   },
//   color: {
//     width: "100%",
//     padding: "10px",
//     display: "flex",
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   colors: {
//     display: "flex",
//     alignItems: "center",
//     flexDirection: "column",
//   },
//   colorimage: {
//     display: "flex",
//     flexDirection: "row",

//     border: "1px solid #9E9E9E",
//     marginLeft: "20px",
//     marginTop: "10px",
//     fontFamily: "Lato",
//     fontStyle: "normal",
//     borderRadius: "6px",

//     justifyContent: "center",
//     alignItems: "center",
//     fontWeight: 400,
//     fontSize: "16px",
//     lineHeight: "19px",
//     textTransform: "capitalize",
//     letterSpacin: "0.05em",
//     paddingLeft: "8px",
//     paddingRight: "8px",
//     paddingTop: "5px",
//     paddingBottom: "5px",
//     width: "auto",

//     color: "#000000",
//     "&:hover": {
//       border: "1px solid #FDC114",
//     },
//   },
//   colorimageactive: {
//     border: "1px solid #FDC114",
//   },
//   // color: {
//   //   border: state.isFocused ? "1px solid #FDC114" : "1px solid #9E9E9E",
//   //   display: "flex",
//   //   flexDirection: "row",
//   //   marginLeft: "20px",
//   //   marginTop: "10px",
//   //   fontFamily: "Lato",
//   //   fontStyle: "normal",
//   //   borderRadius: "6px",
//   //   display: "flex",
//   //   justifyContent: "center",
//   //   alignItems: "center",
//   //   fontWeight: state.isFocused ? 400 : 400,
//   //   fontSize: "16px",
//   //   lineHeight: "19px",
//   //   textTransform: "capitalize",
//   //   letterSpacin: "0.05em",
//   //   paddingLeft: "8px",
//   //   paddingRight: "8px",
//   //   paddingTop: "5px",
//   //   paddingBottom: "5px",
//   //   width: "auto",
//   //   borderBottom: state.isFocused ? "1px solid #FDC114" : "1px solid #9E9E9E",
//   //   color: state.isFocused ? "#000000" : "#989898",
//   //   "&:hover": {
//   //     color: "#000000",
//   //   },
// }));
// const App = () => {
//   const Colors = [
//     {
//       image: "/colors/black.svg",
//       id: 1,
//       title: "Black",
//     },
//     {
//       image: "/colors/blue.svg",
//       id: 2,
//       title: "Blue",
//     },
//     {
//       image: "/colors/green.svg",
//       id: 3,
//       title: "Green",
//     },
//     {
//       image: "/colors/red.svg",
//       id: 4,
//       title: "Red",
//     },
//     {
//       image: "/colors/yellow.svg",
//       id: 5,
//       title: "Yellow",
//     },
//     {
//       image: "/colors/orange.svg",
//       id: 6,
//       title: "Orange",
//     },
//   ];
//   const Size = [{ value: "Medium" }, { value: "Medium" }, { value: "Large" }, { value: "Extra-Large" }];

//   const [price, setPrice] = React.useState(["", 5000]);
//   const [state, setState] = React.useState(false);
//   const [color, setColor] = React.useState("Colors");
//   const [size, setSize] = React.useState("Size");
//   const [colorstate, setColorState] = React.useState(false);
//   // const [sizestate, setSizeState] = React.useState(false);
//   const classes = useStyles();

//   const priceHandler = (event, newPrice) => {
//     setPrice(newPrice);
//   };
//   const resetPrice = (event, newPrice) => {
//     setPrice(["", 5000]);
//   };

//   const toggleDrawer = (anchor, open) => (event) => {
//     setState(!state);
//     setColorState(false);
//   };
//   const toggleDrawersize = (anchor, open) => (event) => {
//     setColorState(!colorstate);
//     setState(false);
//   };
//   console.log(Colors);
//   return (
//     <>
//       <Grid container>
//         <Grid item xs={3} sm={3} md={3}>
//           {["left"].map((anchor) => (
//             <>
//               <Typography
//                 className={state || (!state && price[0] > 1) ? classes.dropdowntextactive : classes.dropdowntext}
//                 onClick={toggleDrawer(anchor, true)}
//               >
//                 {state || (!state && price[0] > 1) ? `${price[0]},${price[1]}` : "Price Range"}
//                 <span className={state || (!state && price[0] > 1) ? classes.dropdowniconactive : classes.dropdownicon}>
//                   <ExpandMoreIcon />
//                 </span>
//               </Typography>
//               <Drawer
//                 anchor="left"
//                 open={state}
//                 onClose={toggleDrawer()}
//                 variant="persistent"
//                 PaperProps={{
//                   style: {
//                     height: "191px",
//                     overflow: "auto",
//                     marginTop: "30px",
//                     width: "100%",

//                     overflowX: "hidden", // Add this line to remove bottom scroll
//                   },
//                 }}
//               >
//                 <div className={classes.slidervalue}>
//                   <Slider
//                     value={price}
//                     onChange={priceHandler}
//                     aria-labelledby="range-slider"
//                     min={0}
//                     max={5000}
//                     className={classes.slider}
//                     valueLabelDisplay="auto"
//                   />
//                 </div>
//                 <div className={classes.filterFooter}>
//                   <div className={classes.filterFooterproduct}>
//                     <Typography>25</Typography>
//                     <Typography>Products</Typography>
//                   </div>
//                   <div className={classes.buttonresetdone}>
//                     <Typography className={classes.resetbutton} onClick={() => resetPrice()}>
//                       Reset
//                     </Typography>
//                     <Button
//                       className={classes.register}
//                       InputProps={{ disableUnderline: true }}
//                       variant="h5"
//                       role="button"
//                       type="submit"
//                       onClick={toggleDrawer()}
//                     >
//                       Done
//                     </Button>
//                   </div>
//                 </div>
//               </Drawer>
//             </>
//           ))}
//         </Grid>
//         {/* {/* <Grid item xs={3} sm={3} md={3}>
//           {["left"].map((anchor) => (
//             <>
//               {" "}
//               <Typography
//                 className={
//                   state ? classes.dropdowntextactive : classes.dropdowntext
//                 }
//                 onClick={toggleDrawer(anchor, true)}
//               >
//                 <div style={{ display: "flex", alignItems: "center" }}>
//                   <span>
//                     {state && price[0] > 1
//                       ? `${price[0]},${price[1]}`
//                       : "Price Range"}
//                   </span>
//                   <span
//                     className={
//                       state ? classes.dropdowniconactive : classes.dropdownicon
//                     }
//                     style={{ display: "flex", alignItems: "center" }}
//                   >
//                     <ExpandMoreIcon />
//                   </span>
//                 </div>
//               </Typography>
//               <Drawer
//                 anchor="left"
//                 open={state}
//                 onClose={toggleDrawer()}
//                 variant="persistent"
//                 PaperProps={{
//                   style: {
//                     height: "191px",
//                     overflow: "auto",
//                     marginTop: "30px",
//                     width: "100%",

//                     overflowX: "hidden", // Add this line to remove bottom scroll
//                   },
//                 }}
//               >
//                 <div className={classes.slidervalue}>
//                   <Slider
//                     value={price}
//                     onChange={priceHandler}
//                     aria-labelledby="range-slider"
//                     min={0}
//                     max={5000}
//                     className={classes.slider}
//                     valueLabelDisplay="auto"
//                   />
//                 </div>
//                 <div className={classes.filterFooter}>
//                   <div className={classes.filterFooterproduct}>
//                     <Typography>25</Typography>
//                     <Typography>Products</Typography>
//                   </div>
//                   <Typography></Typography>
//                 </div>
//               </Drawer>
//             </>
//           ))}
//         </Grid>
//         <Grid item xs={3} sm={3} md={3}>
//           {["left"].map((anchor) => (
//             <>
//               <Typography
//                 className={
//                   state ? classes.dropdowntextactive : classes.dropdowntext
//                 }
//                 onClick={toggleDrawer(anchor, true)}
//               >
//                 {state && price[0] > 1
//                   ? `${price[0]},${price[1]}`
//                   : "Price Range"}
//                 <span
//                   className={
//                     state ? classes.dropdowniconactive : classes.dropdownicon
//                   }
//                 >
//                   <ExpandMoreIcon />
//                 </span>
//               </Typography>
//               <Drawer
//                 anchor="left"
//                 open={state}
//                 onClose={toggleDrawer()}
//                 variant="persistent"
//                 PaperProps={{
//                   style: {
//                     height: "191px",
//                     overflow: "auto",
//                     marginTop: "30px",
//                     width: "100%",

//                     overflowX: "hidden", // Add this line to remove bottom scroll
//                   },
//                 }}
//               >
//                 <div className={classes.slidervalue}>
//                   <Slider
//                     value={price}
//                     onChange={priceHandler}
//                     aria-labelledby="range-slider"
//                     min={0}
//                     max={5000}
//                     className={classes.slider}
//                     valueLabelDisplay="auto"
//                   />
//                 </div>
//                 <div className={classes.filterFooter}>
//                   <div className={classes.filterFooterproduct}>
//                     <Typography>25</Typography>
//                     <Typography>Products</Typography>
//                   </div>
//                   <Typography></Typography>
//                 </div>
//               </Drawer>
//             </>
//           ))}
//         </Grid> */}
//         */}
//         <Grid item xs={3} sm={3} md={3}>
//           {["right"].map((anchor) => (
//             <>
//               <Typography
//                 className={colorstate ? classes.dropdowntextactive : classes.dropdowntext}
//                 onClick={toggleDrawersize()}
//               >
//                 {colorstate || !colorstate ? `${color}}` : "Price Range"}

//                 <span className={colorstate ? classes.dropdowniconactive : classes.dropdownicon}>
//                   <ExpandMoreIcon />
//                 </span>
//               </Typography>
//               <Drawer
//                 anchor="left"
//                 open={colorstate}
//                 onClose={toggleDrawersize()}
//                 variant="persistent"
//                 PaperProps={{
//                   style: {
//                     height: "191px",
//                     overflow: "auto",
//                     marginTop: "30px",
//                     width: "100%",

//                     overflowX: "hidden", // Add this line to remove bottom scroll
//                   },
//                 }}
//               >
//                 <div className={classes.color}>
//                   {Colors.map((item) => (
//                     <>
//                       <div className={classes.colors}>
//                         <div
//                           className={colorstate ? classes.colorimage : classes.colorimageactive}
//                           value={color}
//                           onClick={() => setColor(item.title)}
//                         >
//                           <img src={item.image} />
//                           <Typography>{item.title} </Typography>
//                         </div>
//                       </div>
//                     </>
//                   ))}
//                 </div>
//                 <div className={classes.filterFooter}>
//                   <div className={classes.filterFooterproduct}>
//                     <Typography>25</Typography>
//                     <Typography>Products</Typography>
//                   </div>
//                   <div className={classes.buttonresetdone}>
//                     <Typography className={classes.resetbutton} onClick={() => setColor("Colors")}>
//                       Reset
//                     </Typography>
//                     <Button
//                       className={classes.register}
//                       InputProps={{ disableUnderline: true }}
//                       variant="h5"
//                       role="button"
//                       type="submit"
//                       onClick={toggleDrawersize()}
//                     >
//                       Done
//                     </Button>
//                   </div>
//                 </div>
//               </Drawer>
//             </>
//           ))}
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default App;
