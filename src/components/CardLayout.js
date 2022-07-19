import { Box, Container } from "@mui/material";
import React from 'react'
import IndividualCard from "../components/IndividualCard";

function CardLayout() {
  return (
    <Box>
      <Container>
        <IndividualCard />
      </Container>
    </Box>
  );
}

export default CardLayout