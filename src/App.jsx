import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [userData, setUserData] = useState([]);
  const [showNewForm, setShowNewForm] = useState(false);
  const [updateId, setUpdateId] = useState(-1);

  // for toast notification
  const notify = (error) => toast(error);

  // get user data from api
  const getUserData = async () => {
    try {
      const response = await axios(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (e) {
      console.log(e);

      notify(e.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // Add new user
  const addNewUserData = (userDetails) => {
    setUserData((prev) => [...prev, userDetails]);
    setUpdateId(-1);
  };

  // Update existing user
  const updateUserData = (userDetails) => {
    setUserData(
      userData.map((user) => {
        if (user.id === userDetails.id) {
          return { ...user, ...userDetails };
        }
        return user;
      })
    );
    setUpdateId(-1);
  };

  // Delete existing user
  const deleteUser = async (id) => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    if (response.status === 200) {
      setUserData((prev) => prev.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold p-4 ">User List</h1>
      {/* show form or display userlist */}
      {showNewForm ? (
        <UserForm
          setShowNewForm={setShowNewForm}
          addNewUserData={addNewUserData}
          userDetails={userData.filter((user) => user.id === updateId)}
          updateUserData={updateUserData}
        />
      ) : (
        <UserList
          setShowNewForm={setShowNewForm}
          userData={userData}
          setUpdateId={setUpdateId}
          deleteUser={deleteUser}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
