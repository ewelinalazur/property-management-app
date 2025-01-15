import Container from "@mui/material/Container";
import Dashboard from "./dashboard/Dashboard";
import Header from "./dashboard/DashboardHeader";
import { NotificationProvider } from "./context/NotificationContext";

const App = () => {
  return (
    <NotificationProvider>
      <Header />
      <Container maxWidth="lg">
        <Dashboard />
      </Container>
    </NotificationProvider>
  );
};

export default App;
