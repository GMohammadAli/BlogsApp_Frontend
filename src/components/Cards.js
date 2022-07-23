import { Card, Button, CardContent, CardMedia, Typography, Grid, Box ,Container } from '@mui/material';
import React, { useContext, useEffect} from 'react'
import BlogImage from "../assets/design-blogs.jpg"
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { BlogContext } from '../context/BlogContext';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from '../context/AuthContext';
import {  useNavigate } from 'react-router-dom';
import { LikeContext } from '../context/LikeContext';
import { CommentContext } from '../context/CommentContext';

function IndividualCard() {
  let navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const blogContext = useContext(BlogContext);
  const likeContext = useContext(LikeContext);
  const commentContext = useContext(CommentContext);
  let isLiked = false;
  const handleClick = () => {
    // setIsLiked(true)
    console.log("Like Clicked");
  };

  function getNoOfLikes(blogId) {
    let count = 0
    // eslint-disable-next-line
    likeContext.likes.map((like) => {
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

  // eslint-disable-next-line
  const getIsLiked = (blog) => {
    console.log(blog.id);
    likeContext.likes.map((like) =>
      like.blog_id === blog.id && authContext.user.id === like.user_id
        ? (isLiked = true)
        : (isLiked = false)
    );
  };

  useEffect(() => {
    blogContext.getBlogs();
    likeContext.getLikes();
    commentContext.getComments();
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
          spacing={6}
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
                <CardContent
                  onClick={() => {
                    navigate(`/blog/${blog.id}`);
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {blog.title} - {blog.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
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
                    {isLiked ? (
                      <Button startIcon={<FavoriteIcon />} sx={{ m: 1 }}>
                        Likes : {getNoOfLikes(blog.id)}
                      </Button>
                    ) : (
                      <Button
                        startIcon={<FavoriteBorderIcon />}
                        onClick={handleClick}
                        sx={{ m: 1 }}
                      >
                        Likes : {getNoOfLikes(blog.id)}
                      </Button>
                    )}
                  </Grid>
                  <Grid item xs={7}>
                    <Button startIcon={<ModeCommentIcon />} sx={{ m: 1 }}>
                      Comments : {getNoOfComments(blog.id)}
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
                        sx={{ mx: 3, my: 1 }}
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

export default IndividualCard