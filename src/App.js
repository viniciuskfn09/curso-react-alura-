import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './UserList';
import UserPage from './UserPage';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'VicBoça', notes: [] },
    { id: 2, name: 'ViniBoça', notes: [] },
    { id: 3, name: 'Manaia VVQueiro', notes: [] },
    { id: 4, name: 'Cazenrique', notes: [] },
    { id: 5, name: 'Lucena', notes: [] },
    { id: 6, name: 'Bréqui Silva', notes: [] }
  ]);

  const addNote = (userId, note) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, notes: [...user.notes, note] } : user
    ));
  };

  const removeNote = (userId, noteIndex) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, notes: user.notes.filter((_, index) => index !== noteIndex) } : user
    ));
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<UserList users={users} />} />
          <Route path="/user/:id" element={<UserPage users={users} addNote={addNote} removeNote={removeNote} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
