import mongoose, { Schema } from "mongoose";

const propertySchema = new Schema({
  city: String,
  street: String,
  state: String,
  zipCode: String,
  weatherData: Object,
  lat: Number,
  long: Number,
});

export const Property = mongoose.model("Property", propertySchema);
