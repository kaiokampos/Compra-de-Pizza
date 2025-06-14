let qtPizzaModal = 1;

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

    ds(".pizzaBig img").src = pizzaJson[key].img;
    ds(".pizzaInfo h1").innerText = pizzaJson[key].name;
    ds(".pizzaInfo .pizzaInfo--desc").innerText = pizzaJson[key].description;
    ds(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[
      key
    ].price.toFixed(2)}`;
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

dsa('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) =>{
    item.addEventListener('click', closeModal);
});

ds('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (qtPizzaModal > 1) {
        qtPizzaModal--;
        ds('.pizzaInfo--qt').innerHTML = qtPizzaModal;
    }
});
ds('.pizzaInfo--qtmais').addEventListener('click', () =>{
    qtPizzaModal++;
    ds('.pizzaInfo--qt').innerHTML = qtPizzaModal;
});

dsa('.pizzaInfo--size').forEach((size) => {
    size.addEventListener('click', (event) =>{
        ds('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
    
    
});
