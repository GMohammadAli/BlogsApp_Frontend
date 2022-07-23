import React, { useContext } from 'react'
import Form from '../components/Form'
import { AuthContext } from "../context/AuthContext";
import { Box, Container, Typography } from '@mui/material';
import LogInAsk from '../shared/AddBlog';

function NewBlog() {
  const authContext = useContext(AuthContext)
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
            Create a Blog
          </Typography>
            <Form form="addForm" />{" "}
          </Box>
      ) : (
        <LogInAsk />
      )}
    </Container>
  );
}

export default NewBlog