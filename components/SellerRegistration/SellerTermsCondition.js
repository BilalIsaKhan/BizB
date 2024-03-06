import * as React from "react";
import { Box, Divider, Typography, Button, Modal, FormControl, TextField, CircularProgress } from "@material-ui/core";
import { withApollo } from "lib/apollo/withApollo";
import { makeStyles } from "@material-ui/core/styles";

const SellerTermsCondition = () => {
  const useStyles = makeStyles((theme) => ({
    styleofdiv: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },
    styleofdiv2: {
      display: "flex",
      width: "100%",
      marginLeft: "2%",
      flexDirection: "row",
      justifyContent: "start",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    styleofdiv3: {
      display: "flex",
      width: "20%",
      justifyContent: "start",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    styleofdiv4: {
      width: "97%",
    },
    text1: {
      fontWeight: "700",
      fontSize: "22px",
      margin: 10,
      textAlign: "start",
      [theme.breakpoints.down("sm")]: {
        fontSize: "19px",
      },
    },
    text2: {
      fontWeight: "500",
      fontSize: "21px",
      margin: 10,
      textAlign: "start",
      [theme.breakpoints.down("sm")]: {
        fontSize: "17px",
      },
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <div className={classes.styleofdiv}>
        <Typography
          variant="body2"
          style={{
            fontWeight: "700",
            fontSize: "27px",
            margin: 9,
          }}
        >
          Seller Term & Condition
        </Typography>
      </div>
      <div className={classes.styleofdiv}>
        <Typography
          variant="body2"
          style={{
            fontWeight: "500",
            fontSize: "21px",
            margin: 9,
          }}
        >
          Welcome to Bizb!
        </Typography>
      </div>
      <div className={classes.styleofdiv2}>
        <Typography variant="body2" className={classes.text2}>
          By becoming a seller on BizB, you agree to the following terms and conditions:
        </Typography>
      </div>
      <div className={classes.styleofdiv4}>
        <div className={classes.styleofdiv2}>
          <div className={classes.styleofdiv3}>
            <Typography variant="body2" className={classes.text1} textAlign="left">
              1. Exclusive Listing:
            </Typography>
          </div>
          <Typography variant="body2" className={classes.text2} textAlign="left">
            Once the availability of an item is confirmed for sale on BizB, the seller agrees not to sell the same item
            elsewhere.{" "}
          </Typography>
        </div>
        <div className={classes.styleofdiv2}>
          <div className={classes.styleofdiv3}>
            <Typography variant="body2" className={classes.text1}>
              2. Commission:
            </Typography>
          </div>
          <Typography variant="body2" className={classes.text2}>
            Creating an account and listing products on BizB is free. However, upon a successful sale, BizB will deduct
            a 20% commission from the final selling price.
          </Typography>
        </div>
        <div className={classes.styleofdiv2}>
          <div className={classes.styleofdiv3}>
            <Typography variant="body2" className={classes.text1} textAlign="left">
              3. Quality Assurance:
            </Typography>
          </div>
          <Typography variant="body2" className={classes.text2} textAlign="left">
            Sellers are expected to provide quality products. If a seller receives more than 3 instances of defective
            items reported by buyers, the seller may be <br /> blacklisted from using the platform.
          </Typography>
        </div>
        <div className={classes.styleofdiv2}>
          <div className={classes.styleofdiv3}>
            <Typography variant="body2" className={classes.text1}>
              4. Payment Processing:{" "}
            </Typography>
          </div>
          <Typography variant="body2" className={classes.text2}>
            Payments for sold items will be processed within 5 working days from the date of successful delivery to the
            end customer.
          </Typography>
        </div>
        <div className={classes.styleofdiv2}>
          <div className={classes.styleofdiv3}>
            <Typography variant="body2" className={classes.text1}>
              5. Accurate Listing:{" "}
            </Typography>
          </div>
          <Typography variant="body2" className={classes.text2}>
            Sellers are responsible for maintaining accurate and up-to-date listing information. If a product becomes
            unavailable or is sold elsewhere, <br />
            it is mandatory to update the status on the website. Misleading information may result in blacklisting after
            3 instances.{" "}
          </Typography>
        </div>
        <div className={classes.styleofdiv2}>
          <div className={classes.styleofdiv3}>
            <Typography variant="body2" className={classes.text1}>
              6. Returns Management:{" "}
            </Typography>
          </div>
          <Typography variant="body2" className={classes.text2}>
            In case of buyer-initiated returns, sellers have the option to request BizB to hold the returned item and
            attempt to resell it. BizB
            <br /> will keep the inventory for 1 month, after which, if not sold, the item will be returned to the
            seller and the seller will be liable to pay a discounted delivery fee.{" "}
          </Typography>
        </div>
        <div className={classes.styleofdiv2}>
          <Typography variant="body2" className={classes.text2}>
            Please review these terms carefully before listing your products on BizB. Your compliance with these terms
            ensures a smooth and mutually beneficial partnership. Failure to adhere to these terms may result in
            penalties or suspension from using the platform.{" "}
          </Typography>
        </div>
        <div className={classes.styleofdiv2}>
          <Typography variant="body2" className={classes.text2}>
            By proceeding to list items on BizB, you acknowledge that you have read, understood, and agreed to these
            terms and conditions.
          </Typography>
        </div>
      </div>
    </div>
  );
};
export default withApollo()(SellerTermsCondition);
