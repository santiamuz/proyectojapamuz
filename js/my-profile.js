let email = localStorage.getItem("email");
document.getElementById("usuario").innerHTML = email;
document.getElementById("email").value= email; 
let btnGuardar = document.getElementById("btn-guardar");
let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");
let telNumber = document.getElementById("tel-number");
let secondName = document.getElementById("second-name");
let secondLastName = document.getElementById("second-last-name");


//Esta función la llamo con el atributo onclick y borra los datos del local storage al cerrar sesión

function logout(){
    localStorage.removeItem("email");
    localStorage.removeItem("nombre");
    localStorage.removeItem("apellido");
    localStorage.removeItem("telefono");
    localStorage.removeItem("segundo nombre");
    localStorage.removeItem("segundo apellido");
}

//Verifica que para ingresar a Mi Perfil  se haya iniciado sesión (que esté guardado el email en local storage)

if (localStorage.getItem("email") !== null){

}else {

    document.getElementById("alert").innerHTML =

            ` <div class="alert alert-success" role="alert">
  Primero debe iniciar sesión
        </div>`

        setTimeout(function(){
           location.replace("index.html") 
        }, 2000)
}

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

//Guarda en local storage los valores de los input al momento de hacer click en guardar

btnGuardar.addEventListener("click", function(){

    localStorage.setItem("nombre", firstName.value)
    localStorage.setItem("apellido", lastName.value)
    localStorage.setItem("telefono", telNumber.value)
    localStorage.setItem("segundo nombre", secondName.value)
    localStorage.setItem("segundo apellido", secondLastName.value)
    

})

//Chequea si hay algo guardado en local storage, y si es así lo muestra en el campo que corresponde

let nombre = localStorage.getItem("nombre");
let apellido = localStorage.getItem("apellido");
let telefono = localStorage.getItem("telefono");

if(localStorage.getItem("nombre") !== null){
    document.getElementById("first-name").value = nombre;
} 

if(localStorage.getItem("apellido") !== null){
    document.getElementById("last-name").value = apellido;
}

if(localStorage.getItem("telefono") !== null){
    document.getElementById("tel-number").value = telefono;
}
