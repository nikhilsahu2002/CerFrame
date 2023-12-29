// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { auth } from "../Context/AuthContext"; // Update the path accordingly
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../Firebase";

import { collection, addDoc, getDoc } from "firebase/firestore";

export default function Dashboard() {
  const [submitted, setSubmitted] = useState(true);
  const nav = useNavigate(); // Move useNavigate inside the component function
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);

      nav("/login");
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  useEffect(() => {
    if (!submitted) {
      submitForm();
      setSubmitted(true);
    }
  }, [submitted]);

  const submitForm = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Nikhil Sahu",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <h2>Welcome, {user ? user.email : "Guest"}</h2>
      <button onClick={handleSignOut}>Sign Out</button>

      <div className="button pt-5">
        <h3
          onClick={() => (submitForm, setSubmitted(false), setShow(true))}
          className="border-2 flex text-lg justify-center rounded-md bg-white cursor-pointer">
          Submited
        </h3>
      </div>
    </div>
  );
}
