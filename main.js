const username = "elon";
const password = "musk";
let saldo = 100000;
let montoInversion = 0;
let intentosRestantes = 3

// Proximamente > multi usuarios 

// const usuarios = [
//   {
//     username: "juan",
//     password: "juan",
//     saldo: 5000,
//     montoInversion: 0
//   },
//   {
//     username: "maria",
//     password: "maria",
//     saldo: 3000,
//     montoInversion: 0
//   },
//   {
//     username: "pedro",
//     password: "pedro",
//     saldo: 2000,
//     montoInversion: 0
//   }
// ];

function validarUsuario(inputUsername, inputPassword) {
  if (inputUsername === username && inputPassword === password) {
    return true;
  } else {
    return false;
  }
}

// Proximamente > multi usuarios 

// function validarUsuario(inputUsername, inputPassword) {
//   for (let i = 0; i < usuarios.length; i++) {
//     if (inputUsername === usuarios[i].username && inputPassword === usuarios[i].password) {
//       return true;
//     }
//   }
//   return false;
// }

alert("Bienvenido, por favor ingrese sus credenciales.");
let ingresoExitoso = false;
while (!ingresoExitoso && intentosRestantes > 0) {
  const inputUsername = prompt("Ingrese su usuario:");
  const inputPassword = prompt("Ingrese su contraseña:");

  if (validarUsuario(inputUsername, inputPassword)) {
    let opcion;
    do {
      opcion = prompt(`Bienvenido! Su saldo disponible es de $${saldo}. ¿Qué desea hacer?\n\n1. Retirar saldo\n2. Ingresar dinero a la cuenta\n3. Invertir en plazo fijo\n4. Ver inversion activa\n5. Desloguearse`);
      switch (opcion) {

        case "1":
          const monto = parseInt(prompt("Ingrese el monto a retirar:"));
          if (isNaN(monto)) {
            alert("El monto ingresado es inválido.");
          } else if (monto > saldo) {
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
          alert("Ha cerrado su sesión, gracias por utilizar nuestros servicios.");
          ingresoExitoso = true;
          break;
        default:
          alert("Opción inválida. Por favor, elija una opción válida.");
          break;
      }
    } while (opcion !== "5" && !ingresoExitoso);
  } else {
    alert(`Usuario o contraseña incorrectos. Intentos restantes: ${intentosRestantes - 1}.`);
    intentosRestantes--;
  }
}




