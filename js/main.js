const main = document.getElementsByTagName("main").item(0);
let mainProds = document.getElementById("mainProds");
const ulMenu = document.getElementById("ulMenu")
const URLMain = "https://fakestoreapi.com/products/";

function getData(cat){
    const options ={"method":"GET"};
    fetch(URLMain+cat)
    .then((response) => {
        console.log(response);
        response.json().then((res)=>{
           // console.log(res.length);
            //console.log(res[0].title);
            createCards(res);
        });
    })
        .catch((err)=>{
            main.insertAdjacentHTML("beforeend",
                `<div class="alert alert-danger" role="alert">
                ${err.message}
                </div>`); 
        });
}//getData

function getCategories(){
    const options ={"method":"GET"};
    fetch(URLMain+"categories/", options)
    .then((response) => {
        response.json().then((res)=>{
         res.forEach((cat)=>{
            ulMenu.insertAdjacentHTML("afterbegin",
        `<li><a class="dropdown-item" style ="cursor:pointer;" onclick="getData('category/${(cat.replace("'","%27"))}');">${cat}</a></li>`);  
         });
        
        });
    }).catch((err)=>{
            main.insertAdjacentHTML("beforeend",
                `<div class="alert alert-danger" role="alert">
                ${err.message}
                </div>`); 
        });
}//getCategories
    getCategories();
    getData("");


//

function createCards(productos) {
    mainProds.innerHTML="";
    const container = document.createElement("div");
    container.className = "row row-cols-1 row-cols-sm-2 row-cols-md-4";
    mainProds.appendChild(container);

    productos.forEach(product => {
        const card = `
        <div class="col">
            <div class="card h-100" style="width: 18rem;">
            <img src="${product.image}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: contain;">
            <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text fw-bold">${product.category}</p>
            <p class="card-text">${product.description.substring(0, 150)}</p>
            <p class="card-text"><strong>$${product.price}</strong></p>
            <p class="card-text">${product.rating.rate}</p>
          

            <a href="#" class="btn btn-primary d-block mx-auto">Ver detalles</a>
            </div>
        </div>
        </div>`;
        
        container.insertAdjacentHTML('beforeend', card);
    });
}

       

