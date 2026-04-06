import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [lots, setLots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLots = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/parkinglot');
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setLots(data);
    } catch (err:any) {
      setError(err.message || 'Error connecting to backend');
    } finally {
      setLoading(false);
    }
  };

  const createSampleLot = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/parkinglot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: "Sample Smart Lot " + Math.floor(Math.random()*100),
          location: "Uptown Alpha",
          totalSlots: 50,
          availableSlots: 50
        })
      });
      if(res.ok) {
        fetchLots();
      }
    } catch (err: any) {
      console.error("Could not create lot", err);
    }
  };

  useEffect(() => {
    fetchLots();
  }, []);

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">AutoScaleX</div>
        <div className="nav-links">
          <button className="btn">Sign In</button>
        </div>
      </nav>

      <main className="main-content">
        <section className="hero">
          <h1>Smart Parking, <br />Instantly Available.</h1>
          <p>Find, book, and manage your parking seamlessly with our AI-powered allocation system.</p>
          <button className="btn" onClick={createSampleLot}>Create Sample Lot</button>
        </section>

        {loading ? (
          <div className="loader">Loading parking maps...</div>
        ) : error ? (
          <div className="error-box">{error}</div>
        ) : (
          <section className="dashboard-grid">
            {lots.length === 0 ? (
              <div className="empty-state">No parking lots available yet. Click "Create Sample Lot".</div>
            ) : (
              lots.map((lot, idx) => (
                <div className="card" key={idx}>
                  <h3>{lot.name || "Unnamed Lot"}</h3>
                  <p>{lot.location || "Location not set"}</p>
                  <div className={`status-badge ${lot.availableSlots > 0 ? 'status-available' : 'status-occupied'}`}>
                    {lot.availableSlots} Slots Left
                  </div>
                </div>
              ))
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
