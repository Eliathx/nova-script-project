CREATE TABLE Psicoterapeutas (
    id VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    clave VARCHAR(100) NOT NULL
);

CREATE TABLE Pacientes (
    id VARCHAR(10) PRIMARY KEY, 
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    edad INT CHECK (edad > 0),
    terapeutaId VARCHAR(10), 
    CONSTRAINT fk_terapeuta
        FOREIGN KEY (terapeutaId)
        REFERENCES Psicoterapeutas(id)
        ON DELETE SET NULL
);

CREATE TABLE Partidas (
    id SERIAL PRIMARY KEY,
    pacienteId VARCHAR(10) NOT NULL, 
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    aciertos INT CHECK (aciertos >= 0),
    tiempoEnSegundos INT CHECK (tiempoEnSegundos >= 0),
    CONSTRAINT fk_paciente
        FOREIGN KEY (pacienteId)
        REFERENCES Pacientes(id)
        ON DELETE CASCADE
);

INSERT INTO Psicoterapeutas (id, nombre, apellido, usuario, clave) VALUES
('1712345678', 'Laura', 'Gómez', 'laurag', 'clave123'),
('0309876543', 'Carlos', 'Pérez', 'carlosp', 'clave456'),
('1501234567', 'María', 'Martínez', 'mariam', 'clave789');

INSERT INTO Pacientes (id, nombre, apellido, edad, terapeutaId) VALUES
('1712345679', 'Juan', 'Ramírez', 25, '1712345678'),
('1712345680', 'Ana', 'López', 30, '1712345678'),
('1712345681', 'Luis', 'Hernández', 22, '0309876543'),
('1712345682', 'Lucía', 'García', 28, '1501234567'),
('1712345683', 'Miguel', 'Díaz', 34, '0309876543');

INSERT INTO Partidas (pacienteId, fecha, aciertos, tiempoEnSegundos) VALUES
('1712345679', '2023-01-15 10:30:00', 8, 300),
('1712345679', '2023-01-20 14:00:00', 10, 290),
('1712345680', '2023-01-18 11:00:00', 7, 400),
('1712345681', '2023-01-19 16:30:00', 5, 360),
('1712345681', '2023-01-25 09:15:00', 12, 280),
('1712345682', '2023-02-01 13:45:00', 9, 320),
('1712345683', '2023-02-02 15:30:00', 6, 410);