import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import {
    Avatar,
  Box,
  // eslint-disable-next-line
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Container,
  // eslint-disable-next-line
  Grid,
  IconButton,
  // eslint-disable-next-line
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BlogContext } from "../context/BlogContext";
import { CommentContext } from "../context/CommentContext";
import { LikeContext } from "../context/LikeContext";
import LogInAsk from "../shared/LogInAsk";
import Person from "@mui/icons-material/Person";

function BlogPage() {
  const { blog_id } = useParams();
  const authContext = useContext(AuthContext);
  const blogContext = useContext(BlogContext);
  const likeContext = useContext(LikeContext);
  const commentContext = useContext(CommentContext);

  const getAuthorName = () => {
    let username = ""
    authContext.users.map((user) => {
        if (user.id === blogContext.blog.user_id) {
            username = user.username;
        }
        })
    return username
  }

  const getCommentAuthorName = () => {
    let username = "";
    authContext.users.map((user) => {
      let Comment = {}
      commentContext.comments.map((comment) => {
        if (blogContext.blog.id === comment.blog_id) {
          Comment = comment
        }
      })
    if (Comment.user_id === user.id) {
        username = user.username
    }
    })
    return username;
  };

  useEffect(() => {
    blogContext.getBlog(blog_id);
    likeContext.getLikes();
    commentContext.getComments();
    authContext.getUsers()
    // eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="md">
      {authContext.isAuth ? (
        <Box>
          <Card>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              style={{ textAlign: "center" }}
              sx={{ m: 3 }}
            >
              {blogContext.blog.title}
            </Typography>
            <Typography variant="h6" component="h1" gutterBottom sx={{ m: 3 }}>
              {blogContext.blog.description}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ textAlign: "right" }}
              gutterBottom
              sx={{ m: 2 }}
            >
              By {getAuthorName()}
            </Typography>
          </Card>
          {commentContext.comments.map((comment) => (
            <Box sx={{ mt: 2 }}>
              {comment.blog_id === blogContext.blog.id ? (
                <Card elevation={1}>
                  <CardHeader
                    avatar={<Avatar><Person /></Avatar>}
                    action={
                      <ButtonGroup>
                        <IconButton
                          onClick={() => commentContext.deleteComment(comment)}
                        >
                          <DeleteOutlined />
                        </IconButton>
                        <IconButton
                        // onClick={() => {
                        //   commentContext.comment = {
                        //     id: comment.id,
                        //     description: comment.description
                        //   };
                        //   navigate("/updatecomment");
                        // }}
                        >
                          <EditOutlined />
                        </IconButton>
                      </ButtonGroup>
                    }
                    title={getCommentAuthorName()}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      {comment.description}
                    </Typography>
                  </CardContent>
                </Card>
              ) : (
                console.log()
              )}
            </Box>
          ))}
        </Box>
      ) : (
        <LogInAsk />
      )}
    </Container>
  );
}

export default BlogPage;
