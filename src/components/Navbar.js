import React, { useContext } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Login, Logout } from "@mui/icons-material";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const authContext = useContext(AuthContext);
  let navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit">
          <DensityMediumIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Blogs Website
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate("/")} color="inherit">
            Home
          </Button>
          <Button onClick={() => navigate("/addBlog")} color="inherit">
            Add Blog
          </Button>
          {!authContext.isAuth ? (
            <Button
              onClick={() => navigate("/SignIn")}
              color="inherit"
              endIcon={<Login />}
            >
              {" "}
              Login
            </Button>
          ) : (
            <Button
              onClick={() => authContext.logout()}
              color="inherit"
              endIcon={<Logout />}
            >
              {" "}
              {authContext.user.username}
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
