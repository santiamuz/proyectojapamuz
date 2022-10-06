let cart_url = "https://japceibal.github.io/emercado-api/user_cart/25801.json"

let email = localStorage.getItem("email");
document.getElementById("usuario").innerHTML = email;

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
        let article = array.articles[i];
      


     row += ` 

     <tr>
     <td class="col" >  <img src= `+ article.image +`  id="artImg">  </td>
        <td class = "col mr-3"> ` + article.name +` </td>
        <td class = "col">  <strong> ` + article.unitCost +`</strong> </td>
        <td> <input type = "number" value="1" id= "cantidad"> </td>
        <td> <strong> ` + article.unitCost + `</strong> </td>
     </tr>  
     ` 
        
    
    
    document.getElementById("carrito").innerHTML = row;
  }

    
}