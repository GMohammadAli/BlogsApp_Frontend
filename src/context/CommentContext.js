
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { BlogContext } from "./BlogContext";

const CommentContext = createContext();

function CommentProvider({ children }) {
  const authContext = useContext(AuthContext);
  const blogContext = useContext(BlogContext);
  const [comment, setComment] = useState({});
  const [comments, setComments] = useState([]);
  const headers = {
    "Authorization": authContext.token,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    if (authContext.isAuth) {
      blogContext.getBlogs();
    }
    if (blogContext.isBlogPresent) {
      getComments();
    }
    // eslint-disable-next-line
  }, []);

  //Function - Route - Method
  //getComments -  process.env.REACT_APP_BACKEND_URL/users/${user.id}/blogs/${blog.id}/comments/ - GET
  const getComments = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/users/${authContext.user.id}/blogs/${blogContext.blog.id}/comments`,
        { headers }
      )
      .then((response) => {
        setComments(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //getComment - process.env.REACT_APP_BACKEND_URL/users/${user.id}/blogs/${blog.id}/comments/${comment.id} - GET
  const getComment = async (id) => {
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/users/${authContext.user.id}/blogs/${blogContext.blog.id}/comments/${id}`,
        { headers }
      )
      .then((response) => {
        setComment(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //addComment - process.env.REACT_APP_BACKEND_URL/users/${user.id}/blogs/${blog.id}/comments/${comment.id} - POST
  const addComment = async (comment) => {
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/users/${authContext.user.id}/blogs/${blogContext.blog.id}/comments/`,
        comment,
        { headers }
      )
      .then(() => {
        getComments();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //updateComment - process.env.REACT_APP_BACKEND_URL/users/${user.id}/blogs/${blog.id}/comments/${comment.id} - PUT/PATCH
  const updateComment = async (comment) => {
    await axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/users/${authContext.user.id}/blogs/${blogContext.blog.id}/comments/${comment.id}`,
        comment,
        { headers }
      )
      .then((response) => {
        getComments();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //deleteComment - process.env.REACT_APP_BACKEND_URL/users/${user.id}/blogs/${blog.id}/comments/${comment.id} - DELETE
  const deleteComment = async (comment) => {
    await axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/users/${authContext.user.id}/blogs/${blogContext.blog.id}/comments/${comment.id}`,
        { headers }
      )
      .then(() => {
        getComments();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CommentContext.Provider
      value={{
        comment: comment,
        comments: comments,
        getComment: getComment,
        getComments: getComments,
        addComment: addComment,
        updateComment: updateComment,
        deleteComment: deleteComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export default CommentProvider;
export { CommentContext };