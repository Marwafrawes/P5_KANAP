//récupérer API 

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
console.log(id);
let product = {}; 

fetch('http://localhost:3000/api/products/'+ id)
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function(data) {
                console.log('product: ', data);
                product = data; 
                //exemple en deux étape
                let price = document.getElementById('price');
                price.textContent = data.price
                //exemple en une étape
                document.getElementById('title').textContent= data.name
                document.getElementById('description').textContent = data.description
                

                let colorsElement = document.getElementById('colors')
                data.colors.forEach(color => {
                    let option = colorsElement.appendChild(document.createElement('option'))
                    option.textContent = color
                })
                //let imgDiv = document.getElementsByClassName('item__img') 
                let img = document.querySelector(".item__img");
                img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
                
            });
            
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });



    //HTML element  : pour ajouter les produits dans le panier 
const toCartBtn = document.getElementById("addToCart");
    // créer un evenement clic
toCartBtn.addEventListener("click", () => {
const color = document.querySelector('#colors').value; 
const qty = document.querySelector('#quantity').value; 
product.color = color; 
product.qty = qty; 
addProduct(product); 
    window.location.href = "./cart.html";
  });
  // créaton d'un Array depuis ID 
function addProduct(product){
    let products = [];
    if(localStorage.getItem('products')){
        products = JSON.parse(localStorage.getItem('products')); // prend une chaine de caractère est transforme en objet 
    } // je fais la meme chose dans la page cart // récupérer des élments 
    products.push(product); 
    localStorage.setItem('products', JSON.stringify(products)); // prend un objet est transforme en une chaine de caractère 
}
 
