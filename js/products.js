let id = localStorage.getItem("catID");


const autos_url = "https://japceibal.github.io/emercado-api/cats_products/" + id + ".json"


//array donde se cargarán los datos recibidos
let autosArray = [];


//-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
//-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en autosArray.
//-Por último, se llama a mostrarAutos() pasándole por parámetro autosArray.

    document.addEventListener("DOMContentLoaded", function(e){
        document.getElementById("autos").innerHTML="";
    getJSONData(autos_url).then(function(resultObj){
        if (resultObj.status === "ok"){
            autosArray = resultObj.data;
            mostrarAutos(autosArray);
            }
    }    
    )
})



//Función que recibe el array del JSON y los muestra en pantalla usando DOM
 function mostrarAutos(array){
    let htmlContentToAppend = "";

    console.log(array.catName)
    for (let i = 0; i < array.products.length; i++){      
        let cats_products = array.products[i];

        
        htmlContentToAppend += ` 
           
        
        <div onclick="setCatID(${cats_products.id})" > 
        <div class= "list-group-item list-group-item-action" >
            <div class="row">
                <div class="col-3">
                    <img src= " `+ cats_products.image +` " alt= "product image" class= "img-thumbnail" ></img>
                </div> 
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4> `+ cats_products.name + " - "+ cats_products.currency + ` ` + cats_products.cost + ` ` + ` </h4> 
                        <p> `+ cats_products.description +`</p> 
                        </div>
                        <small class="text-muted">` + cats_products.soldCount + ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        </div>
      
        `
       document.getElementById("autos").innerHTML = htmlContentToAppend;
       let catName = array.catName;
       document.getElementById("sub").innerHTML = "Aquí verás todos los productos de la categoría" + " " +  `<strong> `+  array.catName + `</strong>`

        
    }
 
} 





