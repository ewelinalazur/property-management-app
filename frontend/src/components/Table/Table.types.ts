export type TableData = Pick<
  Property,
  "_id" | "city" | "street" | "state" | "zipCode"
>;
export interface TableColumn {
  id: "_id" | "city" | "street" | "state" | "zipCode";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}
export interface TableComponentProps {
  rows: TableData[];
  columns: readonly TableColumn[];
}

export interface WeatherData {
  temperature: number;
  weather_descriptions: string[];
}

export interface Property {
  _id?: String;
  city: string;
  street: string;
  state: string;
  zipCode: string;
  weatherData: WeatherData;
  lat: number;
  long: number;
}
