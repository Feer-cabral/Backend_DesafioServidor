const socket = io();

let user;

const escribirMensajes = document.getElementById("escribirMensajes");

Swal.fire({
  title: "Bienvenido",
  input: "text",
  text: "Ingresa tu nombre de usuario para chatear",
  inputValidator: (value) => {
    return !value && "Debes escribir un nombre de usuario";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
});

escribirMensajes.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (escribirMensajes.value.trim().length > 0) {
      socket.emit("message", {
        user: user,
        message: escribirMensajes.value,
      });
      escribirMensajes.value = "";
    }
  }
});

socket.on("message", (data) => {
  let log = document.getElementById("mostrarMensajes");
  let messages = "";

  data.forEach((message) => {
    messages = messages + `${message.user} dice: ${message.message} <br/>`;
  });
  log.innerHTML = messages;
});
