import React from "react";
import Login from "../components/Login";
import Instructor from "../components/Instructor";
import Admin from "../components/Admin";

const UserPrivateRoutes = ({ children }) => {
  const userToken = JSON.parse(localStorage.getItem("usersToken")) || "";
  console.log(userToken.role, userToken.token);
  return userToken.token ? (
    userToken.role === "instructor" ? (
      <Instructor />
    ) : userToken.role === "admin" ? (
      <Admin />
    ) : (
      children
    )
  ) : (
    <Login />
  );
};

export default UserPrivateRoutes;
