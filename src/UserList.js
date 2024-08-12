import React from 'react';
import { Link } from 'react-router-dom';
import './UserList.css'

const UserList = ({ users }) => {
  return (
    <div>
      <h2>Usuários</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
