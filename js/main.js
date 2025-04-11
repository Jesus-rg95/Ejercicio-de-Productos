const main = document.getElementsByTagName("main").item(0);
const URLMain = "https://fakestoreapi.com/products/";

function getData(){
    fetch(URLMain)
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

getData();

//

function createCards(productos) {
    const container = document.createElement("div");
    container.className =  "row  cols 4";
    main.insertAdjacentElement("beforeend", container);

    productos.forEach(product => {
        const card = `
        <div class="col">
            <div class="card h-100" style="width: 18rem;">
            <img src="${product.image}" class="card-img-top" alt="${product.title}" style="height: 150px; object-fit: contain;">
            <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text"><strong>$${product.price}</strong></p>
            <a href="#" class="btn btn-primary">Ver detalles</a>
            </div>
            </div>
        </div>`;
        
        container.insertAdjacentHTML('beforeend', card);
    });
}

        