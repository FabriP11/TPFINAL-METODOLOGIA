import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#f0f0f0", marginBottom: "20px" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Inicio</Link>
      <Link to="/pacientes" style={{ marginRight: "10px" }}>Pacientes</Link>
      <Link to="/medicos" style={{ marginRight: "10px" }}>Médicos</Link>
      <Link to="/especialidades" style={{ marginRight: "10px" }}>Especialidades</Link>
      <Link to="/turnos">Turnos</Link>
    </nav>
  );
}

export default Navbar;
