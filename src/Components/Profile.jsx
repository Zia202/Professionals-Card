import React from "react";
import { useState, useEffect } from "react";
import {
  Paper,
  Avatar,
  Grid,
  Divider,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { grey } from '@mui/material/colors';

const Profile = () => {
  return (
    <>
      <Paper
        sx={{
          padding: "10px",
          margin: "3%",
          backgroundColor: "#272727",
          borderRadius: "20px",
        }}
        elevation={8}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Box sx={{ position: "absolute", top: "100px", left: "250px" }}>
              <img
                src='https://flagcdn.com/16x12/pk.png'
                srcset='https://flagcdn.com/32x24/pk.png 2x,
                         https://flagcdn.com/48x36/pk.png 3x'
                width='16'
                height='12'
                alt='Countries Flags'
              />
            </Box>
            <Stack
              direction='column'
              spacing={1}
              display='flex'
              justifyContent='center'
              alignItems='center'
              pt={4}
            >
              <Avatar
                alt='avatar'
                src='avatar-removebg-preview.png'
                sx={{
                  width: "150px",
                  height: "150px",
                  border: "solid 2px black",
                }}
              />
              <Typography sx={{ color: "#e2e2e2" }} variant='h5'>
                Zia Ullah Sarwar
              </Typography>
             
            </Stack>
            <Paper sx={{backgroundColor:"#e2e2e2", borderRadius:"10px", padding:"10px", maxWidth:"200px", boxShadow:"5px white"}} elevation={0}>
              <Typography variant="caption">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              eos fuga minus delectus quisquam.</Typography>
            </Paper>
          </Grid>
        {/* <Divider orientation="vertical" color={grey[400]} flexItem></Divider> */}
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8} p={4}>
            <Stack direction='column' spacing={2} sx={{ color: "#e2e2e2" }}>
              <Typography variant='h3'>Personal Information</Typography>
              <Typography variant='body1' sx={{ fontWeight: "bolder" }}>
                Name
              </Typography>
              <Typography variant='body2'>Zia Ullah Sarwar</Typography>
              <Typography variant='body1' sx={{ fontWeight: "bolder" }}>
                E-mail
              </Typography>
              <Typography variant='body2'>ziasarwar20297@gmail.com</Typography>
              <Typography variant='body1' sx={{ fontWeight: "bolder" }}>
                Phone No
              </Typography>
              <Typography variant='body2'>+92-320-4341299</Typography>
              <Typography variant='body1' sx={{ fontWeight: "bolder" }}>
                Address
              </Typography>
              <Typography variant='body2'>881 Faisal town Lahore</Typography>
              <Typography variant='body1' sx={{ fontWeight: "bolder" }}>
                Country
              </Typography>
              <Typography variant='body2'>Pakistan</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Profile;
