import mongoose, { Schema } from "mongoose";
import { PropertyResult } from "../types";

const propertySchema = new Schema<PropertyResult>(
  {
    city: { type: String, required: true },
    street: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    lat: { type: Number, default: null },
    long: { type: Number, default: null },
    weatherData: {
      temperature: { type: Number, default: null },
      weather_descriptions: { type: [String], default: [] },
    },
  },
  { timestamps: true }
);

export const Property = mongoose.model<PropertyResult>(
  "Property",
  propertySchema
);
