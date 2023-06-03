

// Variables globales
const username = "elon";
const password = "musk";
let saldo = 100000;
let montoInversion = 0;
let intentosRestantes = 3;

// Array criptomonedas
const criptomonedas = [
    { nombre: "Bitcoin", precio: 60000, cantidad: 0 },
    { nombre: "Ethereum", precio: 2000, cantidad: 0 },
    { nombre: "BNB", precio: 400, cantidad: 0 },
    { nombre: "DOGE", precio: 0.1, cantidad: 0 }
];


// Función para mostrar el formulario de inicio de sesión
function showLoginForm() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("main").style.display = "none";
}

// Función para mostrar el panel principal después del inicio de sesión exitoso
function showMainPanel() {
    document.getElementById("saldo").textContent = saldo;
    document.getElementById("login-form").style.display = "none";
    document.getElementById("main").style.display = "block";
}

// Función para validar el usuario y la contraseña ingresados
function validarUsuario(inputUsername, inputPassword) {
    return inputUsername === username && inputPassword === password;
}

// Función para realizar el inicio de sesión
function login() {
    const inputUsername = document.getElementById("username").value;
    const inputPassword = document.getElementById("password").value;

    if (validarUsuario(inputUsername, inputPassword)) {
        showMainPanel();
    } else {
        alert(`Usuario o contraseña incorrectos. Intentos restantes: ${intentosRestantes - 1}.`);
        intentosRestantes--;

        if (intentosRestantes <= 0) {
            alert("Se agotaron los intentos de inicio de sesión. Por favor, inténtelo más tarde.");
            showLoginForm();
        }
    }
}

// Función para retirar saldo
function withdraw() {
    const monto = parseInt(prompt("Ingrese el monto a retirar:"));
    if (isNaN(monto)) {
        alert("El monto ingresado es inválido.");
    } else if (monto > saldo) {
        alert("El monto ingresado es mayor que el saldo disponible.");
    } else {
        saldo -= monto;
        alert(`Retiro completado! Su nuevo saldo disponible es de $${saldo}.`);
        document.getElementById("saldo").textContent = saldo;
    }
}

// Función para ingresar dinero a la cuenta
function deposit() {

    const montoIngreso = parseInt(prompt("Ingrese el monto a depositar:"));
    if (isNaN(montoIngreso)) {
        alert("El monto ingresado es inválido.");
    } else {
        saldo += montoIngreso;
        alert(`Depósito completado! Su nuevo saldo disponible es de $${saldo}.`);
        document.getElementById("saldo").textContent = saldo;
    }
}

// Función para invertir en plazo fijo
function invest() {
    let montoInvertir = parseInt(prompt(`Ingrese el monto a invertir (saldo actual: $${saldo}):`));
    if (isNaN(montoInvertir)) {
        alert("El monto ingresado es inválido.");
    } else if (montoInvertir > saldo) {
        alert("El monto ingresado es mayor que el saldo disponible.");
    } else {
        const tasaInteresAnual = 0.75;
        const tasaInteresMensual = tasaInteresAnual / 12;
        const interesGenerado = montoInvertir * tasaInteresMensual;
        const montoTotal = montoInvertir + interesGenerado;
        const confirmacionInversion = confirm(`Usted desea invertir $${montoInvertir} a un plazo fijo de 30 días con una tasa de interés anual del 75%? El interés generado en 30 días será de $${interesGenerado.toFixed(2)}. El monto total al final del plazo será de $${montoTotal.toFixed(2)}. ¿Desea confirmar la inversión?`);
        if (confirmacionInversion) {
            saldo -= montoInvertir;
            alert(`Inversión realizada con éxito. Su nuevo saldo disponible es de $${saldo}.`);
            montoInversion = montoInvertir;
            document.getElementById("saldo").textContent = saldo;
        } else {
            alert("Inversión cancelada.");
        }
    }
}

// Función para ver la inversión activa
function viewActiveInvestment() {
    if (montoInversion === 0) {
        alert("Usted no tiene una inversión activa.");
    } else {
        const tasaInteresAnual = 0.75;
        const tasaInteresMensual = tasaInteresAnual / 12;
        const interesGenerado = montoInversion * tasaInteresMensual;
        const montoTotal = montoInversion + interesGenerado;
        alert(`Su inversión activa es de $${montoInversion}, vence en 30 días y le dará un monto total de $${montoTotal.toFixed(2)}.`);
    }
}

// Función para comprar cripto
function buyCrypto() {
    let criptoIndex;
    switch (prompt(`Elija una criptomoneda para comprar:\n\n1. Bitcoin - Precio actual: $${criptomonedas[0].precio}\n2. Ethereum - Precio actual: $${criptomonedas[1].precio}\n3. BNB - Precio actual: $${criptomonedas[2].precio}\n4. DOGE - Precio actual: $${criptomonedas[3].precio}`)) {
        case "1":
            criptoIndex = 1;
            break;
        case "2":
            criptoIndex = 2;
            break;
        case "3":
            criptoIndex = 3;
            break;
        case "4":
            criptoIndex = 4;
            break;
        default:
            alert("Opción inválida. Compra de criptomoneda cancelada.");
            return;
    }

    const cantidadCripto = parseFloat(prompt(`Ingrese la cantidad de ${criptomonedas[criptoIndex - 1].nombre} que desea comprar (precio actual: $${criptomonedas[criptoIndex - 1].precio}):`));
    if (isNaN(cantidadCripto) || cantidadCripto <= 0) {
        alert("La cantidad ingresada es inválida.");
        return;
    }

    const costoTotal = cantidadCripto * criptomonedas[criptoIndex - 1].precio;
    if (costoTotal > saldo) {
        alert("No tiene saldo suficiente para realizar la compra.");
    } else {
        saldo -= costoTotal;
        criptomonedas[criptoIndex - 1].cantidad += cantidadCripto;
        alert(`Compra de ${cantidadCripto} ${criptomonedas[criptoIndex - 1].nombre} realizada con éxito. Saldo disponible: $${saldo}.`);
        document.getElementById("saldo").textContent = saldo;
    }
}

// Función para ver las criptomonedas activas
function viewActiveCryptos() {
    let cryptosActivas = "";
    for (let i = 0; i < criptomonedas.length; i++) {
        if (criptomonedas[i].cantidad > 0) {
            cryptosActivas += `${criptomonedas[i].nombre}: ${criptomonedas[i].cantidad}\n`;
        }
    }
    if (cryptosActivas === "") {
        alert("Usted no tiene criptomonedas activas.");
    } else {
        alert(`Sus criptomonedas activas son:\n${cryptosActivas}`);
    }
}

// Función para cerrar sesión
function logout() {
    showLoginForm();
    intentosRestantes = 3;
    saldo = 100000;
    montoInversion = 0;
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}



