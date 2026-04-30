-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS public.usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    telefone VARCHAR(15),
    whatsapp VARCHAR(15),
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Pets
CREATE TABLE IF NOT EXISTS public.pet (
    id SERIAL PRIMARY KEY,
    id_cli INTEGER NOT NULL,
    nome VARCHAR(50) NOT NULL,
    sexo CHAR(1) CHECK (sexo IN ('M', 'F')),
    especie VARCHAR(30) NOT NULL,
    raca VARCHAR(50),
    peso DECIMAL(5,2),
    tamanho VARCHAR(20),
    idade INTEGER,
    doenca VARCHAR(255),
    obs TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_pet_usuario FOREIGN KEY (id_cli) REFERENCES public.usuario(id) ON DELETE CASCADE
);

-- Tabela de Doações
CREATE TABLE IF NOT EXISTS public.doacoes (
    id SERIAL PRIMARY KEY,
    id_pet INTEGER NOT NULL,
    id_cli_interesse INTEGER,
    data_interesse DATE,
    data_doacao DATE,
    status VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_doacoes_pet FOREIGN KEY (id_pet) REFERENCES public.pet(id) ON DELETE CASCADE,
    CONSTRAINT fk_doacoes_usuario FOREIGN KEY (id_cli_interesse) REFERENCES public.usuario(id) ON DELETE SET NULL
);