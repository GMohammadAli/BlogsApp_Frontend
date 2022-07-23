import { Container } from '@mui/material'
import React, { useContext } from 'react'
import Cards from '../components/Cards'
import { AuthContext } from '../context/AuthContext'
import LogInAsk from '../shared/LogInAsk'

function Home() {
  const authContext = useContext(AuthContext)
  return (
    <Container>
      {!authContext.isAuth ? (
        <LogInAsk />
      ) : (
        <Cards />
      )}
    </Container>
  );
}

export default Home