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
import StorePage from "../../components/StorePage/StorePage";
import SearchProduct from "../../components/SearchProduct/SearchProduct";
import { useRouter } from 'next/router'
import useProductSearch from "../../hooks/globalSearch/useProductSearch";

const useStyles = makeStyles((theme) => ({

}));

function SeacrhResult(props ) {

    const classes = useStyles();

    const { isLoadingOrder, order, shop } = props;
    // const searchParams = useSearchParams()
    const router = useRouter()
    const search = router.query.search?.replace(/"/g, " ")
    // const search = searchParams.get('search')

    console.log("search22", search)



    if (isLoadingOrder) {
        return (
            <Layout shop={shop}>
                <PageLoading message="Loading order details..." />
            </Layout>
        );
    }



    return (
        <Layout shop={shop}>
            {/* <Helmet>
                <title>{shop && shop.name} | Stores</title>
                <meta name="stores" content={shop && shop.description} />
            </Helmet> */}
            
            <Grid container md={12} lg={12}>
                
                <SearchProduct search={search}/>
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

export default withApollo()(SeacrhResult);
