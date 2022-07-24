import React, { createContext, useState, useContext, useEffect  } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const BlogContext = createContext();

function BlogProvider({ children }) {
  const authContext = useContext(AuthContext);
  const [isBlogPresent, setIsBlogPresent] = useState(false)
  const [blog, setBlog] = useState({});
  const [blogs, setBlogs] = useState([]);
  const headers = {
    "Authorization": authContext.token,
    "Content-Type": "application/json",
  };

   useEffect(() => {
     if (authContext.isAuth && blogs.length === 0) {
       getBlogs();
     }
     // eslint-disable-next-line
   },[])

  //  Function - Route - Method
  //getBlogs - url/users/{user.id}/blogs - GET
  const getBlogs = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/users/${authContext.user.id}/blogs`,
        { headers }
      )
      .then((response) => {
        setBlogs(response.data)
        setIsBlogPresent(true)
      })
      .catch((err) => {
        console.log(err)
      });
  };

  //getBlog - url/users/{user.id}/blogs/{blog.id} - GET
  const getBlog = async (id) => {
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/users/${authContext.user.id}/blogs/${id}`,
        {headers}
      )
      .then((response) => {
        setBlog(response.data)
        setIsBlogPresent(true);
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
       .then(() => {
         getBlogs()
       })
       .catch((err) => {
         console.log(err);
       });


  }

  //updateBlog - url/users/{user.id}/blogs/{blog.id} - PUT/PATCH
  const updateBlog = async (blog) => {
    await axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/users/${authContext.user.id}/blogs/${blog.id}`,
        blog,
        { headers }
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
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/users/${authContext.user.id}/blogs/${blog.id}`,
       {headers}
      )
      .then(() => {
        getBlogs()
      })
      .catch((err) => {
        console.log(err)
      });
  };

  return (
    <BlogContext.Provider
      value={{
        blog: blog,
        blogs: blogs,
        isBlogPresent : isBlogPresent,
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

export default BlogProvider
export { BlogContext }