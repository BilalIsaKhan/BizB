import axios from "axios";

export const sendGraphQLQuery = async () => {
  try {
    const response = await axios.post("https://api.bizb.store/graphql", {
      query: `
      query getTags($shopId: ID!, $filter: String) {
        tags(shopId: $shopId, filter: $filter) {
          nodes {
            _id
            displayTitle
            slug
            heroMediaUrl
            name
            metafields {
              key
              value
            }
          }
        }
      }`,
    });
    
    // Handle the response data
    console.log(response.data);
  } catch (error) {
    // Handle any errors
    console.error(error);
  }
};
