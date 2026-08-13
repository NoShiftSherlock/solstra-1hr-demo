/* Solstra × Vesper Commerce — 1-hour delivery mockup interactions */

// ---------- Product catalog (homepage grid) ----------
const PRODUCTS = [
  { line:"Blackberry Lemon", name:"Blackberry Lemon",  img:"assets/can-blackberrylemon.svg", cal:15, sugar:"0g", status:"Stocked nearby", price:"$32.95", rating:"4.8 · 1,204", color:"#43265F" },
  { line:"Strawberry Guava", name:"Strawberry Guava",  img:"assets/can-strawberryguava.svg", cal:15, sugar:"0g", status:"Stocked nearby", price:"$32.95", rating:"4.8 · 1,118", color:"#C93B58" },
  { line:"Peach Mango",      name:"Peach Mango",       img:"assets/can-peachmango.svg",      cal:15, sugar:"0g", status:"Stocked nearby", price:"$32.95", rating:"4.7 · 962",   color:"#E8802F" },
  { line:"Cucumber Mint",    name:"Cucumber Mint",     img:"assets/can-cucumbermint.svg",    cal:15, sugar:"0g", status:"Online only",          price:"$32.95", rating:"4.6 · 517",   color:"#3F9B77" },
  { line:"Grapefruit Yuzu",  name:"Grapefruit Yuzu",   img:"assets/can-grapefruityuzu.svg",  cal:15, sugar:"0g", status:"New",                  price:"$32.95", rating:"4.6 · 288",   color:"#DE5341" },
  { line:"Variety",          name:"Variety Pack",      img:"assets/can-varietypack.svg",     cal:15, sugar:"0g", status:"Bundle",               price:"$34.95", rating:"4.9 · 1,506", color:"#2B1B34" },
];

function cardHTML(p) {
  const statusTag = p.status ? `<span class="tag status">${p.status}</span>` : "";
  return `
  <a class="card" href="product.html">
    <div class="thumb">
      <div class="badges">
        <span class="tag line"><span class="dot" style="background:${p.color}"></span> ${p.line}</span>
        ${statusTag}
        <span class="tag onehr">⚡ 1-hr</span>
      </div>
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
    </div>
    <div class="body">
      <div class="line-label">12 pack · 12 fl oz cans</div>
      <h3>${p.name}</h3>
      <div class="stats"><span><b>${p.cal}</b> cal</span><span><b>${p.sugar}</b> sugar</span><span><b>Botanical</b> blend</span></div>
      <div class="rating">★ ${p.rating} reviews</div>
      <div class="foot">
        <span class="price">${p.price}</span>
        <button class="add" onclick="event.preventDefault();addToCart()">Add</button>
      </div>
    </div>
  </a>`;
}

// ---------- On-demand catalog (Solstra Now page) ----------
// Blackberry Lemon, Strawberry Guava and Peach Mango are the three SKUs the
// retailer feeds actually carry today, so only those get the "near you" flag.
const NOW_PRODUCTS = [
  { line:"Blackberry Lemon", format:"Single can", name:"Blackberry Lemon", img:"assets/can-blackberrylemon.svg", size:"12 fl oz",     spec:"15", price:"$3.79",  color:"#43265F", live:true },
  { line:"Strawberry Guava", format:"Single can", name:"Strawberry Guava", img:"assets/can-strawberryguava.svg", size:"12 fl oz",     spec:"15", price:"$3.79",  color:"#C93B58", live:true },
  { line:"Peach Mango",      format:"Single can", name:"Peach Mango",      img:"assets/can-peachmango.svg",      size:"12 fl oz",     spec:"15", price:"$3.79",  color:"#E8802F", live:true },
  { line:"Cucumber Mint",    format:"Single can", name:"Cucumber Mint",    img:"assets/can-cucumbermint.svg",    size:"12 fl oz",     spec:"15", price:"$3.79",  color:"#3F9B77" },
  { line:"Blackberry Lemon", format:"4-pack",     name:"Blackberry Lemon", img:"assets/can-blackberrylemon.svg", size:"4 × 12 fl oz", spec:"15", price:"$13.99", color:"#43265F", live:true },
  { line:"Strawberry Guava", format:"4-pack",     name:"Strawberry Guava", img:"assets/can-strawberryguava.svg", size:"4 × 12 fl oz", spec:"15", price:"$13.99", color:"#C93B58", live:true },
  { line:"Peach Mango",      format:"4-pack",     name:"Peach Mango",      img:"assets/can-peachmango.svg",      size:"4 × 12 fl oz", spec:"15", price:"$13.99", color:"#E8802F", live:true },
  { line:"Variety",          format:"6-pack",     name:"Variety Pack",     img:"assets/can-varietypack.svg",     size:"6 × 12 fl oz", spec:"15", price:"$19.99", color:"#2B1B34" },
];

function nowCardHTML(p) {
  const liveTag = p.live ? `<span class="now-live">In Gopuff near you</span>` : "";
  return `
  <div class="now-card">
    <div class="now-thumb">
      <button class="now-add" onclick="addToCart()" aria-label="Add ${p.name}">Add</button>
      <span class="now-protein">${p.spec}<small>calories</small></span>
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
    </div>
    <div class="now-body">
      <div class="now-format"><span class="tag line"><span class="dot" style="background:${p.color}"></span> ${p.line}</span> · ${p.format}</div>
      <h3>${p.name}</h3>
      ${liveTag}
      <div class="now-foot"><span class="now-size">${p.size}</span><span class="now-price">${p.price}</span></div>
    </div>
  </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("prodGrid");
  if (grid) grid.innerHTML = PRODUCTS.map(cardHTML).join("");
  const nowGrid = document.getElementById("nowGrid");
  if (nowGrid) nowGrid.innerHTML = NOW_PRODUCTS.map(nowCardHTML).join("");
  const c = sessionStorage.getItem("cartCount");
  if (c) setCartCount(parseInt(c, 10));
});

// Solstra Now address check -> reveal grid
function nowCheck() {
  const el = document.getElementById("nowAddrState");
  const grid = document.getElementById("nowGridWrap");
  if (el) el.classList.add("show");
  if (grid) grid.classList.add("show");
}

// ---------- Cart ----------
function setCartCount(n) {
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = n);
  sessionStorage.setItem("cartCount", n);
}
function addToCart() {
  const el = document.querySelector(".cart-count");
  const n = (el ? parseInt(el.textContent, 10) : 0) + 1;
  setCartCount(n);
  toast("Added to cart · eligible for 1-hour delivery ⚡");
}

// ---------- Homepage address availability ----------
function checkAvailability() {
  const box = document.getElementById("availResult");
  if (box) box.classList.add("show");
}

// ---------- PDP: purchase modes ----------
function setMode(mode) {
  document.querySelectorAll(".buy-mode").forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
  const isOneHr = mode === "onehr";
  const mod = document.getElementById("onehrModule");
  const stdBenefits = document.getElementById("stdBenefits");
  const stdBuyRow = document.getElementById("stdBuyRow");
  if (mod) mod.style.display = isOneHr ? "block" : "none";
  if (stdBenefits) stdBenefits.style.display = isOneHr ? "none" : "grid";
  if (stdBuyRow) stdBuyRow.style.display = isOneHr ? "none" : "flex";
  const addBtn = document.getElementById("addBtn");
  if (addBtn && !isOneHr) {
    addBtn.textContent = mode === "subscribe" ? "Subscribe — $29.66" : "Add to cart — $32.95";
  }
}
function pdpCheck() {
  const a = document.getElementById("pdpAvail");
  if (a) a.style.display = "block";
}
let q = 1;
function qty(d) {
  q = Math.max(1, q + d);
  const el = document.getElementById("qtyVal");
  if (el) el.textContent = q;
}

// ---------- Checkout: shipping + plan + totals ----------
const CO = { subtotal: 65.90, tax: 5.86, ship: 7.0, shipLabel: "1-Hour delivery" };

function selectShip(el) {
  document.querySelectorAll("#shipOpts .co-opt").forEach(o => o.classList.remove("selected"));
  el.classList.add("selected");
  CO.ship = parseFloat(el.dataset.cost);
  CO.shipLabel = el.dataset.label || "Shipping";
  const isOneHr = el.classList.contains("onehr");
  const note = document.getElementById("routeNote");
  if (note) note.style.display = isOneHr ? "flex" : "none";
  const eta = document.getElementById("etaBadge");
  if (eta) eta.style.display = isOneHr ? "inline-flex" : "none";
  updateCheckoutTotals();
}
function updateCheckoutTotals() {
  const total = CO.subtotal + CO.ship + CO.tax;
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  set("sumShipLabel", CO.shipLabel);
  set("sumShip", CO.ship === 0 ? "FREE" : "$" + CO.ship.toFixed(2));
  set("sumTotal", "$" + total.toFixed(2));
  const inst = (total / 4).toFixed(2);
  set("instAmt", "$" + inst);
  const pb = document.getElementById("placeBtn");
  if (pb) pb.textContent = "Place order · $" + total.toFixed(2);
}
function selectPlan(el) {
  document.querySelectorAll("#planOpts .co-opt").forEach(o => o.classList.remove("selected"));
  el.classList.add("selected");
}
function placeOrder() {
  const oneHr = document.querySelector("#shipOpts .co-opt.selected.onehr");
  toast(oneHr ? "Order placed ⚡ Routing to nearest store — arriving in ~40 min"
              : "Order placed ✓ Thanks — your Solstra order is confirmed.");
}
document.addEventListener("DOMContentLoaded", updateCheckoutTotals);

// ---------- Slide-out cart drawer + rewards meter ----------
const CART = { name: "Blackberry Lemon", line: "Blackberry Lemon", color: "#43265F", img: "assets/can-blackberrylemon.svg", unit: 32.95, qty: 2, sub: false };
const TIERS = [
  { key: "ship", label: "Free Shipping",  at: 2, pos: 16 },
  { key: "gift", label: "Free Cooler",    at: 3, pos: 58 },
  { key: "cart", label: "Free 12-Pack",   at: 4, pos: 100 },
];

function injectCartDrawer() {
  if (document.getElementById("cartDrawer")) return;
  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <div class="cart-overlay" id="cartOverlay" onclick="closeCart()"></div>
    <aside class="cart-drawer" id="cartDrawer" aria-label="Your cart">
      <div class="cart-head">
        <h2>Your cart <span id="cartQtyHead">(2)</span></h2>
        <button class="cart-close" onclick="closeCart()" aria-label="Close cart">✕</button>
      </div>
      <div class="meter">
        <div class="meter-tiers" id="meterTiers"></div>
        <div class="meter-track"><div class="meter-fill" id="meterFill"></div><div id="meterNodes"></div></div>
        <div class="meter-msg" id="meterMsg"></div>
      </div>
      <div class="cart-eligible"><span>⚡</span> <span>This item is eligible for <b>1-hour delivery</b> in Los Angeles.</span></div>
      <div class="cart-body" id="cartBody"></div>
      <div class="cart-foot">
        <div class="cart-sub-toggle">
          <label><input type="checkbox" id="cartSub" onchange="toggleSub()" /> Subscribe to your cart &amp; save.</label>
          <span class="save">Save 10%</span>
        </div>
        <button class="cart-checkout" onclick="location.href='checkout.html'" id="cartCheckoutBtn">Checkout — $65.90</button>
        <div class="cart-fineprint">Taxes, discounts and shipping calculated at checkout.</div>
      </div>
    </aside>`;
  document.body.appendChild(wrap);
  renderCart();
}

function renderCart() {
  const q = CART.qty;
  const tiers = document.getElementById("meterTiers");
  if (tiers) tiers.innerHTML = TIERS.map(t => `<div class="meter-tier ${q >= t.at ? "done" : ""}">${t.label}</div>`).join("");
  const nodes = document.getElementById("meterNodes");
  if (nodes) nodes.innerHTML = TIERS.map(t => {
    const state = q >= t.at ? (q === t.at ? "current" : "done") : "";
    return `<div class="meter-node ${state}" style="left:${t.pos}%"><span class="lbl">${t.at} Pack${t.at>1?"s":""}</span></div>`;
  }).join("");
  const fill = document.getElementById("meterFill");
  if (fill) {
    let pct = 6;
    if (q >= 4) pct = 100; else if (q === 3) pct = 58; else if (q === 2) pct = 16; else pct = 6;
    fill.style.width = pct + "%";
  }
  const msg = document.getElementById("meterMsg");
  if (msg) {
    if (q >= 4) msg.innerHTML = `🎉 You've unlocked a <b>free 12-pack</b>!`;
    else if (q === 3) msg.innerHTML = `Add <b>1 more pack</b> to unlock a free 12-pack.`;
    else if (q === 2) msg.innerHTML = `<span class="bolt">✓</span> Free shipping unlocked — add 1 more for a <b>free cooler</b>.`;
    else msg.innerHTML = `Add <b>1 more pack</b> for free shipping.`;
  }
  const body = document.getElementById("cartBody");
  if (body) body.innerHTML = `
    <div class="cart-line">
      <div class="im"><img src="${CART.img}" alt="" /></div>
      <div class="info">
        <div class="ln"><span class="dot" style="background:${CART.color}"></span> ${CART.line}</div>
        <h3>${CART.name}</h3>
        <div class="pr">$${CART.unit.toFixed(2)}&nbsp; | &nbsp;12 Pack – 12 fl oz.</div>
        <div class="sub-row"><span>Subscription:<br/>${CART.sub ? "Subscribe & Save 10%" : "One-Time Purchase"}</span><a href="#" onclick="event.preventDefault();toggleSubLink()">Edit</a></div>
        <div class="qty-row2">
          <div class="cart-stepper"><button onclick="cartQty(-1)">−</button><span id="cartLineQty">${CART.qty}</span><button onclick="cartQty(1)">+</button></div>
          <button class="rm" onclick="cartRemove()">Remove</button>
        </div>
      </div>
    </div>`;
  const factor = CART.sub ? 0.9 : 1;
  const total = CART.qty * CART.unit * factor;
  const head = document.getElementById("cartQtyHead");
  if (head) head.textContent = `(${CART.qty})`;
  const btn = document.getElementById("cartCheckoutBtn");
  if (btn) btn.textContent = `Checkout — $${total.toFixed(2)}`;
  setCartCount(CART.qty);
}
function openCart() { injectCartDrawer(); requestAnimationFrame(() => { document.getElementById("cartOverlay").classList.add("open"); document.getElementById("cartDrawer").classList.add("open"); }); }
function closeCart() { const o=document.getElementById("cartOverlay"), d=document.getElementById("cartDrawer"); if(o)o.classList.remove("open"); if(d)d.classList.remove("open"); }
function cartQty(d) { CART.qty = Math.max(1, CART.qty + d); renderCart(); }
function cartRemove() { CART.qty = 1; renderCart(); }
function toggleSub() { CART.sub = document.getElementById("cartSub").checked; renderCart(); }
function toggleSubLink() { CART.sub = !CART.sub; const c=document.getElementById("cartSub"); if(c)c.checked=CART.sub; renderCart(); }

// ---------- Mobile hamburger menu ----------
function injectMobileMenu() {
  if (document.getElementById("mobileMenu")) return;
  const active = location.pathname.endsWith("solstra-now.html") ? "solstra-now" : "";
  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <div class="menu-overlay" id="menuOverlay" onclick="closeMenu()"></div>
    <nav class="mobile-menu" id="mobileMenu" aria-label="Menu">
      <div class="mm-head">
        <img src="assets/logo-white.svg" alt="Solstra" />
        <button class="mm-close" onclick="closeMenu()" aria-label="Close menu">✕</button>
      </div>
      <div class="mm-links">
        <a href="index.html#shop">Shop all</a>
        <a href="index.html#shop">All flavors</a>
        <a href="index.html#shop">Best sellers</a>
        <a href="index.html#shop">Variety packs</a>
        <a href="solstra-now.html" class="${active === "solstra-now" ? "active" : ""}">Solstra Now</a>
      </div>
      <div class="mm-cta"><a href="solstra-now.html" class="btn btn-white btn-block">⚡ Check your address</a></div>
      <div class="mm-sub">
        <a href="#">Our ingredients</a>
        <a href="#">Store locator</a>
        <a href="checkout.html" onclick="event.preventDefault();closeMenu();openCart()">Cart</a>
      </div>
    </nav>`;
  document.body.appendChild(wrap);
}
function openMenu() { injectMobileMenu(); requestAnimationFrame(() => { document.getElementById("menuOverlay").classList.add("open"); document.getElementById("mobileMenu").classList.add("open"); }); }
function closeMenu() { const o = document.getElementById("menuOverlay"), m = document.getElementById("mobileMenu"); if (o) o.classList.remove("open"); if (m) m.classList.remove("open"); }

// ---------- tiny toast ----------
function toast(msg) {
  let t = document.getElementById("__toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "__toast";
    t.style.cssText = "position:fixed;left:50%;bottom:70px;transform:translateX(-50%);background:#2B1B34;color:#fff;padding:13px 22px;border-radius:999px;font-family:var(--mono),monospace;font-size:13px;z-index:200;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:opacity .25s ease;";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = "1";
  clearTimeout(t._h);
  t._h = setTimeout(() => { t.style.opacity = "0"; }, 2600);
}
