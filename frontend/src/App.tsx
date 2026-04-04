import './index.css';

function App() {
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
          <button className="btn">Find a parking slot</button>
        </section>

        <section className="dashboard-grid">
          <div className="card">
            <h3>Lot A1 - Downtown</h3>
            <p>15 mins away</p>
            <div className="status-badge status-available">12 Slots Left</div>
          </div>
          <div className="card">
            <h3>Lot C3 - Westside</h3>
            <p>25 mins away</p>
            <div className="status-badge status-occupied">Full</div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
