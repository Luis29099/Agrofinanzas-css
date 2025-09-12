document.addEventListener("DOMContentLoaded", () => {
  // =============================
  // Obtener usuario actual
  // =============================
  let usuario = JSON.parse(localStorage.getItem("usuarioActual")) || {
    nombre: "Usuario",
    edad: "",
    ocupacion: "",
    foto: "/imagenes/photo-1545830790-68595959c491.avif"
  };

  // =============================
  // Avatar en navbar
  // =============================
  const avatarNav = document.getElementById("avatar");
  if (avatarNav) avatarNav.src = usuario.foto;

  // =============================
  // Comentarios
  // =============================
  let storedComments = JSON.parse(localStorage.getItem("comentarios")) || [];

  const input = document.getElementById("comentarioInput");
  const messages = document.getElementById("comentariosContainer");

  function renderComentario(data, index) {
    const message = document.createElement("div");
    message.classList.add("comentario");

    const img = document.createElement("img");
    img.src = data.image;
    img.alt = "Foto de perfil";

    const body = document.createElement("div");
    body.classList.add("comentario-body");

    const nombre = document.createElement("p");
    nombre.classList.add("nombre");
    nombre.textContent = data.name;

    const texto = document.createElement("p");
    texto.classList.add("texto");
    texto.textContent = data.text;

    const tiempo = document.createElement("p");
    tiempo.classList.add("tiempo");
    tiempo.textContent = data.time;

    body.appendChild(nombre);
    body.appendChild(texto);
    body.appendChild(tiempo);

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "❌";
    btnEliminar.classList.add("btn-eliminar");
    btnEliminar.addEventListener("click", () => eliminarComentario(index));

    message.appendChild(img);
    message.appendChild(body);
    message.appendChild(btnEliminar);

    messages.appendChild(message);
  }

  function renderComentarios() {
    messages.innerHTML = "";
    storedComments.forEach((c, i) => renderComentario(c, i));
  }

  function agregarComentario() {
    if (!input.value.trim()) return;

    let nuevoComentario = {
      name: usuario.nombre || "Usuario",
      text: input.value.trim(),
      time: new Date().toLocaleString(),
      image: usuario.foto
    };

    storedComments.push(nuevoComentario);
    localStorage.setItem("comentarios", JSON.stringify(storedComments));

    renderComentarios();
    input.value = "";
  }

  function eliminarComentario(index) {
    storedComments.splice(index, 1);
    localStorage.setItem("comentarios", JSON.stringify(storedComments));
    renderComentarios();
  }

  // =============================
  // Evento botón comentar
  // =============================
  const btnComentar = document.querySelector(".btn-comentar");
  btnComentar.addEventListener("click", agregarComentario);

  // =============================
  // Inicializar comentarios al cargar
  // =============================
  renderComentarios();

  // =============================
  // Avatar clicable → perfil
  // =============================
  if (avatarNav) {
    avatarNav.addEventListener("click", () => {
      window.location.href = "/Perfil/index.html";
    });
  }
});
