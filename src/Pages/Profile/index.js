import React from "react";
import Profile from "../../Components/Profile";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Index = () => {
  const params = useParams();
  const [profileData, setProfileData] = useState()

  useEffect(() => {
    axios
      .get(
        `https://625f910092df0bc0f3367d6b.mockapi.io/api/v1/Users/${params.id}`
      )
      .then((res) => {
        setProfileData(res.data);
      })
      .catch((err) => {
        console.log("errroe", err);
      });
  }, [params.id]);
  return (
    <>
    {
      profileData && <Profile profileData={profileData}/>
    }
      
    </>
  );
};

export default Index;
