import express from "express";

const Auth = (req, res) => {
  console.log(req.isAuthenticated() + "ff");
  if (req.isAuthenticated()) {
  } else {
    console.log(process.env.CLIENT_URL_PORT + "404Error");
    res.redirect(process.env.CLIENT_URL_PORT + "404Error");
  }
};
export default Auth;
