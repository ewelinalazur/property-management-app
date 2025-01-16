import { Document, ObjectId } from "mongodb";

export interface WeatherData {
  temperature: number;
  weather_descriptions: string[];
}

export interface Property {
  _id: ObjectId;
  city: string;
  street: string;
  state: string;
  zipCode: string;
  weatherData: WeatherData;
  lat: number;
  long: number;
}

export type Filter = Partial<
  Pick<Property, "city" | "street" | "state" | "zipCode">
>;

export interface PropertiesQueryArgs {
  sortOrder?: "ASC" | "DESC";
  filter?: Filter;
}

export interface PropertyResult extends Document {
  city: string;
  street: string;
  state: string;
  zipCode: string;
  lat: number | null;
  long: number | null;
  weatherData: {
    temperature: number | null;
    weather_descriptions: string[];
  };
}

export type DeletePropertyMutationArgs = Pick<Property, "_id">;

export type CreatePropertyMutationArgs = Pick<
  Property,
  "city" | "street" | "state" | "zipCode"
>;
