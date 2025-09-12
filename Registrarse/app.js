function registrarUsuario() {
  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("contraseña").value.trim();
  const nombre = document.getElementById("nombre").value.trim();

  if (correo !== "" && password !== "" && nombre !== "") {
    // Traer lista actual de usuarios
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar si ya existe
    if (usuarios.some(u => u.correo === correo)) {
      alert("⚠️ Este correo ya está registrado");
      return;
    }

    // Crear usuario
    const nuevoUsuario = { nombre, correo, password };

    // Guardar en la lista de usuarios
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Guardar como usuario activo
    localStorage.setItem("usuarioActual", JSON.stringify(nuevoUsuario));

    alert("✅ Usuario registrado correctamente");

    // Redirigir al perfil
    setTimeout(() => {
      window.location.href = "/Perfil/index.html";
    }, 800);
  } else {
    alert("❌ Completa todos los campos");
  }
}
