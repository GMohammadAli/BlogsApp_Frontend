import { Box, Grid, Typography } from '@mui/material';
import React from 'react'

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#D8C3A5",
        position: "fixed",
        left: "0",
        bottom: "0",
        right: "0",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <Typography sx={{ m: 2, textAlign: "center" }} color="textSecondary">
            Copyright <sup>©</sup> 2022 All rights reserved
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Grid container>
            <Grid item xs={6}>
              <Typography
                sx={{ m: 2, textAlign: "right" }}
                color="textSecondary"
              >
                Privacy policy
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{ m: 2, textAlign: "center" }}
                color="textSecondary"
              >
                Terms & condition
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer