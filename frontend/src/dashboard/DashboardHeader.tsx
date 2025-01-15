import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const Header = () => {
  return (
    <AppBar position="static" elevation={6} sx={{ marginBottom: 2 }}>
      <Toolbar>
        <Typography variant="h5" sx={{ marginLeft: 5 }}>
          Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
