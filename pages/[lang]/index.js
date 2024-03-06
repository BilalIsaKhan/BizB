import React, { Component } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import Helmet from "react-helmet";
import withCatalogItems from "containers/catalog/withCatalogItems";
import ProductGrid from "components/ProductGrid";
import withCart from "containers/cart/withCart";
import Layout from "components/Layout";
import { inPageSizes } from "lib/utils/pageSizes";
import { withApollo } from "lib/apollo/withApollo";
import dynamic from "next/dynamic";
const DynamicSlider = dynamic(() => import("../../components/Header/sliderdata"));
import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import { fetchTags } from "../../staticUtils/tags/fetchAllTags";
import fetchTranslations from "staticUtils/translations/fetchTranslations";

class ProductGridPage extends Component {
  static propTypes = {
    catalogItems: PropTypes.array,
    catalogItemsPageInfo: PropTypes.object,
    isLoadingCatalogItems: PropTypes.bool,
    routingStore: PropTypes.object,
    shop: PropTypes.shape({
      currency: PropTypes.shape({
        code: PropTypes.string.isRequired,
      }),
    }),
    tag: PropTypes.object,
    uiStore: PropTypes.shape({
      pageSize: PropTypes.number.isRequired,
      setPageSize: PropTypes.func.isRequired,
      setSortBy: PropTypes.func.isRequired,
      sortBy: PropTypes.string.isRequired,
    }),
  };

  componentDidMount() {
    const { routingStore } = this.props;
    routingStore.setTagId(null);
  }

  setPageSize = (pageSize) => {
    this.props.routingStore.setSearch({ limit: pageSize });
    this.props.uiStore.setPageSize(pageSize);
  };

  setSortBy = (sortBy) => {
    this.props.routingStore.setSearch({ sortby: sortBy });
    this.props.uiStore.setSortBy(sortBy);
  };

  render() {
    const {
      catalogItems,
      catalogItemsPageInfo,
      isLoadingCatalogItems,
      cart,
      routingStore: { query },
      shop,
      uiStore,
      feed,
    } = this.props;
    console.log("these props are", this.props);
    const pageSize = query && inPageSizes(query.limit) ? parseInt(query.limit, 10) : uiStore.pageSize;
    const sortBy = query && query.sortby ? query.sortby : uiStore.sortBy;

    let pageTitle;
    if (shop) {
      pageTitle = shop.name;
      if (shop.description) pageTitle = `${pageTitle} | ${shop.description}`;
    } else {
      pageTitle = "Bizb";
    }
    const addItemsToCart = this.props.addItemsToCart;

    return typeof window !== undefined ? (
      <Layout headerType={false}>
        <Helmet title={pageTitle} meta={[{ name: "descrition", content: shop && shop.description }]} />
        {/* {console.log("tags", this.props)} */}
        <DynamicSlider
          {...this.props?.tags}
          catalogItems={catalogItems}
          feed={feed}
          addItemsToCart={addItemsToCart}
          currencyCode={(shop && shop.currency && shop.currency.code) || "USD"}
          shop={shop}
          cart={cart}
        />

        <Helmet title={pageTitle} meta={[{ name: "descrition", content: shop && shop.description }]} />
        {/* <ProductGrid
          // catalogItems={catalogItems}
          currencyCode={(shop && shop.currency && shop.currency.code) || "USD"}
          isLoadingCatalogItems={isLoadingCatalogItems}
          pageInfo={catalogItemsPageInfo}
          pageSize={pageSize}
          setPageSize={this.setPageSize}
          setSortBy={this.setSortBy}
          sortBy={sortBy}
        /> */}
      </Layout>
    ) : (
      "Loading..."
    );
  }
}

/**
 *  Static props for the main layout
 *
 * @param {String} lang - the shop's language
 * @returns {Object} the props
 */
export async function getStaticProps({ params: { lang } }) {
  const primaryShop = await fetchPrimaryShop(lang);
  // console.log(primaryShop,"prim")
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${process.env.INSTAGRAM_KEY}`;
  const data = await fetch(url);
  console.log("data is ", data);

  const feed = await data.json();
  console.log("new feed", feed);

  if (!primaryShop?.shop) {
    return {
      props: {
        shop: null,
      },
      // eslint-disable-next-line camelcase
      unstable_revalidate: 1, // Revalidate immediately
    };
  }

  return {
    props: {
      ...primaryShop,
      ...(await fetchTags(primaryShop?.shop?._id)),
      feed,
    },
    // eslint-disable-next-line camelcase
    unstable_revalidate: 120, // Revalidate each two minutes
  };
}

/**
 *  Static paths for the main layout
 *
 * @returns {Object} the paths
 */
export async function getStaticPaths() {
  return {
    paths: locales.map((locale) => ({ params: { lang: locale } })),
    fallback: false,
  };
}

export default withApollo()(withCart(withCatalogItems(inject("routingStore", "uiStore")(ProductGridPage))));
