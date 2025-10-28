// --------------------------------------------------
// script.js (con Firebase v8 - compatible)
// --------------------------------------------------

// Contraseña de administrador
const ADMIN_PASSWORD = 'admin123';

// 🔥 CONFIGURACIÓN FIREBASE v8
const firebaseConfig = {
  apiKey: "AIzaSyBSRR4ADmpfxEuZT8DvdDdf9Q3GTvHbWFo",
  authDomain: "subasta-5bdbb.firebaseapp.com",
  projectId: "subasta-5bdbb",
  storageBucket: "subasta-5bdbb.firebasestorage.app",
  messagingSenderId: "751301696123",
  appId: "1:751301696123:web:e711f90ba72f31e40660de",
  measurementId: "G-MP7F9ETNM5"
};

// Inicializar Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// 🔥 FUNCIÓN PARA CARGAR PRODUCTOS CON ESTADO REAL
async function cargarProductosConEstado() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = ''; // Limpiar grid
  
  for (const p of productos) {
    try {
      // Verificar en Firebase si está reservado
      const reservadoEnFirebase = await verificarDisponibilidad(p.id);
      const reservadoEnLocal = localStorage.getItem(p.id) === 'reservado';
      
      // Si está reservado en Firebase O en local, mostrar como reservado
      const reservado = !reservadoEnFirebase || reservadoEnLocal;
      
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="img" style="background:url('${p.img}') center/cover; height:160px; border-radius:8px;"></div>
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <div class="price">Q${p.precio.toFixed(2)}</div>
        <div class="status ${reservado ? 'solicited' : 'available'}">
          ${reservado ? 'Reservado' : 'Disponible'}
        </div>
        <button class="btn request" data-id="${p.id}" ${reservado ? 'disabled style="opacity:0.5"' : ''}>
          ${reservado ? 'Ya reservado' : 'Solicitar este equipo'}
        </button>
      `;
      grid.appendChild(card);
    } catch (error) {
      console.error(`Error cargando producto ${p.id}:`, error);
      // En caso de error, mostrar como disponible
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="img" style="background:url('${p.img}') center/cover; height:160px; border-radius:8px;"></div>
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <div class="price">Q${p.precio.toFixed(2)}</div>
        <div class="status available">Disponible</div>
        <button class="btn request" data-id="${p.id}">Solicitar este equipo</button>
      `;
      grid.appendChild(card);
    }
  }
}
// Simulación de productos
const productos = [
  {
    id: 'p1',
    nombre: 'Laptop Dell i7',
    descripcion: 'Excelente estado, 16GB RAM, SSD 512GB',
    precio: 3500,
    specs: ['Pantalla 15.6"', 'Windows 10 Pro', 'SSD 512GB'],
    img: 'imagenes/C1.JPEG',
  },
  {
    id: 'p2',
    nombre: 'Proyector Epson',
    descripcion: 'Alta definición, perfecto para presentaciones.',
    precio: 1800,
    specs: ['Full HD', 'HDMI', '4000 lúmenes'],
    img: 'https://via.placeholder.com/300x200',
  },
  {
    id: 'p3',
    nombre: 'Monitor HP 24”',
    descripcion: 'Pantalla Full HD con excelente color.',
    precio: 1200,
    specs: ['24 pulgadas', 'HDMI', '75Hz'],
    img: 'https://via.placeholder.com/300x200',
  }
];

// Cargar productos con estado real desde Firebase
cargarProductosConEstado();

// Referencias a elementos del modal detalle
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const modalClose2 = document.getElementById('modalClose2');
const modalTitle = document.getElementById('modal-title');
const modalSub = document.getElementById('modal-sub');
const modalDesc = document.getElementById('modal-desc');
const modalImg = document.getElementById('modalImg');
const modalSpecs = document.getElementById('modal-specs');
const modalPrice = document.getElementById('modal-price');
const modalStatus = document.getElementById('modal-status');
const modalRequest = document.getElementById('modalRequest');

let selectedProduct = null;

// Mostrar modal detalle cuando se pulsa "Solicitar" en la tarjeta
document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('request')) {
    const id = e.target.dataset.id;
    const prod = productos.find(p => p.id === id);
    selectedProduct = prod;

    modalTitle.textContent = prod.nombre;
    modalSub.textContent = prod.descripcion;
    modalDesc.textContent = prod.descripcion;
    modalImg.style.background = `url('${prod.img}') center/cover`;
    modalSpecs.innerHTML = prod.specs.map(s => `<li>${s}</li>`).join('');
    modalPrice.textContent = `Q${prod.precio.toFixed(2)}`;

    // 🔥 VERIFICAR DISPONIBILIDAD EN FIREBASE
    try {
      const disponible = await verificarDisponibilidad(prod.id);
      const reservadoEnLocal = localStorage.getItem(prod.id) === 'reservado';
      const reservado = !disponible || reservadoEnLocal;
      
      modalStatus.textContent = reservado ? 'Reservado' : 'Disponible';
      modalStatus.className = 'status ' + (reservado ? 'solicited' : 'available');
      modalRequest.disabled = reservado;
      if (reservado) {
        modalRequest.classList.add('ghost');
        modalRequest.textContent = 'Equipo reservado';
      } else {
        modalRequest.classList.remove('ghost');
        modalRequest.textContent = 'Solicitar este equipo';
      }
    } catch (error) {
      console.error('Error verificando disponibilidad:', error);
      // En caso de error, mostrar como disponible
      modalStatus.textContent = 'Disponible';
      modalStatus.className = 'status available';
      modalRequest.disabled = false;
      modalRequest.classList.remove('ghost');
      modalRequest.textContent = 'Solicitar este equipo';
    }

    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
  }
});

// Cerrar modal (botones)
modalClose.onclick = modalClose2.onclick = () => {
  modal.setAttribute('aria-hidden', 'true');
  modal.style.display = 'none';
};

// --------------------------------------------------------------------
// FORMULARIO DE RESERVA
// --------------------------------------------------------------------
const formModal = document.createElement('div');
formModal.className = 'form-modal';
formModal.innerHTML = `
  <div class="form-card">
    <h3>Reservar equipo</h3>
    <p id="form-product-name" style="font-size:14px;color:#666;"></p>
    <form id="reserveForm">
      <label>Nombre</label>
      <input type="text" id="nombre" required>
      <label>Teléfono</label>
      <input type="tel" id="telefono" required>
      <button type="submit">Confirmar reserva</button>
    </form>
  </div>
`;
document.body.appendChild(formModal);

// Al pulsar "Solicitar este equipo" dentro del modal detalle, abrimos el formulario
modalRequest.addEventListener('click', () => {
  if (!selectedProduct) return;
  // Si ya está reservado, prevenir abrir el formulario
  if (localStorage.getItem(selectedProduct.id) === 'reservado') {
    alert('Lo sentimos — este equipo ya fue reservado.');
    modal.style.display = 'none';
    return;
  }
  modal.style.display = 'none';
  document.getElementById('form-product-name').textContent = selectedProduct.nombre;
  // limpiar campos antiguos
  document.getElementById('nombre').value = '';
  document.getElementById('telefono').value = '';
  formModal.style.display = 'flex';
});

// Cerrar el fondo del form si hacen clic fuera del card
formModal.addEventListener('click', e => {
  if (e.target === formModal) formModal.style.display = 'none';
});

// 🔥 FUNCIONES FIREBASE v8
async function reservarEnFirebase(datos) {
  try {
    const docRef = await db.collection("reservas").add({
      producto: datos.producto,
      nombre: datos.nombre,
      telefono: datos.telefono,
      codigo: datos.codigo,
      fecha: firebase.firestore.FieldValue.serverTimestamp(),
      precio: datos.precio,
      idProducto: datos.idProducto,
      estado: "reservado"
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error Firebase:", error);
    return { success: false, error: error.message };
  }
}

async function verificarDisponibilidad(idProducto) {
  try {
    const snapshot = await db.collection("reservas")
      .where("idProducto", "==", idProducto)
      .where("estado", "==", "reservado")
      .get();
    return snapshot.empty; // true = disponible, false = reservado
  } catch (error) {
    console.error("Error verificando disponibilidad:", error);
    return true; // Por defecto disponible si hay error
  }
}

// 🔥 FORMULARIO ACTUALIZADO CON FIREBASE
document.getElementById('reserveForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();

  if (!nombre || !telefono) {
    alert('Por favor completa todos los campos.');
    return;
  }

  const code = 'UVG-' + Math.floor(100000 + Math.random() * 900000);
  const datosReserva = {
    producto: selectedProduct.nombre,
    nombre: nombre,
    telefono: telefono,
    codigo: code,
    precio: selectedProduct.precio,
    idProducto: selectedProduct.id
  };

  // Mostrar loading
  const boton = e.target.querySelector('button');
  const textoOriginal = boton.textContent;
  boton.textContent = 'Reservando...';
  boton.disabled = true;

  try {
    // Verificar si aún está disponible
    const disponible = await verificarDisponibilidad(selectedProduct.id);
    
    if (!disponible) {
      alert('❌ Este equipo ya fue reservado por otra persona.');
      location.reload();
      return;
    }

    // 🔥 RESERVAR EN FIREBASE
    const resultado = await reservarEnFirebase(datosReserva);
    
    if (resultado.success) {
      alert(`✅ RESERVA EXITOSA!\n\n📦 ${selectedProduct.nombre}\n👤 ${nombre}\n📞 ${telefono}\n🔐 ${code}\n\nLos datos se guardaron en la nube.`);
      formModal.style.display = 'none';
      location.reload();
    } else {
      throw new Error(resultado.error);
    }
    
  } catch (error) {
    console.error('Error:', error);
    // Fallback a localStorage
    guardarReservaLocal(datosReserva);
    alert(`✅ RESERVA EXITOSA (modo local)\nCódigo: ${code}\n\nNota: Los datos se guardaron localmente.`);
    formModal.style.display = 'none';
    location.reload();
  } finally {
    boton.textContent = textoOriginal;
    boton.disabled = false;
  }
});

// Función localStorage como backup
function guardarReservaLocal(datos) {
  localStorage.setItem(datos.idProducto, 'reservado');
  localStorage.setItem(datos.idProducto + '_code', datos.codigo);
  localStorage.setItem(datos.idProducto + '_datos', JSON.stringify(datos));
}

// --------------------------------------------------------------------
// BOTÓN ADMIN PARA RESTABLECER
// --------------------------------------------------------------------
const adminBtn = document.getElementById('adminReset');
adminBtn.addEventListener('click', async () => {
  const pwd = prompt('Ingrese contraseña de administrador para restablecer estados:');
  if (pwd === ADMIN_PASSWORD) {
    const opcion = prompt('¿Qué deseas hacer?\n1. Solo restablecer local\n2. Limpiar Firebase también');
    
    // Limpiar localStorage siempre
    productos.forEach(p => {
      localStorage.removeItem(p.id);
      localStorage.removeItem(p.id + '_code');
      localStorage.removeItem(p.id + '_datos');
    });
    
    if (opcion === '2') {
      try {
        // 🔥 LIMPIAR RESERVAS EN FIREBASE
        const snapshot = await db.collection("reservas").get();
        const batch = db.batch();
        snapshot.docs.forEach(doc => {
          batch.delete(doc.ref);
        });
        await batch.commit();
        alert('✅ Estados restablecidos y Firebase limpiado.');
      } catch (error) {
        console.error('Error limpiando Firebase:', error);
        alert('✅ Estados locales restablecidos. Error limpiando Firebase.');
      }
    } else {
      alert('✅ Estados locales restablecidos.');
    }
    
    location.reload();
  } else {
    alert('Contraseña incorrecta.');
  }
});

// --------------------------------------------------------------------
// Accesibilidad: cerrar modales con ESC
// --------------------------------------------------------------------
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (formModal.style.display === 'flex') formModal.style.display = 'none';
    if (modal.style.display === 'flex') { modal.style.display = 'none'; modal.setAttribute('aria-hidden','true'); }
  }
});