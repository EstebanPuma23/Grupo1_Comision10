console.log('registerValidator Success');
const $ = id => document.getElementById(id);

let formulario = $("formulario-register");

const inputName = $("user");
const inputEmail = $("email")
const inputPassword = $("password");
const inputPassword2 = $("repeatpass")
const checkTerms = $('terms');
const btnWatch = $('watch');

/* expresiones regulares */
const regExLetras = /^[_A-zA]*((-|\s)*[_A-zA-Z])*$/
const regExEmail = /^(([^<>()\[\]\,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/
const regExPassword =  /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,12}$/ 

/* Name and Surname */
inputName.addEventListener('focus', function()  {
    $("info-user").innerText = "Solo letras"
    $("errorUser").innerText = null;
    this.classList.remove('is-invalid');
})

inputName.addEventListener('keydown', function() {
    $("info-user").innerText = null;
})


inputName.addEventListener('blur', function() {
    switch (true) {
        case !this.value:
            $("errorUser").innerText = "Campo Obligatorio";
            this.classList.add('is-invalid')
            break;
        case !regExLetras.test(this.value) :
            $("errorUser").innerText = "Solo se permiten letras";
            this.classList.add('is-invalid')
            break;
        default:
            $("errorUser").innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
})

/* Email */
inputEmail.addEventListener('focus', function()  {
    $("info-email").innerText = "Ingrese un email valido"
    $("errorEmail").innerText = null;
    this.classList.remove('is-invalid');
})

inputEmail.addEventListener('keydown', function() {
    $("info-email").innerText = null;
})

inputEmail.addEventListener('blur', function() {
    switch (true) {
        case !this.value:
            $("errorEmail").innerText ="Campo obligatorio";
            this.classList.add('is-invalid')
            break;
        case !regExEmail.test(this.value) :
            $("errorEmail").innerText = "Email invalido";
            this.classList.add('is-invalid')
            break;
        default:
            $("errorEmail").innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
})

/* Password */
inputPassword.addEventListener('focus', function()  {
    $("info-passw").innerText = "Debe contener una mayúscula, minuscula y al menos un número"
    $("errorPassw").innerText = null;
    this.classList.remove('is-invalid');
})

inputPassword.addEventListener('keydown', function() {
    $("info-passw").innerText = null;
})




inputPassword.addEventListener('blur', function() {
    switch (true) {
        case !this.value:
            $("errorPassw").innerText = "Campo obligatorio, debe contener de 8 a 12 caracteres";
            this.classList.add('is-invalid')
            break;
        case !regExPassword.test(this.value):
            $("errorPassw").innerText = "Debe contener minúscula, mayúscula, caracter especial y al menos un número";
            this.classList.add('is-invalid')
            break;
        default:
            $("errorPassw").innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
})


/*Repeat password*/


inputPassword2.addEventListener('Keyup', function() {
    if(this.value === inputPassword.value){
        console.log(this.value)
         this.classList.remove('is-invalid')
         this.classList.add('is-valid')
    }else{
      this.classList.remove('is-valid')
      $('errorPasw2').innerText = null;
    }
}
)

inputPassword2.addEventListener('blur', function() {
    switch (true) {
        case !this.value:
            $("errorPassw2").innerText ="Debe confirmar su contraseña";
            this.classList.add('is-invalid')
            break;
        case this.value !== inputPassword.value :
            $("errorPassw2").innerText = "Las contraseñas no coinciden";
            this.classList.add('is-invalid')
            break;
        default:
            $("errorPassw2").innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
})
/* Ver contraseña */
btnWatch.addEventListener('click', () =>{
    inputPassword.type === "text" ? inputPassword.type = "password" : inputPassword = "text";
    console.log(inputPassword.type);
})

/* terminos */
checkTerms.addEventListener('click', function(e) {
  this.classList.toggle('is-valid');
  this.classList.remove('is-invalid')
  $('error-terms').innerText = null;
  console.log(this.checked);
})

formulario.addEventListener('submit', e => {
    e.preventDefault();
    let error = false;
    const elementos = formulario.elements;

    for(let i=0; i < elementos.length -2; i++) {
        if(!elementos[i].value){
            elementos[i].classList.add('is-invalid');
            $('error-empty').innerText = "Los campos señalados son obligatorios";
            error = true;

        }
    } 

    if(!terms.checked){
        terms.classList.add('is-invalid')
        $('error-terms').innerText = "Debes aceptar los terminos y condiciones";
        error= true
    }

    if(!error){
        formulario.submit()
    }
})
