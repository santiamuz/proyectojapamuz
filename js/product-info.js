let id = localStorage.getItem("productID");
const product_url = "https://japceibal.github.io/emercado-api/products/" + id + ".json"
const comments_url = "https://japceibal.github.io/emercado-api/products_comments/" + id + ".json"
var array = [];
const enviar = document.getElementById("enviar");
const comentario = document.getElementById("comentario");
const contenedor = document.getElementById("comments");
const puntuacion = document.getElementById("puntuacion");
let today = new Date();
let now = today.toLocaleString();

let email = localStorage.getItem("email");
document.getElementById("usuario").innerHTML = email;

//Array donde se cargarán los datos recibidos

let productArray = [];

document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("product-info").innerHTML = "";
    getJSONData(product_url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productArray = resultObj.data;
            showProduct(productArray);
        }
    }
    )
})

//Función que recibe el array del JSON y los muestra en pantalla usando DOM
function showProduct(array) {

    let img = "";
    for (let i = 0; i < array.images.length; i++) {
        img += ` <img src= " ` + array.images[i] + ` " id = "images">`
    }
    let htmlContentToAppend = "";


    htmlContentToAppend += ` 
    
            <div class= "container" >

            <div class = "d-flex flew-row"> 
                <div class="p-2 ">
                    <h2 class= "mt-3 pl-6"> `+ array.name + ` </h2> 
                </div>    
                <div class = "p-4">    
                    <button type="button" id="btn-add" onclick=setProdID(${array.id}) class="btn btn-secondary float-right" > 
                    Agregar al carrito </button>     
                </div>
            </div
                    <hr>

                    <h3 class = "ml-3"> Precio </h3> 
                    <p> `+ array.currency + ` ` + array.cost + ` </p> 
              
                    <h3> Descripción </h3> 
                        <p> `+ array.description + `</p> 

                    <h3> Categoría </h3> 

                    <p> `+ array.category + `</p> 

                    <h3> Cantidad vendidos </h3> 
                        
                    <p> `+ array.soldCount + `</p>    

                    <h3> Imágenes ilustrativas </h3> 
          
                    `+ img + `  
                    
            </div>
      
        `
    document.getElementById("product-info").innerHTML = htmlContentToAppend;
}



//Agrega ID del producto al carrito
function setProdID(id){
    localStorage.setItem("productID", id)
    window.location="cart.html"

}


// Array donde cargar los comentarios 

let commentsArray = [];

document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("comments").innerHTML = "";
    getJSONData(comments_url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentsArray = resultObj.data;
            showComments(commentsArray);
        }
    }
    )
})

//Función que muestra comentarios 

function showComments(array) {
    let htmlContentToAppend = "";
    let estrellas = "";
    htmlContentToAppend += `<div class = "container"> <h3> Comentarios </h3></div>`

    for (let i = 0; i < array.length; i++) {
        let product_comment = array[i];

        estrellas = "";
        for (let i = 0; i < (product_comment.score); i++) {
            estrellas += ` <span class="fa fa-star checked"> </span> `
        }

        for (let i = 0; i < (5 - (product_comment.score)); i++) {
            estrellas += ` <span class="fa fa-star "> </span> `
        }

        htmlContentToAppend += ` 

        <div class="container">
            <div class="d-grid gap-3"> 
                <div class="p-2 bg-light border">

        <p> <strong> `+ product_comment.user + `</strong> ` + " - " + product_comment.dateTime + estrellas + `</p> 

        <p> `+ product_comment.description + `</p>

                </div>
            </div>
        </div>
             
        `
        document.getElementById("comments").innerHTML = htmlContentToAppend;
    }
}

//Agregar un nuevo comentario

if (localStorage.getItem("comentario")) {
    array = JSON.parse(localStorage.getItem("comentario"));
    array.forEach((comentario) => {
        htmlContentToAppend = "";
        htmlContentToAppend +=
            ` <div class="container"> 
        <p>${comentario}</p>
        </div>
           `;
        document.getElementById("comments").innerHTML = htmlContentToAppend;
    });
}

//Agrega elementos al cuadro si y solo si hay el cuadro de texto no está vacío

enviar.addEventListener("click", () => {

    if (comentario.value == "") {
        return;
    } else {

        // este bloque transforma el valor de la puntuación en estrellas
        let punt = "";
        for (let i = 0; i < (puntuacion.value); i++) {
            punt += ` <span class="fa fa-star checked"> </span> `
        }

        for (let i = 0; i < (5 - (puntuacion.value)); i++) {
            punt += ` <span class="fa fa-star "> </span> `
        }
        // Finaliza bloque de estrellas

        array.push(comentario.value);
        localStorage.setItem("comentario", JSON.stringify(array));
        if (comentario.value) {
            let item = `<li class="w-100">
                <p><strong> ${email} </strong>${"-"} ${now} ${punt}</p>
                <p>${comentario.value} </p>
            </li>
            `;

            contenedor.innerHTML += item;
        }
        comentario.value = "";

    }
});

// PRODUCTOS RELACIONADOS

let relatedArray = [];

document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("related-products").innerHTML = "";
    getJSONData(product_url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            relatedArray = resultObj.data;
            showRelated(relatedArray);
        }
    }
    )
})

function showRelated(array) {
    let htmlContentToAppend = "";


    htmlContentToAppend += ` 
    <div class="container"> 
    <hr>
    <h3> Productos relacionados </h3> `

    for (let i = 0; i < array.relatedProducts.length; i++) {
        let relatedProducts = array.relatedProducts[i];



        htmlContentToAppend += ` 
        <div onclick="setCatID(${relatedProducts.id})" > 
            <div class="row"> 
                
                    <img src= `+ relatedProducts.image + ` class = "w-25 mr-5"  >  <p> ` + relatedProducts.name + `  </p> 
                
            </div>
        </div>
        
        `

        document.getElementById("related-products").innerHTML = htmlContentToAppend;


    }
}

// Función para que al momento de hacer click en cada producto se guarde su id en local storage

function setCatID(id) {
    localStorage.setItem("productID", id)
    window.location = "product-info.html"
}
function logout(){
    localStorage.removeItem("email");
}