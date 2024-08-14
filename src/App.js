import React, { useState } from 'react';

const App = () => {
  // Estado inicial com quatro times
  const [teams, setTeams] = useState({
    team1: 'Time 1',
    team2: 'Time 2',
    team3: 'Time 3',
    team4: 'Time 4'
  });

  // Estado para os resultados das semifinais e da final
  const [results, setResults] = useState({
    semifinal1: null,
    semifinal2: null,
    final: null
  });

  // Função para simular o resultado de uma partida
  const simulateMatch = (teamA, teamB) => {
    // Escolhe aleatoriamente o vencedor
    return Math.random() > 0.5 ? teamA : teamB;
  };

  // Função para executar as semifinais e a final
  const runTournament = () => {
    const { team1, team2, team3, team4 } = teams;

    // Simular semifinal 1
    const semifinal1Winner = simulateMatch(team1, team2);
    // Simular semifinal 2
    const semifinal2Winner = simulateMatch(team3, team4);
    // Simular final
    const finalWinner = simulateMatch(semifinal1Winner, semifinal2Winner);

    setResults({
      semifinal1: semifinal1Winner,
      semifinal2: semifinal2Winner,
      final: finalWinner
    });
  };

  return (
    <div>
      <h1>Mata-Mata</h1>
      <div>
        <h2>Times:</h2>
        <p>{teams.team1} vs {teams.team2}</p>
        <p>{teams.team3} vs {teams.team4}</p>
      </div>
      <button onClick={runTournament}>Rodar Torneio</button>
      {results.semifinal1 && results.semifinal2 && results.final && (
        <div>
          <h2>Resultados:</h2>
          <p>Semifinal 1: {results.semifinal1}</p>
          <p>Semifinal 2: {results.semifinal2}</p>
          <h3>Final: {results.final}</h3>
        </div>
      )}
    </div>
  );
};

export default App;
