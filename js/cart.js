let ID = localStorage.getItem("productID");
let cart_url = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
let prod_url = "https://japceibal.github.io/emercado-api/products/" + ID + ".json"
let email = localStorage.getItem("email");
let btn_add = document.getElementById("btn-add");
document.getElementById("usuario").innerHTML = email;
let subtotal = 0;
let input = 0;
let cartArray = [];
let tarjeta = document.getElementById("card");
let transfer = document.getElementById("transfer");

document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("carrito").innerHTML = "";
    getJSONData(cart_url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArray = resultObj.data;
            showCart(cartArray);
        }
    }
    )
})

function showCart(array) {
    let row = "";

    for (let i = 0; i < array.articles.length; i++) {
        let article = array.articles[0];


        row += ` 

     <div class="container ">
     <tr>
        <div class="row">
            <td class="col img-fluid" style="width: 30%">  <img style="width: 30%" src= `+ article.image + `  id="artImg">  </td>
        </div>
        
        <td class = "col mr-3"> ` + article.name + ` </td>
        <td class="col"> `+ article.currency + ` </td>
        <td class = "col">  <strong> ` + article.unitCost + `</strong> </td>
        <td class = "col"> <input type = "number" id = "cantidad" min="1" value = "1" oninput = "varSubtotal()" 
        oninput = "envioPremium()" oninput = "envioExpress()" > </td>
        <td class = "col"> <strong> <p id="subtotal"> ` + + `</p> </strong> </td>   
     </tr>  
     </div>
     `

        document.getElementById("carrito").innerHTML = row;

        input = document.getElementById("cantidad").value;
        varSubtotal()

    } //cierra el for
}

function varSubtotal() {
    input = document.getElementById("cantidad").value;
    unitCost = document.getElementsByTagName("td")[3].innerText;
    document.getElementById("subtotal").innerHTML = input * unitCost;
    document.getElementById("costo").innerHTML = input * unitCost;
    subtotal = input * unitCost
}


function envioPremium() {
    document.getElementById("shipping-cost").innerHTML = subtotal * 0.15
    calculoTotal();
}
function envioExpress() {
    document.getElementById("shipping-cost").innerHTML = subtotal * 0.07
    calculoTotal();
}
function envioStandard() {
    document.getElementById("shipping-cost").innerHTML = subtotal * 0.05
    calculoTotal();
}

function calculoTotal() {
    shippingCost = document.getElementsByTagName("p")[7].innerText
    total = (+shippingCost) + (+subtotal)
    document.getElementById("total").innerHTML = ` <strong>` + total + ` </strong> `
}

//Deshabilita la opción contraria a la que se marcó 
function paymentMethod() {


    if (tarjeta.checked) {
        document.getElementById("card-number").disabled = false;
        document.getElementById("cvv").disabled = false;
        document.getElementById("card-venc").disabled = false;
        document.getElementById("num-cuenta").disabled = true;
        document.getElementById("payment-method-text").innerHTML = `<p> Tarjeta de crédito </p> `
        document.getElementById("payment-validation").style.display = "none"
    } else {
        document.getElementById("num-cuenta").disabled = false;
        document.getElementById("card-number").disabled = true;
        document.getElementById("cvv").disabled = true;
        document.getElementById("card-venc").disabled = true;
        document.getElementById("payment-method-text").innerHTML = `<p> Transferencia bancaria </p> `
        document.getElementById("payment-validation").style.display = "none"

    }
}

//Deshabilita el envío de formularios si hay campos no válidos

(function () {
    'use strict'

    // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
    var forms = document.querySelectorAll('.needs-validation')

    // Bucle sobre ellos y evitar el envío
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity() || form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

//Chequea si hay un método de pago seleccionado

let btnListo = document.getElementById("btn-listo");
let btnFinalizar = document.getElementById("btn-finalizar");
let cardNumber = document.getElementById("card-number");
let cvv = document.getElementById("cvv");
let cardVenc = document.getElementById("card-venc");
let cuenta = document.getElementById("num-cuenta")

btnFinalizar.addEventListener("click", function (e) {
    let seCumple = false;
    let form = document.getElementById("form");

    if (tarjeta.checked) {
        seCumple = true;
    } else if (transfer.checked) {
        seCumple = true;
    } else {
        document.getElementById("payment-validation").innerHTML = "<p>Seleccione un método de pago</p>"
    }

    if (form.checkValidity()) {

        console.log("anda");
        document.getElementById("success").innerHTML =

            ` <div class="alert alert-success" role="alert">
  Compra realizada con éxito!
        </div>`
    }
})



