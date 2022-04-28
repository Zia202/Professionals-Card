import React from "react";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
// import Select from 'react-select';
import countryList from 'react-select-country-list';
 import {
  Paper,
  Modal,
  Avatar,
  Grid,
   Typography,
  Stack,
  Divider,
  Box,
  Button,
  IconButton,
    MenuItem,
  TextField,
  Select
} from "@mui/material";
// import { BsThreeDotsVertical } from "react-icons/bs";
import { FiUpload } from "react-icons/fi";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { FiAlertCircle } from "react-icons/fi";
import axios from "axios";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#212121',
  borderRadius: '20px',
  border:"2px solid white",
  boxShadow: 24,
  color:"white",
  p: 4,
};

const Profile = ({ profileData, setProfileData }) => {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const { register, handleSubmit } = useForm();
  const params = useParams();
  // =======================Modal=============================
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setEdit(false);
    setOpen(false)};
// ============================================================
  // console.log("user data",profileData)
  

  const editHandler = () => {
    setEdit(true);
  };
  const cancelHandler = () => {
    setEdit(false);
  };
  const deleteHandler = async () => {
    const del = await axios.delete(
      `https://625f910092df0bc0f3367d6b.mockapi.io/api/v1/Users/${params.id}`
    );
    if (del) {
      navigate("/");
    }
  };
  const saveDataHandler = async (data) => {
    data.countryCode = value;
    options.forEach(element => {
      if(element.value === value){
        data.country = element.label;
      }
    });
    console.log("data",data);
    const userData = await axios.put(
      `https://625f910092df0bc0f3367d6b.mockapi.io/api/v1/Users/${params.id}`,
      data
    );

    // console.log("data", userData);
    if (userData) {
      
      setProfileData(userData.data);
      setEdit(false);
      
    }
  };

  // ============================Select Country================================
  const [value, setValue] = useState(profileData.countryCode)
  const options = useMemo(() => countryList().getData(), [])
console.log("outer value",value)
  const changeHandler = (event) => {
    console.log("value",event.target.value)
    setValue(event.target.value);
  }
// console.log("counteyr", options)
  // ============================Menu Button================================
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
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
      {/* ================================Modal============================ */}
      <Modal
        open={open}
        onClose={handleClose}
        
      >
        <Box sx={style}>
          <Typography  variant="body1" component="h2">
          <FiAlertCircle />
            Are you sure to delete your profile.</Typography> 
            <Stack direction="row" spacing={2}>
            <Button variant="contained" color="success" onClick={deleteHandler}>
            Yes
          </Button>
          <Button variant="contained" color="error" onClick={handleClose} >
            No
          </Button>
            </Stack>
          
        </Box>
      </Modal>
      
      {/* =======================Menu Button==================== */}

      {/* <IconButton
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
      </Menu> */}

      {!edit ? (
        <>
          <IconButton
            onClick={() => navigate("/")}
            color='error'
            sx={{ marginRight: "10px" }}
          >
            <BiArrowBack />
          </IconButton>
          <IconButton
            onClick={editHandler}
            color='primary'
            sx={{ float: "right", marginRight: "10px" }}
          >
            <BiEditAlt />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            color='success'
            onClick={cancelHandler}
            sx={{ float: "right", marginRight: "10px" }}
          >
            <MdOutlineCancel />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton
            color='error'
            sx={{ float: "right", marginRight: "10px" }}
          >
            <RiDeleteBin6Line onClick={handleOpen} />
          </IconButton>
        </>
      )}

      {/* ====================================================== */}
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Box sx={{transform:"translate(80%, 435%)"}}>
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
         {!edit ? (
           <> <Avatar
              alt='avatar'
              src='user.jpg'
              sx={{
                width: "150px",
                height: "150px",
                border: "solid 5px white",
                boxShadow: 5,
              }}
            />       
             <Typography variant='h5'>{profileData.name}</Typography>
             </>
           
         ):(
          <> <Avatar
          alt='avatar'
          src='user.jpg'
          sx={{
            width: "150px",
            height: "150px",
            border: "solid 5px white",
            boxShadow: 5,
          }}
        />       
         <Typography variant='h5'>{profileData.name}</Typography>
       
             <IconButton
              color='success'
              size='medium'
              component='label'
              sx={{ position: "relative", left: "100px", top: "-80px" }}
            >
              <input type='file' hidden />
              <FiUpload></FiUpload>
            </IconButton>
            </>
         )}
          </Stack>
          {/* <Paper sx={{backgroundColor:"#212121", borderRadius:"10px", padding:"10px", maxWidth:"200px", boxShadow:"5px white"}} elevation={0}>
              <Typography variant="caption">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              eos fuga minus delectus quisquam.</Typography>
            </Paper> */}
        </Grid>
        {/* <Divider orientation="vertical" flexItem /> */}

        <Grid item xs={12} sm={12} md={8} lg={8} xl={8} p={3}>
          <Paper
            sx={{
              padding: "20px 20px 20px 20px",
              maxWidth: "80%",
              color: "white",
              backgroundColor: "#212121",
              borderRadius: "20px",
            }}
            component='form'
            onSubmit={handleSubmit(saveDataHandler)}
          >
            <Stack direction='column' spacing={2}>
              <Typography variant='h3'>Personal Information</Typography>
              <Typography variant='body1' sx={{ fontWeight: "bolder" }}>
                Name
              </Typography>
              {!edit ? (
                <Typography variant='body2'>{profileData.name}</Typography>
              ) : (
                <TextField
                sx={{
                  input:{color:"white"},
                  "& .MuiOutlinedInput-root": {
                     "& fieldset": {
                       borderColor: "white",
                      },
                    "&:hover fieldset": {
                      borderColor: "white",
                      },
                    "&.Mui-focused fieldset": {
                       borderColor: "white",
                      },
                  },
                }}
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
                sx={{
                  input:{color:"white"},
                  "& .MuiOutlinedInput-root": {
                     "& fieldset": {
                       borderColor: "white",
                      },
                    "&:hover fieldset": {
                      borderColor: "white",
                      },
                    "&.Mui-focused fieldset": {
                       borderColor: "white",
                      },
                  },
                }}                    size='small'
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
                  sx={{
                    input:{color:"white"},
                    "& .MuiOutlinedInput-root": {
                       "& fieldset": {
                         borderColor: "white",
                        },
                      "&:hover fieldset": {
                        borderColor: "white",
                        },
                      "&.Mui-focused fieldset": {
                         borderColor: "white",
                        },
                    },
                  }}
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
                sx={{
                  input:{color:"white"},
                  "& .MuiOutlinedInput-root": {
                     "& fieldset": {
                       borderColor: "white",
                      },
                    "&:hover fieldset": {
                      borderColor: "white",
                      },
                    "&.Mui-focused fieldset": {
                       borderColor: "white",
                      },
                  },
                }}
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
                   size="small"
                   sx={{
                    border:"white 2px solid",
                    color:"white"                 
                }}
                   defaultValue={value}
                    value={value} 
                    onChange={changeHandler} >
                     {options.map((option,index)=>(
                       <MenuItem key={index} value={option.value}>
                         {option.label}
                       </MenuItem>
                     ))}

                   </Select>
{/* ==================================Save and Cancle Buttonns========================== */}
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
                      Cancle
                    </Button>
                  </Stack>
                </>
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Profile;
