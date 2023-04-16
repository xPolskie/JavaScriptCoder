// usuario, contraseña y saldo declarados

const username = "elon";
const password = "musk";
let saldo = 100000;
let montoInversion = 0;
let intentosRestantes = 3

// array de cryptos con nombre, precio y estado de compra false para verificar luego

const criptomonedas = [
  { nombre: "Bitcoin", precio: 60000, comprado: false },
  { nombre: "Ethereum", precio: 2500, comprado: false },
  { nombre: "BNB", precio: 450, comprado: false },
  { nombre: "DOGE", precio: 5, comprado: false },
];

// funcion para inicio de sesion y validacion de los datos ingresados

function validarUsuario(inputUsername, inputPassword) {
  if (inputUsername === username && inputPassword === password) {
    return true;
  } else {
    return false;
  }
}

alert("Bienvenido, por favor ingrese sus credenciales.");
let ingresoExitoso = false;
while (!ingresoExitoso && intentosRestantes > 0) { // Comprueba si los ingresos erroneos son mayor a 0
  const inputUsername = prompt("Ingrese su usuario:");
  const inputPassword = prompt("Ingrese su contraseña:");

  // Menu de opciones a elegir

  if (validarUsuario(inputUsername, inputPassword)) {
    let opcion;
    do {
      opcion = prompt(`Bienvenido! Su saldo disponible es de $${saldo}. ¿Qué desea hacer?\n\n1. Retirar saldo\n2. Ingresar dinero a la cuenta\n3. Invertir en plazo fijo\n4. Ver inversion activa\n5. Comprar Crypto\n6. Ver cryptos activas\n7. Desloguearse`);
      switch (opcion) {

        case "1":
          const monto = parseInt(prompt("Ingrese el monto a retirar:"));
          if (isNaN(monto)) {
            alert("El monto ingresado es inválido.");
          } else if (monto > saldo) { // Realiza la compra, siempre y cuando haya saldo suficiente
            alert("El monto ingresado es mayor que el saldo disponible.");
          } else {
            saldo -= monto;
            alert(`Retiro completado! Su nuevo saldo disponible es de $${saldo}.`);
          }
          break;

        case "2":
          const montoIngreso = parseInt(prompt("Ingrese el monto a depositar:"));
          if (isNaN(montoIngreso)) {
            alert("El monto ingresado es inválido.");
          } else {
            saldo += montoIngreso;
            alert(`Deposito completado! Su nuevo saldo disponible es de $${saldo}.`);
          }
          break;

        case "3":
          let montoInvertir = parseInt(prompt(`Ingrese el monto a invertir (saldo actual: $${saldo}):`));
          if (isNaN(montoInvertir)) {
            alert("El monto ingresado es inválido.");
          } else if (montoInvertir > saldo) { // Realiza la compra, siempre y cuando haya saldo suficiente
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
            } else {
              alert("Inversión cancelada.");
            }
          }
          break;

        case "4":
          if (montoInversion === 0) {
            alert("Usted no tiene una inversión activa.");
          } else {
            const tasaInteresAnual = 0.75;
            const tasaInteresMensual = tasaInteresAnual / 12;
            const interesGenerado = montoInversion * tasaInteresMensual;
            const montoTotal = montoInversion + interesGenerado;
            alert(`Su inversión activa es de $${montoInversion}, vence en 30 días y te dara un monto total de $${montoTotal.toFixed(2)}.`);
          }
          break;

        case "5":
          let criptoIndex; // llama al array de criptos segun su posicion para mostrar el valor
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
              alert("La opción ingresada es inválida.");

          }
          const criptoCantidad = parseInt(prompt(`Ingrese la cantidad a comprar de ${criptomonedas[criptoIndex - 1].nombre}:`));
          if (Number.isNaN(criptoCantidad)) {
            alert("La cantidad ingresada es inválida.");

          }
          const criptoSeleccionada = criptomonedas[criptoIndex - 1];
          const costoTotal = criptoCantidad * criptoSeleccionada.precio;
          if (costoTotal > saldo) { // Realiza la compra, siempre y cuando haya saldo suficiente
            alert("No tiene suficiente saldo para comprar esta cantidad de criptomonedas.");
          } else {
            saldo -= costoTotal;
            criptoSeleccionada.comprado = true;
            criptoSeleccionada.cantidadComprada = criptoCantidad;
            alert(`Compra realizada con éxito. Su nuevo saldo disponible es de $${saldo}.`);
          }
          break;

        case "6":
          if (criptomonedas.every(cripto => !cripto.comprado)) {
            alert("Usted no posee criptomonedas adquiridas.");
          } else {
            let criptosCompradas = "";
            criptomonedas.forEach((cripto, index) => {
              if (cripto.comprado) {
                criptosCompradas += `${cripto.nombre} - Cantidad: ${cripto.cantidadComprada}\n`;
              }
            });
            alert(`Criptomonedas en tenencia: ${criptosCompradas}`);
          }
          break;

        case "7":
          alert("Ha cerrado su sesión, gracias por utilizar nuestros servicios.");
          ingresoExitoso = true;
          break;
        default:
          alert("Opción inválida. Por favor, elija una opción válida.");
          break;

      }
    } while (opcion !== "7" && !ingresoExitoso); //Bucle
  } else {
    alert(`Usuario o contraseña incorrectos. Intentos restantes: ${intentosRestantes - 1}.`); //resta intentos de ingreso
    intentosRestantes--;
  }
}




