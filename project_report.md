# Project Status Report & Database Configuration

## 1. Work Summary (Recent Changes)

### Mobile App Refactoring & Enhancements
- **Mobile Structure**: Implemented a native-like mobile layout with Header, Sidebar Menu, and persistent navigation state.
- **Draggable Popups**: Made `DetailPopup` and `MultiSelectPopup` draggable via their headers for better usability.
- **Data Flow**: Implemented data passing from Popups back to the parent screen (`MobileSample`), displaying selection results.
- **Navigation Architecture**:
  - **History Management**: Implemented a custom history stack for "Back" and "Forward" navigation within the single-page app structure.
  - **Sequential Navigation Test**: Added `NavTestScreen` to demonstrate and verify A -> B -> C navigation flows.
  - **Deep Linking**: Added `MobileStock` and `StockDetail` to show deep parameter passing mechanics.
- **State Synchronization**: Fixed issue where logging out in Mobile view didn't reflect when switching to PC view, and verified PC Left Menu active state highlighting.

### Backend Enhancements
- **Build System**: Unified to **Maven**, removed Gradle.
- **Java Version**: Downgraded to **Java 11** for compatibility.
- **Data Access**: Implemented Hybrid approach:
  - **JPA**: Used for Command (Write) operations.
  - **MyBatis**: Used for Query (Read) operations (e.g., `MenuMapper`).
- **Refactoring**: Reorganized backend into a **Layered Architecture**:
  - `controller`: API Endpoints
  - `service`: Business Logic
  - `repository`: Data Access Layer
  - `model`: Domain Entities
  - `config`: Configuration classes
  - `mapper`: MyBatis Mappers
- **Security**: Configured `SecurityConfig` to use lightweight HTTP Basic Auth and opened `/api/samples/**` for testing.

---

## 2. Database Configuration

### Current Status: **PostgreSQL**
The project is currently configured to use **PostgreSQL**.

**Configuration File**: `backend/src/main/resources/application.properties`
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/menu_db
spring.datasource.username=postgres
spring.datasource.password=postgres
```

**Dependency**: `backend/pom.xml`
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

### How to Apply / Modify

#### Option A: To use PostgreSQL (Current Setup)
1.  **Install PostgreSQL**: Ensure you have PostgreSQL installed and running locally.
2.  **Create Database**: Create a database named `menu_db`.
    ```sql
    CREATE DATABASE menu_db;
    ```
3.  **Verify Credentials**: Check that the username/password in `application.properties` matches your local Postgres setup.

#### Option B: To Switch to H2 (In-Memory Database)
If you prefer a lightweight, zero-setup database for testing:
1.  **Modify `pom.xml`**: Replace `postgresql` dependency with `h2`.
    ```xml
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
    ```
2.  **Modify `application.properties`**:
    ```properties
    # spring.datasource.url=jdbc:postgresql://... (comment out)
    spring.datasource.url=jdbc:h2:mem:testdb
    spring.datasource.driverClassName=org.h2.Driver
    spring.datasource.username=sa
    spring.datasource.password=
    spring.h2.console.enabled=true
    ```

---

## 3. Authentication & State Management

### Authentication Flow
1.  **Signup (`/api/auth/signup`)**
    -   User enters credentials.
    -   Backend validates input, encrypts password using `BCryptPasswordEncoder`, and saves the `User` entity to the database.

2.  **Login (`/api/auth/login`)**
    -   User credentials are verified against the database.
    -   **Backend**: On success, returns a JSON response containing the user's `nickname`.
    -   **Frontend**: Stores the `nickname` in browser's `localStorage` to simulate a persistent session.

3.  **Logout**
    -   Frontend removes the `nickname` from `localStorage`.
    -   Resets React state (`nickname`, `logged`).
    -   Redirects to the Login screen.

### State Synchronization (PC <-> Mobile)
-   **Mechanism**: The application relies on `localStorage` as the single source of truth for the session.
-   **PC View (`App.jsx`)**: Checks `localStorage` on initialization and updates its internal `nickname` state.
-   **Mobile View (`MobileApp.jsx`)**: Receives the login state from the PC wrapper or checks `localStorage` directly.
-   **Syncing**: `App.jsx` listens for view mode changes (`isMobile`). When switching between PC and Mobile, it re-reads `localStorage`. This ensures that logging out in the Mobile view immediately reflects in the PC view (showing the login screen) and vice versa.
