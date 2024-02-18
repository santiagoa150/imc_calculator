CREATE DATABASE "RequisitosTaller2"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

COMMENT ON DATABASE "RequisitosTaller2"
    IS 'base de datos para el taller 2 de requisitos';
CREATE TABLE public."usuarios"
(
    "id" serial NOT NULL,
    "nombre_completo" character varying(50) NOT NULL,
    "cc" integer NOT NULL,
    "password" character varying(50),
    PRIMARY KEY ("CC")
);

ALTER TABLE IF EXISTS public."usuarios"
    OWNER to postgres;

    