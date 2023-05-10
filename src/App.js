import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";

const accounts = window.ethereum.enable();
const web3 = new Web3(Web3.givenProvider);
const userAddress = "0xc308c045C036cA78Dc11C31bF36889EBdAE8cCD5";
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

  React.useEffect(() => {
    const contractInstance = new web3.eth.Contract(
      contractABI,
      contractAddress
    );
    setContract(contractInstance);

    const fetchUsers = async () => {
      const users = await contract.methods.getUsers().call();
      setUsers(users);
    };
    if (contract) {
      fetchUsers();
    }
  }, [contract]);

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
  };

  const deleteUser = async (index) => {
    await contract.methods
      .deleteUser(index)
      .send({ from: userAddress });
  };

  return (
    <div className="App">
      <form onSubmit={addUser}>
        <input type="text" name="firstName" placeholder="First Name" />
        <input type="text" name="lastName" placeholder="Last Name" />
        <input type="number" name="age" placeholder="Age" />
        <input type="text" name="nationality" placeholder="Nationality" />
        <input type="text" name="gender" placeholder="Gender" />
        <button type="submit">Submit</button>
      </form>
      <div className="cards">
        {users.map((user, index) => (
          <div className="card">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <p>Age: {user.age}</p>
            <p>Nationality: {user.nationality}</p>
            <p>Gender: {user.gender}</p>
            <button
              onClick={() =>
                editUser(
                  index,
                  "NewFirstName",
                  "NewLastName",
                  30,
                  "NewNationality",
                  "NewGender"
                )
              }
            >
              Edit
            </button>
            <button onClick={() => deleteUser(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
