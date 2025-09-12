// document.addEventListener("DOMContentLoaded", () => {
//   let usuario = JSON.parse(localStorage.getItem("usuarioActual")) || {
//     nombre: "Invitado",
//     edad: "",
//     ocupacion: "",
    
//   };

//   // Mostrar datos en el HTML
//   document.querySelector(".perfil p:nth-of-type(1)").innerHTML = `<strong>Nombre:</strong> ${usuario.nombre}`;
//   document.querySelector(".perfil p:nth-of-type(2)").innerHTML = `<strong>Edad:</strong> ${usuario.edad || "No registrada"}`;
//   document.querySelector(".perfil p:nth-of-type(3)").innerHTML = `<strong>Ocupación:</strong> ${usuario.ocupacion || "No registrada"}`;
//   document.querySelector(".foto-perfil").src = usuario.foto;

//   // Mostrar avatar en el header (si existe el contenedor)
//   const avatar = document.getElementById("avatar");
//   if (avatar) {
//     avatar.src = usuario.foto || "";
//   }

//   // Botón Editar Perfil
//   document.getElementById("btn-editar").addEventListener("click", () => {
//     const nuevaEdad = prompt("Ingrese su edad:", usuario.edad);
//     const nuevaOcupacion = prompt("Ingrese su ocupación:", usuario.ocupacion);

//     if (nuevaEdad) usuario.edad = nuevaEdad;
//     if (nuevaOcupacion) usuario.ocupacion = nuevaOcupacion;

//     // Guardamos cambios en localStorage
//     localStorage.setItem("usuarioActual", JSON.stringify(usuario));

//     // Refrescamos datos en pantalla
//     document.querySelector(".perfil p:nth-of-type(2)").innerHTML = `<strong>Edad:</strong> ${usuario.edad} años`;
//     document.querySelector(".perfil p:nth-of-type(3)").innerHTML = `<strong>Ocupación:</strong> ${usuario.ocupacion}`;
//   });

//  // Botón Cambiar Foto
// const inputFoto = document.getElementById("nuevaFoto"); // <--- coincide con tu HTML
// const btnFoto = document.getElementById("btn-cambiar-foto"); // <--- coincide con tu HTML

// if (inputFoto && btnFoto) {
//   btnFoto.addEventListener("click", () => {
//     const archivo = inputFoto.files[0];
//     if (!archivo) {
//       alert("⚠️ Selecciona una imagen primero.");
//       return;
//     }

//     const lector = new FileReader();
//     lector.onload = function (e) {
//       usuario.foto = e.target.result; // Guardamos la foto en base64
//       localStorage.setItem("usuarioActual", JSON.stringify(usuario));

//       // Refrescar foto en perfil
//       document.querySelector(".foto-perfil").src = usuario.foto;

//       // Refrescar avatar en header
//       const avatar = document.getElementById("avatar");
//       if (avatar) {
//         avatar.src = usuario.foto;
//       }
//     };
//     lector.readAsDataURL(archivo);
//   });
// }


//   // Botón Cerrar Sesión
//   document.getElementById("btn-cerrar").addEventListener("click", () => {
//     localStorage.removeItem("usuarioActual"); // limpiar datos si quieres
//     window.location.href = "/HOME/home.html";
//   });
// });
document.addEventListener("DOMContentLoaded", () => {
  let usuario = JSON.parse(localStorage.getItem("usuarioActual")) || {
    nombre: "Invitado",
    edad: "",
    ocupacion: "",
    foto: ""
  };

  // Mostrar datos en el HTML
  document.querySelector(".perfil p:nth-of-type(1)").innerHTML = `<strong>Nombre:</strong> ${usuario.nombre}`;
  document.querySelector(".perfil p:nth-of-type(2)").innerHTML = `<strong>Edad:</strong> ${usuario.edad || "No registrada"}`;
  document.querySelector(".perfil p:nth-of-type(3)").innerHTML = `<strong>Ocupación:</strong> ${usuario.ocupacion || "No registrada"}`;
  document.querySelector(".foto-perfil").src = usuario.foto || "default.png";

  // Avatar en header
  const avatar = document.getElementById("avatar");
  if (avatar) avatar.src = usuario.foto || "default.png";

  // Abrir modal para editar perfil
  const modal = document.getElementById("modal-editar");
  const cerrarModal = document.getElementById("cerrar-modal");
  const guardarCambios = document.getElementById("guardar-cambios");

  document.getElementById("btn-editar").addEventListener("click", () => {
    document.getElementById("input-nombre").value = usuario.nombre;
    document.getElementById("input-edad").value = usuario.edad;
    document.getElementById("input-ocupacion").value = usuario.ocupacion;

    modal.style.display = "flex";
  });

  // Cerrar modal
  cerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Guardar cambios
  guardarCambios.addEventListener("click", () => {
    usuario.nombre = document.getElementById("input-nombre").value || usuario.nombre;
    usuario.edad = document.getElementById("input-edad").value || usuario.edad;
    usuario.ocupacion = document.getElementById("input-ocupacion").value || usuario.ocupacion;

    localStorage.setItem("usuarioActual", JSON.stringify(usuario));

    // Refrescar pantalla
    document.querySelector(".perfil p:nth-of-type(1)").innerHTML = `<strong>Nombre:</strong> ${usuario.nombre}`;
    document.querySelector(".perfil p:nth-of-type(2)").innerHTML = `<strong>Edad:</strong> ${usuario.edad}`;
    document.querySelector(".perfil p:nth-of-type(3)").innerHTML = `<strong>Ocupación:</strong> ${usuario.ocupacion}`;

    modal.style.display = "none";
  });

  // Cambiar foto
  const inputFoto = document.getElementById("nuevaFoto");
  const btnFoto = document.getElementById("btn-cambiar-foto");

  if (inputFoto && btnFoto) {
    btnFoto.addEventListener("click", () => {
      const archivo = inputFoto.files[0];
      if (!archivo) return;

      const lector = new FileReader();
      lector.onload = function (e) {
        usuario.foto = e.target.result;
        localStorage.setItem("usuarioActual", JSON.stringify(usuario));

        document.querySelector(".foto-perfil").src = usuario.foto;
        if (avatar) avatar.src = usuario.foto;
      };
      lector.readAsDataURL(archivo);
    });
  }

  // Cerrar sesión
  document.getElementById("btn-cerrar").addEventListener("click", () => {
    localStorage.removeItem("usuarioActual");
    window.location.href = "/HOME/home.html";
  });
});
