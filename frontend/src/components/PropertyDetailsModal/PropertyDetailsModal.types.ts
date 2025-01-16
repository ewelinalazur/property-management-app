export interface Property {
  city: string;
  street: string;
  state: string;
  zipCode: string;
  lat: number;
  long: number;
  weatherData: { temperature: string; weather_descriptions: string[] };
  createdAt: string;
}

export interface PropertyModalProps {
  open: boolean;
  handleClose: () => void;
  property: Property | null;
}
