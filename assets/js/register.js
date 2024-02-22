function submitForm() {
    var passwordInput = document.getElementById('password');
    var confirmPasswordInput = document.getElementById('confirmPassword');
    var errorMensaje = document.getElementById('errorMensaje');
    if (passwordInput.value !== confirmPasswordInput.value) {
        console.log('click', "buenas", passwordInput.value);
        errorMensaje.innerText = 'Las contraseñas no coinciden.';
        return;
    } else {
        errorMensaje.textContent = '';
    }
    // Obtener los datos del formulario
    const nombrecompleto = document.getElementById('nombre').value;
    const cc = document.getElementById('cedula').value;
    const password = document.getElementById('password').value;
    
 

    // Crear un objeto con los datos del formulario
    const userData = {
        nombrecompleto: nombrecompleto,
        cc: cc,
        password: password
    };
    console.log(userData);
    

    // Realiza la conexión al servidor para enviar los datos al backend
    fetch('/sign_up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(userData),
        
        
    })
    // .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
        window.location = '/';
    })
    .catch(error => {
        console.error('Error al enviar los datos al servidor:', error);
    });
    
}


