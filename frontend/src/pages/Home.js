import React from "react";
import Metadata from "../components/Metadata";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { toast } from "react-toastify";

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
  const onhandelclick = (e) => {
    e.preventDefault();
    toast.success("hello world");
  };

  return (
    <>
      <Metadata title="Home" />
    </>
  );
};

export default Home;
