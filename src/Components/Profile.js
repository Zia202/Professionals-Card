import React from "react";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import {
  Paper,
  Avatar,
  Grid,
  Divider,
  Typography,
  Stack,
  Box,
  Button,
  IconButton,
  Menu,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiUpload } from "react-icons/fi";
import { BiEditAlt } from "react-icons/bi";

import axios from "axios";

const Profile = ({ profileData }) => {
  const [edit, setEdit] = useState(false);
  const { register, handleSubmit } = useForm();
  const params = useParams();

  const editHandler = () => {
    setEdit(true);
  };
  const cancelHandler = () => {
    setEdit(false);
  };

  const saveDataHandler = (data) => {
    const userData = axios.put(
      `https://625f910092df0bc0f3367d6b.mockapi.io/api/v1/Users/${params.id}`
        .data
    );
    console.log("data", data);
    if (userData) {
      setEdit(false);
    }
  };

  // ============================Menu Button================================
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // ================================================================

  return (
    <Paper
      sx={{
        padding: "10px",
        margin: "3%",
        borderRadius: "20px",
      }}
      elevation={8}
    >
      {/* ===================Menu Button==================== */}
      {/* <Button color="primary" variant="contained"
        sx={{ float: "right", margin:"10px", textTransform:"capitalize"}}>
           Edit <BiEditAlt />
        </Button> */}
      <IconButton
        id='basic-button'
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ float: "right" }}
      >
        <BsThreeDotsVertical />
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={editHandler}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      {/* ====================================================== */}
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Box sx={{ transform: "translate(80%, 350%)" }}>
            <img
              src={`https://flagcdn.com/16x12/${profileData.countryCode.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/32x24/${profileData.countryCode.toLowerCase()}.png 2x,
                         https://flagcdn.com/48x36/${profileData.countryCode.toLowerCase()}.png 3x`}
              width='20'
              height='16'
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
              src='user.jpg'
              sx={{
                width: "150px",
                height: "150px",
                border: "solid 5px white",
                boxShadow: 5,
              }}
            />
            <IconButton size="medium">
              <FiUpload color="error"></FiUpload>
            </IconButton>

            <Typography variant='h5'>{profileData.name}</Typography>
          </Stack>
          {/* <Paper sx={{backgroundColor:"#e2e2e2", borderRadius:"10px", padding:"10px", maxWidth:"200px", boxShadow:"5px white"}} elevation={0}>
              <Typography variant="caption">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              eos fuga minus delectus quisquam.</Typography>
            </Paper> */}
        </Grid>
        {/* <Divider orientation="vertical" color={grey[400]} flexItem></Divider> */}
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8} p={4}>
          <Box component='form' onSubmit={handleSubmit(saveDataHandler)}>
            <Stack direction='column' spacing={2}>
              <Typography variant='h3'>Personal Information</Typography>
              <Typography variant='body1' sx={{ fontWeight: "bolder" }}>
                Name
              </Typography>
              {!edit ? (
                <Typography variant='body2'>{profileData.name}</Typography>
              ) : (
                <TextField
                  size='small'
                  type='text'
                  autoComplete='none'
                  defaultValue={profileData.name}
                  {...register("name")}
                ></TextField>
              )}
              <Typography variant='body1' sx={{ fontWeight: "bolder" }}>
                E-mail
              </Typography>
              {!edit ? (
                <Typography variant='body2'>{profileData.email}</Typography>
              ) : (
                <TextField
                  size='small'
                  type='email'
                  autoComplete='none'
                  defaultValue={profileData.email}
                  {...register("email")}
                ></TextField>
              )}
              <Typography variant='body1' sx={{ fontWeight: "bolder" }}>
                Phone No
              </Typography>
              {!edit ? (
                <Typography variant='body2'>{profileData.phoneNo}</Typography>
              ) : (
                <TextField
                  size='small'
                  type='tel'
                  autoComplete='none'
                  defaultValue={profileData.phoneNo}
                  {...register("phoneNo")}
                ></TextField>
              )}
              <Typography variant='body1' sx={{ fontWeight: "bolder" }}>
                Address
              </Typography>
              {!edit ? (
                <Typography variant='body2'>
                  {profileData.address} {profileData.state} {profileData.city}{" "}
                  {profileData.country}
                </Typography>
              ) : (
                <TextField
                  size='small'
                  type='text'
                  autoComplete='none'
                  defaultValue={profileData.address}
                  {...register("address")}
                ></TextField>
              )}
              <Typography variant='body1' sx={{ fontWeight: "bolder" }}>
                Country
              </Typography>
              {!edit ? (
                <Typography variant='body2'>{profileData.country}</Typography>
              ) : (
                <>
                  <Select
                    size='small'
                    {...register("country")}
                    defaultValue={profileData.country}
                  >
                    <MenuItem>{profileData.country}</MenuItem>
                  </Select>
                  <Stack spacing={2} direction='row' mt={3}>
                    <Button
                      type='submit'
                      variant='contained'
                      color='success'
                      sx={{ width: "99px" }}
                    >
                      Save
                    </Button>
                    <Button
                      variant='contained'
                      onClick={cancelHandler}
                      color='error'
                      sx={{ width: "99px" }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </>
              )}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Profile;
