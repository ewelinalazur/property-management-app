import { useQuery } from "@apollo/client";
import { GET_PROPERTIES } from "../graphql/queries";
import TableComponent from "../components/Table/Table";
import { TableColumn } from "../components/Table/Table.types";
import { Button, Typography } from "@mui/material";
import { StyledTextWrapper } from "./Dashboard.styles";
import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";

const columns: readonly TableColumn[] = [
  { id: "_id", label: "ID", minWidth: 170 },
  { id: "city", label: "CITY", minWidth: 100 },
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
    label: "zip Code",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

const Dashboard = () => {
  const { data, loading, error } = useQuery(GET_PROPERTIES);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  if (loading) return <p>...Loading</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <StyledTextWrapper>
        <Typography variant="h5" gutterBottom>
          Property Managment
        </Typography>
        <Button variant="contained" onClick={handleOpen}>
          ADD PROPERTY
        </Button>
      </StyledTextWrapper>
      <TableComponent rows={data.properties} columns={columns} />
      <Sidebar open={open} handleClose={handleClose} />
    </>
  );
};

export default Dashboard;
