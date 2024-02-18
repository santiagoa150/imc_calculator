CREATE DATABASE "RequisitosTaller2"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

COMMENT ON DATABASE "RequisitosTaller2"
    IS 'base de datos para el taller 2 de requisitos';
CREATE TABLE public."Usuario"
(
    "Id" serial NOT NULL,
    "Nombre_Completo" character varying(50) NOT NULL,
    "CC" integer NOT NULL,
    "Password" character varying(50),
    PRIMARY KEY ("CC")
);

ALTER TABLE IF EXISTS public."Usuario"
    OWNER to postgres;

    