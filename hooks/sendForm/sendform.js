import { gql } from "@apollo/client";
export const SendContactForm= gql`
mutation SendContactForm(
  $name: String!
  $email: String!
  $phoneNumber: String
  $message: String!
) {
  sendContactForm(
    name: $name
    email: $email
    phoneNumber: $phoneNumber
    message: $message
  )
}
`