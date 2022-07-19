import React, { useContext } from "react";
import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";


function Form({blog , form}) {
  let navigate = useNavigate();
  const blogContext = useContext(BlogContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const values = {
      title: event.target.title.value,
      description: event.target.description.value
    };
    if(form === 'addForm'){
      blogContext.addBlog(values)
    }else if ( form === "editForm"){
      blogContext.updateBlog(values); 
    }
    navigate("/");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Title"
        name="title"
        variant="outlined"
        color="secondary"
        defaultValue={blog ? blog.title: ""}
        fullWidth
        required
        sx={{ m: 1 }}
      />
      <TextField
        label="Description"
        name="description"
        variant="outlined"
        defaultValue={blog ? (blog.description) : ""}
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
        endIcon={<AddIcon />}
        sx={{ m: 1 }}
      >
        Add Blog
      </Button>
    </Box>
  );
}

export default Form;
