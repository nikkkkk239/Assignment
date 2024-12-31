# Location / Address Flow

A brief description of the project, its functionality, and purpose.

## How to Run the Code

### Steps
1. Download the zip file.
2. Extract the zip file to any directory.
3. Navigate to the backend folder:.
4. cd backend.
5. Install dependencies for the backend:.
6. npm install.
7. Start the backend:.
8. npm run start.
9. Navigate to the frontend folder.
10. cd ../frontend.
11. Install dependencies for the frontend:
12. npm install.
13. Start the frontend:.
14. npm run dev.
15. Follow the link displayed in the terminal to access the application.
16. Packages Used in the Project.

### Backend
1. bcrypt: For password hashing.
2. jsonwebtoken: For user authentication (JWT tokens).
3. dotenv: To manage environment variables.
4. cors: For enabling Cross-Origin Resource Sharing.
5. express: The web framework for building the backend API.
6. mongoose: For MongoDB object modeling.
7. cookie-parser: For parsing cookies.

### Frontend
1. @react-google-maps/api: Google Maps integration to select and save locations.
2. axios: For making HTTP requests to the backend.
3. zustand: State management for authentication and address data.
4. react-icons: For using icons in the UI.
5. react-hot-toast: For notifications.
6. react-router-dom: For routing.
7. react-modal: For handling modals.
8. State Management with Zustand

### This project uses Zustand for state management. Two stores are set up:

1. useAuthStore: Manages user authentication (sign-up, login, and logout) and stores the user’s data in the app.
2. useAddressStore: Manages user addresses (Home, Office, Family, etc.) and their interactions with the backend, including adding, updating, and removing addresses. The store also handles recent searches and persists data using Zustand's persist middleware.

### Google API Integration

The project enables users to select and save their locations via Google Maps, with options for saving "Home", "Work", or "Family" locations. It provides real-time geolocation tracking, allows users to search for addresses, and stores their recent searches. Users can manage and update their saved locations and set their address preferences.

