let id = localStorage.getItem("productID");
const product_url = "https://japceibal.github.io/emercado-api/products/" + id + ".json"
const comments_url = "https://japceibal.github.io/emercado-api/products_comments/" + id + ".json"
var array = [];
const enviar = document.getElementById("enviar");
const comentario = document.getElementById("comentario");
const contenedor = document.getElementById("comments");
const puntuacion = document.getElementById("puntuacion");
let today = new Date ();
let now = today.toLocaleString();

let email = localStorage.getItem("email");
document.getElementById("usuario").innerHTML = email;

//Array donde se cargarán los datos recibidos

let productArray = [];



document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("product-info").innerHTML="";
getJSONData(product_url).then(function(resultObj){
    if (resultObj.status === "ok"){
        productArray = resultObj.data;
        showProduct(productArray);
        }
}    
)
})



//Función que recibe el array del JSON y los muestra en pantalla usando DOM
function showProduct(array){

let img = ""; 
for (let i = 0; i < array.images.length; i++) {
    img += ` <img src= " `+ array.images[i]+` " id = "images">` 
} 
    let htmlContentToAppend = "";
    
    
            htmlContentToAppend += ` 
    
            
                    <h2> `+ array.name + ` </h2>

                    <hr>

                    <h3>Precio </h3> 
                    <p> `+ array.currency + ` `+ array.cost + ` </p> 
              
                    <h3> Descripción </h3> 
                        <p> `+ array.description +`</p> 

                    <h3> Categoría </h3> 

                    <p> `+ array.category +`</p> 

                    <h3> Cantidad vendidos </h3> 
                        
                    <p> `+ array.soldCount +`</p>    

                    <h3> Imágenes ilustrativas </h3> 

                    `+ img +` 
      
        `
        document.getElementById("product-info").innerHTML = htmlContentToAppend;

       
    }



 // Array donde cargar los comentarios 

let commentsArray = [];

document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("comments").innerHTML="";
getJSONData(comments_url).then(function(resultObj){
    if (resultObj.status === "ok"){
        commentsArray = resultObj.data;
        showComments(commentsArray);
        }
}    
)
})

//Función que muestra comentarios 

function showComments(array){
    let htmlContentToAppend = "";
    let estrellas = "";
    htmlContentToAppend += "<h3> Comentarios </h3>"

    for (let i = 0; i < array.length; i++) {
        let product_comment  = array[i];
    
            estrellas= "";
            for(let i= 0; i < (product_comment.score); i++) {
               estrellas +=  ` <span class="fa fa-star checked"> </span> ` 
            }

            for(let i=0; i<(5 - (product_comment.score)); i++){
                estrellas += ` <span class="fa fa-star "> </span> ` 
            }
   
        htmlContentToAppend += ` 
        <p> <strong> `+ product_comment.user  + `</strong> ` + " - " + product_comment.dateTime +  estrellas + `</p> 

        <p> `+ product_comment.description +`</p>     
        ` 
        document.getElementById("comments").innerHTML = htmlContentToAppend;
}
    }

//Agregar un nuevo comentario

if(localStorage.getItem("comentario")){
    array = JSON.parse(localStorage.getItem("comentario"));
    array.forEach((comentario) => {
        htmlContentToAppend = ""; 
        htmlContentToAppend += 
        `
        <p>${comentario}</p>
           `;
           document.getElementById("comments").innerHTML = htmlContentToAppend;
    });
}

//Agrega elementos al cuadro si y solo si hay el cuadro de texto no está vacío

enviar.addEventListener("click", () => {
  
    if (comentario.value == "" ) {
        return ;
    } else{
    
    // este bloque transforma el valor de la puntuación en estrellas
        let punt = "";
    for(let i= 0; i < (puntuacion.value); i++) {
        punt +=  ` <span class="fa fa-star checked"> </span> ` 
     }

     for(let i=0; i<(5 - (puntuacion.value)); i++){
         punt += ` <span class="fa fa-star "> </span> ` 
     }
    // Finaliza bloque de estrellas

    array.push(comentario.value);
    localStorage.setItem("comentario", JSON.stringify(array));
    if (comentario.value) {
        let item = `<li class="w-100">
                <p><strong> ${email} </strong>${ "-"} ${now} ${punt}</p>
                <p>${comentario.value} </p>
            </li>
            `;

        contenedor.innerHTML += item;
      } 
      comentario.value="";
  
    }
});

// PRODUCTOS RELACIONADOS

let relatedArray = [];



document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("related-products").innerHTML= "";
getJSONData(product_url).then(function(resultObj){
    if (resultObj.status === "ok"){
        relatedArray = resultObj.data;
        showRelated(relatedArray);
        }
    }    
)
})

function showRelated (array){
    let htmlContentToAppend = ""; 

        
    htmlContentToAppend += ` 
    
    <hr>
    <h3> Productos relacionados </h3> `  

    for(let i=0; i< array.relatedProducts.length; i++){
        let relatedProducts = array.relatedProducts[i];

        

        htmlContentToAppend += ` 
        <div onclick="setCatID(${relatedProducts.id})" > 
        <img src= `+ relatedProducts.image + ` class = "w-25" >  <p> `  + relatedProducts.name  + `  </p> `  
        
        document.getElementById("related-products").innerHTML = htmlContentToAppend;


    }
}

// Función para que al momento de hacer click en cada producto se guarde su id en local storage

function setCatID(id){
    localStorage.setItem("productID", id)
    window.location = "product-info.html"
}