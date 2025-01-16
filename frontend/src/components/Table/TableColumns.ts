import { TableColumn } from "./Table.types";

export const columns: readonly TableColumn[] = [
  {
    id: "createdAt",
    label: "Created At",
    minWidth: 170,
    format: (value: string) => {
      const timestamp = parseInt(value, 10);
      const date = new Date(timestamp);
      return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
    },
  },
  { id: "city", label: "City", minWidth: 100 },
  {
    id: "street",
    label: "Street",
    minWidth: 170,
    align: "right",
  },
  {
    id: "state",
    label: "State",
    minWidth: 170,
    align: "right",
  },
  {
    id: "zipCode",
    label: "Zip Code",
    minWidth: 170,
    align: "right",
  },
];
