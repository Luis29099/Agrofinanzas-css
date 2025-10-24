document.addEventListener("DOMContentLoaded", () => {
  let usuario = JSON.parse(localStorage.getItem("usuarioActual")) || {
    nombre: "Invitado",
    edad: "",
    ocupacion: "",
    foto: ""
  };

  // Avatar del header (Inicio, Perfil, Finanzas, etc.)
  const avatar = document.getElementById("avatar");
  if (avatar) {
    avatar.src = usuario.foto || "";
  }
});
