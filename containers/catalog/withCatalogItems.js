import React from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import { Query } from "@apollo/react-components";
import hoistNonReactStatic from "hoist-non-react-statics";
import { pagination, paginationVariablesFromUrlParams } from "lib/utils/pagination";
import catalogItemsQuery from "./catalogItems.gql";

/**
 * withCatalogItems higher order query component for fetching primaryShopId and catalog data
 * @name withCatalogItems
 * @param {React.Component} Component to decorate and apply
 * @returns {React.Component} - component decorated with primaryShopId and catalog as props
 */
export default function withCatalogItems(Component) {
  class CatalogItems extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        windowWidth: typeof window !== "undefined" ? window.innerWidth : 0,
        windowHeight: typeof window !== "undefined" ? window.innerHeight : 0,
      };

      // Bind the event handler to the component instance
      this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
      // Add event listener for window resize if window is defined
      if (typeof window !== "undefined") {
        window.addEventListener("resize", this.handleResize);
      }
    }

    componentWillUnmount() {
      // Remove event listener when component is unmounted if window is defined
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", this.handleResize);
      }
    }

    handleResize() {
      // Update component state with new window size if window is defined
      if (typeof window !== "undefined") {
        this.setState({
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
        });
      }
    }

    static propTypes = {
      primaryShopId: PropTypes.string,
      routingStore: PropTypes.object.isRequired,
      tagId: PropTypes.shape({
        _id: PropTypes.string.isRequired,
      }),
      uiStore: PropTypes.object.isRequired,
    };

    render() {
      const { primaryShopId, routingStore, uiStore, tagId } = this.props;
      const [sortBy, sortOrder] = uiStore.sortBy.split("-");
      const { endCursor } = uiStore;

      console.log("window width", this.state.windowWidth);

      let first = uiStore.pageSize;

      // 1050: 3, 1280: 4, 1400: 5, 1750: 6, 1920: 6

      if (this.state.windowWidth <= 1050) {
        first = 6;
      } else if (this.state.windowWidth > 1050 && this.state.windowWidth < 1280) {
        first = 9;
      } else if (this.state.windowWidth >= 1280 && this.state.windowWidth < 1400) {
        first = 12;
      } else if (this.state.windowWidth >= 1400 && this.state.windowWidth < 1750) {
        first = 15;
      } else if (this.state.windowWidth >= 1750) {
        first = 18;
      }

      console.log("window width page size", uiStore.pageSize);
      console.log("window width offset", first);

      if (!primaryShopId) {
        return <Component {...this.props} />;
      }
      if (endCursor) {
        const variables = {
          shopId: primaryShopId,
          ...paginationVariablesFromUrlParams(routingStore.query, {
            defaultPageLimit: first,
          }),
          tagIds: tagId || endCursor,
          sortBy,
          sortByPriceCurrencyCode: uiStore.sortByCurrencyCode,
          sortOrder,
          searchQuery: uiStore?.searchItems,
          simpleFilters: uiStore?.filters,
          priceRange: uiStore?.filterPrice,
        };
        return (
          <Query errorPolicy="all" query={catalogItemsQuery} variables={variables}>
            {({ data, fetchMore, loading }) => {
              const { catalogItems } = data || {};
              return (
                <Component
                  {...this.props}
                  catalogItemsPageInfo={pagination({
                    fetchMore,
                    routingStore,
                    data,
                    queryName: "catalogItems",
                    limit: uiStore.pageSize,
                  })}
                  catalogItems={(catalogItems && catalogItems.edges) || []}
                  isLoadingCatalogItems={loading}
                  totalcount={(catalogItems && catalogItems.totalCount)}

                />
              );
            }}
          </Query>
        );
      } else {
        const variables = {
          shopId: primaryShopId,
          ...paginationVariablesFromUrlParams(routingStore.query, {
            defaultPageLimit: first,
          }),
          tagIds: tagId,
          sortBy,
          sortByPriceCurrencyCode: uiStore.sortByCurrencyCode,
          sortOrder,
          searchQuery: uiStore?.searchItems,
          simpleFilters: uiStore?.filters,
          priceRange: uiStore?.filterPrice,
        };
        return (
          <Query errorPolicy="all" query={catalogItemsQuery} variables={variables}>
            {({ data, fetchMore, loading }) => {
              const { catalogItems } = data || {};
              return (
                <Component
                  {...this.props}
                  catalogItemsPageInfo={pagination({
                    fetchMore,
                    routingStore,
                    data,
                    queryName: "catalogItems",
                    limit: uiStore.pageSize,
                  })}
                  catalogItems={(catalogItems && catalogItems.edges) || []}
                  isLoadingCatalogItems={loading}
                  totalcount={(catalogItems && catalogItems.totalCount)}

                />
              );
            }}
          </Query>
        );
      }
    }
  }

  hoistNonReactStatic(CatalogItems, Component);

  return inject("primaryShopId", "routingStore", "uiStore")(CatalogItems);
}
