let id = localStorage.getItem("productID");
const product_url = "https://japceibal.github.io/emercado-api/products/" + id + ".json"

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
    let htmlContentToAppend = "";
    console.log(array.images);
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

                    
                    <img src= " `+ array.images +` " >
      
        `
        document.getElementById("product-info").innerHTML = htmlContentToAppend;
    }




       
