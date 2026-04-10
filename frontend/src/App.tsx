import { useState, useEffect } from 'react';
import './index.css';
import { Navbar } from './components/Navbar';
import { Slot } from './components/slot';

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

function App() {
  const [lots, setLots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [selectedLot, setSelectedLot] = useState<any>(null);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [bookingLoading, setBookingLoading] = useState(false);

  const fetchLots = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/parkinglot`);
      if (!res.ok) throw new Error("fetch fail hai");
      const data = await res.json();
      setLots(data);
    } catch (err:any) {
      setError(err.message || 'error while connecting api');
    } finally {
      setLoading(false);
    }
  };

  const createTestLot = async () => {
    try {
      const res = await fetch(`${API}/parkinglot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: "naya lot " + Math.floor(Math.random()*100),
          location: "koi jagah",
          totalSlots: 10,
          availableSlots: 10
        })
      });
      if(res.ok) fetchLots();
    } catch (err: any) {
      console.log("lot ni bana", err);
    }
  };

  const openBookModal = async (lot: any) => {
    setSelectedLot(lot);
    try {
      setBookingLoading(true);
      const res = await fetch(`${API}/slot/available/${lot._id}`);
      if(res.ok) {
        const slots = await res.json();
        setAvailableSlots(slots);
      }
    } catch(err) {
      console.log(err);
    } finally {
      setBookingLoading(false);
    }
  };

  const closeBookModal = () => {
    setSelectedLot(null);
    setAvailableSlots([]);
  };

  const handleBooking = async (slotId: string) => {
    try {
      alert(`booking done for slot ${slotId} (bas ui pe abhi)`);
      closeBookModal();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLots();
  }, []);

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <section className="hero">
          <h1>Smart Parking.</h1>
          <p>find karo and book karlo aram se</p>
          <button className="btn create-btn" onClick={createTestLot}>+ naya lot add</button>
        </section>

        {loading ? (
          <div className="loader">load horaha wait...</div>
        ) : error ? (
          <div className="error-box">{error}</div>
        ) : (
          <section className="dashboard-grid">
            {lots.length === 0 ? (
              <div className="empty-state">lots ni h db me</div>
            ) : (
              lots.map((lot, idx) => (
                <div className="card" key={idx}>
                  <div className="card-header">
                    <h3>{lot.name || "naam nai"}</h3>
                    <div className={`status-badge ${lot.availableSlots > 0 ? 'status-available' : 'status-occupied'}`}>
                      {lot.availableSlots} bache h
                    </div>
                  </div>
                  <p className="card-loc">{lot.location || "koi jagah"}</p>
                  <button 
                    className="btn card-btn" 
                    onClick={() => openBookModal(lot)}
                    disabled={lot.availableSlots === 0}
                  >
                    View Slots
                  </button>
                </div>
              ))
            )}
          </section>
        )}
      </main>

      <Slot 
        selectedLot={selectedLot} 
        availableSlots={availableSlots} 
        bookingLoading={bookingLoading} 
        closePopup={closeBookModal} 
        handleBooking={handleBooking} 
      />
    </div>
  );
}

export default App;
