import { Add, DeleteOutlined, EditOutlined, Favorite, FavoriteBorder, Upgrade } from "@mui/icons-material";
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
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BlogContext } from "../context/BlogContext";
import { CommentContext } from "../context/CommentContext";
import LogInAsk from "../shared/LogInAsk";
import Person from "@mui/icons-material/Person";

function BlogPage() {
  const { blog_id , isLiked} = useParams();
  let navigate = useNavigate()
  const authContext = useContext(AuthContext);
  const blogContext = useContext(BlogContext);
  const commentContext = useContext(CommentContext);
  const [isSetToUpdate, setisSetToUpdate] = useState(false)
  const [comment , setComment] = useState({})

  const getAuthorName = () => {
    let username = "";
    // eslint-disable-next-line
    authContext.users.map((user) => {
      if (user.id === blogContext.blog.user_id) {
        username = user.username;
      }
    });
    return username;
  }

  const getCommentAuthorName = () => {
    let username = "";
    // eslint-disable-next-line
    authContext.users.map((user) => {
      let Comment = {};
      // eslint-disable-next-line
      commentContext.comments.map((comment) => {
        if (blogContext.blog.id === comment.blog_id) {
          Comment = comment;
        }
      });
      if (Comment.user_id === user.id) {
        username = user.username;
      }
    });
    return username;
  };

  const handleLikeBtnClick = (blogId) => {
    blogContext.addLike(blogId, {
      liked_by: authContext.user.id,
    })
  };

  function getNoOfLikes(blogId) {
    let count = 0;
    // eslint-disable-next-line
    blogContext.likes.map((like) => {
      // eslint-disable-next-line
      if (like.blog_id == blogId) {
        count++;
      }
    });
    return count;
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    if(event.target.name === "Update") {
      commentContext.updateComment({
        id: comment.id,
        description: event.target.description.value,
      })
    }else{
      commentContext.addComment({
        description: event.target.description.value,
      })
    }
    if (isSetToUpdate) {
      setisSetToUpdate(false);
    }
    event.target.description.value = ""
    navigate(`/blog/${blog_id}/${isLiked}`)
  }

  const handleDescChange = (e) => {
    setComment({ ...comment , description: e.target.value });
  };


  useEffect(() => {
    blogContext.getBlog(blog_id)
    authContext.getUsers()
    // eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="lg">
      {authContext.isAuth ? (
        <Box>
          <Card style={{ backgroundColor: "#e3e0d5" }}>
            <CardHeader
              action={
                isLiked === "1" ? (
                  <Button
                    startIcon={<Favorite />}
                    sx={{ m: 2 }}
                    color="secondary"
                    variant="outlined"
                  >
                    {getNoOfLikes(blogContext.blog.id)}
                  </Button>
                ) : (
                  <Button
                    startIcon={<FavoriteBorder />}
                    onClick={() => {
                      handleLikeBtnClick(blogContext.blog.id);
                    }}
                    sx={{ m: 2 }}
                    color="secondary"
                    variant="contained"
                  >
                    {getNoOfLikes(blogContext.blog.id)}
                  </Button>
                )
              }
              title={
                <Typography
                  variant="h4"
                  component="h2"
                  gutterBottom
                  style={{ textAlign: "center", color: "#E85A4F" }}
                  sx={{ m: 3 }}
                >
                  {blogContext.blog.title}
                </Typography>
              }
            />
            <Typography
              variant="h6"
              component="h1"
              gutterBottom
              sx={{ m: 3, color: "#8E8D8A" }}
            >
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
                <Card
                  elevation={1}
                  key={comment.id}
                  style={{ backgroundColor: "#e3e0d5" }}
                >
                  <CardHeader
                    avatar={
                      <Avatar>
                        <Person />
                      </Avatar>
                    }
                    action={
                      <ButtonGroup>
                        <IconButton
                          onClick={() => commentContext.deleteComment(comment)}
                        >
                          <DeleteOutlined />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setisSetToUpdate(true);
                            const values = {
                              id: comment.id,
                              description: comment.description,
                            };
                            setComment(values);
                            commentContext.comment(values);
                          }}
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
          <Box>
            {!isSetToUpdate ? (
              <Box
                component="form"
                border={1}
                borderRadius={3}
                sx={{ m: 3 }}
                maxWidth="lg"
                onSubmit={onFormSubmit}
              >
                <Typography
                  variant="h5"
                  color="textSecondary"
                  style={{ textAlign: "center" }}
                  gutterBottom
                  sx={{ m: 2 }}
                >
                  Add a Comment
                </Typography>
                <TextField
                  label="Comment"
                  variant="outlined"
                  name="description"
                  color="secondary"
                  style={{ width: "-webkit-fill-available" }}
                  fullWidth
                  required
                  sx={{ m: 2 }}
                />
                <Button
                  type="submit"
                  color="secondary"
                  size="large"
                  variant="contained"
                  fullWidth
                  disableElevation
                  style={{ width: "-webkit-fill-available" }}
                  endIcon={<Add />}
                  sx={{ m: 1 }}
                >
                  Add Comment
                </Button>
                {/* )} */}
              </Box>
            ) : (
              <Box
                component="form"
                name="Update"
                border={1}
                borderRadius={3}
                sx={{ m: 3 }}
                maxWidth="lg"
                onSubmit={onFormSubmit}
              >
                <Typography
                  variant="h5"
                  color="textSecondary"
                  style={{ textAlign: "center" }}
                  gutterBottom
                  sx={{ m: 2 }}
                >
                  Update Comment
                </Typography>
                <TextField
                  label="Comment"
                  variant="outlined"
                  name="description"
                  onChange={handleDescChange}
                  value={comment.description || ""}
                  color="secondary"
                  style={{ width: "-webkit-fill-available" }}
                  fullWidth
                  required
                  sx={{ m: 2 }}
                />
                <Button
                  type="submit"
                  color="secondary"
                  size="md"
                  variant="contained"
                  style={{ width: "-webkit-fill-available" }}
                  fullWidth
                  disableElevation
                  endIcon={<Upgrade />}
                  sx={{ m: 1 }}
                >
                  Update Blog
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <LogInAsk />
      )}
    </Container>
  );
}

export default BlogPage;
