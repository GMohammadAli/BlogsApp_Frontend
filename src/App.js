import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home";
import AuthProvider from "./context/AuthContext";
import BlogProvider from "./context/BlogContext";
import { Box, createTheme, Grid, ThemeProvider } from "@mui/material";
import NewBlogForm from "./pages/NewBlogForm";
import UpdateBlogForm from "./pages/UpdateBlogForm";
import CommentProvider from "./context/CommentContext";
import BlogPage from "./pages/BlogPage";
import Footer from "./components/Footer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D8C3A5",
      contrastText: "#383838",
    },
    secondary: {
      main: "#E98074",
      contrastText: "#383838",
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BlogProvider>
          <CommentProvider>
            <Router>
              <Navbar />
              <Box minHeight="100vh" sx={{ backgroundColor: "#EAE7DC"}}>
                <Grid container style={{ display: "flex", padding: "6rem" }}>
                  <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/signIn" element={<SignIn />} />
                    <Route path="/addBlog" element={<NewBlogForm />} />
                    <Route
                      path="/updateBlog/:blog_id"
                      element={<UpdateBlogForm />}
                    />
                    <Route path="/blog/:blog_id/:isLiked" element={<BlogPage />} />
                  </Routes>
                </Grid>
              </Box>
              <Footer />
            </Router>
          </CommentProvider>
        </BlogProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
