export const typeDefs = `
  type WeatherData {
    temperature: Float
    weather_descriptions: [String]
  }

  type Property {
    _id: ID!
    city: String!
    street: String!
    state: String!
    zipCode: String!
    weatherData: WeatherData
    lat: Float
    long: Float
  }

  type Query {
    properties: [Property]
    property(_id: ID!): Property
  }

  type Mutation {
    createProperty(city: String!, street: String!, state: String!, zipCode: String!): Property
    deleteProperty(_id: ID!): String
  }

`;
