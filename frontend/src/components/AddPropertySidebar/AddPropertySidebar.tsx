import React, { useRef } from "react";
import { Drawer, Box, Typography, Button, TextField } from "@mui/material";
import { SidebarProps } from "./AddPropertySidebar.types";

const AddPropertySidebar: React.FC<SidebarProps> = ({
  open,
  handleClose,
  createProperty,
}) => {
  const inputCity = useRef<HTMLInputElement>(null);
  const inputStreet = useRef<HTMLInputElement>(null);
  const inputState = useRef<HTMLInputElement>(null);
  const inputZipCode = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProperty({
      variables: {
        city: inputCity.current?.value,
        street: inputStreet.current?.value,
        state: inputState.current?.value,
        zipCode: inputZipCode.current?.value,
      },
    });
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box sx={{ width: 400, padding: 2 }}>
        <Typography variant="h6" component="h2">
          Add Property
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="City"
            inputRef={inputCity}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Street"
            inputRef={inputStreet}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="State"
            inputRef={inputState}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Zip Code"
            inputRef={inputZipCode}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Add Property
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};

export default AddPropertySidebar;
