const username = "elon";
const password = "musk";
let saldo = 10000;
let montoInversion = 0;

function validarUsuario(inputUsername, inputPassword) {
  if (inputUsername === username && inputPassword === password) {
    return true;
  } else {
    return false;
  }
}

alert("Bienvenido al sistema, por favor ingrese sus credenciales.");
let ingresoExitoso = false;
while (!ingresoExitoso) {
  const inputUsername = prompt("Ingresa tu usuario:");
  const inputPassword = prompt("Ingresa tu contraseña:");

  if (validarUsuario(inputUsername, inputPassword)) {
    let opcion;
    do {
      opcion = prompt(`Inicio de sesión exitoso! Tu saldo disponible es de $${saldo}. ¿Qué deseas hacer?\n\n1. Retirar saldo\n2. Ingresar dinero a la cuenta\n3. Invertir en plazo fijo\n4. Ver inversion activa\n5. Desloguearse`);
      switch (opcion) {

        case "1":
          const monto = parseInt(prompt("Ingresa el monto a retirar:"));
          if (isNaN(monto)) {
            alert("El monto ingresado es inválido.");
          } else if (monto > saldo) {
            alert("El monto ingresado es mayor que el saldo disponible.");
          } else {
            saldo -= monto;
            alert(`Retiro exitoso! Tu nuevo saldo disponible es de $${saldo}.`);
          }
          break;

        case "2":
          const montoIngreso = parseInt(prompt("Ingresa el monto a ingresar:"));
          if (isNaN(montoIngreso)) {
            alert("El monto ingresado es inválido.");
          } else {
            saldo += montoIngreso;
            alert(`Ingreso exitoso! Tu nuevo saldo disponible es de $${saldo}.`);
          }
          break;

        case "3":
          let montoInvertir = parseInt(prompt(`Ingresa el monto a invertir (saldo actual: $${saldo}):`));
          if (isNaN(montoInvertir)) {
            alert("El monto ingresado es inválido.");
          } else if (montoInvertir > saldo) {
            alert("El monto ingresado es mayor que el saldo disponible.");
          } else {
            const tasaInteresAnual = 0.75;
            const tasaInteresMensual = tasaInteresAnual / 12;
            const interesGenerado = montoInvertir * tasaInteresMensual;
            const montoTotal = montoInvertir + interesGenerado;
            const confirmacionInversion = confirm(`Usted desea invertir $${montoInvertir} a un plazo fijo de 30 días con una tasa de interés anual del 75%. El interés generado en 30 días será de $${interesGenerado.toFixed(2)}. El monto total al final del plazo será de $${montoTotal.toFixed(2)}. ¿Desea confirmar la inversión?`);
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
            alert("No tienes una inversión activa.");
          } else {
            const tasaInteresAnual = 0.75;
            const tasaInteresMensual = tasaInteresAnual / 12;
            const interesGenerado = montoInversion * tasaInteresMensual;
            const montoTotal = montoInversion + interesGenerado;
            alert(`Tu inversión activa es de $${montoInversion}, vence en 30 días y te dara un monto total de $${montoTotal.toFixed(2)}.`);
          }
          break;

        case "5":
          alert("Gracias por usar nuestros servicios.");
          ingresoExitoso = true;
          break;
        default:
          alert("Opción inválida. Por favor, elige una opción válida.");
          break;
      }
    } while (opcion !== "5" && !ingresoExitoso);
  } else {
    alert("Usuario o contraseña incorrectos. Inténtalo de nuevo.");
  }
}




