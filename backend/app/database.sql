-- Crear base de datos
CREATE DATABASE IF NOT EXISTS tp_final_metodologia;
USE tp_final_metodologia;

-- Tabla de Pacientes
CREATE TABLE IF NOT EXISTS paciente (
  id_paciente INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  dni VARCHAR(20),
  correo VARCHAR(100)
);

-- Tabla de Médicos
CREATE TABLE IF NOT EXISTS medico (
  id_medico INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  matricula VARCHAR(50) NOT NULL,
  id_especialidad INT NULL
);

-- Tabla de Turnos
CREATE TABLE IF NOT EXISTS turnos (
  id_turno INT AUTO_INCREMENT PRIMARY KEY,
  id_paciente INT NOT NULL,
  id_medico INT NULL,
  fecha_turno DATETIME NOT NULL,
  estado ENUM('Programado','Atendiendo','Finalizado','Cancelado') DEFAULT 'Programado',
  FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente),
  FOREIGN KEY (id_medico) REFERENCES medico(id_medico)
);
