import React, { useContext , useEffect} from "react";
import Form from "../components/Form";
import { AuthContext } from "../context/AuthContext";
import { Login } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";

function UpdateBlog() {
  const authContext = useContext(AuthContext)
  const blogContext = useContext(BlogContext)
  let navigate = useNavigate();
  let blogToUpdate = {}
  useEffect(() => {
    blogToUpdate = blogContext.blog
  })
  return (
    <Container
      maxWidth="xs"
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {authContext.isAuth ? (
        <Box>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            style={{ textAlign: "center" }}
            sx={{ m: 3 }}
          >
            Update Blog
          </Typography>
          <Form  blog={blogToUpdate} form="editForm" />{" "}
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
      )}
    </Container>
  );
}

export default UpdateBlog;
