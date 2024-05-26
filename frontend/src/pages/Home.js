import React from "react";
import Metadata from "../components/Metadata";
import { useGoogleOneTapLogin } from "@react-oauth/google";

const Home = () => {
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      fatchUser(credentialResponse);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  // fatching data
  const fatchUser = (creRes) => {
    console.log(creRes);
  };

  return (
    <>
      <Metadata title="Home" />
    </>
  );
};

export default Home;
