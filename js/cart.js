let ID = localStorage.getItem("productID");
let cart_url = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
let prod_url = "https://japceibal.github.io/emercado-api/products/" + ID + ".json"
let email = localStorage.getItem("email");
document.getElementById("usuario").innerHTML = email;

let subtotal = 0;
let input = 0;

let cartArray = [];

document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("carrito").innerHTML= "";
getJSONData(cart_url).then(function(resultObj){
    if (resultObj.status === "ok"){
        cartArray = resultObj.data;
        showCart(cartArray);
        }
    }    
)
})


function showCart (array){
    let row = ""; 
    
    for(let i = 0; i < array.articles.length; i++){
        let article = array.articles[0];
        
        
     row += ` 

     <div class="container ">
     <tr>
        <div class="row">
            <td class="col img-fluid" style="width: 30%">  <img style="width: 30%" src= `+ article.image +`  id="artImg">  </td>
        </div>
        
        <td class = "col mr-3"> ` + article.name +` </td>
        <td class="col"> `+ article.currency+ ` </td>
        <td class = "col">  <strong> ` + article.unitCost +`</strong> </td>
        <td class = "col"> <input type = "number" id = "cantidad" min="1" value = "1" oninput = "varSubtotal()"> </td>
        <td class = "col"> <strong> <p id="subtotal"> ` +  + `</p> </strong> </td>   
     </tr>  
     </div>
     ` 
    
    document.getElementById("carrito").innerHTML = row;
    
   input = document.getElementById("cantidad").value;
    varSubtotal()

  } //cierra el for

}  

function varSubtotal () {
    input = document.getElementById("cantidad").value;
    unitCost = document.getElementsByTagName("td")[3].innerText;
    document.getElementById("subtotal").innerHTML = input  * unitCost;
    } 
   

//A ver si  esto funciona para agregar productos  al carritooooo
/* 
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("carrito").innerHTML= "";
getJSONData(prod_url).then(function(resultObj){
    if (resultObj.status === "ok"){
        cartArray = resultObj.data;
        showProdInCart(cartArray);
        }
    }    
)
})

function showProdInCart (array){
    let row = ""; 
    
        
     row += ` 

     <tr>
        <td class="col" >  <img src= `+ array.image +`  id="artImg">  </td> <!-- Queda para después agregarle la imagen --!>
        <td class = "col mr-3"> ` + array.name +` </td>
        <td class = "col">  <strong> ` + array.cost +`</strong> </td>
        <td> <input type = "number" id = "cantidad" value = "1" > </td>
        <td> <strong> <p id="subtotal"> ` + + `</p> </strong> </td>   
     </tr>  
     ` 
    
    document.getElementById("carrito").innerHTML = row;
  
  
}   */