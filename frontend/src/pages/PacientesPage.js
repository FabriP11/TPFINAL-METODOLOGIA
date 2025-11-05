import { useEffect, useState } from "react";
import {
  getPacientes,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from "../api/pacientes";

function PacientesPage() {
  const [pacientes, setPacientes] = useState([]);
  const [form, setForm] = useState({
    id_paciente: null,
    nombre: "",
    apellido: "",
    dni: "",
    correo: "",
  });

  const [modoEdicion, setModoEdicion] = useState(false);

  async function cargarPacientes() {
    const data = await getPacientes();
    setPacientes(data);
  }

  useEffect(() => {
    cargarPacientes();
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      nombre: form.nombre,
      apellido: form.apellido,
      dni: form.dni || null,
      correo: form.correo || null,
    };

    if (modoEdicion && form.id_paciente) {
      await actualizarPaciente(form.id_paciente, payload);
    } else {
      await crearPaciente(payload);
    }

    setForm({
      id_paciente: null,
      nombre: "",
      apellido: "",
      dni: "",
      correo: "",
    });
    setModoEdicion(false);
    await cargarPacientes();
  }

  function editarPaciente(p) {
    setForm({
      id_paciente: p.id_paciente,
      nombre: p.nombre,
      apellido: p.apellido,
      dni: p.dni || "",
      correo: p.correo || "",
    });
    setModoEdicion(true);
  }

  async function borrarPaciente(id) {
    if (window.confirm("¿Seguro que querés eliminar este paciente?")) {
      await eliminarPaciente(id);
      await cargarPacientes();
    }
  }

  return (
    <div>
      <h2>Pacientes</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <label>Nombre: </label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Apellido: </label>
          <input
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>DNI: </label>
          <input
            name="dni"
            value={form.dni}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Correo: </label>
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          {modoEdicion ? "Guardar cambios" : "Crear paciente"}
        </button>
        {modoEdicion && (
          <button
            type="button"
            onClick={() => {
              setModoEdicion(false);
              setForm({
                id_paciente: null,
                nombre: "",
                apellido: "",
                dni: "",
                correo: "",
              });
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancelar
          </button>
        )}
      </form>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p) => (
            <tr key={p.id_paciente}>
              <td>{p.id_paciente}</td>
              <td>{p.nombre}</td>
              <td>{p.apellido}</td>
              <td>{p.dni}</td>
              <td>{p.correo}</td>
              <td>
                <button onClick={() => editarPaciente(p)}>Editar</button>
                <button
                  onClick={() => borrarPaciente(p.id_paciente)}
                  style={{ marginLeft: "5px" }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {pacientes.length === 0 && (
            <tr>
              <td colSpan="6">No hay pacientes cargados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PacientesPage;
