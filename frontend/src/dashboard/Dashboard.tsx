import { useQuery } from "@apollo/client";
import { GET_PROPERTIES } from "../graphql/queries";
import TableComponent from "../components/Table/Table";
import { TableColumn } from "../components/Table/Table.types";
import { Box, Button, TextField, Typography } from "@mui/material";
import { StyledTextWrapper } from "./Dashboard.styles";
import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import debounce from "lodash/debounce";

type Filter = {
  city: string;
  state: string;
  street: string;
  zipCode: string;
};
const columns: readonly TableColumn[] = [
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

const Dashboard = () => {
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");
  const [filter, setFilter] = useState<Filter>({
    city: "",
    state: "",
    street: "",
    zipCode: "",
  });

  const { data, loading, error } = useQuery(GET_PROPERTIES, {
    variables: { sortOrder, filter },
  });
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSortClick = () => {
    setSortOrder((prevOrder) => (prevOrder === "ASC" ? "DESC" : "ASC"));
  };

  const debouncedSetFilter = useMemo(
    () =>
      debounce((newFilter: Partial<Filter>) => {
        setFilter((prev) => ({ ...prev, ...newFilter }));
      }, 300),
    []
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    debouncedSetFilter({ [name]: value });
  };

  const handleResetFilters = () => {
    setFilter({ city: "", street: "", state: "", zipCode: "" });
  };

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

      <Box
        sx={{
          backgroundColor: "#fff",
          padding: 2,
          borderRadius: 2,
          boxShadow: 1,
          mb: 2,
        }}
      >
        <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
          <TextField
            label="City"
            variant="outlined"
            value={filter.city}
            onChange={handleFilterChange}
            name="city"
            size="small"
          />
          <TextField
            label="Street"
            variant="outlined"
            value={filter.zipCode}
            onChange={handleFilterChange}
            name="street"
            size="small"
          />
          <TextField
            label="State"
            variant="outlined"
            value={filter.state}
            onChange={handleFilterChange}
            name="state"
            size="small"
          />
          <TextField
            label="Zip Code"
            value={filter.zipCode}
            onChange={handleFilterChange}
            name="zipCode"
            size="small"
          />
        </Box>
        <Button variant="contained" size="small" onClick={handleResetFilters}>
          Reset
        </Button>
      </Box>
      <TableComponent
        rows={data?.properties || []}
        columns={columns}
        loading={loading}
        error={error || null}
        onSortClick={handleSortClick}
        sortOrder={sortOrder}
      />
      <Sidebar open={open} handleClose={handleClose} />
    </>
  );
};

export default Dashboard;
