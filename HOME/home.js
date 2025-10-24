// 🔹 Clave de la API de AgroMonitoring
const API_KEY = "f5b7e4311f6e8254783490134807315e"; // 👈 solo la key, sin nada más

// 🔹 Coordenadas de una finca o zona de cultivo (ejemplo: Bogotá)
const lat = 4.7110;
const lon = -74.0721;

// 🔹 URL del endpoint del clima actual
const API_URL = `https://api.agromonitoring.com/agro/1.0/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

// Elemento donde mostraremos los datos
const climaContainer = document.createElement("section");
climaContainer.classList.add("clima-section");
document.querySelector("main").appendChild(climaContainer);

// 🔹 Obtener datos del clima
async function obtenerClima() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${data.message}`);
    }

    // Datos principales
    const temperatura = (data.main.temp - 273.15).toFixed(1); // Kelvin → °C
    const humedad = data.main.humidity;
    const viento = data.wind.speed;
    const descripcion = data.weather[0].description;

    climaContainer.innerHTML = `
      <h2>🌦 Estado del Clima Actual</h2>
      <div class="clima-card">
        <p><strong>Ubicación:</strong> Bogotá, Colombia</p>
        <p><strong>Temperatura:</strong> ${temperatura} °C</p>
        <p><strong>Humedad:</strong> ${humedad}%</p>
        <p><strong>Viento:</strong> ${viento} m/s</p>
        <p><strong>Condición:</strong> ${descripcion}</p>
      </div>
    `;
  } catch (error) {
    climaContainer.innerHTML = `<p>❌ No se pudieron obtener los datos del clima.</p>`;
    console.error("Error al obtener datos del clima:", error);
  }
}

// Llamar la función al cargar
obtenerClima();
