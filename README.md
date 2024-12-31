Location / Address Flow

A brief description of the project, its functionality, and purpose.

How to Run the Code

Prerequisites
Node.js (version)
MongoDB (if used)
Google API key for Google Maps integration

Steps
Download the zip file.
Extract the zip file to any directory.
Navigate to the backend folder:
cd backend
Install dependencies for the backend:
npm install
Start the backend:
npm run start
Navigate to the frontend folder:
cd ../frontend
Install dependencies for the frontend:
npm install
Start the frontend:
npm run dev
Follow the link displayed in the terminal to access the application.
Packages Used in the Project

Backend
bcrypt: For password hashing.
jsonwebtoken: For user authentication (JWT tokens).
dotenv: To manage environment variables.
cors: For enabling Cross-Origin Resource Sharing.
express: The web framework for building the backend API.
mongoose: For MongoDB object modeling.
cookie-parser: For parsing cookies.
Frontend
@react-google-maps/api: Google Maps integration to select and save locations.
axios: For making HTTP requests to the backend.
zustand: State management for authentication and address data.
react-icons: For using icons in the UI.
react-hot-toast: For notifications.
react-router-dom: For routing.
react-modal: For handling modals.
State Management with Zustand

This project uses Zustand for state management. Two stores are set up:

useAuthStore: Manages user authentication (sign-up, login, and logout) and stores the user’s data in the app.
useAddressStore: Manages user addresses (Home, Office, Family, etc.) and their interactions with the backend, including adding, updating, and removing addresses. The store also handles recent searches and persists data using Zustand's persist middleware.
Google API Integration

The project enables users to select and save their locations via Google Maps, with options for saving "Home", "Work", or "Family" locations. It provides real-time geolocation tracking, allows users to search for addresses, and stores their recent searches. Users can manage and update their saved locations and set their address preferences.

