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
import Welcome from "../../components/Welcome/welcome";

const useStyles = makeStyles((theme) => ({
    profilebaner: {
        width: "80px",
        height: "110px",
        paddingTop: "0.5%",
        [theme.breakpoints.down("sm")]: {
            width: "40px",
            height: "80px",
        },

    },
    profilebanerDiv: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
}));

function WelcomePage(props) {
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
        <>
            <Helmet>
                <title>{shop && shop.name} | Welcome</title>
                <meta name="Welcome" content={shop && shop.description} />
            </Helmet>
            <div className={classes.profilebanerDiv}>
                <img src="/favicons/Logo2.svg" className={classes.profilebaner} alt="icon" />
            </div>

            <Welcome />
        </>
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

export default withApollo()(WelcomePage);
