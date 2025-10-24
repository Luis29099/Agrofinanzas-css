// ========================
// Datos de noticias
// ========================
const cowNews = [
  {
    title: "Nueva técnica de alimentación mejora la producción lechera",
    date: "11/09/2025",
    content: "Un estudio revela que el uso de pasturas mixtas aumenta hasta un 15% la producción diaria de leche."
  },
  {
    title: "Colombia exporta carne Angus de alta calidad",
    date: "05/09/2025",
    content: "El mercado internacional reconoce la calidad de la carne producida con razas Angus en Latinoamérica."
  },
  {
    title: "Avances en salud bovina",
    date: "01/09/2025",
    content: "Nuevas vacunas ayudan a prevenir enfermedades comunes en el ganado vacuno."
  },
  {
    title: "Tecnología en ganadería",
    date: "20/08/2025",
    content: "Sensores inteligentes permiten monitorear la salud de las vacas en tiempo real."
  }
];

// ========================
// Renderizado de noticias
// ========================
function renderNews(newsList) {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";

  newsList.forEach(news => {
    const card = document.createElement("div");
    card.classList.add("news-card");

    card.innerHTML = `
      <h3>${news.title}</h3>
      <small><em>${news.date}</em></small>
      <p>${news.content}</p>
    `;
    newsContainer.appendChild(card);
  });
}

// ========================
// Filtrar noticias
// ========================
function filterNews() {
  const query = document.getElementById("news-search").value.toLowerCase();
  const filtered = cowNews.filter(n => 
    n.title.toLowerCase().includes(query) || 
    n.content.toLowerCase().includes(query)
  );
  renderNews(filtered);
}

// ========================
// Mostrar/Ocultar secciones
// ========================
function toggleSection(id) {
  const section = document.getElementById(id);
  if (section.style.display === "none") {
    section.style.display = "block";
  } else {
    section.style.display = "none";
  }
}

// ========================
// Modo oscuro
// ========================
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

// ========================
// Modal de imágenes
// ========================
function enlargeImage(img) {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  modal.style.display = "flex";
  modalImg.src = img.src;
}

function closeModal() {
  document.getElementById("image-modal").style.display = "none";
}

// ========================
// Inicialización
// ========================
// document.addEventListener("DOMContentLoaded", () => {
//   renderNews(cowNews);
//   alert("🐄 Bienvenido a AgroFinanzas: Todo sobre Vacas 🐄");
// });
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
