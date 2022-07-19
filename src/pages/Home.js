import { Login } from '@mui/icons-material'
import { Container, Typography, Button } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import CardLayout from '../components/CardLayout'
import { AuthContext } from '../context/AuthContext'

function Home() {
  const authContext = useContext(AuthContext)
  let navigate = useNavigate()
  return (
    <Container>
      {!authContext.isAuth ? (
        <Container
          maxWidth="xs"
          style={{
            padding:"6rem"
          }}
        ><Typography
            variant="h5"
            component="h2"
            gutterBottom
            style={{ textAlign: "center" }}
            sx={{ m: 3 }}
          >
            Please Login First
          </Typography>
          <Button
            type="submit"
            color="secondary"
            size="md"
            variant="contained"
            fullWidth
            onClick={()=>{navigate('/signIn')}}
            disableElevation
            endIcon={<Login />}
            sx={{ m: 1 }}
          >
            Login
          </Button>
        </Container>
      ) : (
        <CardLayout />
      )}
    </Container>
  );
}

export default Home