// CONFIGURACIÓN EMAILJS - DATOS REALES
const EMAILJS_PUBLIC_KEY = '1Vp21AOq3g1ThS0Md'; // Clable pública 
const EMAILJS_SERVICE_ID = 'service_jb2h7qb'; // Cave del servicio
const EMAILJS_TEMPLATE_ID = 'template_mxeyud8'; // Clave de la plantilla
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
// 🔥 ESTILOS ADICIONALES PARA LA CARGA MEJORADA
const estilosAdicionales = `
.loading-products, .error-products {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  grid-column: 1 / -1;
  background: var(--card);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.08);
  margin: 20px 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255,255,255,0.1);
  border-top: 4px solid var(--accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-products p {
  color: var(--muted);
  font-size: 15px;
  margin: 0;
}

.no-products-icon, .error-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.7;
}

.error-products {
  color: var(--danger);
  background: rgba(239, 68, 68, 0.05);
  border-color: rgba(239, 68, 68, 0.2);
}

.error-products h3 {
  color: var(--danger);
  margin-bottom: 8px;
}

.error-products p {
  color: var(--muted);
  font-size: 14px;
}

.no-products {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  grid-column: 1 / -1;
  background: var(--card);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.08);
  margin: 20px 0;
}

.no-products h3 {
  color: #f8fafc;
  margin-bottom: 8px;
  font-size: 18px;
}

.no-products p {
  color: var(--muted);
  font-size: 14px;
  margin: 0;
}
  /* 🔥 NUEVOS ESTILOS PARA ESTADO VENDIDO */
.status.sold {
  background: #f59e0b;  /* Mismo color naranja que reservado */
  color: white;
}


/* 🔥 ESTILOS PARA BOTONES DEL PANEL ADMIN */
.reserva-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn.info {
  background: #2563eb;
}

.btn.info:hover {
  background: #1d4ed8;
}
`;

// Productos CON CATEGORÍAS - AGREGADOS LAPTOPS Y UPS
const productos = [
  // COMBOS (manteniendo los existentes)
  {
    id: 'C1',
    nombre: 'Combo 1',
    descripcion: 'Optiplex 3080 i5 10th generación, 8GB RAM',
    precio: 1500,
    specs: ['Pantalla 21.5"', 'Windows 10', '480GB SSD', 'Puertos DP, VGA'],
    img: 'imagenes/C1.png',
    categoria: 'combos'
  },
  {
    id: 'C2',
    nombre: 'Combo 2',
    descripcion: 'Optiplex 3080 i5 10th generación, 8GB RAM',
    precio: 1500,
    specs: ['Pantalla 21.5"', 'Windows 10', '480GB SSD', 'Puertos DP, VGA'],
    img: 'imagenes/C2.png',
    categoria: 'combos'
  },
  {
    id: 'C3',
    nombre: 'Combo 3',
    descripcion: 'Optiplex 3080 i5 10th generación, 8GB RAM',
    precio: 1500,
    specs: ['Pantalla 18.5"', 'Windows 10', '480GB SSD', 'Puertos DP(1), VGA(1)'],
    img: 'imagenes/C3.png',
    categoria: 'combos'
  },
  {
    id: 'C4',
    nombre: 'Combo 4',
    descripcion: 'Optiplex 3080 i5 10th generación, 8GB RAM',
    precio: 1500,
    specs: ['Pantalla 18.5"', 'Windows 10', '480GB SSD', 'Puertos DP(1) VGA(1)'],
    img: 'imagenes/C1.png',
    categoria: 'combos'
  },
  {
    id: 'C5',
    nombre: 'Combo 5',
    descripcion: 'Optiplex 3080 i5 10th generación, 8GB RAM',
    precio: 1500,
    specs: ['Pantalla 18.5"', 'Windows 10', '480GB SSD', 'Puertos DP(1) VGA(1)'],
    img: 'imagenes/C5.png',
    categoria: 'combos'
  },
  {
    id: 'C6',
    nombre: 'Combo 6',
    descripcion: 'Optiplex 3080 i5 10th generación, 8GB RAM',
    precio: 1500,
    specs: ['Pantalla 23"', 'Windows 10', '480GB SSD', 'Puertos DP(1), VGA(1)'],
    img: 'imagenes/C6.png',
    categoria: 'combos'
  },
  {
    id: 'C7',
    nombre: 'Combo 7',
    descripcion: 'Optiplex 3080 i5 10th generación, 8GB RAM',
    precio: 1500,
    specs: ['Pantalla 23"', 'Windows 10', '480GB SSD', 'Puertos DP(1), VGA(1)'],
    img: 'imagenes/C7.png',
    categoria: 'combos'
  },
  {
    id: 'C8',
    nombre: 'Combo 8',
    descripcion: 'Optiplex 3080 i5 10th generación, 8GB RAM',
    precio: 1500,
    specs: ['Pantalla 23"', 'Windows 10', '480GB SSD', 'Puertos DP(1), VGA(1)'],
    img: 'imagenes/C8.png',
    categoria: 'combos'
  },
  {
    id: 'C9',
    nombre: 'Combo 9',
    descripcion: 'Optiplex 3060 i5 8th generación, 8GB RAM',
    precio: 1500,
    specs: ['Pantalla 18.5"', 'Windows 10', '480GB SSD', 'Puertos VGA(1)'],
    img: 'imagenes/C9.png',
    categoria: 'combos'
  },
  {
    id: 'C10',
    nombre: 'Combo 10',
    descripcion: 'Optiplex 7050 i7 7th generación, 8GB RAM',
    precio: 1500,
    specs: ['Pantalla 21.5"', 'Windows 10', '480GB SSD', 'Puertos DP(1), VGA(1)'],
    img: 'imagenes/C10.png',
    categoria: 'combos'
  },
  {
    id: 'C11',
    nombre: 'Combo 11',
    descripcion: 'Optiplex 7050 i7 7th generación, 32GB RAM',
    precio: 1500,
    specs: ['Pantalla 21.5"', 'Windows 10', '480GB SSD', 'Puertos DP(1), VGA(1)'],
    img: 'imagenes/C11.png',
    categoria: 'combos'
  },
  {
    id: 'C12',
    nombre: 'Combo 12',
    descripcion: 'Optiplex 3050 i5 7th generación, 8GB RAM',
    precio: 1500,
    specs: ['Pantalla 21.5"', 'Windows 10', '480GB SSD', 'Puertos DP(1), VGA(1)'],
    img: 'imagenes/C12.png',
    categoria: 'combos'
  },
  {
    id: 'C13',
    nombre: 'Combo 13',
    descripcion: 'Optiplex 3050 i7 7th generación, 8GB RAM',
    precio: 1500,
    specs: ['Pantalla 23"', 'Windows 10', '480GB SSD', 'Puertos DP(1), VGA(1)'],
    img: 'imagenes/C13.png',
    categoria: 'combos'
  },
  {
    id: 'C14',
    nombre: 'Combo 14',
    descripcion: 'Optiplex 3050 i7 7th generación, 8GB RAM',
    precio: 1500,
    specs: ['Pantalla 23"', 'Windows 10', '480GB SSD', 'Puertos DP(1), VGA(1)'],
    img: 'imagenes/C14.png',
    categoria: 'combos'
  },
  {
    id: 'C15',
    nombre: 'Combo 15',
    descripcion: 'Optiplex 3050 i5 7th generación, 4GB RAM',
    precio: 1500,
    specs: ['Pantalla 23"', 'Windows 10', '480GB SSD', 'Puertos DP(1), VGA(1)'],
    img: 'imagenes/C15.png',
    categoria: 'combos'
  },
  {
    id: 'C16',
    nombre: 'Combo 16',
    descripcion: 'Optiplex 3050 i5 7th generación, 4GB RAM',
    precio: 1500,
    specs: ['Pantalla 23"', 'Windows 10', '480GB SSD', 'Puertos DP(1), VGA(1)'],
    img: 'imagenes/C16.png',
    categoria: 'combos'
  },
  {
    id: 'C17',
    nombre: 'Combo 17',
    descripcion: 'Optiplex 3080 i5 7th generación, 8GB RAM',
    precio: 1500,
    specs: ['Pantalla 23"', 'Windows 10', '480GB SSD', 'Puertos DP(1), VGA(1)'],
    img: 'imagenes/C17.png',
    categoria: 'combos'
  },
  {
    id: 'C18',
    nombre: 'Combo 18',
    descripcion: 'Optiplex 3050 i5 7th generación, 4GB RAM',
    precio: 1500,
    specs: ['Pantalla 23"', 'Windows 10', '480GB SSD', 'Puertos DP(1), VGA(1)'],
    img: 'imagenes/C18.png',
    categoria: 'combos'
  },
  {
    id: 'C19',
    nombre: 'Combo 19',
    descripcion: 'Optiplex 3050 i5 7th generación, 4GB RAM',
    precio: 1500,
    specs: ['Pantalla 21.5"', 'Windows 10', '480GB SSD', 'Puertos DP(1), VGA(1)'],
    img: 'imagenes/C19.png',
    categoria: 'combos'
  },
  {
    id: 'C20',
    nombre: 'Combo 20',
    descripcion: 'Optiplex 3050 i5 inside, 4GB RAM',
    precio: 1500,
    specs: ['Pantalla 18.5"', 'Windows 10', '480GB SSD', 'Puertos DP(1), VGA(1)'],
    img: 'imagenes/C20.png',
    categoria: 'combos'
  },
  {
    id: 'C21',
    nombre: 'Combo 21',
    descripcion: 'Optiplex 3050 i5 inside, 4GB RAM',
    precio: 1500,
    specs: ['Pantalla 18.5"', 'Windows 10', '480GB SSD', 'Puertos DP(1), VGA(1)'],
    img: 'imagenes/C21.png',
    categoria: 'combos'
  },
  {
    id: 'C22',
    nombre: 'Combo 22',
    descripcion: 'Optiplex 3050 i5 7th generación, 4GB RAM',
    precio: 1500,
    specs: ['Pantalla 18.5"', 'Windows 10', '480GB SSD', 'Puertos DP(1), VGA(1)'],
    img: 'imagenes/C22.png',
    categoria: 'combos'
  },
  {
    id: 'C23',
    nombre: 'Combo 23',
    descripcion: 'Optiplex 3020 i3, 8GB RAM',
    precio: 1500,
    specs: ['Pantalla 19"', 'Windows 10', '480GB SSD', 'Puertos VGA(1)'],
    img: 'imagenes/C23.png',
    categoria: 'combos'
  },


  // LAPTOPS NUEVAS
  {
    id: 'L1',
    nombre: 'Laptop DELL Latitude 3490',
    descripcion: 'Buen estado, 12GB RAM, SSD 480GB',
    precio: 1200,
    specs: ['Windows 11', 'SSD 480GB', 'Intel i5 7th generación'],
    img: 'imagenes/Laptops/L01.png',
    categoria: 'laptops'
  },
  {
    id: 'L2',
    nombre: 'Laptop DELL Latitude E5440',
    descripcion: 'Buen estado, 8GB RAM, SSD 447GB',
    precio: 1100,
    specs: ['Windows 10', 'SSD 447GB', 'Intel i3 4030U'],
    img: 'imagenes/Laptops/L02.png',
    categoria: 'laptops'
  },
  {
    id: 'L3',
    nombre: 'Laptop DELL Latitude 3490',
    descripcion: 'Buen estado, 4GB RAM, SSD 480GB',
    precio: 1400,
    specs: ['Windows 11', 'SSD 480GB', 'Intel i5 7th generación'],
    img: 'imagenes/Laptops/L03.png',
    categoria: 'laptops'
  },
  {
    id: 'L4',
    nombre: 'Laptop DELL Latitude 3490',
    descripcion: 'Buen estado, 16GB RAM, SSD 480GB',
    precio: 1400,
    specs: ['Windows 11', 'SSD 480GB', 'Intel i5 7th generación'],
    img: 'imagenes/Laptops/L04.png',
    categoria: 'laptops'
  },
  {
    id: 'L5',
    nombre: 'Laptop DELL Latitude 3490',
    descripcion: 'Buen estado, 4GB RAM, SSD 480GB',
    precio: 1400,
    specs: ['Windows 11', 'SSD 480GB', 'Intel i5 7th generación'],
    img: 'imagenes/Laptops/L05.png',
    categoria: 'laptops'
  },
  {
    id: 'L6',
    nombre: 'Laptop DELL Latitude 3490',
    descripcion: 'Buen estado, 4GB RAM, SSD 480GB',
    precio: 1400,
    specs: ['Windows 11', 'SSD 480GB', 'Intel i5 7th generación'],
    img: 'imagenes/Laptops/L06.png',
    categoria: 'laptops'
  },
  {
    id: 'L7',
    nombre: 'Laptop DELL Latitude 3490',
    descripcion: 'Buen estado, 12GB RAM, SSD 480GB',
    precio: 1400,
    specs: ['Windows 11', 'SSD 480GB', 'Intel i5 7th generación'],
    img: 'imagenes/Laptops/L07.png',
    categoria: 'laptops'
  },
  {
    id: 'L8',
    nombre: 'Laptop DELL Latitude 3490',
    descripcion: 'Buen estado, 12GB RAM, SSD 480GB',
    precio: 1400,
    specs: ['Windows 11', 'SSD 480GB', 'Intel i5 7th generación'],
    img: 'imagenes/Laptops/L08.png',
    categoria: 'laptops'
  },
  {
    id: 'L9',
    nombre: 'Laptop DELL Latitude 3490',
    descripcion: 'Buen estado, 8GB RAM, SSD 480GB',
    precio: 1400,
    specs: ['Windows 11', 'SSD 480GB', 'Intel i5 7th generación'],
    img: 'imagenes/Laptops/L09.png',
    categoria: 'laptops'
  },
  {
    id: 'L10',
    nombre: 'Laptop DELL Latitude 3490',
    descripcion: 'Buen estado, 8GB RAM, SSD 480GB',
    precio: 1400,
    specs: ['Windows 11', 'SSD 480GB', 'Intel i5 7200U'],
    img: 'imagenes/Laptops/L10.png',
    categoria: 'laptops'
  },
  {
    id: 'L11',
    nombre: 'Laptop DELL Inspiron 5567',
    descripcion: 'Buen estado, 8GB RAM, HDD 500GB',
    precio: 1400,
    specs: ['Windows 11', 'HDD 500GB', 'Intel i7 7200U'],
    img: 'imagenes/Laptops/L11.png',
    categoria: 'laptops'
  },
  {
    id: 'L12',
    nombre: 'Laptop DELL Latitude 5567',
    descripcion: 'Buen estado, 12GB RAM, SSD 480GB',
    precio: 1400,
    specs: ['Windows 11', 'SSD 480GB', 'Intel i5 7th generación'],
    img: 'imagenes/Laptops/L12.png',
    categoria: 'laptops'
  },
  {
    id: 'L13',
    nombre: 'Laptop DELL Latitude 3490',
    descripcion: 'Buen estado, 12GB RAM, SSD 480GB',
    precio: 1400,
    specs: ['Windows 11', 'SSD 480GB', 'Intel i5 7200U'],
    img: 'imagenes/Laptops/L13.png',
    categoria: 'laptops'
  },
  {
    id: 'L14',
    nombre: 'Laptop DELL Latitude 3490',
    descripcion: 'Buen estado, 8GB RAM, SSD 480GB',
    precio: 1400,
    specs: ['Windows 11', 'SSD 480GB', 'Intel i5 7th generación'],
    img: 'imagenes/Laptops/L14.png',
    categoria: 'laptops'
  },
  {
    id: 'L15',
    nombre: 'Laptop DELL Latitude 5567',
    descripcion: 'Buen estado, 8GB RAM, HDD 500GB',
    precio: 1400,
    specs: ['Windows 11', 'HDD 500GB', 'Intel i7 7200U'],
    img: 'imagenes/Laptops/L15.png',
    categoria: 'laptops'
  },
  {
    id: 'L16',
    nombre: 'Laptop DELL Latitude 3490',
    descripcion: 'Buen estado, 8GB RAM, SSD 480GB',
    precio: 1400,
    specs: ['Windows 11', 'SSD 480GB', 'Intel i5 7200U'],
    img: 'imagenes/Laptops/L16.png',
    categoria: 'laptops'
  },
  {
    id: 'L17',
    nombre: 'Laptop DELL Latitude 3490',
    descripcion: 'Buen estado, 12GB RAM, SSD 480GB',
    precio: 1400,
    specs: ['Windows 11', 'SSD 480GB', 'Intel i5 7th generación'],
    img: 'imagenes/Laptops/L17.png',
    categoria: 'laptops'
  },
  {
    id: 'L18',
    nombre: 'Laptop DELL Latitude 3490',
    descripcion: 'Buen estado, 12GB RAM, SSD 480GB',
    precio: 1400,
    specs: ['Windows 11', 'SSD 480GB', 'Intel i5 7th generación'],
    img: 'imagenes/Laptops/L18.png',
    categoria: 'laptops'
  },
  {
    id: 'L19',
    nombre: 'Laptop DELL Latitude 3490',
    descripcion: 'Buen estado, 12GB RAM, SSD 480GB',
    precio: 1400,
    specs: ['Windows 11', 'SSD 480GB', 'Intel i5 7th generación'],
    img: 'imagenes/Laptops/L19.png',
    categoria: 'laptops'
  },
  {
    id: 'L20',
    nombre: 'Laptop DELL Latitude E5440',
    descripcion: 'Buen estado, 4GB RAM, SSD 480GB',
    precio: 1400,
    specs: ['Windows 11', 'SSD 480GB', 'Intel i3 inside'],
    img: 'imagenes/Laptops/L20.png',
    categoria: 'laptops'
  },
  {
    id: 'L21',
    nombre: 'Laptop DELL Latitude 5480',
    descripcion: 'Buen estado, 4GB RAM, SSD 480GB',
    precio: 1400,
    specs: ['Windows 11', 'SSD 480GB', 'Intel i5 vPro 7th generación'],
    img: 'imagenes/Laptops/L21.png',
    categoria: 'laptops'
  },
  {
    id: 'L22',
    nombre: 'Laptop DELL Latitude 3470',
    descripcion: 'Buen estado, 4GB RAM, SSD 480GB',
    precio: 1400,
    specs: ['Windows 11', 'SSD 480GB', 'Intel i5 inside'],
    img: 'imagenes/Laptops/L22.png',
    categoria: 'laptops'
  },
  {
    id: 'L23',
    nombre: 'Laptop DELL Latitude 3490',
    descripcion: 'Buen estado, 12GB RAM, SSD 480GB',
    precio: 1400,
    specs: ['Windows 11', 'SSD 480GB', 'Intel i5 7200U'],
    img: 'imagenes/Laptops/L23.png',
    categoria: 'laptops'
  },


  // UPS NUEVOS
  {
    id: 'U1',
    nombre: 'UPS APC BX800L-LM',
    descripcion: 'Buen estado',
    precio: 800,
    specs: ['120V', '4 Salidas', '60Hz'],
    img: 'imagenes/UPS/U1.png',
    categoria: 'ups'
  },
  {
    id: 'U2',
    nombre: 'UPS APC BX800L-LM',
    descripcion: 'Buen estado',
    precio: 800,
    specs: ['120V', '4 Salidas', '60Hz'],
    img: 'imagenes/UPS/U2.png',
    categoria: 'ups'
  },
  {
    id: 'U3',
    nombre: 'UPS APC BX800L-LM',
    descripcion: 'Buen estado',
    precio: 800,
    specs: ['120V', '4 Salidas', '60Hz'],
    img: 'imagenes/UPS/U3.png',
    categoria: 'ups'
  },
  {
    id: 'U3',
    nombre: 'UPS APC BX800L-LM',
    descripcion: 'Buen estado',
    precio: 800,
    specs: ['120V', '4 Salidas', '60Hz'],
    img: 'imagenes/UPS/U3.png',
    categoria: 'ups'
  },
  {
    id: 'U4',
    nombre: 'UPS APC BX800L-LM',
    descripcion: 'Buen estado',
    precio: 800,
    specs: ['120V', '4 Salidas', '60Hz'],
    img: 'imagenes/UPS/U4.png',
    categoria: 'ups'
  },
  {
    id: 'U5',
    nombre: 'UPS APC BX800L-LM',
    descripcion: 'Buen estado',
    precio: 800,
    specs: ['120V', '4 Salidas', '60Hz'],
    img: 'imagenes/UPS/U5.png',
    categoria: 'ups'
  },
  {
    id: 'U6',
    nombre: 'UPS TRIPP.LITE',
    descripcion: 'Buen estado',
    precio: 800,
    specs: ['120V', '12 Salidas', '60Hz'],
    img: 'imagenes/UPS/U6.png',
    categoria: 'ups'
  },
  {
    id: 'U7',
    nombre: 'UPS APC BX800L-LM',
    descripcion: 'Buen estado',
    precio: 800,
    specs: ['120V', '4 Salidas', '60Hz'],
    img: 'imagenes/UPS/U7.png',
    categoria: 'ups'
  },
  {
    id: 'U8',
    nombre: 'UPS APC BX800L-LM',
    descripcion: 'Buen estado',
    precio: 800,
    specs: ['120V', '4 Salidas', '60Hz'],
    img: 'imagenes/UPS/U8.png',
    categoria: 'ups'
  },
  {
    id: 'U9',
    nombre: 'UPS APC BX800L-LM',
    descripcion: 'Buen estado',
    precio: 800,
    specs: ['120V', '4 Salidas', '60Hz'],
    img: 'imagenes/UPS/U9.png',
    categoria: 'ups'
  },
  {
    id: 'U10',
    nombre: 'UPS TRIPP.LITE',
    descripcion: 'Buen estado',
    precio: 800,
    specs: ['120V', '12 Salidas', '60Hz'],
    img: 'imagenes/UPS/U10.png',
    categoria: 'ups'
  },
  {
    id: 'U11',
    nombre: 'UPS APC BX800L-LM',
    descripcion: 'Buen estado',
    precio: 800,
    specs: ['120V', '4 Salidas', '60Hz'],
    img: 'imagenes/UPS/U11.png',
    categoria: 'ups'
  }
];

// 🔥 VARIABLES GLOBALES PARA CONTROL DE CARGA
let categoriaActual = localStorage.getItem('categoriaActual') || 'all';
let productosFiltrados = [];
let modoAdminActivo = false;
let cargaEnProgreso = false;
let ultimaCargaId = 0; // Para identificar y cancelar cargas antiguas

// 🔥 FUNCIÓN PARA ENVIAR CORREO CON EMAILJS
async function enviarCorreoConfirmacion(datosReserva, emailDestino) {
  try {
    // Inicializar EmailJS (solo una vez)
    if (typeof emailjs !== 'undefined' && !emailjs.initiated) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      emailjs.initiated = true;
    }

    const templateParams = {
      to_email: emailDestino,
      nombre_cliente: datosReserva.nombre,
      producto: datosReserva.producto,
      telefono: datosReserva.telefono,
      precio: datosReserva.precio,
      codigo_reserva: datosReserva.codigo,
      fecha: new Date().toLocaleDateString('es-GT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    console.log('📧 Enviando correo con datos:', templateParams);

    const resultado = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
    
    console.log('✅ Correo enviado exitosamente:', resultado);
    return { success: true, data: resultado };
    
  } catch (error) {
    console.error('❌ Error enviando correo:', error);
    return { 
      success: false, 
      error: error.text || error.message || 'Error desconocido al enviar correo' 
    };
  }
}
// Ejecutar esta función al inicio
limpiarYReorganizarDatos();
// Llama esta función al inicio
verificarIntegridadDatos();
// 🔥 FUNCIONES AUXILIARES PARA CATEGORÍAS (simplificadas)
function obtenerIconoCategoria(categoria) {
  const icons = {
    'combos': '',
    'laptops': '',
    'ups': '',
    'all': ''
  };
  return icons[categoria] || '';
}

function obtenerNombreCategoria(categoria) {
  const nombres = {
    'combos': 'Combo',
    'laptops': 'Laptop',
    'ups': 'UPS'
  };
  return nombres[categoria] || 'Producto';
}
// 🔥 FUNCIÓN PARA CONTAR PRODUCTOS POR CATEGORÍA (FALTANTE)
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
// 🔥 FUNCIÓN MEJORADA PARA FILTRAR PRODUCTOS
function filtrarProductos(categoria) {
  console.log(` Filtrando por categoría: ${categoria}`);
  
  // CANCELAR CARGAS ANTERIORES INCREMENTANDO EL ID
  ultimaCargaId++;
  
  categoriaActual = categoria;
  localStorage.setItem('categoriaActual', categoria);
  
  // LIMPIAR el array de productos filtrados
  productosFiltrados = [];
  
  if (categoria === 'all') {
    productosFiltrados = [...productos];
  } else {
    productosFiltrados = productos.filter(producto => producto.categoria === categoria);
  }
  
  console.log(` Productos después de filtrar: ${productosFiltrados.length}`);
  
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
  
  // Recargar productos CON CONTROL DE CARGA
  cargarProductosConEstado();
}

// 🔥 FUNCIÓN MEJORADA PARA CARGAR PRODUCTOS CON CONTROL DE CANCELACIÓN
async function cargarProductosConEstado() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  
  // 🔒 BLOQUEAR NUEVAS CARGAS MIENTRAS UNA ESTÁ EN PROGRESO
  if (cargaEnProgreso) {
    console.log(' Carga en progreso, ignorando solicitud...');
    return;
  }
  
  // 🆔 IDENTIFICADOR ÚNICO PARA ESTA CARGA
  const cargaId = ++ultimaCargaId;
  console.log(` Iniciando carga #${cargaId} para categoría: ${categoriaActual}`);
  
  cargaEnProgreso = true;
  
  try {
    // MOSTRAR LOADING
    grid.innerHTML = `
      <div class="loading-products">
        <div class="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    `;
    
    const productosAMostrar = categoriaActual === 'all' ? productos : productosFiltrados;
    
    console.log(` Productos a mostrar: ${productosAMostrar.length}`);
    
    if (productosAMostrar.length === 0) {
      // VERIFICAR SI ESTA CARGA SIGUE SIENDO VÁLIDA
      if (cargaId !== ultimaCargaId) {
        console.log('Carga cancelada - obsoleta');
        return;
      }
      
      grid.innerHTML = `
        <div class="no-products">
          <div class="no-products-icon"></div>
          <h3>No se encontraron productos</h3>
          <p>No hay equipos disponibles en esta categoría.</p>
        </div>
      `;
      return;
    }
    
    // 🔥 CARGAR TODOS LOS ESTADOS PRIMERO (MÁS EFICIENTE)
    const estadosProductos = await cargarEstadosProductos(productosAMostrar);
    
    // VERIFICAR SI ESTA CARGA SIGUE SIENDO VÁLIDA
    if (cargaId !== ultimaCargaId) {
      console.log(' Carga cancelada - obsoleta');
      return;
    }
    
    // DENTRO DE cargarProductosConEstado(), ACTUALIZA ESTA PARTE:
const productosHTML = productosAMostrar.map((p, index) => {
  const estado = estadosProductos[index];
  const reservado = estado === 'reservado';
  const vendido = estado === 'vendido';
  
  let estadoTexto = 'Disponible';
  let estadoClase = 'available';
  
  if (vendido) {
    estadoTexto = 'Vendido';
    estadoClase = 'sold';
  } else if (reservado) {
    estadoTexto = 'Reservado';
    estadoClase = 'solicited';
  }
  
  return `
    <div class="card">
      <div class="img" style="background:url('${p.img}') center/cover; height:160px; border-radius:8px;"></div>
      <div class="card-header">
        <h3>${p.nombre}</h3>
      </div>
      <p>${p.descripcion}</p>
      <div class="price">Q${p.precio.toFixed(2)}</div>
      <div class="status ${estadoClase}">
        ${estadoTexto}
      </div>
      <button class="btn request" data-id="${p.id}" ${reservado || vendido ? 'disabled style="opacity:0.5"' : ''}>
        ${vendido ? 'Producto vendido' : (reservado ? 'Ya reservado' : 'Solicitar este equipo')}
      </button>
    </div>
  `;
}).join('');
    
    // VERIFICAR UNA ÚLTIMA VEZ ANTES DE ACTUALIZAR EL DOM
    if (cargaId === ultimaCargaId) {
      grid.innerHTML = productosHTML;
      console.log(` Carga #${cargaId} completada - ${productosAMostrar.length} productos`);
    } else {
      console.log(' Carga cancelada - última verificación');
    }
    
  } catch (error) {
    console.error(` Error en carga #${cargaId}:`, error);
    
    // SOLO MOSTRAR ERROR SI ESTA ES LA CARGA ACTUAL
    if (cargaId === ultimaCargaId) {
      grid.innerHTML = `
        <div class="error-products">
          <div class="error-icon"></div>
          <h3>Error al cargar productos</h3>
          <p>Intenta recargar la página.</p>
        </div>
      `;
    }
  } finally {
    // 🔓 LIBERAR BLOQUEO SOLO SI ESTA ES LA CARGA ACTUAL
    if (cargaId === ultimaCargaId) {
      cargaEnProgreso = false;
    }
  }
}

// 🔥 FUNCIÓN ACTUALIZADA PARA CARGAR ESTADOS EN LOTE
async function cargarEstadosProductos(productosACargar) {
  try {
    // CREAR TODAS LAS PROMESAS A LA VEZ
    const promesasEstados = productosACargar.map(producto => 
      verificarDisponibilidad(producto.id)
        .then(disponible => {
          const reservadoEnLocal = localStorage.getItem(producto.id) === 'reservado';
          return !disponible || reservadoEnLocal;
        })
        .catch(error => {
          console.error(`Error verificando ${producto.id}:`, error);
          return false; // Por defecto disponible si hay error
        })
    );
    
    // ESPERAR A QUE TODAS LAS VERIFICACIONES TERMINEN
    const estados = await Promise.all(promesasEstados);
    
    // 🔥 VERIFICAR ADICIONALMENTE ESTADO "VENDIDO" PARA CADA PRODUCTO
    const estadosFinales = await Promise.all(
      productosACargar.map(async (producto, index) => {
        const estaReservado = estados[index];
        
        if (estaReservado) {
          // Si está reservado, verificar si realmente es "vendido"
          try {
            const snapshot = await db.collection("reservas")
              .where("idProducto", "==", producto.id)
              .where("estado", "==", "vendido")
              .get();
            
            return snapshot.empty ? 'reservado' : 'vendido';
          } catch (error) {
            console.error(`Error verificando estado vendido para ${producto.id}:`, error);
            return 'reservado'; // Por defecto reservado si hay error
          }
        }
        
        return 'disponible';
      })
    );
    
    return estadosFinales;
  } catch (error) {
    console.error('Error cargando estados:', error);
    return productosACargar.map(() => 'disponible'); // Todos disponibles por defecto
  }
}

// 🔥 INICIALIZAR FILTROS - ACTUALIZADA
function inicializarFiltros() {
  contarProductosPorCategoria();
  
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const categoria = this.getAttribute('data-category');
      
      // PREVENIR CLICS RÁPIDOS
      if (cargaEnProgreso) {
        console.log('⏳ Espera a que termine la carga actual...');
        return;
      }
      
      filtrarProductos(categoria);
    });
  });
  
  setTimeout(() => {
    aplicarCategoriaGuardada();
  }, 100);
}
// 🔥 APLICAR CATEGORÍA GUARDADA - ACTUALIZADA
function aplicarCategoriaGuardada() {
  const categoriaGuardada = localStorage.getItem('categoriaActual') || 'all';

  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-category') === categoriaGuardada) {
      btn.classList.add('active');
    }
  });
  
  // USAR LA FUNCIÓN MEJORADA DE FILTRADO
  filtrarProductos(categoriaGuardada);
}

// 🔥 FUNCIÓN PARA VERIFICAR INTEGRIDAD DE DATOS
function verificarIntegridadDatos() {
  console.log(" Verificando integridad de datos...");
  
  // Verificar IDs duplicados
  const ids = productos.map(p => p.id);
  const duplicados = ids.filter((id, index) => ids.indexOf(id) !== index);
  
  if (duplicados.length > 0) {
    console.warn(" IDs DUPLICADOS:", duplicados);
  } else {
    console.log(" Todos los IDs son únicos");
  }
  
  // Verificar categorías
  const categorias = {};
  productos.forEach(p => {
    if (!categorias[p.categoria]) categorias[p.categoria] = 0;
    categorias[p.categoria]++;
  });
  console.log(" Productos por categoría:", categorias);
  
  // Verificar productos problemáticos
  productos.forEach(p => {
    if (!p.categoria || !p.id) {
      console.warn(" Producto con datos incompletos:", p);
    }
  });
}
// 🔥 FUNCIÓN PARA LIMPIAR Y REORGANIZAR DATOS
function limpiarYReorganizarDatos() {
  console.log("🧹 Limpiando y reorganizando datos...");
  
  // Crear un nuevo array sin duplicados
  const productosUnicos = [];
  const idsVistos = new Set();
  
  productos.forEach(producto => {
    if (!idsVistos.has(producto.id)) {
      idsVistos.add(producto.id);
      productosUnicos.push(producto);
    } else {
      console.warn(` Eliminando duplicado: ${producto.id}`);
    }
  });
  
  // Actualizar el array original
  productos.length = 0;
  productos.push(...productosUnicos);
  
  console.log(` Datos limpiados. Productos únicos: ${productos.length}`);
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
  
  // 🔥 VERIFICAR SI ESTÁ VENDIDO
  const snapshotVendido = await db.collection("reservas")
    .where("idProducto", "==", prod.id)
    .where("estado", "==", "vendido")
    .get();
  
  const vendido = !snapshotVendido.empty;
  const reservado = (!disponible || reservadoEnLocal) && !vendido;
  
  modalStatus.textContent = vendido ? 'Vendido' : (reservado ? 'Reservado' : 'Disponible');
  modalStatus.className = 'status ' + (vendido ? 'sold' : (reservado ? 'solicited' : 'available'));
  modalRequest.disabled = reservado || vendido;
  
  if (vendido) {
    modalRequest.classList.add('ghost');
    modalRequest.textContent = 'Producto vendido';
  } else if (reservado) {
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
      <label>Nombre completo</label>
      <input type="text" id="nombre" required>
      <label>Teléfono</label>
      <input type="tel" id="telefono" required>
      <label>Correo electrónico</label>
      <input type="email" id="email" required>
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
      email: datos.email, // ✅ NUEVO CAMPO
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
      .where("estado", "in", ["reservado", "vendido"]) // ✅ MODIFICADO: incluir ambos estados
      .get();
    return snapshot.empty; // true = disponible, false = reservado o vendido
  } catch (error) {
    console.error("Error verificando disponibilidad:", error);
    return true; // Por defecto disponible si hay error
  }
}

// 🔥 FORMULARIO ACTUALIZADO CON FIREBASE Y EMAILJS
document.getElementById('reserveForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!nombre || !telefono || !email) {
    alert('Por favor completa todos los campos.');
    return;
  }

  // Validación básica de email
  if (!email.includes('@') || !email.includes('.')) {
    alert('Por favor ingresa un correo electrónico válido.');
    return;
  }

  const code = 'UVG-' + Math.floor(100000 + Math.random() * 900000);
  const datosReserva = {
    producto: selectedProduct.nombre,
    nombre: nombre,
    telefono: telefono,
    email: email,
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
      await cargarProductosConEstado();
      formModal.style.display = 'none';
      return;
    }

    // 🔥 RESERVAR EN FIREBASE
    const resultado = await reservarEnFirebase(datosReserva);
    
    if (resultado.success) {
      // ✅ ENVIAR CORREO ELECTRÓNICO CON EMAILJS
      const correoResultado = await enviarCorreoConfirmacion(datosReserva, email);
      
      if (correoResultado.success) {
        alert(`✅ RESERVA EXITOSA!\n\n📧 Se ha enviado un correo de confirmación a: ${email}\n\n🔐 Código de reserva: ${code}\n\nGuarda este código para futuras referencias.`);
      } else {
        alert(`✅ RESERVA EXITOSA!\n\n🔐 Código de reserva: ${code}\n\n⚠️ No se pudo enviar el correo de confirmación, pero tu reserva está registrada.\n\nGuarda este código para futuras referencias.`);
      }

      formModal.style.display = 'none';
      guardarReservaLocal(datosReserva);
      await cargarProductosConEstado();
      
    } else {
      throw new Error(resultado.error);
    }
    
  } catch (error) {
    console.error('Error:', error);
    guardarReservaLocal(datosReserva);
    alert(`✅ RESERVA EXITOSA (modo local)\nCódigo: ${code}\n\nNota: Los datos se guardaron localmente.`);
    formModal.style.display = 'none';
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
          <h2> Panel de Administración - Subastas UVG</h2>
          <button class="close-panel" onclick="cerrarPanelAdmin()">✕</button>
        </div>
        
        <div class="panel-tabs">
          <button class="tab-btn active" data-tab="reservas"> Reservas Activas</button>
          <button class="tab-btn" data-tab="productos"> Gestionar Productos</button>
          <button class="tab-btn" data-tab="limpiar"> Limpiar Sistema</button>
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
                 Limpiar TODAS las reservas (Firebase)
              </button>
              <p class="warning"> Esta acción no se puede deshacer. Eliminará todas las reservas de la base de datos.</p>
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

// 🔥 FUNCIÓN MEJORADA PARA CARGAR RESERVAS ACTIVAS
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
         ${reserva.nombre} |  ${reserva.email} |  ${reserva.telefono} 
        |  ${reserva.codigo} |  ${fecha}
        |  <span class="status ${reserva.estado === 'vendido' ? 'sold' : 'solicited'}">
          ${reserva.estado === 'vendido' ? 'Vendido' : 'Reservado'}
        </span>
      </div>
    </div>
    <div class="reserva-actions">
      ${reserva.estado !== 'vendido' ? `
        <button class="btn small success" onclick="marcarComoVendido('${doc.id}', '${reserva.idProducto}')">
           Marcar como Vendido
        </button>
      ` : ''}
      <button class="btn small danger" onclick="eliminarReserva('${doc.id}', '${reserva.idProducto}')">
         Eliminar
      </button>
    </div>
  </div>
`;
    });
    
    listaReservas.innerHTML = html;
  } catch (error) {
    console.error('Error cargando reservas:', error);
    document.getElementById('lista-reservas').innerHTML = '<div class="error">Error cargando reservas</div>';
  }
}

// 🔥 FUNCIÓN MEJORADA PARA CARGAR LISTA DE PRODUCTOS (MÁS RÁPIDA)
async function cargarListaProductos() {
  try {
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = '<div class="loading">Cargando productos...</div>';
    
    // 🔥 CARGAR TODAS LAS RESERVAS DE UNA VEZ PARA OPTIMIZAR
    const snapshotReservas = await db.collection("reservas").get();
    const productosReservados = new Set();
    
    snapshotReservas.forEach(doc => {
      const reserva = doc.data();
      if (reserva.idProducto) {
        productosReservados.add(reserva.idProducto);
      }
    });
    
    let html = '';
    for (const producto of productos) {
      const reservado = productosReservados.has(producto.id);
      const estado = reservado ? 'Reservado' : 'Disponible';
      const claseEstado = reservado ? 'solicited' : 'available';
      
      html += `
        <div class="producto-admin-item">
          <div class="producto-info">
            <strong>${producto.nombre}</strong>
            <div class="producto-details">
               Q${producto.precio} |  ${producto.id} 
              |  <span class="status ${claseEstado}">${estado}</span>
            </div>
          </div>
          <div class="producto-actions">
            ${reservado ? `
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

// 🔥 FUNCIÓN MEJORADA PARA ELIMINAR RESERVA (ACTUALIZA VISTA)
async function eliminarReserva(idReserva, idProducto) {
  if (confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
    try {
      await db.collection("reservas").doc(idReserva).delete();
      
      // 🔥 ACTUALIZAR INMEDIATAMENTE LA VISTA PRINCIPAL
      await actualizarEstadoProducto(idProducto);
      
      alert(' Reserva eliminada correctamente');
      await cargarReservasActivas();
      await cargarListaProductos();
      
    } catch (error) {
      console.error('Error eliminando reserva:', error);
      alert(' Error eliminando reserva');
    }
  }
}
// 🔥 NUEVA FUNCIÓN PARA MARCAR COMO VENDIDO
async function marcarComoVendido(idReserva, idProducto) {
  if (confirm('¿Estás seguro de que quieres marcar este producto como VENDIDO?\n\nEsta acción cambiará el estado del producto a "Vendido" y no podrá ser reservado nuevamente.')) {
    try {
      await db.collection("reservas").doc(idReserva).update({
        estado: "vendido",
        fechaVendido: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      // Actualizar vista principal
      await actualizarEstadoProducto(idProducto, 'vendido');
      
      alert(' Producto marcado como VENDIDO correctamente');
      await cargarReservasActivas();
      await cargarListaProductos();
      
    } catch (error) {
      console.error('Error marcando como vendido:', error);
      alert(' Error marcando producto como vendido');
    }
  }
}
// 🔥 NUEVA FUNCIÓN PARA ACTUALIZAR ESTADO DE PRODUCTO ESPECÍFICO
async function actualizarEstadoProducto(idProducto) {
  // Limpiar localStorage
  localStorage.removeItem(idProducto);
  localStorage.removeItem(idProducto + '_code');
  localStorage.removeItem(idProducto + '_datos');
  
  // 🔥 ACTUALIZAR LA VISTA PRINCIPAL SIN RECARGAR TODA LA PÁGINA
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  
  // Encontrar la tarjeta del producto y actualizar su estado
  const cards = grid.querySelectorAll('.card');
  cards.forEach(card => {
    const button = card.querySelector('.request');
    const status = card.querySelector('.status');
    
    if (button && button.dataset.id === idProducto) {
      // Actualizar estado a disponible
      status.textContent = 'Disponible';
      status.className = 'status available';
      
      // Habilitar botón
      button.disabled = false;
      button.style.opacity = '1';
      button.textContent = 'Solicitar este equipo';
    }
  });
}
// 🔥 FUNCIÓN ACTUALIZADA PARA ACTUALIZAR ESTADO DE PRODUCTO
async function actualizarEstadoProducto(idProducto, nuevoEstado = 'disponible') {
  // Limpiar localStorage si el producto está disponible
  if (nuevoEstado === 'disponible') {
    localStorage.removeItem(idProducto);
    localStorage.removeItem(idProducto + '_code');
    localStorage.removeItem(idProducto + '_datos');
  }
  
  // 🔥 ACTUALIZAR LA VISTA PRINCIPAL
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  
  const cards = grid.querySelectorAll('.card');
  cards.forEach(card => {
    const button = card.querySelector('.request');
    const status = card.querySelector('.status');
    
    if (button && button.dataset.id === idProducto) {
      if (nuevoEstado === 'vendido') {
        status.textContent = 'Vendido';
        status.className = 'status sold';
        button.disabled = true;
        button.style.opacity = '0.5';
        button.textContent = 'Producto vendido';
      } else if (nuevoEstado === 'disponible') {
        status.textContent = 'Disponible';
        status.className = 'status available';
        button.disabled = false;
        button.style.opacity = '1';
        button.textContent = 'Solicitar este equipo';
      }
    }
  });
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
      
      alert(' Producto marcado como reservado');
      await cargarListaProductos();
      cargarProductosConEstado(); // Actualizar vista principal
    } catch (error) {
      console.error('Error reservando producto:', error);
      alert(' Error reservando producto');
    }
  }
}

// 🔥 LIMPIAR TODAS LAS RESERVAS
async function limpiarTodasLasReservas() {
  if (confirm(' ¿ESTÁS SEGURO?\n\nEsta acción eliminará TODAS las reservas de la base de datos y no se puede deshacer.')) {
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
      
      alert(' Todas las reservas han sido eliminadas');
      await cargarReservasActivas();
      await cargarListaProductos();
      cargarProductosConEstado(); // Actualizar vista principal
    } catch (error) {
      console.error('Error limpiando reservas:', error);
      alert(' Error limpiando reservas');
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

// 🔥 INYECTAR ESTILOS ADICIONALES
function injectarEstilosAdicionales() {
  if (!document.getElementById('estilos-adicionales')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'estilos-adicionales';
    styleSheet.textContent = estilosAdicionales;
    document.head.appendChild(styleSheet);
  }
}
// 🔥 INICIALIZACIÓN MEJORADA
document.addEventListener('DOMContentLoaded', function() {
  console.log(" Inicializando aplicación...");
  
  // Inyectar estilos adicionales
  injectarEstilosAdicionales();
  
  // Limpiar y verificar datos
  limpiarYReorganizarDatos();
  verificarIntegridadDatos();
  
  // Inicializar filtros
  inicializarFiltros();
  
  // Configurar el botón de administrador
  const adminBtn = document.getElementById('adminPanel');
  if (adminBtn) {
    adminBtn.addEventListener('click', toggleModoAdministrador);
  }
  
  console.log(" Aplicación inicializada correctamente");
});