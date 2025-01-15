import React, { useRef } from "react";
import { Drawer, Box, Typography, Button, TextField } from "@mui/material";
import { useMutation } from "@apollo/client";
import { GET_PROPERTIES } from "../../graphql/queries";
import { CREATE_PROPERTY } from "../../graphql/mutations";
import { useNotification } from "../../context/NotificationContext";

const Sidebar = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const inputCity = useRef<HTMLInputElement>(null);
  const inputStreet = useRef<HTMLInputElement>(null);
  const inputState = useRef<HTMLInputElement>(null);
  const inputZipCode = useRef<HTMLInputElement>(null);
  const { showSuccess, showError } = useNotification();

  const [createProperty] = useMutation(CREATE_PROPERTY, {
    refetchQueries: [{ query: GET_PROPERTIES }],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProperty({
      variables: {
        city: inputCity.current?.value,
        street: inputStreet.current?.value,
        state: inputState.current?.value,
        zipCode: inputZipCode.current?.value,
      },
    })
      .then(() => {
        showSuccess("Property added successfully!");
        handleClose();
      })
      .catch((error) => {
        showError(`Error creating property: ${error.message}`);
      });
    handleClose();
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

export default Sidebar;
