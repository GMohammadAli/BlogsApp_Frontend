import { Card, Button, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import React, { useContext, useState, useEffect} from 'react'
import BlogImage from "../assets/design-blogs.jpg"
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { BlogContext } from '../context/BlogContext';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from '../context/AuthContext';
import {  useNavigate } from 'react-router-dom';

function IndividualCard() {
  let navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const blogContext = useContext(BlogContext)
  const [isLiked , setIsLiked] = useState(false)
  const handleClick = ()  => {
    setIsLiked(true)
  }
  useEffect(() => {
    blogContext.getBlogs()
  }, [])

  return (
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
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={BlogImage}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {blog.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {blog.description}
              </Typography>
            </CardContent>
            {authContext.user.id === blog.user_id ? (
              <Grid
                container
                maxWidth
                variant="contained"
                aria-label="outlined primary button group"
              >
                {console.log(blog.user_id + " " + authContext.user.id)}
                <Grid item xs={4}>
                  {!isLiked ? (
                    <Button
                      startIcon={<FavoriteBorderIcon />}
                      onClick={handleClick}
                    >
                      No of Likes
                    </Button>
                  ) : (
                    <Button startIcon={<FavoriteIcon />}>No of Likes</Button>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <Button startIcon={<ModeCommentIcon />}>
                    No of Comments
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    onClick={() => {
                      blogContext.setBlog = blog
                      navigate("/updateBlog");
                    }}
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid
                container
                maxWidth
                variant="contained"
                aria-label="outlined primary button group"
              >
                {console.log(blog.user_id + " " + authContext.user.id)}
                <Grid item xs={6}>
                  {!isLiked ? (
                    <Button
                      startIcon={<FavoriteBorderIcon />}
                      onClick={handleClick}
                    >
                      No of Likes
                    </Button>
                  ) : (
                    <Button startIcon={<FavoriteIcon />}>No of Likes</Button>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Button startIcon={<ModeCommentIcon />}>
                    No of Comments
                  </Button>
                </Grid>
              </Grid>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default IndividualCard