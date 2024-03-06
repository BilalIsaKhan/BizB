import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Grid, Button, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PageLoading from "components/PageLoading";
import Layout from "components/Layout";
import withOrder from "containers/order/withOrder";
import Rating from "@material-ui/lab/Rating";
import OrderCard from "components/OrderCard";
import { withApollo } from "lib/apollo/withApollo";
import React, { Component, Fragment, useEffect, useState } from "react";
import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import SellerRegistration from "../../components/SellerRegistration/SellerRegistration";
import SellerTermsCondition from "../../components/SellerRegistration/SellerTermsCondition";

const useStyles = makeStyles((theme) => ({
  orderThankYou2: {
    marginBottom: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  orderThankYou: {
    display: "flex",
    marginTop: theme.spacing(25),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  img: {
    marginBottom: theme.spacing(3),
  },
  mainheading: {
    width: "334px",
    height: "58px",
  },
  orderThankYoupara: {
    fontSize: "24px",
    color: "#333333",
    fontWeight: 500,
    marginTop: theme.spacing(2),
    fontFamily: "Lato",
    fontStyle: "normal",
    textAlign: "center",
    lineHeight: "29px",
  },
  orderThankYouconnect: {
    marginTop: theme.spacing(25),
  },
  connect: {
    fontSize: "34px",
    color: "#333333",
    fontWeight: 700,
    marginTop: theme.spacing(2),
    fontFamily: "Lato",
    fontStyle: "normal",
    textAlign: "center",
    lineHeight: "41px",
  },
  socialmedia: {
    display: "flex",
    marginTop: theme.spacing(2),
    justifyContent: "space-between",
    width: "260px",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: theme.spacing(5),
  },
  look: {
    height: "197px",
    width: "409px",
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",

    borderRadious: "0px",
    backgroundColor: "#F7F7F9",
  },
  imagemobile: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  register: {
    width: "263px",
    height: "48px",
    borderRadius: "40px",
    border: "none",
    marginBottom: theme.spacing(10),
    display: "flex",
    marginTop: theme.spacing(4),
    justifyContent: "center",
    alignItems: "center",
    background: theme.palette.secondary.selected,
    "&:hover": {
      transform: "scale(1.08)",
      transition: "left 0.2s linear",
      background: "#FDC114",
    },
  },
  reviews: {
    display: "flex",
    marginTop: theme.spacing(),

    flexDirection: "row",
  },
  cardimage: {
    marginRight: theme.spacing(1),
  },
  facebookreview: {
    fontSize: "24px",
    color: "#333333",
    fontWeight: 500,

    fontFamily: "Lato",
    fontStyle: "normal",

    lineHeight: "29px",
  },
  ratingtime: {
    display: "flex",
    width: "180px",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  ratingday: {
    fontSize: "16px",
    color: "#969696",
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 500,
    weight: 100,
    lineHeight: "19px",
  },
  blogtext: {
    fontSize: "16px",
    color: "#333333",
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 500,
    marginTop: theme.spacing(1),
    lineHeight: "19px",
  },
  blogtextr: {
    color: theme.palette.secondary.selected,
  },
  profilebaner: {
    width: "100%",
    padding: "5%",
    paddingBottom: 0,
  },
}));

function SellerTermsConditionPage(props) {
  const classes = useStyles();

  const { isLoadingOrder, order, shop } = props;

  if (isLoadingOrder) {
    return (
      <Layout shop={shop}>
        <PageLoading message="Loading order details..." />
      </Layout>
    );
  }

  return (
    <Layout shop={shop}>
      <Helmet>
        <title>{shop && shop.name} | Seller Terms & Condition</title>
        <meta name="seller terms & condition" content={shop && shop.description} />
      </Helmet>
      <Grid container md={12}>
        <img src="/profile/profilebanner.webp" className={classes.profilebaner} alt="icon"/>

        <SellerTermsCondition />
      </Grid>
    </Layout>
  );
}

export async function getStaticProps({ params: { lang } }) {
  return {
    props: {
      ...(await fetchPrimaryShop(lang)),
      ...(await fetchTranslations(lang, ["common"])),
    },
  };
}

/**
 *  Static paths for an order
 *
 * @returns {Object} the props
 */
export async function getStaticPaths() {
  return {
    paths: locales.map((locale) => ({ params: { lang: locale } })),
    fallback: true,
  };
}

export default withApollo()(SellerTermsConditionPage);
