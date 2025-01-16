import { useRef, useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormHelperText,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import {
  PropertyFormErrors,
  SidebarProps,
  US_STATES,
} from './AddPropertySidebar.types';

const AddPropertySidebar: React.FC<SidebarProps> = ({
  open,
  handleClose,
  createProperty,
}) => {
  const [state, setState] = useState('');
  const [errors, setErrors] = useState<PropertyFormErrors>({
    city: '',
    street: '',
    state: '',
    zipCode: '',
  });
  const inputCity = useRef<HTMLInputElement>(null);
  const inputStreet = useRef<HTMLInputElement>(null);
  const inputZipCode = useRef<HTMLInputElement>(null);

  const handleStateChange = (event: SelectChangeEvent<string>) => {
    setState(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cityValue = inputCity.current?.value || '';
    const streetValue = inputStreet.current?.value || '';
    const zipCodeValue = inputZipCode.current?.value || '';

    const newErrors: Partial<PropertyFormErrors> = {};
    let isValid = true;

    if (!cityValue) {
      newErrors.city = 'City is required.';
      isValid = false;
    }

    if (!streetValue) {
      newErrors.street = 'Street and Number are required.';
      isValid = false;
    }

    if (!state) {
      newErrors.state = 'State is required.';
      isValid = false;
    }

    const zipCodeRegex = /^\d{5}$/;
    if (!zipCodeValue || !zipCodeRegex.test(zipCodeValue)) {
      newErrors.zipCode = 'Zip code must be a valid 5-digit number.';
      isValid = false;
    }

    setErrors({ ...errors, ...newErrors });

    if (!isValid) {
      return;
    }

    createProperty({
      variables: {
        city: cityValue,
        street: streetValue,
        state,
        zipCode: zipCodeValue,
      },
    });
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box sx={{ width: 400, padding: 2 }}>
        <Typography variant="h6" component="h2" style={{ margin: 5 }}>
          Add property
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: 5 }}>
            <TextField
              label="City"
              inputRef={inputCity}
              fullWidth
              margin="normal"
              required
              error={!!errors.city}
              helperText={errors.city}
            />
            <TextField
              label="Street and Number"
              inputRef={inputStreet}
              fullWidth
              margin="normal"
              required
              error={!!errors.street}
              helperText={errors.street}
            />
            <FormControl
              fullWidth
              margin="normal"
              required
              error={!!errors.state}
            >
              <InputLabel id="state-label">State</InputLabel>
              <Select
                labelId="state-label"
                value={state}
                onChange={handleStateChange}
                label="State"
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                      width: 'auto',
                    },
                  },
                }}
              >
                {US_STATES.map((stateAbbreviation) => (
                  <MenuItem key={stateAbbreviation} value={stateAbbreviation}>
                    {stateAbbreviation}
                  </MenuItem>
                ))}
              </Select>
              {errors.state && <FormHelperText>{errors.state}</FormHelperText>}
            </FormControl>
            <TextField
              label="Zip Code"
              inputRef={inputZipCode}
              fullWidth
              margin="normal"
              error={!!errors.zipCode}
              helperText={errors.zipCode}
              required
            />
          </Box>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Property
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};

export default AddPropertySidebar;
