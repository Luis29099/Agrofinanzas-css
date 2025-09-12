 // 🌙 Modo oscuro / claro
const toggleBtn = document.getElementById("toggle-theme");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleBtn.textContent = 
    document.body.classList.contains("dark-mode") ? "☀️ Modo claro" : "🌙 Modo oscuro";
});

// 🔝 Botón volver arriba
const scrollBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 🎬 Animación al hacer scroll
const cards = document.querySelectorAll(".card");
const showCardsOnScroll = () => {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.classList.add("show");
    }
  });
};
window.addEventListener("scroll", showCardsOnScroll);
showCardsOnScroll();

// 🖼️ Modal para galería
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".gallery-img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
  });
});

closeModal.onclick = () => { modal.style.display = "none"; };
modal.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };


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
