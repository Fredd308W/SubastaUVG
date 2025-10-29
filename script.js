// Contraseña de administrador
const ADMIN_PASSWORD = 'admin123';

// CONFIGURACIÓN FIREBASE v8
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

// Productos CON CATEGORÍAS - AGREGADOS LAPTOPS Y UPS
const productos = [
  // COMBOS (manteniendo los existentes)
  {
    id: 'C1',
    nombre: 'Combo 1',
    descripcion: 'Excelente estado, 16GB RAM, SSD 512GB',
    precio: 1500,
    specs: ['Pantalla 15.6"', 'Windows 10 Pro', 'SSD 512GB'],
    img: 'imagenes/C1.JPEG',
    categoria: 'combos'
  },
  {
    id: 'C2',
    nombre: 'Combo 2',
    descripcion: 'Excelente estado, 16GB RAM, SSD 512GB.',
    precio: 1500,
    specs: ['Full HD', 'HDMI', '4000 lúmenes'],
    img: 'imagenes/C2.JPEG',
    categoria: 'combos'
  },
  // ... (todos los combos existentes)
  {
    id: 'C23',
    nombre: 'Combo 23',
    descripcion: 'Excelente estado, 16GB RAM, SSD 512GB',
    precio: 1500,
    specs: ['Pantalla 15.2"', 'Windows 10 Pro', 'SSD 512GB'],
    img: 'imagenes/C23.JPEG',
    categoria: 'combos'
  },

  // LAPTOPS NUEVAS
  {
    id: 'L1',
    nombre: 'Laptop ',
    descripcion: 'Excelente estado, 8GB RAM, SSD 256GB',
    precio: 1200,
    specs: ['Pantalla 14"', 'Windows 11 Pro', 'SSD 256GB', 'Intel i5'],
    img: 'imagenes/L1.PNG',
    categoria: 'laptops'
  },
  {
    id: 'L2',
    nombre: 'Laptop Dell Latitude',
    descripcion: 'Buen estado, 16GB RAM, HDD 1TB',
    precio: 1100,
    specs: ['Pantalla 15.6"', 'Windows 10 Pro', 'HDD 1TB', 'Intel i7'],
    img: 'imagenes/C28.JPEG',
    categoria: 'laptops'
  },
  {
    id: 'L3',
    nombre: 'Laptop Lenovo ThinkPad',
    descripcion: 'Como nueva, 12GB RAM, SSD 512GB',
    precio: 1400,
    specs: ['Pantalla 13.3"', 'Windows 11 Pro', 'SSD 512GB', 'Intel i5'],
    img: 'imagenes/C28.JPEG',
    categoria: 'laptops'
  },
  {
    id: 'L4',
    nombre: 'Laptop Apple MacBook Air',
    descripcion: 'Excelente estado, 8GB RAM, SSD 256GB',
    precio: 1800,
    specs: ['Pantalla 13"', 'macOS', 'SSD 256GB', 'Chip M1'],
    img: 'imagenes/C28.JPEG',
    categoria: 'laptops'
  },

  // UPS NUEVOS
  {
    id: 'U1',
    nombre: 'UPS APC Back-UPS',
    descripcion: 'Nuevo, 1500VA, Regulación AVR',
    precio: 800,
    specs: ['1500VA/900W', '8 Salidas', 'AVR', 'Batería reemplazable'],
    img: 'imagenes/C28.JPEG',
    categoria: 'ups'
  },
  {
    id: 'U2',
    nombre: 'UPS CyberPower CP1500',
    descripcion: 'Excelente estado, 1500VA, LCD',
    precio: 750,
    specs: ['1500VA/900W', '12 Salidas', 'Pantalla LCD', 'Protection'],
    img: 'imagenes/C28.JPEG',
    categoria: 'ups'
  },
  {
    id: 'U3',
    nombre: 'UPS Tripp Lite SMART',
    descripcion: 'Como nuevo, 1000VA, Software',
    precio: 600,
    specs: ['1000VA/600W', '6 Salidas', 'Software', 'USB'],
    img: 'imagenes/C28.JPEG',
    categoria: 'ups'
  }
];

// 🔥 VARIABLES GLOBALES PARA FILTROS
let categoriaActual = localStorage.getItem('categoriaActual') || 'all';
let productosFiltrados = [];
let modoAdminActivo = false;

// 🔥 FUNCIONES AUXILIARES PARA CATEGORÍAS (simplificadas)
function obtenerIconoCategoria(categoria) {
  const icons = {
    'combos': '🎮',
    'laptops': '💻',
    'ups': '🔋',
    'all': '📦'
  };
  return icons[categoria] || '📦';
}

function obtenerNombreCategoria(categoria) {
  const nombres = {
    'combos': 'Combo',
    'laptops': 'Laptop',
    'ups': 'UPS'
  };
  return nombres[categoria] || 'Producto';
}

// 🔥 FUNCIÓN PARA CONTAR PRODUCTOS POR CATEGORÍA
function contarProductosPorCategoria() {
  const counts = {
    all: productos.length,
    combos: 0,
    laptops: 0,
    ups: 0
  };

  productos.forEach(producto => {
    if (producto.categoria === 'combos') counts.combos++;
    if (producto.categoria === 'laptops') counts.laptops++;
    if (producto.categoria === 'ups') counts.ups++;
  });

  // Actualizar badges
  if (document.getElementById('count-combos')) {
    document.getElementById('count-combos').textContent = counts.combos;
    document.getElementById('count-laptops').textContent = counts.laptops;
    document.getElementById('count-ups').textContent = counts.ups;
  }
}

// 🔥 FUNCIÓN PARA FILTRAR PRODUCTOS - MODIFICADA
function filtrarProductos(categoria) {
  categoriaActual = categoria;
  // Guardar la categoría actual en localStorage
  localStorage.setItem('categoriaActual', categoria);
  
  if (categoria === 'all') {
    productosFiltrados = productos;
  } else {
    productosFiltrados = productos.filter(producto => producto.categoria === categoria);
  }
  
  // Actualizar contador
  if (document.getElementById('productCount')) {
    document.getElementById('productCount').textContent = productosFiltrados.length;
  }
  
  // Actualizar botones activos
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-category') === categoria) {
      btn.classList.add('active');
    }
  });
  
  // Recargar productos
  cargarProductosConEstado();
}

// 🔥 FUNCIÓN PARA CARGAR PRODUCTOS CON ESTADO REAL Y FILTRO - MEJORADA
async function cargarProductosConEstado() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  const productosAMostrar = categoriaActual === 'all' ? productos : productosFiltrados;
  
  if (productosAMostrar.length === 0) {
    grid.innerHTML = `
      <div class="no-products">
        <div class="no-products-icon">🔍</div>
        <h3>No se encontraron productos</h3>
        <p>No hay equipos disponibles en esta categoría.</p>
      </div>
    `;
    return;
  }
  
  // Limpiar el grid completamente antes de agregar nuevos elementos
  grid.innerHTML = '';
  
  for (const p of productosAMostrar) {
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
        <div class="card-header">
          <h3>${p.nombre}</h3>
        </div>
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
        <div class="card-header">
          <h3>${p.nombre}</h3>
        </div>
        <p>${p.descripcion}</p>
        <div class="price">Q${p.precio.toFixed(2)}</div>
        <div class="status available">Disponible</div>
        <button class="btn request" data-id="${p.id}">Solicitar este equipo</button>
      `;
      grid.appendChild(card);
    }
  }
}

// 🔥 INICIALIZAR FILTROS - MODIFICADA
function inicializarFiltros() {
  // Contar productos por categoría
  contarProductosPorCategoria();
  
  // Configurar event listeners para botones de categoría
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const categoria = this.getAttribute('data-category');
      filtrarProductos(categoria);
    });
  });
  
  // Aplicar la categoría guardada al cargar la página
  setTimeout(() => {
    aplicarCategoriaGuardada();
  }, 100);
}
// 🔥 FUNCIÓN PARA APLICAR CATEGORÍA GUARDADA
function aplicarCategoriaGuardada() {
  const categoriaGuardada = localStorage.getItem('categoriaActual') || 'all';
  
  // Actualizar botón activo
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-category') === categoriaGuardada) {
      btn.classList.add('active');
    }
  });
  
  // Aplicar filtro
  filtrarProductos(categoriaGuardada);
}

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
      // En lugar de recargar, actualizar la vista
      cargarProductosConEstado();
      formModal.style.display = 'none';
      return;
    }

    // 🔥 RESERVAR EN FIREBASE
    const resultado = await reservarEnFirebase(datosReserva);
    
    if (resultado.success) {
      alert(`✅ RESERVA EXITOSA!\n\n📦 ${selectedProduct.nombre}\n👤 ${nombre}\n📞 ${telefono}\n🔐 ${code}\n\nLos datos se guardaron en la nube.`);
      formModal.style.display = 'none';
      
      // En lugar de recargar toda la página, actualizar solo los productos
      guardarReservaLocal(datosReserva);
      await cargarProductosConEstado();
      
    } else {
      throw new Error(resultado.error);
    }
    
  } catch (error) {
    console.error('Error:', error);
    // Fallback a localStorage
    guardarReservaLocal(datosReserva);
    alert(`✅ RESERVA EXITOSA (modo local)\nCódigo: ${code}\n\nNota: Los datos se guardaron localmente.`);
    formModal.style.display = 'none';
    
    // En lugar de recargar, actualizar la vista
    await cargarProductosConEstado();
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
// PANEL DE ADMINISTRADOR - USANDO TU BOTÓN EXISTENTE
// --------------------------------------------------------------------

// 🔥 TOGGLE MODO ADMINISTRADOR
function toggleModoAdministrador() {
  if (!modoAdminActivo) {
    // Solicitar contraseña
    const password = prompt('Ingrese la contraseña de administrador:');
    if (password === ADMIN_PASSWORD) {
      modoAdminActivo = true;
      // Actualizar el botón existente
      const adminBtn = document.getElementById('adminPanel');
      if (adminBtn) {
        adminBtn.textContent = 'Cerrar Panel Admin';
        adminBtn.classList.remove('ghost');
        adminBtn.classList.add('btn');
      }
      mostrarPanelAdministrador();
    } else if (password !== null) {
      alert('Contraseña incorrecta');
    }
  } else {
    cerrarPanelAdmin();
  }
}

// 🔥 FUNCIÓN PARA MOSTRAR EL PANEL DE ADMINISTRADOR
async function mostrarPanelAdministrador() {
  // Crear overlay del panel admin
  const panelAdmin = document.createElement('div');
  panelAdmin.id = 'panelAdmin';
  panelAdmin.innerHTML = `
    <div class="panel-admin-overlay">
      <div class="panel-admin-content">
        <div class="panel-header">
          <h2>📊 Panel de Administración - Subastas UVG</h2>
          <button class="close-panel" onclick="cerrarPanelAdmin()">✕</button>
        </div>
        
        <div class="panel-tabs">
          <button class="tab-btn active" data-tab="reservas">📋 Reservas Activas</button>
          <button class="tab-btn" data-tab="productos">🔄 Gestionar Productos</button>
          <button class="tab-btn" data-tab="limpiar">🗑️ Limpiar Sistema</button>
        </div>
        
        <div class="tab-content">
          <div id="tab-reservas" class="tab-pane active">
            <h3>Reservas Activas</h3>
            <div id="lista-reservas" class="reservas-list">
              <div class="loading">Cargando reservas...</div>
            </div>
          </div>
          
          <div id="tab-productos" class="tab-pane">
            <h3>Gestionar Estado de Productos</h3>
            <div id="lista-productos" class="productos-list">
              <div class="loading">Cargando productos...</div>
            </div>
          </div>
          
          <div id="tab-limpiar" class="tab-pane">
            <h3>Limpiar Sistema</h3>
            <div class="clean-actions">
              <button class="btn danger" id="limpiarTodo">
                🗑️ Limpiar TODAS las reservas (Firebase)
              </button>
              <p class="warning">⚠️ Esta acción no se puede deshacer. Eliminará todas las reservas de la base de datos.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(panelAdmin);
  
  // Cargar datos iniciales
  await cargarReservasActivas();
  await cargarListaProductos();
  
  // Configurar tabs
  configurarTabs();
  
  // Configurar botón de limpiar
  document.getElementById('limpiarTodo').addEventListener('click', limpiarTodasLasReservas);
}

// 🔥 FUNCIÓN PARA CERRAR EL PANEL
function cerrarPanelAdmin() {
  const panel = document.getElementById('panelAdmin');
  if (panel) {
    panel.remove();
  }
  modoAdminActivo = false;
  
  // Restaurar el botón existente
  const adminBtn = document.getElementById('adminPanel');
  if (adminBtn) {
    adminBtn.textContent = 'Modo Administrador';
    adminBtn.classList.remove('btn');
    adminBtn.classList.add('ghost');
  }
}

// 🔥 CARGAR RESERVAS ACTIVAS
async function cargarReservasActivas() {
  try {
    const listaReservas = document.getElementById('lista-reservas');
    listaReservas.innerHTML = '<div class="loading">Cargando reservas...</div>';
    
    const snapshot = await db.collection("reservas")
      .orderBy("fecha", "desc")
      .get();
    
    if (snapshot.empty) {
      listaReservas.innerHTML = '<div class="no-data">No hay reservas activas</div>';
      return;
    }
    
    let html = '';
    snapshot.forEach(doc => {
      const reserva = doc.data();
      const fecha = reserva.fecha ? reserva.fecha.toDate().toLocaleString('es-GT') : 'Fecha no disponible';
      
      html += `
        <div class="reserva-item">
          <div class="reserva-info">
            <strong>${reserva.producto}</strong>
            <div class="reserva-details">
              👤 ${reserva.nombre} | 📞 ${reserva.telefono} 
              | 🔐 ${reserva.codigo} | ⏰ ${fecha}
            </div>
          </div>
          <button class="btn small danger" onclick="eliminarReserva('${doc.id}', '${reserva.idProducto}')">
            Eliminar
          </button>
        </div>
      `;
    });
    
    listaReservas.innerHTML = html;
  } catch (error) {
    console.error('Error cargando reservas:', error);
    document.getElementById('lista-reservas').innerHTML = '<div class="error">Error cargando reservas</div>';
  }
}

// 🔥 CARGAR LISTA DE PRODUCTOS PARA GESTIÓN
async function cargarListaProductos() {
  try {
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = '<div class="loading">Cargando productos...</div>';
    
    let html = '';
    for (const producto of productos) {
      const disponible = await verificarDisponibilidad(producto.id);
      const estado = disponible ? 'Disponible' : 'Reservado';
      const claseEstado = disponible ? 'available' : 'solicited';
      
      html += `
        <div class="producto-admin-item">
          <div class="producto-info">
            <strong>${producto.nombre}</strong>
            <div class="producto-details">
              💰 Q${producto.precio} | 📍 ${producto.id} 
              | 🏷️ <span class="status ${claseEstado}">${estado}</span>
            </div>
          </div>
          <div class="producto-actions">
            ${!disponible ? `
              <button class="btn small success" onclick="liberarProducto('${producto.id}')">
                Marcar como Disponible
              </button>
            ` : `
              <button class="btn small warning" onclick="reservarProductoAdmin('${producto.id}')">
                Marcar como Reservado
              </button>
            `}
          </div>
        </div>
      `;
    }
    
    listaProductos.innerHTML = html;
  } catch (error) {
    console.error('Error cargando productos:', error);
    document.getElementById('lista-productos').innerHTML = '<div class="error">Error cargando productos</div>';
  }
}

// 🔥 FUNCIONES DE GESTIÓN INDIVIDUAL
async function eliminarReserva(idReserva, idProducto) {
  if (confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
    try {
      await db.collection("reservas").doc(idReserva).delete();
      alert('✅ Reserva eliminada correctamente');
      await cargarReservasActivas();
      await cargarListaProductos();
    } catch (error) {
      console.error('Error eliminando reserva:', error);
      alert('❌ Error eliminando reserva');
    }
  }
}

async function liberarProducto(idProducto) {
  try {
    // Eliminar todas las reservas de este producto
    const snapshot = await db.collection("reservas")
      .where("idProducto", "==", idProducto)
      .get();
    
    const batch = db.batch();
    snapshot.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    
    // Limpiar localStorage también
    localStorage.removeItem(idProducto);
    localStorage.removeItem(idProducto + '_code');
    localStorage.removeItem(idProducto + '_datos');
    
    alert('✅ Producto liberado correctamente');
    await cargarReservasActivas();
    await cargarListaProductos();
    cargarProductosConEstado(); // Actualizar vista principal
  } catch (error) {
    console.error('Error liberando producto:', error);
    alert('❌ Error liberando producto');
  }
}

async function reservarProductoAdmin(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  if (confirm(`¿Marcar "${producto.nombre}" como reservado?`)) {
    try {
      await db.collection("reservas").add({
        producto: producto.nombre,
        nombre: "Reservado por Admin",
        telefono: "N/A",
        codigo: "ADMIN-" + Date.now(),
        fecha: firebase.firestore.FieldValue.serverTimestamp(),
        precio: producto.precio,
        idProducto: idProducto,
        estado: "reservado"
      });
      
      alert('✅ Producto marcado como reservado');
      await cargarListaProductos();
      cargarProductosConEstado(); // Actualizar vista principal
    } catch (error) {
      console.error('Error reservando producto:', error);
      alert('❌ Error reservando producto');
    }
  }
}

// 🔥 LIMPIAR TODAS LAS RESERVAS
async function limpiarTodasLasReservas() {
  if (confirm('⚠️ ¿ESTÁS SEGURO?\n\nEsta acción eliminará TODAS las reservas de la base de datos y no se puede deshacer.')) {
    try {
      const snapshot = await db.collection("reservas").get();
      const batch = db.batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      
      // Limpiar localStorage también
      productos.forEach(p => {
        localStorage.removeItem(p.id);
        localStorage.removeItem(p.id + '_code');
        localStorage.removeItem(p.id + '_datos');
      });
      
      alert('✅ Todas las reservas han sido eliminadas');
      await cargarReservasActivas();
      await cargarListaProductos();
      cargarProductosConEstado(); // Actualizar vista principal
    } catch (error) {
      console.error('Error limpiando reservas:', error);
      alert('❌ Error limpiando reservas');
    }
  }
}

// 🔥 CONFIGURAR TABS DEL PANEL
function configurarTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remover active de todos
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      
      // Agregar active al seleccionado
      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      document.getElementById(`tab-${tabId}`).classList.add('active');
    });
  });
}

// 🔥 INICIALIZAR LA APLICACIÓN
document.addEventListener('DOMContentLoaded', function() {
  inicializarFiltros();
  //filtrarProductos('all'); // Cargar todos los productos inicialmente
  
  // Configurar el botón existente de administrador
  const adminBtn = document.getElementById('adminPanel');
  if (adminBtn) {
    adminBtn.addEventListener('click', toggleModoAdministrador);
  }
});