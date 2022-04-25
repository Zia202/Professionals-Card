import React from "react";
import { useState, useEffect } from "react";
import { Paper, Avatar, Grid, Typography, Stack, Box } from "@mui/material";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { grey } from '@mui/material/colors';


const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);
  useEffect(() => {
    axios
      .get("https://625f910092df0bc0f3367d6b.mockapi.io/api/v1/Users")
      .then((res) => {
        setProfessionals(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
         <Typography
         variant='h3'
        display='flex'
        justifyContent='center'
        alignItems='center'
        p={5}
        color={grey[300]}
      >
        Hire The Best Professionals
      </Typography>
      
      <Grid container spacing={3} p={6}>
        {professionals.map((item) => (
         
             <Grid item xs={12} sm={6} md={4} lg={4} xl={4} mb={8}>
             
               <Paper elevation={4} sx={{ padding: "10px", minHeight:'280px', borderRadius:'15px'}}>
               
              <Stack
                direction='column'
                display='flex'
                justifyContent='center'
                alignItems='center'
                sx={{ transform: "translate(0%, -40%)" }}
              >
                <Link to={`/Profile/${item.id}`}>
                <Avatar
                  alt='avatar'
                  src='user.jpg'
                  sx={{
                    width: "115px",
                    height: "115px",
                    border: "solid 5px white",
                    boxShadow:5
                  }}
                />
                                </Link>

                <Typography variant='h6' p={1}>
                  {item.name}
                </Typography>
                <Typography variant='caption'>{item.email}</Typography>
              </Stack>
              <Box sx={{ transform: "translate(308px, -162px)" }}
>
                 <img
                  src={`https://flagcdn.com/16x12/${item.countryCode.toLowerCase()}.png`}
                  srcset={`https://flagcdn.com/32x24/${item.countryCode.toLowerCase()}.png 2x,
                         https://flagcdn.com/48x36/${item.countryCode.toLowerCase()}.png 3x`}
                  width='18'
                  height='16'
                  alt='Countries Flags'
                /> 
               </Box>
              <Stack direction='row' pl={3}>
                <FaPhoneAlt />
                <Typography variant='caption' ml={1}>
                  {item.phoneNo}
                </Typography>
              </Stack>
              <Stack direction='row' pt={1} pl={3}>
                <FaMapMarkerAlt />
                <Typography variant='caption' ml={1}>
                  {item.address}, {item.state}, {item.city} {item.country}
                </Typography>
              </Stack>
            </Paper> 
          </Grid>
         
        ))}
      </Grid>
    </>
  );
};

export default Professionals;
