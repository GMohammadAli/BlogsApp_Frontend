import { Box, Button, Typography } from '@mui/material';
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function AddBlog() {
let navigate = useNavigate()
const authContext = useContext(AuthContext)
  return (
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
  );
}

export default AddBlog