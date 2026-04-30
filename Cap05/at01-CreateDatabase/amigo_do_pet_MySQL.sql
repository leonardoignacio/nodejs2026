CREATE DATABASE IF NOT EXISTS amigo_do_pet
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci

USE amigo_do_pet

-- Tabela de Usuários (Donos e Interessados)
CREATE TABLE usuario (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    telefone VARCHAR(15),
    whatsapp VARCHAR(15),
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
) ENGINE=InnoDB

-- Tabela de Pets
CREATE TABLE pet (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_cli INT UNSIGNED NOT NULL, -- FK para o Usuário que doa (Relacionamento doa)
    nome VARCHAR(50) NOT NULL,
    sexo ENUM('M', 'F'),
    especie VARCHAR(30) NOT NULL,
    raca VARCHAR(50),
    peso DECIMAL(5,2),
    tamanho VARCHAR(20),
    idade INT,
    doenca VARCHAR(255),
    obs TEXT,
    CONSTRAINT fk_pet_usuario FOREIGN KEY (id_cli) REFERENCES usuario(id) ON DELETE CASCADE
) ENGINE=InnoDB

-- Tabela de Doações (Relacionamentos interessa e doado)
CREATE TABLE doacoes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_pet INT UNSIGNED NOT NULL, -- FK para o Pet (Relacionamento doado)
    id_cli_interesse INT UNSIGNED, -- FK para o Usuário interessado (Relacionamento interessa)
    data_interesse DATE,
    data_doacao DATE,
    status VARCHAR(50),
    CONSTRAINT fk_doacoes_pet FOREIGN KEY (id_pet) REFERENCES pet(id) ON DELETE CASCADE,
    CONSTRAINT fk_doacoes_usuario FOREIGN KEY (id_cli_interesse) REFERENCES usuario(id) ON DELETE SET NULL
) ENGINE=InnoDB