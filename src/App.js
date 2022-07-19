import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home";
import AuthProvider from "./context/AuthContext";
import BlogProvider from "./context/BlogContext";
import { Box, createTheme, Grid, ThemeProvider } from "@mui/material";
import NewBlog from "./pages/NewBlog";
import UpdateBlog from "./pages/UpdateBlog";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9c27b0",
      contrastText: "#383838",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BlogProvider>
          <Router>
            <Navbar />
            <Box>
              <Grid container style={{ display: "flex", padding: "6rem" }}>
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/signUp" element={<SignUp />} />
                  <Route path="/signIn" element={<SignIn />} />
                  <Route path="/addBlog" element={<NewBlog />} />
                  <Route path="/updateBlog" element={<UpdateBlog />} />
                </Routes>
              </Grid>
            </Box>
          </Router>
        </BlogProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
