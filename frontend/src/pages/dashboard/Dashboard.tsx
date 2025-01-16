import TableComponent from "../../components/Table/Table";
import { Box, Button, TextField, Typography } from "@mui/material";
import { StyledTextWrapper } from "./Dashboard.styles";
import AddPropertySidebar from "../../components/AddPropertySidebar/AddPropertySidebar";
import PropertyDetailsModal from "../../components/PropertyDetailsModal/PropertyDetailsModal";
import DeleteConfirmDialog from "../../components/DeleteConfigDialog/DeleteConfigDialog";
import usePropertyDashboard from "../../hooks/usePropertyDashboard";

const PropertyDashboard = () => {
  const {
    openSidebar,
    handleOpenSidebar,
    handleCloseSidebar,
    sortOrder,
    handleSortClick,
    filter,
    handleFilterChange,
    handleResetFilters,
    data,
    loading,
    error,
    handleRowClick,
    modalOpen,
    setModalOpen,
    selectedProperty,
    handleDeleteClick,
    openDialog,
    createProperty,
    handleCloseDialog,
    handleConfirmDelete,
  } = usePropertyDashboard();

  return (
    <>
      <StyledTextWrapper>
        <Typography variant="h5" gutterBottom>
          Property Managment
        </Typography>
        <Button variant="contained" onClick={handleOpenSidebar}>
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
        loading={loading}
        error={error || null}
        onSortClick={handleSortClick}
        sortOrder={sortOrder}
        onRowClick={handleRowClick}
        onDeleteClick={handleDeleteClick}
      />
      <AddPropertySidebar
        open={openSidebar}
        handleClose={handleCloseSidebar}
        createProperty={createProperty}
      />
      <PropertyDetailsModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        property={selectedProperty}
      />
      <DeleteConfirmDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default PropertyDashboard;
