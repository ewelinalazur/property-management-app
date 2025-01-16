import { GraphQLError } from "graphql";
import { Property as PropertyModel } from "./db/property.js";

const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;

export const resolvers = {
  Query: {
    properties: async (
      _,
      args: {
        sortOrder?: string;
        filter?: {
          city?: string;
          street?: string;
          state?: string;
          zipCode?: string;
        };
      }
    ) => {
      try {
        const filterConditions: { [key: string]: any } = {};
        const { sortOrder = "ASC", filter = {} } = args;

        if (filter.city) {
          filterConditions.city = { $regex: filter.city, $options: "i" };
        }
        if (filter.street) {
          filterConditions.street = { $regex: filter.street, $options: "i" };
        }
        if (filter.state) {
          filterConditions.state = { $regex: filter.state, $options: "i" };
        }
        if (filter.zipCode) {
          filterConditions.zipCode = { $regex: filter.zipCode, $options: "i" };
        }

        const result = await PropertyModel.find(filterConditions).sort({
          createdAt: sortOrder === "DESC" ? -1 : 1,
        });

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
          throw new GraphQLError("Property does not exist!");
        }
        const location = `${result.city},${result.state},United States`;

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

        return {
          ...result.toObject(),
          lat: weatherData.location.lat,
          long: weatherData.location.lon,
          weatherData: {
            temperature: weatherData.current.temperature,
            weather_descriptions: weatherData.current.weather_descriptions,
          },
        };
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createProperty: async (_, { city, street, state, zipCode }) => {
      try {
        const newProperty = new PropertyModel({
          city,
          street,
          state,
          zipCode,
          lat: null,
          long: null,
          weatherData: {
            temperature: null,
            weather_descriptions: [],
          },
        });

        await newProperty.save();
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
