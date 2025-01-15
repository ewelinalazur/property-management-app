import { GraphQLError } from "graphql";
import { Property as PropertyModel } from "./db/property.js";

const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;

export const resolvers = {
  Query: {
    properties: async () => {
      try {
        const result = await PropertyModel.find({});
        if (!result.length) {
          throw new GraphQLError("No property Added!");
        }
        return result;
      } catch (error) {
        throw error;
      }
    },
    property: async (_, args) => {
      try {
        const result = await PropertyModel.findById(args._id);
        if (!result) {
          throw new GraphQLError("Property does not exists!");
        }
        return result;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createProperty: async (_, args) => {
      try {
        const { city, street, state, zipCode } = args;
        const location = `${city},${state},United States`;
        console.log(location);
        const weatherResponse = await fetch(
          `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${location}`
        );

        const weatherData = (await weatherResponse.json()) as {
          error?: any;
          current?: { temperature: number; weather_descriptions: string[] };
          location?: { lat: number; lon: number };
        };

        if (weatherData.error) {
          throw new Error(
            "Failed to fetch weather data. Please check the location information."
          );
        }
        console.log(weatherData);
        const { temperature, weather_descriptions } = weatherData.current || {};
        const { lat, lon: long } = weatherData.location || {};
        // const createdAt = new Date().toISOString();

        const newProperty = await PropertyModel.create({
          city,
          street,
          state,
          zipCode,
          weatherData: { temperature, weather_descriptions },
          lat,
          long,
        });
        return newProperty;
      } catch (error) {
        throw new GraphQLError(`Failed to create property: ${error.message}`);
      }
    },

    deleteProperty: async (_, args) => {
      try {
        const result = await PropertyModel.findByIdAndDelete(args._id);
        if (!result) {
          throw new GraphQLError(`Property with ID ${args._id} not found.`);
        }
        return true;
      } catch (error) {
        throw error;
      }
    },
  },
};
