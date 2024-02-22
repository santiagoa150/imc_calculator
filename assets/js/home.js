let imc = NaN;
let user = undefined;
const imcData = {
    EMPTY: {
        img: "/assets/question-mark.png",
        title: "¡Ingresa los valores para conocer tu resultado!",
        color: "white",
    },
    OBESIDAD3: {
        img: "/assets/obesity3.png",
        title: "Obesidad 3",
        color: "#933dbd",
        textColor: "white",
    },
    OBESIDAD2: {
        img: "/assets/obesity2.png",
        title: "Obesidad 2",
        color: "#be3c8c",
        textColor: "white",
    },
    OBESIDAD: {
        img: "/assets/obesity.png",
        title: "Obesidad",
        color: "#e64439",
        textColor: 'white'
    },
    SOBREPRESO: {
        img: "/assets/fat.png",
        title: "Sobrepeso",
        color: "#f48320"
    },
    SALUDABLE: {
        img: "/assets/healthy.png",
        title: "Saludable",
        color: "#9db226"
    },
    BAJO_PESO: {
        img: "/assets/anorexia.png",
        title: "Bajo peso",
        color: "#58bdde"
    }
}

function setInputLimits(element) {
    var valor = parseFloat(element.value);

    if (isNaN(valor)) {
        element.value = '';
        return;
    }

    if (valor < element.min) {
        element.value = element.min;
    } else if (valor > element.max) {
        element.value = element.max;
    }
}


async function calculateIMC(event) {

    const response = await fetch('/getData');
    user = await response.json();

    const pesoInput = document.getElementById('peso_input');
    const alturaInput = document.getElementById('altura_input');

    if (!pesoInput.value || !alturaInput.value) {
        setModalDisplay('missing-data-modal', 'flex');
        return;
    }

    event.style.display = 'none';
    document.getElementById('limpiar_button').style.display = 'block';
    pesoInput.setAttribute('disabled', true);
    alturaInput.setAttribute('disabled', true);
    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);
    imc = peso / (altura * altura);

    if (user?.cc) document.getElementById('guardar_button').style.display = 'block';
    decorateResult();
}

async function saveIMC() {
    fetch('/insert_imc', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cc: user?.cc,
            altura: document.getElementById('altura_input').value,
            peso: document.getElementById('peso_input').value,
        })
    }).then(() => {
        window.location = '/profile'
    });
}

function deleteIMC(event) {
    event.style.display = 'none';
    const pesoInput = document.getElementById('peso_input');
    const alturaInput = document.getElementById('altura_input');
    pesoInput.value = '';
    pesoInput.removeAttribute('disabled');
    alturaInput.value = '';
    alturaInput.removeAttribute('disabled');
    document.getElementById('guardar_button').style.display = 'none';
    document.getElementById('calcular_button').style.display = 'block';
    imc = NaN;
    decorateResult();
}

function decorateResult() {
    const resultCard = document.getElementById('result-card');
    let selected = undefined;
    let showResult = false;
    if (isNaN(imc)) {
        selected = imcData.EMPTY;
    } else {
        showResult = true;
        if (imc >= 40) {
            selected = imcData.OBESIDAD3;
        } else if (imc >= 35 && imc < 40) {
            selected = imcData.OBESIDAD2;
        } else if (imc >= 30 && imc < 35) {
            selected = imcData.OBESIDAD;
        } else if (imc >= 25 && imc < 30) {
            selected = imcData.SOBREPRESO;
        } else if (imc >= 18.5 && imc < 25) {
            selected = imcData.SALUDABLE;
        } else if (imc < 18.5) {
            selected = imcData.BAJO_PESO;
        }
    }
    resultCard.innerHTML = `
    <img src="${selected.img}">
    <div ${selected.textColor ? `style="color: ${selected.textColor};"` : ''}>
        <h4 style="margin: 0;">${selected.title}</h4>
        <p id="resultado-value" style="display: ${showResult ? 'block' : 'none'};">Tu resultado es: ${parseFloat(imc.toFixed(2))}</p>
    </div>
    `
    resultCard.style.backgroundColor = selected.color;
}
decorateResult();