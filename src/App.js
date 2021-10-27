import "./styles.css";
import { useEffect, useState } from "react";
import {
  deleteUserDataRedx,
  setUsersDataRedx,
  editUserDataRedx
} from "./redux/user/userActions";
import { useSelector, useDispatch } from "react-redux";

/*
    - here I have used fetch api for fetch data, alternative is axios
    - I want to inform that I did not follow any coding stadards
    - here when we click on Fetch data button then data will be fetch 
    - if you want data when the page load then pls uncomment the useEffect block

*/
export default function App() {
  const dispatch = useDispatch();
  const { data: UsersData } = useSelector((state) => state.users);

  const [editUser, setEditUser] = useState(false);
  const [editUserData, setEditUserData] = useState({});

  const FetchData = async () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((res) => {
        const newdata = res.map((data) => ({
          username: data.username,
          id: data.id,
          name: data.name,
          email: data.email
        }));

        // store in redux
        dispatch(setUsersDataRedx(newdata));
      });
  };

  // useEffect(() => {
  //   FetchData();
  // }, []);

  const DeleteData = async (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        console.log(res);
        // delete from redux
        dispatch(deleteUserDataRedx({ id }));
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
  const handleFieldChange = (e) => {
    setEditUserData({ ...editUserData, [e.target.name]: e.target.value });
  };
  const SaveUser = () => {
    dispatch(editUserDataRedx(editUserData));
    setEditUser(false);
  };

  const DataInTable = (
    <table>
      <tr>
        <th>Id</th>
        <th>name</th>
        <th>user name</th>
        <th>email</th>
        <th />
        <th />
      </tr>
      {UsersData.map((user) => (
        <tr>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td onClick={() => DeleteData(user.id)}>delete</td>
          <td
            onClick={() => {
              setEditUserData(user);
              setEditUser(true);
            }}
          >
            edit
          </td>
        </tr>
      ))}
    </table>
  );

  const userEditModal = (
    <div className="modal">
      <div className="modal-content">
        <span class="close" onClick={() => setEditUser(false)}>
          &times;
        </span>
        <div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                minWidth: "100px",

                textAlign: "left"
              }}
            >
              Name{" "}
            </div>
            <div>
              <input
                value={editUserData.name}
                name="name"
                onChange={handleFieldChange}
              />
            </div>
          </div>

          <div style={{ display: "flex", margin: "10px 0px" }}>
            <div
              style={{
                minWidth: "100px",

                textAlign: "left"
              }}
            >
              User Name{" "}
            </div>
            <div>
              <input
                value={editUserData.username}
                onChange={handleFieldChange}
                name="username"
              />
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div
              style={{
                minWidth: "100px",
                textAlign: "left"
              }}
            >
              Email{" "}
            </div>
            <div>
              <input
                value={editUserData.email}
                onChange={handleFieldChange}
                name="email"
              />
            </div>
          </div>

          <button
            style={{
              padding: "5px 10px",
              background: "#0000ff",
              border: "none",
              color: "white",
              marginTop: "10px",
              cursor: "pointer"
            }}
            onClick={SaveUser}
          >
            {" "}
            Save{" "}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="App">
      {editUser && userEditModal}
      <button style={{ margin: "10px" }} onClick={() => FetchData()}>
        Fetch Data
      </button>
      {DataInTable}
    </div>
  );
}
