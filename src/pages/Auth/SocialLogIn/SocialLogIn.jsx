import React from "react";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SocialLogIn = () => {
  const { googleLogIn } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();

  const handleGoogleLogIn = () => {
    googleLogIn()
      .then((res) => {
        console.log(res.user);

        toast.success("Login Successful");

        // create user in DataBase
        const userInfo = {
          email: res.user.email,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          console.log("user data has been stored");
          navigate(location.state || "/");
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <button
      onClick={handleGoogleLogIn}
      className="my-3 btn btn-primary text-black w-full"
    >
      {" "}
      <img
        className="w-5 h-5"
        src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
        alt=""
      />{" "}
      LogIn with Google
    </button>
  );
};

export default SocialLogIn;
