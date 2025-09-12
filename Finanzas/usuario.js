document.addEventListener("DOMContentLoaded", () => {
  let usuario = JSON.parse(localStorage.getItem("usuarioActual")) || {
    nombre: "Invitado",
    edad: "",
    ocupacion: "",
    foto: "/imagenes/photo-1545830790-68595959c491.avif"
  };

  // Avatar del header (Inicio, Perfil, Finanzas, etc.)
  const avatar = document.getElementById("avatar");
  if (avatar) {
    avatar.src = usuario.foto || "/imagenes/photo-1545830790-68595959c491.avif";
  }
});
