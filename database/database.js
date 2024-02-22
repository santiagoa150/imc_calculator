const express = require("express");
const router = express.Router();
const { Client } = require("pg");

require('dotenv').config()

const dbConfig = {
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT),
};

router.get("/login/request", (request, response) => {
    const cedula = request.query.ID;
    const contraseña = request.query.password;
    const connection = new Client(dbConfig);

    connection.connect((err) => {
        if (err) {
            console.error("Error en la conexión:", err);
            response.redirect('/err?e=Error en la conexión a la base de datos.');
            return;
        }

        const query = {
            text: 'SELECT Id, cc FROM usuarios WHERE cc = $1 AND password = $2',
            values: [cedula, contraseña],
        };
        connection.query(query, (err, result) => {
            if (err) {
                console.error("Error en la consulta de login:", err);
                response.redirect('/err?e=Error en la ejecución de la consulta de login.');
            } else {
                if (result.rows.length > 0) {
                    const user = result?.rows?.[0];
                    request.session.userLoggedId = user.cc;
                    console.log("Usuario autenticado");
                    response.redirect('/');
                } else {
                    console.log("Credenciales incorrectas");
                    response.redirect('/login?error=notfound');
                }
            }

            connection.end();
        });
    });
});

router.post("/sign_up", (request, response) => {
    const cedula = request.body.cc;
    const contraseña = request.body.password;
    const nombre = request.body.nombrecompleto;
    const connection = new Client(dbConfig);

    connection.connect((err) => {
        if (err) {
            console.error("Error en la conexión:", err);
            response.status(500).send("Error en la conexión a la base de datos.");
            return;
        }

        const insert = {
            text: 'INSERT INTO usuarios ("nombre_completo", "cc", "password") VALUES ($1, $2, $3)',
            values: [nombre, cedula, contraseña],
        };

        const create_table = {
            text: 'CREATE TABLE public."' + cedula + '"' +
                '( "id" serial, ' +
                '"peso" float NOT NULL, ' +
                '"altura" float NOT NULL, ' +
                '"fecha" date NOT NULL, ' +
                '"imc" float NOT NULL );',
        };
        connection.query(insert, (err) => {
            if (err) {
                console.error("Error en la consulta de registro:", err);
                response.status(500).send("Error en la ejecución de la consulta de registro.");
            } else {
                connection.query(create_table, (err) => {
                    if (err) {
                        console.error("Error al crear tabla de IMC:", err);
                        response.status(500).send("Error al crear tabla de IMC.");
                    } else {
                        response.send("Usuario registrado correctamente")
                        connection.end();
                    }
                })

            }


        });
    });
});

router.post("/insert_imc", (request, response) => {
    const cedula = request.body.cc;
    const altura = request.body.altura;
    const peso = request.body.peso;
    const fecha = Math.floor(Date.now() / 1000);
    // si no se va calcular el imc desde el backend quitar el comentario de la siguiente linea y comentar la 117
    // const imc = request.body.imc; 
    const imc = peso / (altura * altura)
    const connection = new Client(dbConfig);
    console.log(cedula, altura, peso, fecha, imc);
    connection.connect((err) => {
        if (err) {
            console.error("Error en la conexión:", err);
            response.status(500).send("Error en la conexión a la base de datos.");
            return;
        }

        const insert = {
            text: `INSERT INTO "${cedula}" ("peso", "altura", "fecha", "imc") VALUES ($1, $2, to_timestamp($3), $4)`,
            values: [peso, altura, fecha, imc]
        };

        connection.query(insert, (err) => {
            if (err) {
                console.error("Error en la inserción del imc:", err);
                response.status(500).send("Error en la inserción del imc.");
            } else {
                console.log("registro del imc creado correctamente")
                response.send("registro del imc creado correctamente")
            }


        });
    });
});

router.get("/get_imcs", (request, response) => {
    const cedula = request.query.cc
    const connection = new Client(dbConfig);
    connection.connect((err) => {
        if (err) {
            console.error("Error en la conexión:", err);
            response.status(500).send("Error en la conexión a la base de datos.");
            return;
        }

        const select = {
            text: `SELECT * FROM "${cedula}"`
        }
        connection.query(select, (err, result) => {
            if (err) {
                console.error("Error en la inserción del imc:", err);
                response.status(500).send("Error en la inserción del imc.");
            } else {
                console.log("registro obtenido correctamente")
                response.status(200).send({ data: result.rows })
            }
        });
    })
});

router.get('/getData', async (req, res) => {
    // Implmentar funcion para traer los datos del perfil
    const userId = req.session?.userLoggedId;
    console.log(userId);
    const connection = new Client(dbConfig);
    connection.connect((err) => {
        if (err) {
            console.error("Error en la conexión:", err);
            res.status(500).send("Error en la conexión a la base de datos.");
            return;
        }

        const select = {
            text: `SELECT * FROM usuarios WHERE cc=$1`,
            values: [userId]
        }
        connection.query(select, (err, result) => {
            if (err) {
                console.error("Error en la inserción del imc:", err);
                res.status(500).send("Error en la inserción del imc.");
            } else {
                console.log("registro obtenido correctamente")
                const user = result?.rows?.[0];
                res.status(200).json(user ? user : {});
            }
        });
    })    
});

module.exports = router;