import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import SocialLogIn from "../SocialLogIn/SocialLogIn";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    console.log("after register", data);

    console.log(data.photo[0]);
    const profileImg = data.photo[0];
    const email = data.email;
    const password = data.password;

    registerUser(email, password)
      .then((result) => {
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_Api_Url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_img_host
        }`;

        axios.post(image_Api_Url, formData).then((res) => {
          // create user in the database
          const userInfo = {
            email: email,
            displayName: data.displayName,
            photoURL: res.data.data.url,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user created in the data");
            }
          });

          // update user profile to firebase
          const userProfile = {
            displayName: data.displayName,
            photoURL: res.data.data.url,
          };

          updateUserProfile(userProfile)
            .then(() => {
              console.log("user profile updated done");
              navigate(location.state || "/");
            })
            .catch((err) => console.log(err));
        });
        toast.success("User Created Successfully");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="lg:w-[80%]">
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset *:w-full">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p role="alert" className="text-red-500">
              Email should be given
            </p>
          )}

          {/* photo */}
          <label className="label">Photo</label>
          <input type="file" {...register("photo")} className="file-input" />

          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",<.>/?`~|\\]).{6,}$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-600">Password is Required</p>
          )}

          {errors.password?.type === "minLength" && (
            <p className="text-red-600">
              Password must be 6 characters or longer
            </p>
          )}

          {errors.password?.type === "pattern" && (
            <p role="error" className="text-red-500">
              Password must contain: 1 uppercase, 1 lowercase, 1 number, 1
              special character, and be at least 6 characters long.
            </p>
          )}
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p className="text-center my-2">
          Already Have an Account{" "}
          <Link className="text-blue-400 underline" state={location.state}>
            Login
          </Link>
        </p>
      </form>
      <SocialLogIn></SocialLogIn>
    </div>
  );
};

export default Register;
