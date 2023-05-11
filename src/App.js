import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";

const web3 = new Web3(Web3.givenProvider);
const userAddress = "0xA341B44E6386a6506C5073A7898B6e35c5DED0f7";
const contractAddress = "0xe6058CA721C71DF17924FF129C50841cEDFd71b7";
const contractABI = [
  {
    inputs: [
      { internalType: "string", name: "_firstName", type: "string" },
      { internalType: "string", name: "_lastName", type: "string" },
      { internalType: "uint256", name: "_age", type: "uint256" },
      { internalType: "string", name: "_nationality", type: "string" },
      { internalType: "string", name: "_gender", type: "string" },
    ],
    name: "addUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_index", type: "uint256" }],
    name: "deleteUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_index", type: "uint256" },
      { internalType: "string", name: "_firstName", type: "string" },
      { internalType: "string", name: "_lastName", type: "string" },
      { internalType: "uint256", name: "_age", type: "uint256" },
      { internalType: "string", name: "_nationality", type: "string" },
      { internalType: "string", name: "_gender", type: "string" },
    ],
    name: "editUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getUsers",
    outputs: [
      {
        components: [
          { internalType: "string", name: "firstName", type: "string" },
          { internalType: "string", name: "lastName", type: "string" },
          { internalType: "uint256", name: "age", type: "uint256" },
          { internalType: "string", name: "nationality", type: "string" },
          { internalType: "string", name: "gender", type: "string" },
        ],
        internalType: "struct UserInformation.User[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "users",
    outputs: [
      { internalType: "string", name: "firstName", type: "string" },
      { internalType: "string", name: "lastName", type: "string" },
      { internalType: "uint256", name: "age", type: "uint256" },
      { internalType: "string", name: "nationality", type: "string" },
      { internalType: "string", name: "gender", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

function App() {
  const [users, setUsers] = useState([]);
  const [contract, setContract] = useState();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const contractInstance = new web3.eth.Contract(
        contractABI,
        contractAddress
      );
      setContract(contractInstance);
      const users = await contractInstance.methods.getUsers().call();
      setUsers(users);
    } catch (e) {
      console.log(e);
    }
  };

  const addUser = async (event) => {
    event.preventDefault();
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const age = event.target.age.value;
    const nationality = event.target.nationality.value;
    const gender = event.target.gender.value;

    await contract.methods
      .addUser(firstName, lastName, age, nationality, gender)
      .send({ from: userAddress });
    fetchUsers();
  };

  const editUser = async (
    index,
    firstName,
    lastName,
    age,
    nationality,
    gender
  ) => {
    await contract.methods
      .editUser(index, firstName, lastName, age, nationality, gender)
      .send({ from: userAddress });
    fetchUsers();
  };

  const deleteUser = async (index) => {
    await contract.methods.deleteUser(index).send({ from: userAddress });
    fetchUsers();
  };

  return (
    <div class="App">
      <h1>
        Unlock limitless possibilities <br />
        with Blockchain
      </h1>
      <div class="main">
        <form onSubmit={addUser}>
          <h2> Join Us! </h2>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            type="text"
            name="nationality"
            placeholder="Nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <div class="btn-grp">
            <button class="res" type="reset">
              Clear
            </button>
            <button class="sub" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>

      <div class="cards">
        {users.map((user, index) => (
          <div class="card">
            <h3>
              {user.firstName} {user.lastName}
            </h3>
            <p>Age: {user.age}</p>
            <p>Nationality: {user.nationality}</p>
            <p>Gender: {user.gender}</p>

            <div class="btn-grp">
              <button
                class="edit"
                onClick={() =>
                  editUser(index, firstName, lastName, age, nationality, gender)
                }
              >
                Edit
              </button>
              <button class="delete" onClick={() => deleteUser(index)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div class="footer">
        <p> Copyright 2023 | Lopez, John Jemuel | Requez, Kyle</p>
      </div>
    </div>
  );
}

export default App;
