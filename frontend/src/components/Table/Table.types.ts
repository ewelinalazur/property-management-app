export type TableData = Pick<
  Property,
  "_id" | "city" | "street" | "state" | "zipCode" | "createdAt"
>;
export interface TableColumn {
  id: "_id" | "city" | "street" | "state" | "zipCode" | "createdAt";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: string) => string;
}
export interface TableComponentProps {
  rows: TableData[];
  columns: readonly TableColumn[];
  loading: boolean;
  error: Error | null;
  onSortClick: () => void;
  sortOrder: "ASC" | "DESC";
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
  createdAt: string;
}
