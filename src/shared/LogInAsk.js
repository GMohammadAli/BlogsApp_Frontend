import React from 'react'
import { Login } from "@mui/icons-material";
import { Box,Container, Button,  Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';



function LogInAsk() {
  let navigate = useNavigate();
  return (
    <Container
      maxWidth="xs"
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Box>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          style={{ textAlign: "center" }}
          sx={{ m: 3 }}
        >
          Please Login First
        </Typography>
        <Button
          type="submit"
          color="secondary"
          size="md"
          variant="contained"
          fullWidth
          disableElevation
          sx={{ m: 1 }}
          onClick={() => navigate("/SignIn")}
          endIcon={<Login />}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default LogInAsk