# Class Diagram

This diagram visualizes the **Object-Oriented Architecture** of the Smart Parking Space Allocation System. It leverages design patterns to ensure the system is scalable, maintainable, and adaptable for real-world parking environments:

*   **Strategy Pattern:** Allows dynamic switching between different prediction algorithms (e.g., `MovingAveragePrediction` vs. `TrendBasedPrediction`) without modifying the core `PredictionEngine`.
*   **Observer Pattern:** Enables the `DecisionEngine` to react in real-time to updates from the `OccupancyTracker`, triggering allocation or redirection when occupancy thresholds change.
*   **Factory Pattern:** Decouples the `AllocationEngine` from specific allocation strategies (e.g., `NormalAllocation`, `PeakHourAllocation`, `PriorityAllocation`), allowing flexible slot assignment based on demand conditions.
*   **Singleton Pattern:** Ensures a centralized `EventDispatcher` manages system-wide events such as occupancy updates, prediction triggers, and allocation decisions.

*   **3-Tier Architecture:** Explicit separation between **API Controllers** (Request handling), **Business Services** (Logic orchestration), and **Data Models** (Database schemas).
*   **Strategy Pattern:** The `AllocationService` leverages the Strategy Pattern to switch between `NormalAllocation` and `PeakHourAllocation` logic dynamically based on system demand.
*   **Observer Pattern:** Enables the `MonitoringService` to react in real-time to updates from the `OccupancyTracker`, triggering notifications when facility thresholds are reached.
*   **Factory Pattern:** Decouples the `AllocationEngine` from specific strategy instances, allowing the system to instantiate the correct allocation logic based on real-time traffic conditions.
*   **Singleton Pattern:** The `AllocationService` and `DatabaseConnection` are implemented as Singletons to maintain a single source of truth across the application.
*   **Encapsulation:** Core business rules are encapsulated within services, ensuring that the API layer remains thin and logic-free.

![Class Diagram](./classDiagramImage.png)
