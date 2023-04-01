const username = "elon";
const password = "musk";
let saldo = 10000;

function validarUsuario(inputUsername, inputPassword) {
  if (inputUsername === username && inputPassword === password) {
    return true;
  } else {
    return false;
  }
}

alert("Bienvenido, por favor ingrese sus credenciales.");
let ingresoExitoso = false;
while (!ingresoExitoso) {
  const inputUsername = prompt("Ingresa tu usuario:");
  const inputPassword = prompt("Ingresa tu contraseña:");

  if (validarUsuario(inputUsername, inputPassword)) {
    let opcion;
    do {
      opcion = prompt(`Inicio de sesión exitoso! Tu saldo disponible es de $${saldo}. ¿Qué deseas hacer?\n\n1. Retirar saldo\n2. Ingresar dinero a su cuenta\n3. Desloguearse`);
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
          alert("Gracias por usar nuestros servicios.");
          ingresoExitoso = true;
          break;
        default:
          alert("Opción inválida. Por favor, elige una opción válida.");
          break;
      }
    } while (opcion !== "3" && !ingresoExitoso);
  } else {
    alert("Usuario o contraseña incorrectos. Inténtalo de nuevo.");
  }
}




