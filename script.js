/*******************************
 CONFIGURACIÓN
*******************************/
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScIaRl3vvuEUGQP6jzGoKTvt_3jkeU0XTDO9TNs-hP-WT4zjA/viewform";

/*******************************
 LISTA DE PRODUCTOS
*******************************/
const products = [
  {
    id: "pc-001",
    name: "Laptop Dell Inspiron 15",
    short: "Intel i5, 8GB RAM, 512GB SSD",
    desc: "Laptop en buen estado, ideal para ofimática y desarrollo. Batería con buena carga.",
    price: 420.00,
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=60",
    specs: ["Intel Core i5", "8 GB RAM", "512 GB SSD", "Pantalla 15.6\" Full HD"]
  },
  {
    id: "pc-002",
    name: "PC de Escritorio HP Pro",
    short: "Intel i7, 16GB RAM, 1TB HDD + 256GB SSD",
    desc: "Equipo de escritorio potente para tareas exigentes y multitarea.",
    price: 750.00,
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=60",
    specs: ["Intel Core i7", "16 GB RAM", "256 GB SSD + 1 TB HDD", "GPU integrada"]
  },
  {
    id: "pc-003",
    name: "Monitor 24\" IPS",
    short: "1920x1080, 75Hz",
    desc: "Monitor IPS con ángulos de visión amplios — ideal para trabajo y multimedia.",
    price: 120.00,
    img: "https://images.unsplash.com/photo-1587825140708-2aa7b6b0a16b?auto=format&fit=crop&w=1200&q=60",
    specs: ["24 pulgadas", "Full HD 1920x1080", "IPS", "75Hz"]
  }
];

/*******************************
 LÓGICA DE ESTADO
*******************************/
const STORAGE_KEY = "subastas_uvg_status";
function loadStatus(){ try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : {}; } catch(e){ return {}; } }
function saveStatus(obj){ localStorage.setItem(STORAGE_KEY, JSON.stringify(obj)); }

const grid = document.getElementById('productsGrid');
function formatPrice(n){ return new Intl.NumberFormat('es-GT',{style:'currency',currency:'USD'}).format(n); }

function renderProducts(){
  const statuses = loadStatus();
  grid.innerHTML = "";
  products.forEach(p => {
    const isSolicitado = statuses[p.id] === "solicitado";
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="img" style="background-image:url('${p.img}')"></div>
      <div><h3>${p.name}</h3><div class="specs">${p.short}</div></div>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
        <div><div class="price">${formatPrice(p.price)}</div><div class="small">${p.desc}</div></div>
        <div><div id="status-${p.id}" class="status ${isSolicitado ? 'solicited' : 'available'}">${isSolicitado ? 'Solicitado' : 'Disponible'}</div></div>
      </div>
      <div class="actions">
        <button class="btn" data-action="view" data-id="${p.id}">Ver detalles</button>
        <button class="btn ${isSolicitado ? 'ghost' : ''}" ${isSolicitado ? 'disabled' : ''} data-action="request" data-id="${p.id}">
          ${isSolicitado ? 'Solicitado' : 'Solicitar este equipo'}
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

document.addEventListener('click', e => {
  const el = e.target;
  const action = el.dataset.action;
  const id = el.dataset.id;
  if(action === 'view') openModalFor(id);
  else if(action === 'request') requestProduct(id);
});

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalSub = document.getElementById('modal-sub');
const modalImg = document.getElementById('modalImg');
const modalDesc = document.getElementById('modal-desc');
const modalSpecs = document.getElementById('modal-specs');
const modalPrice = document.getElementById('modal-price');
const modalStatus = document.getElementById('modal-status');
const modalRequestBtn = document.getElementById('modalRequest');
let currentProductId = null;


function openModalFor(id){
  const p = products.find(x=>x.id===id);
  if(!p) return;
  currentProductId = id;
  modalTitle.textContent = p.name;
  modalSub.textContent = p.short;
  modalImg.style.backgroundImage = `url('${p.img}')`;
  modalDesc.textContent = p.desc;
  modalPrice.textContent = formatPrice(p.price);
  modalSpecs.innerHTML = '';
  p.specs.forEach(s => { const li = document.createElement('li'); li.textContent = s; modalSpecs.appendChild(li); });
  updateModalStatus();
  modal.classList.add('open');
}

function updateModalStatus(){
  const statuses = loadStatus();
  const st = statuses[currentProductId] === 'solicitado';
  modalStatus.className = 'status ' + (st ? 'solicited' : 'available');
  modalStatus.textContent = st ? 'Solicitado' : 'Disponible';
  modalRequestBtn.disabled = st;
  modalRequestBtn.classList.toggle('ghost', st);
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalClose2').addEventListener('click', closeModal);
function closeModal(){ modal.classList.remove('open'); currentProductId = null; }

function requestProduct(id){
  const p = products.find(x=>x.id===id);
  if(!p) return;
  const statuses = loadStatus();
  if(statuses[id] === 'solicitado'){ alert('Este equipo ya ha sido solicitado.'); return; }
  const proceed = confirm(`Vas a solicitar "${p.name}". Serás redirigido al formulario. ¿Continuar?`);
  if(!proceed) return;
  window.open(GOOGLE_FORM_URL, '_blank');
  statuses[id] = 'solicitado';
  saveStatus(statuses);
  renderProducts();
  if(currentProductId === id) updateModalStatus();
}

document.getElementById('viewAll').addEventListener('click', ()=>window.open(GOOGLE_FORM_URL,'_blank'));

document.getElementById('adminReset').addEventListener('click', ()=>{
  const pwd = prompt('Ingrese contraseña de administrador:');
  if(pwd === 'admin123'){
    localStorage.removeItem(STORAGE_KEY);
    renderProducts();
    alert('Estados restablecidos.');
  }else alert('Contraseña incorrecta.');
});

modalRequestBtn.addEventListener('click', ()=>{ if(currentProductId) requestProduct(currentProductId); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

renderProducts();
