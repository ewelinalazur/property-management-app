import Container from '@mui/material/Container';
import PropertyDashboard from './pages/dashboard/Dashboard';
import { NotificationProvider } from './context/NotificationContext';
import { Header } from './components/custom/Header/Header';

const App = () => {
  return (
    <NotificationProvider>
      <Header label="Dashboard" />
      <Container maxWidth="lg">
        <PropertyDashboard />
      </Container>
    </NotificationProvider>
  );
};

export default App;
