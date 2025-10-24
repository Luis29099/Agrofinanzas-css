function iniciarSesion() {
  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!correo || !password) {
    alert("⚠️ Ingresa correo y contraseña.");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuario = usuarios.find(u => u.correo === correo && u.password === password);

  if (usuario) {
    alert("✅ Bienvenido " + usuario.nombre);

    // Guardar usuario activo
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));

    // Redirigir al inicio o perfil
    window.location.href = "/inicio/Inicio.html"; 
  } else {
    alert("❌ Correo o contraseña incorrectos.");
  }
}
