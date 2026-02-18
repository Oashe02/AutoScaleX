# SmartPark (AutoScaleX)

A multi-tenant parking management system built using the MERN stack. The system handles real-time slot allocation across different facilities and manages bookings, users, and invoices.

## System Documentation

Technical diagrams for the system architecture are located in the root directory:

*   **ER Diagram**: Database schema and relationships. [View ER Diagram](./ErDiagram.md)
*   **Class Diagram**: Object structure and service logic. [View Class Diagram](./classDiagram.md)
*   **Sequence Diagram**: User booking flow. [View Sequence Diagram](./sequenceDiagram.md)
*   **Use Case Diagram**: System interactions. [View Use Case Diagram](./useCaseDiagram.md)

## Features
- Dynamic slot allocation based on vehicle type (Car, Bike, EV).
- JWT-based authentication and session management.
- Real-time dashboard for facility occupancy tracking.
- Support for multiple independent parking zones.
- Automatic invoice generation upon booking completion.

## Tech Stack
- Frontend: React.js, TypeScript, Tailwind CSS, Vite
- Backend: Node.js, Express.js, TypeScript
- Database: MongoDB Atlas with Mongoose
- Hosting: Vercel (Frontend), Render (Backend)

## Installation and Setup

### Backend
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Configure environment variables in a `.env` file:
   ```env
   PORT=5005
   MONGO_URI=your_mongodb_uri
   JWT=your_jwt_secret
   ```
4. Start the development server: `npm run dev`

### Frontend
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Configure API URL in a `.env` file:
   ```env
   VITE_API_BASE_URL=https://autoscalex.onrender.com/api
   ```
4. Start the development server: `npm run dev`

## API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and receive token |
| GET | /api/parkinglot | Get all parking facilities |
| POST | /api/slot | Create a parking slot |
| POST | /api/booking | Create a new booking |
| GET | /api/booking/my | Get current user's bookings |