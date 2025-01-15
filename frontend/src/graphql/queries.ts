import { gql } from "@apollo/client";

export const GET_PROPERTIES = gql`
  query getProperties {
    properties {
      _id
      city
      street
      state
      zipCode
    }
  }
`;

export const GET_PROPERTY = gql`
  query getProperty($id: ID!) {
    property(_id: $id) {
      _id
      city
      street
      state
      zipCode
      weatherData
      lat
      long
    }
  }
`;
