import { gql } from "@apollo/client";
export const placeOrderQuery = gql`
  mutation placeOrderMuation($order: OrderInput!, $payments: [PaymentInput]) {
    placeOrder(input: { order: $order, payments: $payments }) {
      token
      orders {
        _id
        referenceId
      }
    }
  }
`;
