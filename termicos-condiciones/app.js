 const checkBox = document.getElementById("checkTerms");
    const floatingBtn = document.getElementById("openModalBtn");
    const modal = document.getElementById("termsModal");
    const acceptBtn = document.getElementById("acceptBtn");
    const declineBtn = document.getElementById("declineBtn");

    // Mostrar el botón flotante cuando se marca la casilla
    checkBox.addEventListener("change", () => {
      floatingBtn.style.display = checkBox.checked ? "block" : "none";
    });

    // Mostrar el modal al hacer clic en el botón
    floatingBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });

    // Aceptar términos
    acceptBtn.addEventListener("click", () => {
      alert("✅ Has aceptado los términos y condiciones. ¡Gracias!");
      modal.style.display = "none";
    });

    // Rechazar términos
    declineBtn.addEventListener("click", () => {
      alert("❌ Has rechazado los términos. No podrás continuar.");
      modal.style.display = "none";
    });

    // Cerrar modal al hacer clic fuera del cuadro
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });