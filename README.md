# Tareas pendientes

- Página de principal: Santiago
- Interacción con base de datos: Simón
- Inicio de sesión: Maylen
- Lista de IMCs guardados (Perfíl): Sergio
- Registro de nuevos usuarios: Chucho 

# Modelos de datos:

Usuario:
- Id (tipo entero serial)
- Nombre completo (varchar 50 )
- Cédula del usuario (integer (la cédula se introduce sin puntos),llave primaria)
- Contraseña(varchar 50 )

IMC:
- Id_IMC
- Id_usuario
- Fecha de creación
- peso 
- altura
-imc

*Se asume que se está usando el sistema métrico internacional.*
*Se debe especificar en la página principal.*