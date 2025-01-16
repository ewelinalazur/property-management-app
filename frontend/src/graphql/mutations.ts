import { gql } from '@apollo/client';

export const CREATE_PROPERTY = gql`
  mutation createProperty(
    $city: String!
    $street: String!
    $state: String!
    $zipCode: String!
  ) {
    createProperty(
      city: $city
      street: $street
      state: $state
      zipCode: $zipCode
    ) {
      _id
      city
      street
      state
      zipCode
    }
  }
`;
export const DELETE_PROPERTY = gql`
  mutation deleteProperty($id: ID!) {
    deleteProperty(_id: $id)
  }
`;
