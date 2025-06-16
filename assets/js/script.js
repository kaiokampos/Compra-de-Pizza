let cart = [];
let qtPizzaModal = 1;
let modalKey = 0;

// funções auxiliares
const ds = (element) => document.querySelector(element); // ds -> Document Select
const dsa = (element) => document.querySelectorAll(element); // ds -> Document SelectAll
const cl = (element) => console.log(element);

// Listagem das pizzas
pizzaJson.map((item, index) => {
  let pizzaItem = ds(".models .pizza-item").cloneNode(true);

  pizzaItem.setAttribute("data-key", index);
  pizzaItem.querySelector(".pizza-item--img img").src = item.img;
  pizzaItem.querySelector(
    ".pizza-item--price"
  ).innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector(".pizza-item--name").innerText = item.name;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;

  // Evento de click para abrir o modal
  pizzaItem.querySelector("a").addEventListener("click", (event) => {
    event.preventDefault();
    let key = event.target.closest(".pizza-item").getAttribute("data-key");
    qtPizzaModal = 1;
    modalKey = key;

    ds(".pizzaBig img").src = pizzaJson[key].img;
    ds(".pizzaInfo h1").innerText = pizzaJson[key].name;
    ds(".pizzaInfo .pizzaInfo--desc").innerText = pizzaJson[key].description;
    ds(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
    ds(".pizzaInfo--size.selected").classList.remove("selected");

    dsa(".pizzaInfo--size").forEach((size, sizeIndex) => {
      if (sizeIndex === 2) {
        size.classList.add("selected");
      }
      size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeIndex];
    });

    ds(".pizzaInfo--qt").innerHTML = qtPizzaModal;

    // Animação do modal, espera 200 ms para aplicar opacidade 1.
    ds(".pizzaWindowArea").style.opacity = 0;
    ds(".pizzaWindowArea").style.display = "flex";

    setTimeout(() => {
      ds(".pizzaWindowArea").style.opacity = 1;
    }, 200);
  });

  ds(".pizza-area").append(pizzaItem);
});

// Evento do Modal

function closeModal(params) {
  ds(".pizzaWindowArea").style.opacity = 0;
  setTimeout(() => {
    ds(".pizzaWindowArea").style.display = "none";
  }, 500);
}

dsa(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton").forEach(
  (item) => {
    item.addEventListener("click", closeModal);
  }
);

ds(".pizzaInfo--qtmenos").addEventListener("click", () => {
  if (qtPizzaModal > 1) {
    qtPizzaModal--;
    ds(".pizzaInfo--qt").innerHTML = qtPizzaModal;
  }
});
ds(".pizzaInfo--qtmais").addEventListener("click", () => {
  qtPizzaModal++;
  ds(".pizzaInfo--qt").innerHTML = qtPizzaModal;
});

dsa(".pizzaInfo--size").forEach((size) => {
  size.addEventListener("click", (event) => {
    ds(".pizzaInfo--size.selected").classList.remove("selected");
    size.classList.add("selected");
  });
});

ds('.pizzaInfo--addButton').addEventListener('click', () => {
  let size = parseInt(ds(".pizzaInfo--size.selected").getAttribute("data-key"));
  let identifier = pizzaJson[modalKey].id + '@' + size;
  let key = cart.findIndex((item) => (item.identifier == identifier));

  if (key > -1) {
    cart[key].quantidade += qtPizzaModal;
  } else {
    cart.push({
      identifier,
      id: pizzaJson[modalKey].id,
      size,
      quantidade: qtPizzaModal,
    });
  }
  closeModal();
  updateCart();
});

ds('.menu-openner').addEventListener('click', () =>{
  if (cart.length > 0) {
    ds('aside').style.left = '0';
    
  }
});

ds('.menu-closer').addEventListener('click', () =>{
    ds('aside').style.left = '100vw';
});

function updateCart(){
  ds('.menu-openner span').innerHTML = cart.length;

  if (cart.length > 0) {
    ds('aside').classList.add('show');
    ds('.cart').innerHTML = '';

    let subtotal= 0;
    let desconto = 0;
    let total = 0;

    for(let i in cart){
      let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
      subtotal += pizzaItem.price * cart[i].quantidade;


      let cartItem = ds('.models .cart--item').cloneNode(true);

      let pizzaSizeName;
      switch (cart[i].size) {
        case 0:
          pizzaSizeName = 'P';
          break;
        case 1:
          pizzaSizeName = 'M';
          break;
        case 2:
          pizzaSizeName = 'G';
          break;
        }
        let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
  
        cartItem.querySelector('img').src = pizzaItem.img;
        cartItem.querySelector('.cart--item--nome').innerHTML = pizzaName;
        cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].quantidade;
        cartItem.querySelector('.cart--item--qtmenos').addEventListener('click', ()=>{
          if (cart[i].quantidade > 1) {
            cart[i].quantidade--;
          }else{
            cart.splice(i, 1);
          }
          updateCart();
        });
        cartItem.querySelector('.cart--item--qtmais').addEventListener('click', ()=>{
          cart[i].quantidade++;
          updateCart();
        });

      ds('.cart').append(cartItem);
    }
    desconto = subtotal * 0.1;
    total = subtotal - desconto;

    ds('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
    ds('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
    ds('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

  } else {
    ds('aside').classList.remove('show');
    ds('aside').style.left = '100vw';
  }
}