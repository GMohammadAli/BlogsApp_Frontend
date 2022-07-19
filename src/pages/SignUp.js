import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";

function SignUp() {
  let navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const values = {
      name: event.target.name.value,
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };
    authContext.registerUser(values);
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
          >
            Create an Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              sx={{ m: 1 }}
            />
            <TextField
              label="User Name"
              name="username"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              sx={{ m: 1 }}
            />
            <TextField
              label="Email Address"
              name="email"
              variant="outlined"
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
            {/* To Do:
          <TextField
            label="Confirm Password"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            sx={{ m: 1 }}
          /> */}
            <Button
              type="submit"
              color="secondary"
              size="md"
              variant="contained"
              fullWidth
              disableElevation
              endIcon={<LockOpenIcon />}
              sx={{ m: 1 }}
            >
              REGISTER
            </Button>
            <Grid container>
              <Grid item xs={5}></Grid>
              <Grid item xs={7}>
                <a href="/SignIn">Already have an account?Sign In</a>
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
            onClick={() => navigate("/addBlogs")}
            endIcon={<Add />}
            sx={{ m: 1 }}
          >
            Add Blogs
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default SignUp;
