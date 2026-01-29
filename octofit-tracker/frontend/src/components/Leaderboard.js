import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching Leaderboard from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        console.log('Fetched Leaderboard:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  return (
    <div>
      <h2 className="mb-4 display-6 fw-bold">Leaderboard</h2>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  {leaders.length > 0 && Object.keys(leaders[0]).map((key) => (
                    <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leaders.map((leader, idx) => (
                  <tr key={leader.id || idx}>
                    {Object.values(leader).map((value, i) => (
                      <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {leaders.length === 0 && <div className="text-center text-muted">No leaderboard data found.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
