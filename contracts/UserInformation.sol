// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserInformation {
    struct User {
        string firstName;
        string lastName;
        uint256 age;
        string nationality;
        string gender;
    }

    User[] public users;

    function addUser(
        string memory _firstName,
        string memory _lastName,
        uint256 _age,
        string memory _nationality,
        string memory _gender
    ) public {
        users.push(User(_firstName, _lastName, _age, _nationality, _gender));
    }

    function getUsers() public view returns (User[] memory) {
        return users;
    }

    function editUser(
        uint256 _index,
        string memory _firstName,
        string memory _lastName,
        uint256 _age,
        string memory _nationality,
        string memory _gender
    ) public {
        User storage user = users[_index];
        user.firstName = _firstName;
        user.lastName = _lastName;
        user.age = _age;
        user.nationality = _nationality;
        user.gender = _gender;
    }

    function deleteUser(uint256 _index) public {
      require(_index < users.length, "Invalid index");
      users[_index] = users[users.length - 1];
      users.pop();
    }
}
