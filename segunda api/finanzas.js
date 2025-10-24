const form = document.getElementById('formulario');
const totalIngresos = document.getElementById('totalIngresos');
const totalGastos = document.getElementById('totalGastos');
const ctx = document.getElementById('graficoIngresosGastos').getContext('2d');
const tbody = document.querySelector('#tablaHistorial tbody');

let ingresos = JSON.parse(localStorage.getItem('ingresos')) || [];
let gastos = JSON.parse(localStorage.getItem('gastos')) || [];
let editando = null; // Guarda si estamos editando una transacción

// ---------- GUARDAR O EDITAR TRANSACCIÓN ----------
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const descripcion = document.getElementById('descripcion').value.trim();
  const monto = parseFloat(document.getElementById('monto').value);
  const fecha = document.getElementById('fecha').value;
  const tipo = document.getElementById('tipo').value;

  if (!descripcion || !monto || !fecha || !tipo) {
    alert('Completa todos los campos');
    return;
  }

  const nuevaTransaccion = { descripcion, monto, fecha, tipo };

  if (editando) {
    // Editar transacción existente
    if (editando.tipo === 'ingreso') {
      ingresos[editando.index] = nuevaTransaccion;
    } else {
      gastos[editando.index] = nuevaTransaccion;
    }
    editando = null;
  } else {
    // Agregar nueva
    if (tipo === 'ingreso') ingresos.push(nuevaTransaccion);
    else gastos.push(nuevaTransaccion);
  }

  guardarDatos();
  actualizarResumen();
  actualizarHistorial();
  form.reset();
});

// ---------- GUARDAR EN LOCALSTORAGE ----------
function guardarDatos() {
  localStorage.setItem('ingresos', JSON.stringify(ingresos));
  localStorage.setItem('gastos', JSON.stringify(gastos));
}

// ---------- ACTUALIZAR RESUMEN ----------
function actualizarResumen() {
  const totalI = ingresos.reduce((a, b) => a + b.monto, 0);
  const totalG = gastos.reduce((a, b) => a + b.monto, 0);

  totalIngresos.textContent = `$${totalI.toFixed(2)}`;
  totalGastos.textContent = `$${totalG.toFixed(2)}`;

  actualizarGrafico(totalI, totalG);
}

// ---------- GRÁFICO ----------
let grafico;
function actualizarGrafico(ing, gas) {
  if (grafico) grafico.destroy();

  grafico = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Ingresos', 'Gastos'],
      datasets: [{
        data: [ing, gas],
        backgroundColor: ['#18d92e', '#ef5350'],
        borderWidth: 2
      }]
    },
    options: {
      plugins: {
        legend: { position: 'bottom', labels: { color: '#fff' } },
        title: { display: true, text: 'Distribución de Finanzas', color: '#18d92e' }
      }
    }
  });
}

// ---------- TABLA HISTORIAL ----------
function actualizarHistorial() {
  tbody.innerHTML = '';

  ingresos.forEach((item, index) => {
    const row = `
      <tr>
        <td class="ingreso">Ingreso</td>
        <td>${item.descripcion}</td>
        <td>$${item.monto.toFixed(2)}</td>
        <td>${item.fecha}</td>
        <td>
          <button class="editar" onclick="editarTransaccion('ingreso', ${index})">✏️</button>
          <button class="eliminar" onclick="eliminarTransaccion('ingreso', ${index})">🗑️</button>
        </td>
      </tr>`;
    tbody.innerHTML += row;
  });

  gastos.forEach((item, index) => {
    const row = `
      <tr>
        <td class="gasto">Gasto</td>
        <td>${item.descripcion}</td>
        <td>-$${item.monto.toFixed(2)}</td>
        <td>${item.fecha}</td>
        <td>
          <button class="editar" onclick="editarTransaccion('gasto', ${index})">✏️</button>
          <button class="eliminar" onclick="eliminarTransaccion('gasto', ${index})">🗑️</button>
        </td>
      </tr>`;
    tbody.innerHTML += row;
  });
}

// ---------- EDITAR ----------
function editarTransaccion(tipo, index) {
  const transaccion = tipo === 'ingreso' ? ingresos[index] : gastos[index];
  document.getElementById('descripcion').value = transaccion.descripcion;
  document.getElementById('monto').value = transaccion.monto;
  document.getElementById('fecha').value = transaccion.fecha;
  document.getElementById('tipo').value = tipo;

  editando = { tipo, index };
 
}

// ---------- ELIMINAR ----------
function eliminarTransaccion(tipo, index) {
  if (!confirm('¿Seguro que deseas eliminar esta transacción?')) return;

  if (tipo === 'ingreso') ingresos.splice(index, 1);
  else gastos.splice(index, 1);

  guardarDatos();
  actualizarResumen();
  actualizarHistorial();
}

// ---------- CARGAR DATOS AL INICIAR ----------
document.addEventListener("DOMContentLoaded", () => {
  actualizarResumen();
  actualizarHistorial();

  // Mostrar avatar del usuario
  let usuario = JSON.parse(localStorage.getItem("usuarioActual")) || {
    nombre: "Invitado",
    foto: "/imagenes/nn.avif"
  };

  const avatar = document.getElementById("avatar");
  if (avatar) avatar.src = usuario.foto || "/imagenes/nn.avif";
});
