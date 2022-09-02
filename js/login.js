function guardarEnLocalStorage(){
let email = document.getElementById("email").value;
localStorage.setItem("email", email);
}

function ingresar(){
    location.replace("portada.html");
}

//Añadimos listener para que esté pendiente si alguien hace click en el boton con id "btn" 
//Cuando hacen "click", larga todo lo que está dentro

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("btn").addEventListener("click", function() {
        guardarEnLocalStorage();
        let usuario = document.getElementById("email").value;
        let password = document.getElementById("password1").value;
        let seCumple = true;
        
        if(usuario == ""){
            seCumple = false;
            alert("Debe completar el campo EMAIL");
        }
        
        if(password == ""){
            seCumple = false;
            alert("Debe completar el campo CONTRASEÑA");
        }

        if(password.length < 6){
            seCumple = false;
            alert("La contraseña debe tener al menos 6 caracteres");
        }
        
        if(seCumple){
            ingresar();
        }

    })
})


