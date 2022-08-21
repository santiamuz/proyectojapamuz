
function ingresar(){
    location.replace("portada.html")
    guardarEnLocalStorage();
}

function guardarEnLocalStorage(){
let email = document.getElementById("email").value;
localStorage.setItem("email", email);
}

