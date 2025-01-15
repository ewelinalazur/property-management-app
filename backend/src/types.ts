import { ObjectId } from "mongodb";

export interface WeatherData {
  temperature: number;
  weather_descriptions: string[];
}

export interface Property {
  _id?: ObjectId;
  city: string;
  street: string;
  state: string;
  zipCode: string;
  weatherData: WeatherData;
  lat: number;
  long: number;
}
