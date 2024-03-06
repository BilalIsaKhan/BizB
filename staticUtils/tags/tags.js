export default `
query tagsQuery($shopId: ID!, $cursor: ConnectionCursor) {
  tags(shopId: $shopId, first: 200, after: $cursor, sortBy: createdAt) {
    pageInfo {
       endCursor
      startCursor
      hasNextPage
      hasPreviousPage
    }
    edges {
      cursor
      node {
        ...TagInfo
      }
    }
  }
}
fragment TagInfo on Tag {
  _id
  position
  name
  slug
  isTopLevel
  subTagIds
  heroMediaUrl
  metafields {
    key
    namespace
    scope
    value
  }
  displayTitle
}
`;

export const fetchAllTagsQuery = `
query tags($shopId: ID!) {
  tags(shopId: $shopId,filter:"category-") {
    nodes {
      _id
      isVisible
      displayTitle
      heroMediaUrl
    }
  }
}
`;

export const fetchAllCategoriesQuery = `
query GetCatalogItems($shopIds:[ID]!, $tagIds:[ID]!,  $first: ConnectionLimitInt,
  $sortBy: CatalogItemSortByField,$after:ConnectionCursor) {
  catalogItems(
    shopIds:$shopIds
    tagIds: $tagIds
    first: $first
    sortBy: $sortBy
    after:$after
  ) {
    totalCount
    pageInfo {
      endCursor
      startCursor
      hasNextPage
      hasPreviousPage
      __typename
    }
    edges {
      cursor
      node {
        _id
        ... on CatalogItemProduct {
          product {
            productId
            _id
            title
            slug
            description
            vendor
            isLowQuantity
            isSoldOut
            updatedAt
            productType
            isBackorder
             variants {
              pricing {
                compareAtPrice {
                  displayAmount
                  __typename
                }
                
                currency {
                  code
                  __typename
                }
                displayPrice
                minPrice
                maxPrice
                __typename
              }
              _id
              variantId
              optionTitle
              options {
                _id
                __typename
              }
              __typename
            }
            tagIds
            metafields {
              description
              key
              namespace
              scope
              value
              valueType
              __typename
            }
            shop {
              currency {
                code
                __typename
              }
              __typename
            }
            pricing {
              compareAtPrice {
                displayAmount
                __typename
              }
              currency {
                code
                __typename
              }
              displayPrice
              minPrice
              maxPrice
              __typename
            }
            primaryImage {
              URLs {
                thumbnail
                small
                medium
                large
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}`;
