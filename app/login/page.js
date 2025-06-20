"use client";

import { useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import AuthLoader from "@/components/AuthLoader";
import axios from "axios";
import toast from "react-hot-toast";
import { useURL } from "@/context/urlContext";

const Login = () => {
  const [authState, setAuthState] = useState("login");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { router,setOpenMenu } = useURL();

  const userAuthHandler = async (e) => {
    e.preventDefault();
    try {
      if (authState === "register") {
        setLoading(true);
        const res = await axios.post("/api/auth/register", {
          name,
          email,
          password,
        });
        if (res?.data?.success) {
          setLoading(false);
          toast.success(res.data.message);
          setAuthState("login");
        } else {
          toast.error(res.data.message);
          setLoading(false);
          console.log(res.data.message);
        }
      } else {
        setLoading(true);
        const res = await axios.post("/api/auth/login", { email, password });
        if (res?.data?.success) {
          setLoading(false);
          toast.success(res.data.message);
          router.push("/");
          setOpenMenu(false)
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error(error);
      console.log("Failed to authenticated::", error);
    }
  };
  return (
    <div className="w-full flex items-center justify-center h-[80vh] px-5">
      <div className="w-full max-w-[450px] mx-auto bg-white/10 rounded-lg py-4 px-6 border border-gray-600 flex flex-col items-center text-slate-100">
        <h1 className="text-center text-3xl md:text-4xl font-bold py-3 bg-gradient-to-r from-slate-100 to-slate-400 inline-block text-transparent bg-clip-text">
          {authState === "register" ? "Sign Up" : "Sign In"}
        </h1>
        <p className="text-sm font-semibold py-2 text-slate-100">
          {authState === "register"
            ? "Already have an account?"
            : "Dont have an account?"}
          {authState === "register" ? (
            <span
              onClick={() => setAuthState("login")}
              className="select-none cursor-pointer transition transform active:scale-90 hover:underline"
            >
              &nbsp;Login
            </span>
          ) : (
            <span
              onClick={() => setAuthState("register")}
              className="select-none cursor-pointer transition transform active:scale-90 hover:underline"
            >
              &nbsp;Sign Up
            </span>
          )}
        </p>

        <form
          onSubmit={userAuthHandler}
          className="mt-8 w-full flex flex-col items-center gap-4"
        >
          {authState === "register" && (
            <div className="w-full p-3 bg-white/15 rounded-lg flex items-center">
              <span className="text-gray-300">
                <FaUserAlt size={16} />
              </span>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-3 border-none outline-none text-slate-100 "
              />
            </div>
          )}
          <div className="w-full p-3 bg-white/15 rounded-lg flex items-center">
            <span className="text-gray-300">
              <MdEmail size={16} />
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 border-none outline-none text-slate-100 "
            />
          </div>
          <div className="w-full p-3 bg-white/15 rounded-lg flex items-center">
            <span className="text-gray-300">
              <RiLockPasswordFill size={16} />
            </span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 border-none outline-none text-slate-100 "
            />
          </div>
          <button
            type="submit"
            className="mt-5 font-semibold w-full p-3 rounded-lg bg-gradient-to-r from-slate-200 to-slate-400 text-black cursor-pointer flex items-center gap-2.5 justify-center transition transform active:scale-90"
          >
            <span>{authState === "register" ? "Sign Up" : "Login"}</span>
            {loading && <AuthLoader className={"w-5 h-5"} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
