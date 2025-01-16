import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { MapComponentProps } from './Map.types';

const CustomIconUrl = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="black" d="M12 2C8.13 2 5 5.13 5 9c0 3.11 2.45 6.09 5.5 9.66L12 21l1.5-2.34C16.55 15.09 19 12.11 19 9c0-3.87-3.13-7-7-7zm0 10c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
  </svg>
`)}`;

const customIcon = L.icon({
  iconUrl: CustomIconUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude }) => {
  if (!latitude || !longitude) {
    return <p>Location data is unavailable.</p>;
  }

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} icon={customIcon} />
    </MapContainer>
  );
};

export default MapComponent;
