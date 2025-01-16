import { gql } from "@apollo/client";

export const GET_PROPERTIES = gql`
  query getProperties($sortOrder: SortingOrder, $filter: PropertyFilter) {
    properties(sortOrder: $sortOrder, filter: $filter) {
      _id
      city
      street
      state
      zipCode
      createdAt
    }
  }
`;

export const GET_PROPERTY = gql`
  query getProperty($_id: ID!) {
    property(_id: $_id) {
      _id
      city
      street
      state
      zipCode
      weatherData {
        temperature
        weather_descriptions
      }
      lat
      long
      createdAt
    }
  }
`;
