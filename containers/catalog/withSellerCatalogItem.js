import React from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import { Query } from "@apollo/react-components";
import hoistNonReactStatic from "hoist-non-react-statics";
import { pagination, paginationVariablesFromUrlParams } from "lib/utils/pagination";
import sellercatalogItemsQuery from "./sellerCatalogItems.gql";

/**
 * withCatalogItems higher order query component for fetching primaryShopId and catalog data
 * @name SellersCatalogItems
 * @param {React.Component} Component to decorate and apply
 * @returns {React.Component} - component decorated with primaryShopId and catalog as props
 */
export default function SellersCatalogItems(Component) {
  class SellersCatalogItems extends React.Component {
    static propTypes = {
      sellerIds: PropTypes.array,
      uiStore: PropTypes.object.isRequired,
    };

    render() {
      const { primaryShopId, routingStore, uiStore, tag, tagId } = this.props;
      const sellerIds = uiStore?.sellerId;
      const { tagIdfiltersSeller } = uiStore;

      console.log("pagetagid", tagIdfiltersSeller);
      const variables = {
        sellerIds: sellerIds,
        tagIds: tagIdfiltersSeller,

        ...paginationVariablesFromUrlParams({ defaultPageLimit: uiStore?.pageSize }),
        //   ...paginationVariablesFromUrlParams(routingStore.query, { defaultPageLimit: uiStore.pageSize }),
        //   sortBy,
        //   sortByPriceCurrencyCode: uiStore.sortByCurrencyCode,
        //   sortOrder,
        //   searchQuery: uiStore?.searchItems,
        //   simpleFilters: uiStore?.filters,
        //   priceRange: uiStore?.filterPrice,
      };

      return (
        <>
        {console.log("pagetagid 2")}
          <Query errorPolicy="all" query={sellercatalogItemsQuery} variables={variables}>
            {({ data, fetchMore, loading }) => {
              const { sellerCatalogItems } = data || {};
              return (
                <Component
                  {...this.props}
                  sellerCatalogItemsPageInfo={pagination({
                    fetchMore,
                    routingStore,
                    data,
                    queryName: "sellerCatalogItems",
                    limit: uiStore?.pageSize,
                  })}
                  catalogItems={(sellerCatalogItems && sellerCatalogItems.edges) || []}
                  totalcount={sellerCatalogItems && sellerCatalogItems.totalCount}
                  loading={loading}
                />
              );
            }}
          </Query>
        </>
      );
    }
  }

  hoistNonReactStatic(SellersCatalogItems, Component);
  return inject("primaryShopId", "routingStore", "uiStore")(SellersCatalogItems);
}
