document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('formularioRegistro');
    var passwordInput = document.getElementById('password');
    var confirmPasswordInput = document.getElementById('confirmPassword');
    var errorMensaje = document.getElementById('errorMensaje');

    form.addEventListener('submit', function (event) {
        if (passwordInput.value !== confirmPasswordInput.value) {
            errorMensaje.textContent = 'Las contraseñas no coinciden.';
            event.preventDefault();
        } else {
            errorMensaje.textContent = '';
            window.location.href = './index.html';
        }
    });
});
