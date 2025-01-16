import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PropertyModalProps } from './PropertyDetailsModal.types';
import MapComponent from '../custom/Map/Map';
import { infoColumn, modalBody, style } from './PropertyDetailsModal.styles';

const PropertyDetailsModal: React.FC<PropertyModalProps> = ({
  open,
  handleClose,
  property,
}) => {
  if (!property) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="property-modal-title"
      aria-describedby="property-modal-description"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="property-modal-title" variant="h5" component="h2">
            Property Details
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={modalBody}>
          <Box sx={infoColumn}>
            <Typography variant="h6">City: {property.city}</Typography>
            <Typography variant="h6">State: {property.state}</Typography>
            <Typography variant="h6">Zip Code: {property.zipCode}</Typography>
          </Box>
          <Box sx={infoColumn}>
            <Typography>Latitude: {property.lat}</Typography>
            <Typography>Longitude: {property.long}</Typography>
            <Typography variant="h6">Weather Data:</Typography>
            <Typography>
              Temperature: {property.weatherData.temperature}
            </Typography>
            <Typography>
              Description: {property.weatherData.weather_descriptions}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ height: 300 }}>
          <MapComponent
            key={`${property.lat}-${property.long}`}
            latitude={property.lat || 0}
            longitude={property.long || 0}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default PropertyDetailsModal;
