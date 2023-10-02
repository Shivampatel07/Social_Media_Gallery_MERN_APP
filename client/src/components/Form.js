import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

function Signin() {
  const [formData, setFormData] = useState({});
  const notify = (content) => toast.error(content);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const expirationDate = new Date(); // Create a new Date object
  expirationDate.setHours(expirationDate.getHours() + 1); // Add 1 hour

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post("http://localhost:8080/api/auth/login", formData)
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else if (res.data.message && res.data.token) {
          toast.success(res.data.message);
          setCookie("token", res.data.token, {
            path: "/",
            expires: expirationDate,
          });

          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response.data.detail) {
          notify("Username or password is wrong");
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#ffffff] text-[#1f3626]">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray" className="text-[#1f3626]">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-[#1f3626]">
          Enter your credentials to log in.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleLoginSubmit}
        >
          <div className="mb-4 flex flex-col gap-6 text-[#1f3626]">
            <Input
              size="lg"
              label="Username"
              className="text-[#1f3626] focus:text-[#1f3626]"
              name="username"
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              name="password"
              className="text-[#1f3626] focus:text-[#1f3626]"
              required
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            className="mt-6 bg-gradient-to-r from-[#4CB8C4] to-[#3CD3AD] text-white font-bold py-2 px-4 rounded gradient-transition"
            fullWidth
          >
            Log In
          </Button>
          <Typography
            color="gray"
            className="mt-4 text-center font-normal text-[#1f3626]"
          >
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-[#1f3626]">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

function Signup() {
  const [registerData, setRegisterData] = useState({});
  const [formError, setFormError] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeFile = (e) => {
    if (e.target.files[0]) {
      if (e.target.files[0].size < 5000000) {
        if (
          e.target.files[0].type === "image/jpeg" ||
          e.target.files[0].type === "image/jpg" ||
          e.target.files[0].type === "image/png"
        ) {
          setFormError({
            ...formError,
            imageerror: "",
          });
          setRegisterData({
            ...registerData,
            [e.target.name]: e.target.files[0],
          });
        } else {
          setFormError({
            ...formError,
            imageerror: "Image should be in jpeg, jpg or png format",
          });
        }
      } else {
        setFormError({
          ...formError,
          imageerror: "Image size should be less than 5MB",
        });
      }
    }
  };

  const handleRegisterSubmit = async (e) => {
    await e.preventDefault();
    if (!formError.imageerror || formError.imageerror === "") {
      await axios
        .post("http://localhost:8080/api/auth/register", registerData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.error) {
            toast.error(res.data.error);
          } else if (res.data.message) {
            toast.success(res.data.message);
            navigate("/signin");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#ffffff]">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray" className="text-[#1f3626]">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-[#1f3626]">
          Enter your details to register.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleRegisterSubmit}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Username"
              className="text-[#1f3626]"
              required
              name="username"
              onChange={handleChange}
            />
            <Input
              size="lg"
              label="Email"
              className="text-[#1f3626]"
              required
              name="email"
              onChange={handleChange}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              className="text-[#1f3626]"
              required
              name="password"
              onChange={handleChange}
            />

            <input
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              type="file"
              name="image"
              id="formFile"
              required
              accept="image/*"
              onChange={handleChangeFile}
            />
          </div>
          {formError["imageerror"] ? (
            <p className="text-red-700 text-base">{formError.imageerror}</p>
          ) : (
            <></>
          )}
          <Button
            type="submit"
            className="mt-6 bg-gradient-to-r from-[#4CB8C4] to-[#3CD3AD] text-white font-bold py-2 px-4 rounded gradient-transition"
            fullWidth
          >
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium text-gray-900 ">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export { Signin, Signup };
