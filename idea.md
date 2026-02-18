# Smart Parking Platform

## Project Overview

This project is a full-stack smart parking management platform that allows users to view real-time parking occupancy, select specific parking spaces, and manage reservations, invoices, and payments. 

The system is designed to handle multiple parking facilities (such as malls, campuses, and city infrastructures) and supports different slot types (EV, Bike, Car), providing a complete end-to-end booking flow with a modern React frontend and a robust Node.js/MongoDB backend.


## Problem Statement

Modern urban parking systems face inefficient space utilization and a poor user experience. Drivers waste time finding available spots, and facility managers lack centralized visibility into revenue and occupancy.

A digital parking management system is required to provide real-time availability tracking, seamless reservations, integrated payments, and a centralized management dashboard for both users and facility administrators.


## Core Features

* **Real-Time Occupancy Tracking:** Monitor parking slot availability and capacity across multiple parking lots with live status updates (Available, Occupied, Reserved).
* **Multi-Zone Facility Management:** Manage multiple parking lots independently, each with its own capacity, location, and slot distribution.
* **Visual Slot Allocation:** Users can dynamically view a visual layout of the parking facility, filter by vehicle type (Car, Bike, EV), and select their exact parking space.
* **Booking & Reservation System:** End-to-end workflow where a user selects a duration, books a slot, and the system temporarily reserves it to prevent double-booking.
* **Payment & Invoice Processing:** Integrated simulation of payment handling (Card, Cash, UPI), tracking transaction statuses, generating invoices, and securely finalizing reservations.
* **Authentication & Access Control:** Secure API endpoints using JWT-based authentication for user registration and session management.


## System Architecture

* **Backend Flow:** Route → Controller → Service → Model/Repository → Database
* **Core Engines:** Allocation Engine → Prediction Engine → Event System
* **Database:** MongoDB for storing users, parking lots, slots, bookings, reservations, payments, invoices, and logs
* **Event System:** Lightweight event-driven architecture using Node.js EventEmitter
* **Frontend (Future Scope):** Dashboard for real-time visualization of parking occupancy and analytics


## OOP & Design Principles

* **Encapsulation:** Each module (booking, allocation, prediction, payment) encapsulates its own logic and data handling.

* **Abstraction:** Interfaces are defined for allocation strategies, prediction algorithms, and parking zone management.

* **Inheritance & Polymorphism:** Multiple allocation strategies (normal, peak-hour, priority-based) implement a common interface and can be switched dynamically.

* **Design Patterns:**

  * **Observer Pattern** – Triggers allocation logic when occupancy or booking data changes
  * **Strategy Pattern** – Enables switching between different prediction and allocation algorithms
  * **Factory Pattern** – Creates allocation strategies based on system conditions
  * **Singleton Pattern** – Maintains a centralized event dispatcher for system-wide events
