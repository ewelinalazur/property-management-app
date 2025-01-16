import { GraphQLError } from "graphql";
import { Property as PropertyModel } from "../db/property.model.js";
import {
  CreatePropertyMutationArgs,
  DeletePropertyMutationArgs,
  PropertiesQueryArgs,
  PropertyResult,
} from "../types.js";

const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;

export const resolvers = {
  Query: {
    properties: async (
      _,
      args: PropertiesQueryArgs
    ): Promise<PropertyResult[]> => {
      try {
        const filterConditions: {
          city?: { $regex: string; $options: string };
          street?: { $regex: string; $options: string };
          state?: { $regex: string; $options: string };
          zipCode?: { $regex: string; $options: string };
        } = {};
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
          throw new GraphQLError("No properties found matching the filter!");
        }
        return result;
      } catch (error) {
        throw new GraphQLError(`Failed to fetch properties: ${error.message}`);
      }
    },
    property: async (_, args: { _id: string }): Promise<PropertyResult> => {
      try {
        const result = await PropertyModel.findById(args._id);
        if (!result) {
          throw new GraphQLError("Property not found!");
        }
        const location = `${result.city},${result.state},United States`;

        const weatherResponse = await fetch(
          `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${location}`
        );

        if (!weatherResponse.ok) {
          throw new GraphQLError(
            "Failed to fetch weather data. Please check the location information."
          );
        }
        const weatherData = (await weatherResponse.json()) as {
          current?: { temperature: number; weather_descriptions: string[] };
          location?: { lat: number; lon: number };
        };

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
        throw new GraphQLError(`Failed to fetch property: ${error.message}`);
      }
    },
  },
  Mutation: {
    createProperty: async (
      _: any,
      args: CreatePropertyMutationArgs
    ): Promise<PropertyResult> => {
      try {
        const newProperty = new PropertyModel({
          city: args.city,
          street: args.street,
          state: args.state,
          zipCode: args.zipCode,
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
    deleteProperty: async (_: any, args: DeletePropertyMutationArgs) => {
      try {
        const result = await PropertyModel.findByIdAndDelete(args._id);
        if (!result) {
          throw new GraphQLError(`Property with ID ${args._id} not found.`);
        }
        return `Property with ID ${args._id} was successfully deleted.`;
      } catch (error) {
        throw new GraphQLError(`Failed to delete property: ${error.message}`);
      }
    },
  },
};
