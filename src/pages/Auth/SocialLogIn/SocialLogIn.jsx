import React from "react";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";

const SocialLogIn = () => {
  const { googleLogIn } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleLogIn = () => {
    googleLogIn()
      .then((res) => {
        navigate(location.state || "/");
        toast.success("Login Successful");
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
