# Sequence Diagram

This flow illustrates the **Predictive Auto-Scaling Loop**, detailing how the system transitions from monitoring to action. It highlights the asynchronous nature of the analysis pipeline to prevent blocking critical operations:

1.  **Ingestion:** The `Monitoring Agent` continuously pushes resource metrics to the `TimeSeries API`.
2.  **Analysis:** The `Prediction Engine` processes historical data to forecast future load trends.
3.  **Execution:** If a threshold is breached, the `Executor` triggers a scale-out/in event and logs the action for auditability.

1.  **Security & Authentication:** Every request is intercepted by the **JWT Middleware** to verify identity and role permissions before reaching the controllers.
2.  **Intelligent Allocation:** The **Booking Service** delegates slot selection to the **Allocation Engine**, which runs complex logic to find the optimal space in real-time.
3.  **State Persistence:** The **Slot Service** handles atomicity, ensuring that a slot is marked as 'occupied' in the database before the booking is finalized to prevent race conditions.
4.  **Admin Oversight:** Shows the separate privileged path where administrators can initialize new facilities and monitor system-wide state changes.

![Sequence Diagram](./sequenceDiagramImage.png)
