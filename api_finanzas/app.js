/* app.js
   Simulación de API + UI:
   - guarda transacciones en localStorage
   - dibuja chart (Chart.js)
   - tienes que reemplazar mockFetchTransactions() por fetch() a tu API real
*/

document.addEventListener("DOMContentLoaded", () => {
  // Elementos
  const typeEl = document.getElementById("type");
  const descEl = document.getElementById("desc");
  const amountEl = document.getElementById("amount");
  const addBtn = document.getElementById("addBtn");
  const txList = document.getElementById("txList");
  const totalIncomeEl = document.getElementById("totalIncome");
  const totalExpenseEl = document.getElementById("totalExpense");
  const balanceEl = document.getElementById("balance");
  const syncBtn = document.getElementById("syncBtn");

  // "Usuario" demo (en tu caso viene de localStorage / login)
  const usuario = JSON.parse(localStorage.getItem("usuarioActual")) || {
    nombre: "Usuario Demo",
    foto: "/imagenes/perfil.jpg"
  };

  // Cargar transacciones del storage
  let transactions = JSON.parse(localStorage.getItem("transactions_v1")) || [
    // puedes dejar algunos ejemplos iniciales
    // { id: 't1', type: 'income', desc:'Venta', amount: 200000, date: '2025-01-10' }
  ];

  // Inicializar Chart.js
  let finChart = null;
  function initChart(labels = [], incomes = [], expenses = []) {
    const ctx = document.getElementById("finChart").getContext("2d");
    if (finChart) finChart.destroy();
    finChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Ingresos",
            data: incomes,
            backgroundColor: "rgba(24,217,46,0.85)"
          },
          {
            label: "Gastos",
            data: expenses,
            backgroundColor: "rgba(255,80,80,0.85)"
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: { stacked: true, ticks: { color: "#cfeeda" } },
          y: { stacked: false, ticks: { color: "#cfeeda" } }
        },
        plugins: {
          legend: { labels: { color: "#e6f7ea" } }
        }
      }
    });
  }

  // Render UI
  function render() {
    // resumen
    const incomeTotal = transactions.filter(t => t.type === "income").reduce((s, t) => s + Number(t.amount), 0);
    const expenseTotal = transactions.filter(t => t.type === "expense").reduce((s, t) => s + Number(t.amount), 0);
    const bal = incomeTotal - expenseTotal;

    totalIncomeEl.textContent = formatMoney(incomeTotal);
    totalExpenseEl.textContent = formatMoney(expenseTotal);
    balanceEl.textContent = formatMoney(bal);

    // lista
    if (!transactions.length) {
      txList.innerHTML = `<p class="sin-comentarios">No hay movimientos aún.</p>`;
    } else {
      txList.innerHTML = "";
      transactions.slice().reverse().forEach(t => {
        const li = document.createElement("li");
        li.className = "comentario";
        li.innerHTML = `
          <img src="${t.foto || usuario.foto}" alt="avatar">
          <div class="contenido-comentario">
            <strong>${t.usuario || usuario.nombre} · <small style="color:#9fbfa6">${new Date(t.date).toLocaleString()}</small></strong>
            <p>${t.desc}</p>
            <div style="margin-top:6px;color:${t.type==='income'?'#b7f4c7':'#ffb7b7'};font-weight:700">${t.type==='income'?'+':'-'} ${formatMoney(t.amount)}</div>
          </div>
        `;
        txList.appendChild(li);
      });
    }

    // chart por día (últimos 10 días)
    const byDay = aggregateByDay(transactions, 10);
    const labels = byDay.map(b => b.dateLabel).reverse();
    const incomes = byDay.map(b => b.income).reverse();
    const expenses = byDay.map(b => b.expense).reverse();
    initChart(labels, incomes, expenses);
  }

  function formatMoney(n) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits:0 }).format(n);
  }

  // agrega tx
  addBtn.addEventListener("click", () => {
    const desc = descEl.value.trim();
    const amount = Number(amountEl.value);
    const type = typeEl.value;
    if (!desc || !amount || isNaN(amount)) {
      alert("Completa descripción y monto válido.");
      return;
    }
    const nuevo = {
      id: 'tx_' + Date.now(),
      type,
      desc,
      amount,
      date: new Date().toISOString(),
      usuario: usuario.nombre,
      foto: usuario.foto
    };
    transactions.push(nuevo);
    localStorage.setItem("transactions_v1", JSON.stringify(transactions));
    descEl.value = "";
    amountEl.value = "";
    render();
  });

  // Simulación: sincronizar con "API"
  syncBtn.addEventListener("click", async () => {
    syncBtn.disabled = true;
    syncBtn.textContent = "Sincronizando...";
    try {
      // mockFetchTransactions simula una petición al servidor que devuelve movimientos nuevos
      const remote = await mockFetchTransactions();
      // ejemplo: fusionamos (evitar duplicados por id)
      const map = new Map(transactions.map(t => [t.id, t]));
      remote.forEach(r => { if(!map.has(r.id)) map.set(r.id, r); });
      transactions = Array.from(map.values());
      localStorage.setItem("transactions_v1", JSON.stringify(transactions));
      alert("Sincronización simulada completa.");
      render();
    } catch (err) {
      console.error(err);
      alert("Error sincronizando (ver consola).");
    } finally {
      syncBtn.disabled = false;
      syncBtn.textContent = "Simular sync con API";
    }
  });

  // utilidad: agrega ceros si faltan días y agrega suma por día
  function aggregateByDay(txns, days = 7) {
    const res = [];
    const now = new Date();
    for (let i = 0; i < days; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const ymd = d.toISOString().slice(0,10);
      const dayTx = txns.filter(t => t.date.slice(0,10) === ymd);
      const income = dayTx.filter(t => t.type === 'income').reduce((s,t) => s + Number(t.amount), 0);
      const expense = dayTx.filter(t => t.type === 'expense').reduce((s,t) => s + Number(t.amount), 0);
      res.push({ dateLabel: d.toLocaleDateString(), income, expense });
    }
    return res;
  }

  // MOCK: simula una fetch a API remota que devuelve movimientos nuevos
  function mockFetchTransactions() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sample = [
          {
            id: 'remote_' + (Date.now()-1000*60*60*24),
            type: 'income',
            desc: 'Pago cliente (API)',
            amount: 120000,
            date: new Date(Date.now()-1000*60*60*24).toISOString(),
            usuario: 'API',
            foto: usuario.foto
          },
          {
            id: 'remote_' + (Date.now()-1000*60*60*2),
            type: 'expense',
            desc: 'Compra fertilizantes (API)',
            amount: 45000,
            date: new Date(Date.now()-1000*60*60*2).toISOString(),
            usuario: 'API',
            foto: usuario.foto
          }
        ];
        resolve(sample);
      }, 900);
    });
  }

  // render inicial
  render();

});
