const express = require("express");
const { Client, Connection } = require("pg");
const cors = require("cors");

const app = express();
const port = 4545;

app.use(express.json());
app.use(cors());

const dbConfig = {
    user: "", // usuario de la base de datos
    password: "", // contraseña de la base de datos
    host: "",
    database: "", // nombre de la base de datos
    port: ,
};

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

app.post("/login", (request, response) => {
    const cedula = request.body.cc;
    const contraseña = request.body.password;

    const connection = new Client(dbConfig);

    connection.connect((err) => {
        if (err) {
            console.error("Error en la conexión:", err);
            response.status(500).send("Error en la conexión a la base de datos.");
            return;
        }

        const query = {
            text: 'SELECT Id FROM usuarios WHERE cc = $1 AND password = $2',
            values: [cedula, contraseña],
        };

        connection.query(query, (err, result) => {
            if (err) {
                console.error("Error en la consulta de login:", err);
                response.status(500).send("Error en la ejecución de la consulta de login.");
            } else {
                if (result.rows.length > 0) {
                    console.log("Usuario autenticado");
                    response.send("Usuario autenticado");
                } else {
                    console.log("Credenciales incorrectas");
                    response.status(401).send("Credenciales incorrectas");
                }
            }

            connection.end();
        });
    });
});

app.post("/sign_up", (request, response) => {
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

app.post("/insert_imc", (request, response) => {
    const cedula = request.body.cc;
    const altura = request.body.altura;
    const peso = request.body.peso;
    const fecha = Math.floor(Date.now() / 1000);
    // si no se va calcular el imc desde el backend quitar el comentario de la siguiente linea y comentar la 117
    // const imc = request.body.imc; 
    const imc = peso / (altura * altura)
    const connection = new Client(dbConfig);

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

app.post("/get_data", (request, response )=>{
    const cedula = request.body.cc

    
    const connection = new Client(dbConfig);
    connection.connect((err)=>{
        if (err) {
            console.error("Error en la conexión:", err);
            response.status(500).send("Error en la conexión a la base de datos.");
            return;
        }

        const select= {
            text: `SELECT * FROM "${cedula}"`
        }
        connection.query(select, (err, result) => {
            if (err) {
                console.error("Error en la inserción del imc:", err);
                response.status(500).send("Error en la inserción del imc.");
            } else {
                console.log("registro obtenido correctamente")
                response.status(200).send({
                    data: result.rows ,
                })
            }
        });
    })
})
