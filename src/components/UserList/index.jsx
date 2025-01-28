/* eslint-disable react/prop-types */

const UserList = (props) => {
  const { setShowNewForm, userData, setUpdateId, deleteUser } = props;

  return (
    <div className="w-full overflow-x-auto">
      <table className="table-fixed border-collapse border-1 border-black">
        <thead>
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Username</th>
            <th className="border px-2 py-1">Email</th>
            <th className="" colSpan={2}>
              <button
                type="button"
                className="bg-green-600 text-slate-50 h-9 w-24 text-lg border-none rounded"
                onClick={() => {
                  setShowNewForm((prev) => !prev);
                }}
              >
                Add
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {userData.length > 0 &&
            userData.map((user) => (
              <tr key={user.id}>
                <td className="border px-2 py-1 text-center">{user.id}</td>
                <td className="border px-2 py-1">{user.name}</td>
                <td className="border px-2 py-1">{user.username}</td>
                <td className="border px-2 py-1">{user.email}</td>

                <td className="border">
                  <button
                    type="button"
                    className="w-24 h-9 text-base bg-blue-600 text-white  border-none rounded"
                    onClick={() => {
                      setUpdateId(user.id);
                      setShowNewForm((prev) => !prev);
                    }}
                  >
                    Update
                  </button>
                </td>
                <td className="border">
                  <button
                    type="button"
                    className="w-24 h-9 text-base bg-red-600 text-white border-none rounded"
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
