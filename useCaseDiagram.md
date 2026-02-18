# Use Case Diagram

This diagram outlines the **Functional Requirements** and key interactions for the AutoScaleX platform. It categorizes system capabilities by actor to ensure all stakeholder needs are met:

*   **System Admin:** Manages the platform infrastructure, global configurations, and tenant onboarding.
*   **Tenant User:** Configures specific scaling policies for their services and views performance dashboards.
*   **System Scheduler:** Background processes that drive the automated prediction and resource optimization cycles.

*   **End User:** Interacts with the platform to manage their profile, browse facilities, and execute the full booking-to-invoice lifecycle.
*   **System Admin:** Possesses elevated privileges to manage physical infrastructure, configure pricing rules, and access system-wide analytics.
*   **External Systems:** Interfaces with **Payment Gateways** for transaction processing and **Notification Services** for user alerts.

### Functional Groupings:

*   **Parking Operations:** Covers the primary logic of finding, reserving, and paying for slots.
*   **Administrative Control:** Includes high-level management tasks like "Manual Slot Override" and "Exporting Usage Reports."
*   **Financial Flow:** Explicitly models the relationship between Booking, Payment Processing, and Digital Invoicing.

![Use Case Diagram](./useCaseDiagramImage.png)
