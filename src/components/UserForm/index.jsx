/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const UserForm = (props) => {
  const { setShowNewForm, addNewUserData, updateUserData } = props;

  // assigning UserDetails if any updateUserData exists else empty value
  const [userDetails, setUserDetails] = useState(props.userDetails[0] || {});

  const [name, setName] = useState(userDetails.name || "");

  const [username, setUsername] = useState(userDetails.username || "");

  const [email, setEmail] = useState(userDetails.email || "");

  const notify = (error) => toast(error);

  // For new user form and calling api and adding new user and showing userlist
  const newUserUpdate = async () => {
    try {
      const newUser = {
        name,
        username,
        email,
      };

      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        newUser
      );

      if (response.status === 201) {
        setUserDetails(response.data);
        addNewUserData(response.data);
        setShowNewForm((prev) => !prev);
      }
    } catch (e) {
      // console.log(e);
      notify(e.message);
    }
  };

  // For updating user form and calling api and updating user and showing userlist

  const updateUser = async () => {
    try {
      const updatedUserDetails = {
        name,
        username,
        email,
      };
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${userDetails.id}`,
        updatedUserDetails
      );
      if (response.status === 200) {
        console.log(response);

        setUserDetails(response.data);
        updateUserData(response.data);
        setShowNewForm((prev) => !prev);
      }
    } catch (e) {
      notify(e.message);
    }
  };

  // submitting form
  const onSubmitForm = (event) => {
    event.preventDefault();
    if (props.userDetails[0]) {
      updateUser();
    } else {
      newUserUpdate();
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="shadow-md rounded px-5 py-4">
        <h2 className="text-xl text-center mb-2">User Form</h2>
        <form className="flex flex-col gap-4" onSubmit={onSubmitForm}>
          <div className="flex flex-col gap-2">
            <label>Name:</label>
            <input
              className="border px-2 py-1 h-10 w-full"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Username:</label>
            <input
              className="border px-2 py-1 h-10 w-full"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Email:</label>
            <input
              className="border px-2 py-1 h-10 w-full"
              type="text"
              placeholder="Enter your Email "
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="flex gap-2">
            <button
              className="h-9 w-24 border-none rounded text-white font-semibold bg-blue-600"
              type="submit"
            >
              Submit
            </button>
            <button
              className="h-9 w-24 border-none rounded text-white font-semibold bg-red-600"
              type="button"
              onClick={() => {
                setShowNewForm((prev) => !prev);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
