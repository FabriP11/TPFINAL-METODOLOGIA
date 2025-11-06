// src/pages/TurnosPage.js
import { useEffect, useState } from "react";
import { crearTurno, actualizarTurno } from "../api/turnos";
import { getPacientes } from "../api/pacientes";
import { getMedicos } from "../api/medicos";
import Layout from "../components/Layout";

function TurnosPage() {
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [form, setForm] = useState({
    id_turno: null,
    id_paciente: "",
    id_medico: "",
    fecha_turno: "",
    estado: "Programado",
  });
  const [modoEdicion, setModoEdicion] = useState(false);

  async function cargarDatos() {
    const [ps, ms] = await Promise.all([getPacientes(), getMedicos()]);
    setPacientes(ps);
    setMedicos(ms);
  }

  useEffect(() => {
    cargarDatos();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      id_paciente: Number(form.id_paciente),
      id_medico: form.id_medico ? Number(form.id_medico) : null,
      fecha_turno: form.fecha_turno, // string tipo "yyyy-mm-ddThh:mm"
      estado: form.estado,
    };

    if (modoEdicion && form.id_turno) {
      await actualizarTurno(form.id_turno, payload);
    } else {
      await crearTurno(payload);
    }

    setForm({
      id_turno: null,
      id_paciente: "",
      id_medico: "",
      fecha_turno: "",
      estado: "Programado",
    });
    setModoEdicion(false);
  }

  return (
    <Layout current="turnos">
      {/* Encabezado */}
      <div className="flex flex-col gap-3 mb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold text-slate-800 md:text-3xl">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              📅
            </span>
            Nuevo Turno
          </h1>
          <p className="text-sm text-slate-500">
            Completá los datos para registrar un nuevo turno.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setModoEdicion(false);
            setForm({
              id_turno: null,
              id_paciente: "",
              id_medico: "",
              fecha_turno: "",
              estado: "Programado",
            });
          }}
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          ⬅ Limpiar formulario
        </button>
      </div>

      {/* Card de Datos del Turno */}
      <div className="mb-6 overflow-hidden rounded-xl bg-white shadow-md">
        {/* Header de la card */}
        <div className="flex items-center gap-2 bg-blue-600 px-5 py-3 text-white">
          <span>✏️</span>
          <h2 className="font-semibold">
            Datos del Turno
          </h2>
        </div>

        {/* Contenido del formulario */}
        <form onSubmit={handleSubmit} className="space-y-6 px-5 py-4">
          {/* Dos columnas: Paciente / Médico */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Paciente */}
            <div className="rounded-lg border bg-slate-50 p-4 shadow-sm">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  👤
                </span>
                Paciente <span className="text-red-500">*</span>
              </h3>
              <label className="mb-1 block text-xs font-medium text-slate-500">
                Seleccione un paciente
              </label>
              <select
                name="id_paciente"
                value={form.id_paciente}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">-- Seleccionar paciente --</option>
                {pacientes.map((p) => (
                  <option key={p.id_paciente} value={p.id_paciente}>
                    {p.nombre} {p.apellido}
                  </option>
                ))}
              </select>
            </div>

            {/* Médico */}
            <div className="rounded-lg border bg-slate-50 p-4 shadow-sm">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  🩺
                </span>
                Médico <span className="text-red-500">*</span>
              </h3>
              <label className="mb-1 block text-xs font-medium text-slate-500">
                Seleccione un médico
              </label>
              <select
                name="id_medico"
                value={form.id_medico}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">-- Seleccionar médico --</option>
                {medicos.map((m) => (
                  <option key={m.id_medico} value={m.id_medico}>
                    {m.nombre} {m.apellido}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Fecha / Hora / Estado */}
          <div className="grid gap-4 md:grid-cols-3">
            {/* Fecha */}
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Fecha <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="fecha_turno"
                value={form.fecha_turno.split("T")[0] || ""}
                onChange={(e) => {
                  const fecha = e.target.value;
                  const hora =
                    form.fecha_turno.split("T")[1] || "09:00";
                  setForm({
                    ...form,
                    fecha_turno: `${fecha}T${hora}`,
                  });
                }}
                required
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-slate-400">
                La fecha debe ser futura.
              </p>
            </div>

            {/* Hora */}
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Hora <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="hora"
                value={form.fecha_turno ? form.fecha_turno.slice(11, 16) : ""}
                onChange={(e) => {
                  const hora = e.target.value;
                  const fecha =
                    form.fecha_turno.split("T")[0] ||
                    new Date().toISOString().slice(0, 10);
                  setForm({
                    ...form,
                    fecha_turno: `${fecha}T${hora}`,
                  });
                }}
                required
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-slate-400">
                Formato 24 horas (Ej: 14:30)
              </p>
            </div>

            {/* Estado */}
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Estado
              </label>
              <select
                name="estado"
                value={form.estado}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Programado">Programado</option>
                <option value="Atendiendo">Atendiendo</option>
                <option value="Finalizado">Finalizado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
          </div>

          {/* Botón Crear / Guardar */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              ✅ {modoEdicion ? "Guardar cambios" : "Crear Turno"}
            </button>
          </div>
        </form>
      </div>

      {/* Panel de ayuda */}
      <div className="rounded-xl bg-white p-4 text-sm text-slate-600 shadow-md">
        <h3 className="mb-2 flex items-center gap-2 font-semibold">
          💡 Ayuda
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Los campos marcados con * son obligatorios.</li>
          <li>El paciente y el médico deben estar cargados en el sistema.</li>
          <li>Revisá el horario del médico antes de asignar el turno.</li>
          <li>
            Los turnos se programan en horarios definidos por la clínica.
          </li>
        </ul>
      </div>
    </Layout>
  );
}

export default TurnosPage;

