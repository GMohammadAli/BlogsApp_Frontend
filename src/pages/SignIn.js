import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { AuthContext } from "../context/AuthContext";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function SignIn() {
  let navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const values = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    authContext.loginUser(values);
  };
  return (
  <Container
    maxWidth="xs"
    style={{
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
    }}
  >
    {!authContext.isAuth ? (
      <Box>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          style={{ textAlign: "center" }}
          sx={{ m: 3 }}
        >
          Sign in to your Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            variant="outlined"
            name="email"
            color="secondary"
            fullWidth
            required
            sx={{ m: 1 }}
          />
          <TextField
            label="Password"
            name="password"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            sx={{ m: 1 }}
          />
          <Button
            type="submit"
            color="secondary"
            size="md"
            variant="contained"
            fullWidth
            disableElevation
            endIcon={<LoginIcon />}
            sx={{ m: 1 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs={5}></Grid>
            <Grid item xs={7}>
              <a href="/SignUp">Don't have an account? Sign Up</a>
            </Grid>
          </Grid>
        </Box>
      </Box>
    ) : (
      <Box>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          style={{ textAlign: "center" }}
          sx={{ m: 3 }}
        >
          {" "}
          Welcome {authContext.user.username}{" "}
        </Typography>
        <Button
          type="submit"
          color="secondary"
          size="md"
          variant="contained"
          fullWidth
          disableElevation
          onClick={() => navigate("/addBlog")}
          endIcon={<Add />}
          sx={{ m: 1 }}
        >
          Add Blog
        </Button>
      </Box>
    )}
  </Container>
  );
}

export default SignIn;
