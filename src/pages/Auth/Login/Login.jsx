import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import SocialLogIn from "../SocialLogIn/SocialLogIn";
const Login = () => {
  const { signInUser, currentUser, loading } = useAuth();
  const { register, handleSubmit } = useForm();

  const handleLogin = (data) => {
    const email = data.email;
    const password = data.password;

    signInUser(email, password)
      .then((res) => {
        toast.success("LogIn SuccessFul");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="lg:w-[80%]">
      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset *:w-full">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email")}
            className="input"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password")}
            className="input"
            placeholder="Password"
          />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
      <SocialLogIn></SocialLogIn>
    </div>
  );
};

export default Login;
