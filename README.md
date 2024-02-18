# Tareas pendientes

- Página de principal: Santiago
- Interacción con base de datos: Simón
- Inicio de sesión: Maylen
- Lista de IMCs guardados (Perfíl): Sergio
- Registro de nuevos usuarios: Chucho 

# Modelos de datos:

Usuario:
- Id
- Nombre completo
- Cédula del usuario
- Contraseña

IMC:
- Id_IMC
- Id_usuario
- Fecha de creación
- peso 
- altura

*Se asume que se está usando el sistema métrico internacional.*
*Se debe especificar en la página principal.*



### Requisitos
- Nodejs
- postgresql

### Como ejecutar
`bash
1. npm i
2. npm run start
`
Adicionales: configuara las credenciales de la base de datos

`index.js`, se encuentra la configuracion del servidor en express
que dispone de los recursos de las paginas como rutas y assets. Tambien
se configura la conexion a la base de de datos que es compartida entre las rutas,
igualmente la session se controla desde aqui.

`Routes`, especifical las paginas que se pueden visitar, 
en ella se encuentra el archivo html que se sirve cada vez que 
se accede a la direccion especificada en index.js
