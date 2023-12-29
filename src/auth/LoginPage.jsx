import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import { app } from "../Firebase";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

export default function LoginPage() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    // Check if the user is already authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    // Cleanup function to unsubscribe from the auth state listener
    return () => unsubscribe();
  }, []);

  const SignIn = () => {
    signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        console.log("Authentication successful");
        nav("/");
      })
      .catch((error) => console.log(error));
  };

  const SignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("Sign-out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="">
      <div className="flex items-center justify-center h-screen bg-gray-600">
        {!user && (
          <div className="outerBox bg-purple-700 w-96 h-auto px-5 py-7 rounded-lg">
            {/* Render sign-in form if user is not authenticated */}

            <>
              <div className="email flex gap-3 p-4">
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
                  className="font-medium text-teal-100 border-2 px-7 py-2 rounded-full"
                  onClick={SignIn}>
                  Sign In
                </button>
              </div>
              <div className="checkBox flex items-center gap-5">
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
            </>

            {/* Render sign-out button if user is authenticated */}
          </div>
        )}
        {user && (
          <div className=" pt-0">
            <button
              className="font-medium text-black border-2 px-7 py-2 rounded-full"
              onClick={SignOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
