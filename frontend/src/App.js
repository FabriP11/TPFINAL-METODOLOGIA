import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PacientesPage from "./pages/PacientesPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pacientes" element={<PacientesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;