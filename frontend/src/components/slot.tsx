import React from 'react';

export const Slot = ({ selectedLot, availableSlots, bookingLoading, closePopup, handleBooking }: any) => {
  if (!selectedLot) return null;

  return (
    <div className="modal-overlay" onClick={closePopup}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{selectedLot.name} ke slots</h2>
          <button className="close-btn" onClick={closePopup}>&times;</button>
        </div>
        
        <div className="modal-body">
          {bookingLoading ? (
            <p>loading thoda wait...</p>
          ) : availableSlots.length === 0 ? (
            <div className="empty-state">
              koi specific slots nahi dale backend me
            </div>
          ) : (
            <div className="slots-grid">
              {availableSlots.map((slot: any) => (
                <div key={slot._id} className="slot-item" onClick={() => handleBooking(slot._id)}>
                  <span>Slot {slot.type || 'Normal'}</span>
                  <strong>Book</strong>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
