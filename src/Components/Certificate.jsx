import React, { useState } from "react";
import ayushSign from "../assets/ay.png";
import PrasantSign from "../assets/ps.png";
import cvsign from "../assets/cv.png";
import { db } from "../Firebase";

import { collection, getDocs, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import LoginPage from "../auth/LoginPage";

export default function Certificate() {
  const [show, setShow] = useState(false);
  const [Id, setId] = useState("");
  const [userData, setUserData] = useState([]);
  const [showError, setShowError] = useState(false);
  console.log(Id);

  const getData = async (uuid) => {
    const querySnapshot = await getDocs(
      collection(db, "Certificate"),
      where("UUID", "==", uuid.trim()),
    );

    const newData = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data && data.UUID === uuid.trim()) {
        newData.push({ id: doc.id, ...data });
        setShow(true);
      }
    });

    if (newData.length > 0) {
      setUserData(newData);
      setShowError(false);
    } else {
      setUserData([]);
      setShowError(true);
    }

    setUserData(newData);
  };

  return (
    <div>
      {show ? (
        <div>
          <div className="flex justify-center items-center h-screen bg-gray-700">
            <div className="w-full sm:w-11/12 md:w-1/2 lg:w-3/4 bg-white rounded-lg p-4">
              <h3 className="flex justify-end p-3">
                Certificate ID - UUSI2332
              </h3>
              <div className="fraim   py-5">
                <div className="img flex justify-center p-4">
                  <img
                    width="auto"
                    src="data:image/png;base64,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"
                    alt=""
                  />
                </div>

                <h3 className="flex justify-center text-6xl ">CERTIFICATE</h3>
                <p className=" flex justify-center text-3xl">OF COMPLETION</p>
              </div>
              <div className=" flex w-auto justify-center px-20">
                <p className="text-justify w-auto ">
                  This Certificate is Awarded To{" "}
                  <span className="font-bold p-2">
                    {userData.length > 0 && userData[0].Name}
                  </span>
                  For Successfully Completing The "Full Stack Web Development
                  Using Python" Summer Internship conducted from 26th June 2023
                  - 22 July 2023 (Four) Weeks At The Department Of Computer
                  Science And Engineering / Computer Application.
                </p>
              </div>
              <div className="signs flex justify-center pt-5">
                <div className="coordinater flex flex-col items-center mx-4">
                  <img src={ayushSign} alt="" className="w-auto -mb-2 z-50" />
                  <hr className="w-28 border-2 -mt-2 mb-1" />
                  <h3 className="text-center">MR. Ayush Shukla</h3>
                </div>

                <div className="coordinater flex flex-col items-center mx-4">
                  <img src={PrasantSign} alt="" className=" -mb-1 z-50" />
                  <hr className="w-28 border-2 -mt-2 mb-2" />
                  <h3 className="text-center">Dr. Prashant Shukla</h3>
                </div>

                <div className="coordinater flex flex-col items-center mx-4">
                  <img src={cvsign} alt="" className=" -mb-1 z-50" />
                  <hr className="w-28 border-2 -mt-2 mb-2" />
                  <h3 className="text-center">Dr. Chetan Vyas</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 h-screen">
          <div className="nav bg-black p-5 text-white flex justify-between">
            <h3>Home</h3>
            <Link to="/login">
              {" "}
              <h3 className="pr-3">Login</h3>
            </Link>
          </div>
          <h1 className="flex justify-center text-3xl text-purple-700 font-sans pt-5">
            WELCOME TO UNITED UNIVERTY
          </h1>
          <h1 className="flex justify-center text-3xl text-purple-700 font-sans pt-5">
            {" "}
            Certificates Center
          </h1>

          <div className="about flex justify-center">
            <p className=" text-center text-xl w-2/5 pt-10 text-white">
              This dedicated page is exclusively designed for students who have
              demonstrated outstanding commitment and successfully completed
              their enriching summer internship at United University. Here,
              these accomplished individuals can conveniently access and view
              their certificates, providing them with a seamless and efficient
              way to officially certify and celebrate their remarkable
              achievement in the program.
            </p>
          </div>

          <div className="outerbox flex justify-center items-center pt-10   ">
            <div className="form box bg-purple-700 rounded-lg p-20">
              <label
                htmlFor="certificateId"
                className="block text-sm font-medium text-white">
                Certificate ID
              </label>
              <input
                type="text"
                id="certificateId"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={Id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
              />
              {showError && (
                <p className="text-white">Error: Invalid Certificate ID.</p>
              )}

              <div className="button pt-5">
                <h3
                  onClick={() => getData(Id)}
                  className="border-2 flex text-lg justify-center rounded-md bg-white cursor-pointer">
                  Submited
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
