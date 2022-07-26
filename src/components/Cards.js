import { Card, Button, CardContent, CardMedia, Typography, Grid, Box ,Container, Badge } from '@mui/material';
import React, { useContext, useEffect} from 'react'
import BlogImage from "../assets/design-blogs.jpg"
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { BlogContext } from '../context/BlogContext';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from '../context/AuthContext';
import {  useNavigate } from 'react-router-dom';
import { CommentContext } from '../context/CommentContext';

function Cards() {
  let navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const blogContext = useContext(BlogContext);
  const commentContext = useContext(CommentContext);

  const handleLikeBtnClick = (blogId) => {
    blogContext.addLike(blogId, {
      liked_by: authContext.user.id,
    });
  };

  function getNoOfLikes(blogId) {
    let count = 0
    // eslint-disable-next-line
    blogContext.likes.map((like) => {
      if (like.blog_id === blogId) {
        count++
      }
    });
    return count
  }

  function getNoOfComments(blogId) {
    let count = 0
    // eslint-disable-next-line
    commentContext.comments.map((comment) => {
      if (comment.blog_id === blogId) {
        count++
      }
    });
    return count
  }

 
  const getIsLiked = (blog) => {
    // eslint-disable-next-line
    blogContext.likes.map((like) => {
      if (like.blog_id === blog.id && authContext.user.id === like.user_id) {
        blog.isLiked = "1";
      }
    });
  };

  useEffect(() => {
    blogContext.getBlogs();
    blogContext.getLikes();
    if (blogContext.isBlogPresent) {
      commentContext.getComments();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Box>
      <Container>
        <Grid
          container
          style={{
            display: "flex",
            padding: "3rem",
            justifyContent: "center",
            alignContent: "center",
          }}
          spacing={4}
        >
          {blogContext.blogs.map((blog) => (
            <Grid item xs={4} key={blog.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={BlogImage}
                  alt="blogImage"
                />
                {getIsLiked(blog)}
                <CardContent
                  onClick={() => {
                    navigate(`/blog/${blog.id}/${blog.isLiked}`);
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ textAlign: "center", color: "#E85A4F" }}
                  >
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" sx={{ m: 1, color: "#8E8D8A" }}>
                    {blog.description}
                  </Typography>
                </CardContent>
                <Grid
                  container
                  maxWidth
                  variant="contained"
                  aria-label="outlined primary button group"
                >
                  <Grid item xs={5}>
                    {blog.isLiked === "1" ? (
                      <Button
                        startIcon={<FavoriteIcon />}
                        sx={{ m: 2 }}
                        color="secondary"
                        onClick={() => {
                          alert("The Blog is Already Liked!");
                        }}
                      >
                        {getNoOfLikes(blog.id)} Likes
                      </Button>
                    ) : (
                      <Button
                        startIcon={<FavoriteBorderIcon />}
                        onClick={() => {
                          handleLikeBtnClick(blog.id);
                        }}
                        sx={{ m: 2 }}
                        color="secondary"
                      >
                        {getNoOfLikes(blog.id)} Likes
                      </Button>
                    )}
                  </Grid>
                  <Grid item xs={7}>
                    <Button
                      startIcon={<ModeCommentIcon />}
                      sx={{ m: 2 }}
                      color="secondary"
                    >
                      <Badge
                        badgeContent={getNoOfComments(blog.id)}
                        color="secondary"
                      >
                        Comments
                      </Badge>
                    </Button>
                  </Grid>
                </Grid>
                {authContext.user.id === blog.user_id ? (
                  <Grid
                    container
                    maxWidth
                    variant="contained"
                    aria-label="outlined primary button group"
                  >
                    <Grid item xs={6}>
                      <Button
                        onClick={() => {
                          navigate(`/updateBlog/${blog.id}`);
                        }}
                        sx={{ mx: 2, my: 1 }}
                        color="secondary"
                      >
                        Update
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        onClick={() => {
                          blogContext.deleteBlog(blog);
                          navigate("/");
                        }}
                        sx={{ mx: 3, my: 1 }}
                        color="secondary"
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  console.log()
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Cards
