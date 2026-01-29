import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Fetching Activities from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched Activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  return (
    <div>
      <h2 className="mb-4 display-6 fw-bold">Activities</h2>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  {activities.length > 0 && Object.keys(activities[0]).map((key) => (
                    <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, idx) => (
                  <tr key={activity.id || idx}>
                    {Object.values(activity).map((value, i) => (
                      <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {activities.length === 0 && <div className="text-center text-muted">No activities found.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
