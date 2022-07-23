import React, { useContext } from "react";
import Form from "../components/Form";
import { AuthContext } from "../context/AuthContext";
import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import LogInAsk from "../shared/LogInAsk";


function UpdateBlog() {
  const authContext = useContext(AuthContext)
  const { blog_id } = useParams();
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
          <Form blogId={blog_id} form="editForm" />{" "}
        </Box>
      ) : (
        <LogInAsk />
      )}
    </Container>
  );
}

export default UpdateBlog;
