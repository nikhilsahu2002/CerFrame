import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../Firebase";

const auth = getAuth(app);

export default function SignUp() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const signUp = () => {
    try {
      createUserWithEmailAndPassword(auth, Email, Password);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="outerBox bg-purple-700 w-96 h-auto px-5 py-7 rounded-lg">
        <h3 className=" flex justify-center p-4 text-3xl font-semibold text-white ">
          Sign Up Page
        </h3>
        <div className="email flex gap-3 p-4 ">
          <label htmlFor="Email" className="text-xl pr-4 text-white">
            Email
          </label>
          <input
            type="Email"
            className="border-none w-full rounded-lg"
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="Password flex gap-2 justify-evenly">
          <label htmlFor="Password" className="text-xl text-white">
            Password
          </label>
          <input
            type="Password"
            className="w-full rounded-lg bg-none"
            value={Password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="signupButton flex justify-center p-8">
          <button
            className="font-medium text-teal-100 border-2 px-7 py-2 rounded-full
          "
            onClick={signUp}>
            Sign Up
          </button>
        </div>
        <div className="checkBox flex items-center gap-5">
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>
      </div>
    </div>
  );
}
