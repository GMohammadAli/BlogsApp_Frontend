import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { BlogContext } from "./BlogContext";

const LikeContext = createContext();

function LikeProvider({ children }) {
  const authContext = useContext(AuthContext);
  const blogContext = useContext(BlogContext);
  // eslint-disable-next-line
  const [like, setLike] = useState({});
  const [likes, setLikes] = useState([]);
  const headers = {
    Authorization: authContext.token,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    if (authContext.isAuth) {
      blogContext.getBlogs();
    }
    if (blogContext.isBlogPresent) {
      getLikes();
    }
    // eslint-disable-next-line
  }, []);

  //Function - Route - Method
  //getLikes -  process.env.REACT_APP_BACKEND_URL/users/${user.id}/blogs/${blog.id}/likes/ - GET
  const getLikes = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/users/${authContext.user.id}/blogs/${blogContext.blog.id}/likes`,
        { headers }
      )
      .then((response) => {
        setLikes(response.data);
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //getLike - process.env.REACT_APP_BACKEND_URL/users/${user.id}/blogs/${blog.id}/likes/${like.id} - GET - No Need

  //addLike - process.env.REACT_APP_BACKEND_URL/users/${user.id}/blogs/${blog.id}/likes/${like.id} - POST
  const addLike = async (blogId , like) => {
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/users/${authContext.user.id}/blogs/${blogId}/likes`,
        like,
        { headers }
      )
      .then(() => {
        getLikes()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //updateLike - process.env.REACT_APP_BACKEND_URL/users/${user.id}/blogs/${blog.id}/likes/${like.id} - PUT/PATCH
  const updateLike = async (like) => {
    await axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/users/${authContext.user.id}/blogs/${blogContext.blog.id}/likes/${like.id}`,
        like,
        { headers }
      )
      .then((response) => {
        console.log(response.data);
        getLikes();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //deleteLike - process.env.REACT_APP_BACKEND_URL/users/${user.id}/blogs/${blog.id}/likes/${like.id} - DELETE
  const deleteLike = async (like) => {
    await axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/users/${authContext.user.id}/blogs/${blogContext.blog.id}/likes/${like.id}`,
        { headers }
      )
      .then(() => {
        getLikes();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <LikeContext.Provider
      value={{
        like: like,
        likes: likes,
        getLikes: getLikes,
        addLike: addLike,
        updateLike: updateLike,
        deleteLike: deleteLike,
      }}
    >
      {children}
    </LikeContext.Provider>
  );
}

export default LikeProvider;
export { LikeContext };





