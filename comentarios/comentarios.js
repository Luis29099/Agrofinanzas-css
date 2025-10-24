document.addEventListener("DOMContentLoaded", () => {
  // FOTO POR DEFECTO -> usa la que tengas en tu proyecto
  const FOTO_POR_DEFECTO = "/imagenes/perfil.jpg";

  // Obtener usuario actual desde localStorage (si existe)
  const usuarioStored = localStorage.getItem("usuarioActual");
  const usuario = usuarioStored ? JSON.parse(usuarioStored) : { nombre: "Invitado", foto: FOTO_POR_DEFECTO };

  // Actualizar avatar del header si existe
  const avatarHeader = document.getElementById("avatar");
  if (avatarHeader) {
    avatarHeader.src = usuario.foto || FOTO_POR_DEFECTO;
  }

  // Elementos de la UI
  const lista = document.getElementById("lista-comentarios");
  const btnComentar = document.getElementById("btn-comentar");
  const textarea = document.getElementById("comentario");

  // Cargar comentarios desde localStorage
  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

  // Mostrar comentarios en pantalla
  function mostrarComentarios() {
    if (!lista) return;
    if (comentarios.length === 0) {
      lista.innerHTML = `<p class="sin-comentarios">No hay comentarios aún.</p>`;
      return;
    }

    // limpiar lista
    lista.innerHTML = "";

    // mostrar desde el último al primero (nuevo arriba)
    for (let i = comentarios.length - 1; i >= 0; i--) {
      const c = comentarios[i];
      const div = document.createElement("div");
      div.className = "comentario";
      div.innerHTML = `
        <img src="${c.foto ? c.foto : FOTO_POR_DEFECTO}" alt="Foto de ${escapeHtml(c.nombre)}">
        <div class="contenido-comentario">
          <strong>${escapeHtml(c.nombre)}</strong>
          <p>${escapeHtml(c.texto)}</p>
        </div>
      `;
      lista.appendChild(div);
    }
  }

  // Publicar comentario
  if (btnComentar) {
    btnComentar.addEventListener("click", () => {
      const texto = (textarea.value || "").trim();
      if (!texto) {
        alert("⚠️ Escribe un comentario antes de publicar.");
        return;
      }

      const nuevoComentario = {
        nombre: usuario.nombre || "Invitado",
        foto: usuario.foto || FOTO_POR_DEFECTO,
        texto: texto,
        fecha: new Date().toISOString()
      };

      comentarios.push(nuevoComentario);
      localStorage.setItem("comentarios", JSON.stringify(comentarios));

      textarea.value = "";
      mostrarComentarios();
    });
  }

  // escape sencillo para evitar inyección de HTML en los contenidos
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Mostrar al cargar
  mostrarComentarios();
});
