document.addEventListener("DOMContentLoaded", () => {
  let usuario = JSON.parse(localStorage.getItem("usuarioActual")) || {
    nombre: "Invitado",
    edad: "",
    ocupacion: "",
    foto: "/imagenes/nn.avif"
  };

  // Avatar del header (Inicio, Perfil, Finanzas, etc.)
  const avatar = document.getElementById("avatar");
  if (avatar) {
    avatar.src = usuario.foto || "/imagenes/nn.avif";
  }
});
