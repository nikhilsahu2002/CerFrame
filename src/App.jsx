import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import { useAuth } from "./Context/AuthContext";
import Dashboard from "./Components/Dashboard";
import Certificate from "./Components/Certificate";

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Certificate />}
        />
        {!user && <Route path="/login" element={<LoginPage />} />}
        {user && <Route path="/dashboard" element={<Dashboard />} />}
      </Routes>
    </Router>
  );
}

export default App;
