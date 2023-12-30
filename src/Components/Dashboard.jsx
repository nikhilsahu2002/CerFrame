import React, { useEffect, useState } from "react";
import { auth } from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../Firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function Dashboard() {
  const [submitted, setSubmitted] = useState(true);
  const [certificateData, setCertificateData] = useState([]);
  const [uuid, setuuid] = useState("");
  const [name, setname] = useState("");
  const [updateUuid, setUpdateUuid] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const nav = useNavigate();
  const [profile, setprofile] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [Update, setUpdate] = useState(false);

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
      if (editingId) {
        await updateCertificate(editingId, { UUID: uuid, Name: name });
        setEditingId(null);
      } else {
        const docRef = await addDoc(collection(db, "Certificate"), {
          UUID: uuid,
          Name: name,
        });
        console.log("Document written with ID: ", docRef.id);
        setUpdate(true);
      }

      setuuid("");
      setname("");
    } catch (e) {
      console.error("Error adding/updating document: ", e);
    }
  };

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Certificate"));
      const newData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        newData.push({ id: doc.id, ...data });
      });
      setCertificateData(newData); // Set the fetched data to state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Certificate", id));
      setCertificateData((prevData) =>
        prevData.filter((item) => item.id !== id),
      );
      setDeleted(true);
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleUpdate = (item) => {
    setUpdateUuid(item.UUID);
    setUpdateName(item.Name);
    setEditingId(item.id);
  };

  const updateCertificate = async (id, updatedData) => {
    const certificateRef = doc(db, "Certificate", id);
    try {
      await updateDoc(certificateRef, updatedData);
      console.log("Document successfully updated!");
      setUpdate(true);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setUpdate(false);
      setDeleted(false);
    }, 10000);
  });
  return (
    <div>
      <div className="navbar flex justify-between bg-blue-800 p-4 text-white ">
        <h3 className="">Dashbord</h3>
        <button onClick={handleSignOut}>
          <h3>Logout</h3>
        </button>
      </div>
      <div className=" flex justify-center pt-3">
        <div class="inline-flex rounded-md shadow-sm">
          <a
            href="#"
            aria-current="page"
            onClick={() => setprofile(true)}
            class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            Student Certificate Details
          </a>
          <a
            href="#"
            onClick={() => setprofile(false)}
            class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            Student Details
          </a>
        </div>
      </div>
      <div className="toaster flex justify-end pr-5 ">
        {deleted && (
          <div className="continerToast fixed z-50">
            <div
              id="toast-danger"
              class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
              role="alert">
              <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                </svg>
                <span class="sr-only">Error icon</span>
              </div>
              <div class="ms-3 text-sm font-normal">Item has been deleted.</div>
              <button
                type="button"
                class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-danger"
                aria-label="Close">
                <span class="sr-only">Close</span>
                <svg
                  class="w-3 h-3"
                  onClick={() => setDeleted(false)}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
        {Update && (
          <div className="continerToast fixed z-50">
            <div
              id="toast-success"
              class="flex  items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
              role="alert">
              <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg
                  class="w-5 h-5"
                  onClick={() => setUpdate(false)}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span class="sr-only">Check icon</span>
              </div>
              <div class="ms-3 text-sm font-normal">
                Item Update successfully.
              </div>
              <button
                type="button"
                class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-success"
                aria-label="Close">
                <span class="sr-only">Close</span>
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {profile ? (
        <div className="form ">
          <h1 className=" flex justify-center p-7 text-2xl font-semibold">
            Student Certificate Details
          </h1>
          <div className="formTable flex justify-center">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-2/4  ">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      CertificateId
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Update And Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {certificateData.map((item) => (
                    <tr
                      key={item.id}
                      class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.UUID}
                      </th>
                      <td class="px-6 py-4">{item.Name}</td>
                      <td class="px-6 py-4 gap-3 flex">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 text-center">
                          Delete
                        </button>
                        <button
                          onClick={() => handleUpdate(item)}
                          className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center">
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {editingId && (
            <div className="CerInfo pt-8 ">
              <div className="heading text-center flex justify-center ">
                <h1 className="text-xl font-semibold p-1">
                  Update Certificate{" "}
                </h1>
              </div>
              <div class="max-w-sm mx-auto mt-4">
                <div class="mb-5">
                  <label
                    for="updateUUID"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Updated CertificateID
                  </label>
                  <input
                    type="updateUUID"
                    id="updateUUID"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Updated CertificateID"
                    required
                    value={updateUuid}
                    onChange={(e) => setUpdateUuid(e.target.value)}
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="updateName"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Updated Student Name
                  </label>
                  <input
                    type="updateName"
                    id="updateName"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateCertificate(editingId, {
                      UUID: updateUuid,
                      Name: updateName,
                    })
                  }
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Update Certificate
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="CerInfo pt-4 ">
          <div className="heading text-center">
            <h1 className="text-xl">Student Details </h1>
          </div>
          <div class="max-w-sm mx-auto">
            <div class="mb-5">
              <label
                for="UUID"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                CertificateID
              </label>
              <input
                type="UUID"
                id="UUID"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="CertificateID"
                required
                value={uuid}
                onChange={(e) => setuuid(e.target.value)}
              />
            </div>
            <div class="mb-5">
              <label
                for="Name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Student Name
              </label>
              <input
                type="Name"
                id="Name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>

            <button
              type="button"
              onClick={submitForm}
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
