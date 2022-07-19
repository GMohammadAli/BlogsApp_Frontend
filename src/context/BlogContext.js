import React, { createContext, useState, useContext, useEffect  } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const BlogContext = createContext();

function BlogProvider({ children }) {
  const authContext = useContext(AuthContext);
  const [blog, setBlog] = useState({});
  const [blogs, setBlogs] = useState([]);
   const headers = {
     Authorization: authContext.token,
     "Content-Type": "application/json",
   };

   useEffect(()=>{
     getBlogs()
   },[])

  //  Function - Route - Method
  //getBlogs - url/users/{user.id}/blogs - GET
  const getBlogs = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/users/${authContext.user.id}/blogs`,
        {headers}
      )
      .then((response) => {
        setBlogs(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //getBlog - url/users/{user.id}/blogs/{blog.id} - GET
  const getBlog = async (blog) => {
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/users/${authContext.user.id}/blogs/${blog.id}`,
        headers
      )
      .then((response) => {
        setBlog(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //addBlog - url/users/{user.id}/blogs - POST
  const addBlog = async (blog) => {
     await axios
       .post(
         `${process.env.REACT_APP_BACKEND_URL}/users/${authContext.user.id}/blogs`,
         blog,
         {headers}
       )
       .then((response) => {
         getBlogs()
         console.log(response.data)
       })
       .catch((err) => {
         console.log(err);
       });


  }

  //updateBlog - url/users/{user.id}/blogs/{blog.id} - PUT/PATCH
  const updateBlog = async (blog) => {
    await axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/users/${authContext.user.id}/blogs/${blog.id}`,
        headers,
        blog
        )
        .then(response => {
            console.log(response.data)
            getBlogs()
        })
        .catch(err => {
            console.log(err)
        })
  }


  //deleteBlog - url/users/{user.id}/blogs/{blog.id} - DELETE
  const deleteBlog = async (blog) => {
    await axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/users/${authContext.user.id}/blogs/${blog.id}`,
        headers
      )
      .then((response) => {
        console.log(response.data);
        getBlogs();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <BlogContext.Provider
      value={{
        blog: blog,
        blogs: blogs,
        getBlog: getBlog,
        getBlogs: getBlogs,
        addBlog: addBlog,
        updateBlog: updateBlog,
        deleteBlog: deleteBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export default BlogProvider;
export { BlogContext };

