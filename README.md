
## Tech Stack
- **Frontend**: React + Vite, Tailwind CSS + Tailwind V4, Fraer Motion, React Router.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT Auth.

## Features
- Cinematic Autoplay Video Intro
- Fully animated page transitions and scroll reveals
- Custom Glassmorphism UI
- Dark / Light Mode (Seamless, animated toggle)
- Full Blog (Essays) with category filtering and elegant reading UI
- Portfolio Studio showing dynamic grid
- Admin Dashboard to manage essays and projects
- Mobile Responsiv

## Setup Instructions

### Prerequisites
1. Ensure you have **Node.js** installed.
2. Ensure you have **MongoDB** installed and running on default port (`27017`).

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the backend server:
   ```bash
   node server.js
   ```
   *The server will run on port 5000 and connect to a local MongoDB instance. If you need a customized DB or port, configure the `.env` file in the backend folder.*

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the web app in your browser at the URL provided by Vite (usually `http://localhost:5173`).

### 3. Demo Data & Admin Access
The frontend is configured to show "mock data" dynamically if the backend fails or is empty, ensuring the UI can be previewed immediately without database seeding.
- To use the admin section, you will need to register an admin via the backend API `POST http://localhost:5000/api/auth/register`, then navigate to `/login` to access the dasrd.
