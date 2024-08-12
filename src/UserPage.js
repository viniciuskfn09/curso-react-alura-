import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './UserPage.css';

const UserPage = ({ users, addNote, removeNote }) => {
  const { id } = useParams();
  const user = users.find(user => user.id === parseInt(id));
  const [note, setNote] = useState('');
  const [points, setPoints] = useState(3);

  if (!user) return <p>Usuário não encontrado</p>;

  const handleAddNote = () => {
    addNote(user.id, { text: note, points });
    setNote('');
    setPoints(3); // Reset points to default
  };

  const handleRemoveNote = (index) => {
    removeNote(user.id, index);
  };

  const calculateTotalPoints = (user) => {
    return user.notes.reduce((total, note) => total + note.points, 0);
  };

  const getRankedUsers = () => {
    return [...users]
      .map(u => ({
        ...u,
        totalPoints: calculateTotalPoints(u)
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints);
  };

  const rankedUsers = getRankedUsers();
  const userRank = rankedUsers.findIndex(u => u.id === user.id) + 1;

  return (
    <div className="user-page-container">
      <aside className="sidebar">
        <h3>Usuários</h3>
        <ul>
          {rankedUsers.map(u => (
            <li key={u.id}>
              <Link to={`/user/${u.id}`}>{u.name}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="user-details">
        <h2>{user.name}</h2>
        <Link to="/" className="back-link">Voltar para a lista de usuários</Link>
        <ul>
          {user.notes.map((note, index) => (
            <li key={index}>
              {note.text} - {note.points} pontos
              <button className="remove-btn" onClick={() => handleRemoveNote(index)}>Excluir</button>
            </li>
          ))}
        </ul>
        <div className="note-form">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Adicione uma nota"
          />
          <select value={points} onChange={(e) => setPoints(Number(e.target.value))}>
            <option value={3}>3 pontos</option>
            <option value={6}>6 pontos</option>
            <option value={9}>9 pontos</option>
          </select>
          <button onClick={handleAddNote}>Adicionar Nota</button>
        </div>
        <div className="total-points">
          <h3>Total de Pontos: {calculateTotalPoints(user)}</h3>
          <h4>Rank: {userRank} / {rankedUsers.length}</h4>
        </div>
        <div className="ranking">
          <h3>Ranking dos Usuários</h3>
          <ul>
            {rankedUsers.map((u, index) => (
              <li key={u.id}>
                {index + 1}. {u.name} - {calculateTotalPoints(u)} pontos
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default UserPage;
