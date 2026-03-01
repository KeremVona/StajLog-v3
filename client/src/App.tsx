import { BrowserRouter, Route, Routes, Navigate } from "react-router";

import "./App.css";

import ProtectedRoute from "./ProtectedRoute";
import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import Home from "./pages/Home";
import AddInternship from "./pages/internship/MakeInternship";
import ViewInternship from "./pages/internship/ViewInternship";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute content={<Home />} />} />
          <Route
            path="/add-internship"
            element={<ProtectedRoute content={<AddInternship />} />}
          />
          <Route
            path="/internship/:id"
            element={<ProtectedRoute content={<ViewInternship />} />}
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
