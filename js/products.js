let id = localStorage.getItem("catID");
let min = undefined;
let max = undefined;
const autos_url = "https://japceibal.github.io/emercado-api/cats_products/" + id + ".json"


//array donde se cargarán los datos recibidos
let autosArray = [];


/* -Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en autosArray.
-Por último, se llama a mostrarAutos() pasándole por parámetro autosArray. */
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

    for (let i = 0; i < array.products.length; i++){      
        let cats_products = array.products[i];
           
            //Este if corresponde a filtrar 
            if ((cats_products.cost >= min && cats_products.cost <= max) || (min == undefined && max == undefined) || 
            (cats_products.cost >=min && max == undefined) || (cats_products.cost <= max && min == undefined)) {
        
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
                        <small class="text-muted">` + cats_products.soldCount + ` artículos </small> 
                    </div>

                </div>
            </div>
        </div>
        </div>
      
        `
        document.getElementById("autos").innerHTML = htmlContentToAppend;
        }
       let catName = array.catName;
       
       document.getElementById("sub").innerHTML = "Aquí verás todos los productos de la categoría" + " " +  `<strong> `+  array.catName + `</strong>`

       
    }

 }

//Accede al nombre de usuario guardado en local storage y lo muestra arriba a la derecha
let email  = localStorage.getItem("email");
document.getElementById("usuario").innerHTML  = email;

//COMIENZA SECCIÓN FILTRAR 
document.getElementById("rangeFilterPrice").addEventListener("click", function () {
    min =  document.getElementById("rangeFilterPriceMin").value;
    max = document.getElementById("rangeFilterPriceMax").value;
    // Si no hay parámetros de filtrado no sucede nada
    if (min == "" || max == "") {
        return;
    }
    mostrarAutos(autosArray);
})

//LIMPIA PARÁMETROS DE FILTRADO
document.getElementById("clearRangeFilter").addEventListener("click", function() {
    document.getElementById("rangeFilterPriceMin").value = "";
    document.getElementById("rangeFilterPriceMax").value = "";
    
    min = undefined;
    max = undefined;

    mostrarAutos(autosArray);

})

//ORDENA POR PRECIO

//Ascendente
document.getElementById("priceAsc").addEventListener("click", function() {
    autosArray.products.sort(function(a,b)  {
       return (b.cost - a.cost);
    })
    mostrarAutos(autosArray);
})

//Orden descendente
document.getElementById("priceDesc").addEventListener("click", function() {
    autosArray.products.sort(function(a,b)  {
       return(a.cost - b.cost);
    })
    mostrarAutos(autosArray);
})

//ORDENA POR RELEVANCIA
document.getElementById("relBtn").addEventListener("click", function(){
    autosArray.products.sort(function(a,b) {
        return(b.soldCount - a.soldCount);
    })
    mostrarAutos(autosArray);
})

// Función para que al momento de hacer click en cada producto se guarde su id en local storage

    function setCatID(id){
    localStorage.setItem("productID", id)
    window.location = "product-info.html"
}
    

   




