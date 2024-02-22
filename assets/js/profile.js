async function traerDatos() {

    const response = await fetch('/getData');
    const user = await response.json();
    console.log(user);

    const traerIMC = await fetch('/get_imcs?cc='+user.cc);
    const imc = (await traerIMC.json()).data;

    var texto = "" ;
    for (const data of imc) {
        texto+=`<p>Peso: ${data.peso}, Altura: ${data.altura}, IMC: ${data.imc} </p>`
    }
    console.log(user,imc);

    document.getElementById("nombreUsuario").innerHTML=user.nombre_completo;
    document.getElementById("cedula").innerHTML='CC: ' + user.cc;
    document.getElementById("imc_resultados").innerHTML=texto;
}

traerDatos()