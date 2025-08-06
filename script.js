function showSlideWithLoading(id) {
  document.getElementById('loading-screen').style.display = 'flex';
  setTimeout(() => {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById(id).style.display = 'block';
  }, 1500);
}

function goBack() {
  document.getElementById('main-content').style.display = 'block';
  document.querySelectorAll('.slide').forEach(s => s.style.display = 'none');
}

let cart = [];
let loggedIn = false;

// Auto hide loading when page loaded
window.onload = () => {
  document.getElementById("loading-screen").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
};

// LOADING ANIMATION
function showLoading(callback) {
  document.getElementById("loading-screen").style.display = "flex";
  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
    if (callback) callback();
  }, 800);
}

// SIGNUP & LOGIN
function showSignup() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("signupPage").style.display = "block";
}
function showLogin() {
  document.getElementById("signupPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
}
function signup() {
  const user = document.getElementById("signupUsername").value;
  const pass = document.getElementById("signupPassword").value;
  if(user && pass){
    let users = JSON.parse(localStorage.getItem("users") || "{}");
    if(users[user]) return alert("Username sudah wujud!");
    users[user] = pass;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Pendaftaran berjaya! Sila log masuk.");
    showLogin();
  } else alert("Isi semua maklumat!");
}
function login() {
  const user = document.getElementById("loginUsername").value;
  const pass = document.getElementById("loginPassword").value;
  let users = JSON.parse(localStorage.getItem("users") || "{}");
  if(users[user] && users[user] === pass){
    loggedIn = true;
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("signupPage").style.display = "none";
    document.getElementById("homePage").style.display = "block";
  } else alert("Username/password salah!");
}
function logout() {
  if(confirm("Log out sekarang?")){
    loggedIn = false;
    document.getElementById("loginPage").style.display = "block";
    document.getElementById("homePage").style.display = "none";
    document.getElementById("productPage").style.display = "none";
    document.getElementById("paymentPage").style.display = "none";
  }
}

// PRODUK
const productData = {
  vegetables: [
    {name:"Carrot Pack", desc:"Fresh carrots", price:10, img:"https://via.placeholder.com/200x120?text=Carrots"},
    {name:"Broccoli Fresh", desc:"Green broccoli", price:12, img:"https://via.placeholder.com/200x120?text=Broccoli"}
  ],
  fruits: [
    {name:"Apple Pack", desc:"Sweet apples", price:15, img:"https://via.placeholder.com/200x120?text=Apples"},
    {name:"Banana Bunch", desc:"Yellow bananas", price:8, img:"https://via.placeholder.com/200x120?text=Bananas"}
  ]
};

// PAGE LOADING
function loadPage(page, category) {
  showLoading(() => {
    document.querySelectorAll('.page').forEach(s => s.style.display = 'none');
    if(page === 'products') {
      document.getElementById("productPage").style.display = "block";
      loadProducts(category);
    }
  });
}

// PRODUK LIST
function loadProducts(category){
  const list = document.getElementById("productList");
  list.innerHTML = "";
  productData[category].forEach((p, index) => {
    list.innerHTML += `
      <div class="product">
        <img src="${p.img}" alt="${p.name}">
        <h4>${p.name}</h4>
        <p>${p.desc}</p>
        <p class="price">RM ${p.price}</p>
        <input type="number" id="qty${index}" min="1" value="1">
        <button onclick="addToCart('${p.name}',${p.price},document.getElementById('qty${index}').value)">Buy</button>
      </div>
    `;
  });
}

function addToCart(name, price, qty){
  cart.push({name, price, qty: parseInt(qty)});
  alert(name + " ditambah ke cart!");
}

function goHome(){
  showLoading(() => {
    document.querySelectorAll('.page').forEach(s => s.style.display = 'none');
    document.getElementById("homePage").style.display = "block";
  });
}

function goToCart(){
  if(cart.length === 0){ alert("Cart kosong!"); return; }
  if(!loggedIn){ alert("Sila log in untuk teruskan pembayaran!"); return; }
  let total = 0;
  cart.forEach(item => total += item.price * item.qty);
  document.getElementById("totalAmount").innerText = "Jumlah Bayaran: RM " + total;
  showLoading(() => {
    document.querySelectorAll('.page').forEach(s => s.style.display = 'none');
    document.getElementById("paymentPage").style.display = "block";
  });
}

function confirmPurchase(){
  const payment = document.querySelector('input[name="payment"]:checked');
  if(!payment) { alert("Pilih kaedah pembayaran!"); return; }
  alert("Pembelian berjaya! Kaedah: " + payment.value);
  cart = [];
  goHome();
}