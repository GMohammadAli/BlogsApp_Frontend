import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";


function Form({blogId , form}) {
  let navigate = useNavigate();
  const blogContext = useContext(BlogContext);
  const [blog, setBlog] = useState({})
  useEffect(() => {
    if (form === "editForm") {
      blogContext.getBlog(blogId);
    }
    // eslint-disable-next-line
  },[])

  //to make it asynchronous
  useEffect(()=> (setBlog(blogContext.blog)), 
  [blogContext.blog]
  )
  
  const handleTitleChange = (e) => {
    setBlog({...blog, title: e.target.value})
  }
  const handleDescChange = (e)=> {
      setBlog({ ...blog, description: e.target.value })
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const values = {
      id: blogId,
      title: blog.title,
      description: blog.description,
    };
    if(form === 'addForm'){
      console.log("ADDED")
      blogContext.addBlog(values)
    }else if ( form === "editForm"){
      console.log("UPDATED")
      blogContext.updateBlog(values)
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
        value={blog.title || ""}
        onChange={handleTitleChange}
        fullWidth
        required
        sx={{ m: 1 }}
      />
      <TextField
        label="Description"
        name="description"
        variant="outlined"
        value={blog.description || ""}
        color="secondary"
        onChange={handleDescChange}
        fullWidth
        required
        sx={{ m: 1 }}
      />
      {form === "editForm" ? (
        <Button
          type="submit"
          color="secondary"
          size="md"
          variant="contained"
          fullWidth
          disableElevation
          endIcon={<UpgradeIcon />}
          sx={{ m: 1 }}
        >
          Update Blog
        </Button>
      ) : (
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
      )}
    </Box>
  );
}

export default Form;
