const $ = id => document.getElementById(id);

const inputEmail = $('email');
const inputPassword = $('pass');
const button = $('button')

const infoEmail = $('info-email')
const infoPass = $('info-password')

const errorEmail = $('error-email')
const errorPass = $('error-password')

const regExEmail = /^(([^<>()\[\]\,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/
    /* const regExLetras = /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/ */
    /* const regExPassword = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/ */

/* Validation Email */


inputEmail.addEventListener('focus', function() {
    infoEmail.innerText = 'Solo se permiten letras'
    this.classList.remove('is-invalid')
})

inputEmail.addEventListener('keydown', function() {
    infoEmail.innerText = null
    errorEmail.innerText = null
})

inputEmail.addEventListener('blur', function() {
    switch (true) {
        case !this.value:
            errorEmail.innerText = 'El email es obligatorio';
            this.classList.add('is-invalid')
            break;
        case !regExEmail.test(this.value):
            errorEmail.innerText = '¡Email invalido!';
            this.classList.add('is-invalid');
            break;
        default:
            errorEmail.innerText = null
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
            break;
    }
})


/* Validation password */

inputPassword.addEventListener('blur', function() {
    if (!this.value) {
        errorPass.innerText = 'La contraseña es obligatoria'
        this.classList.add('is-invalid')
    } else {
        errorPass.innerText = null
        this.classList.remove('is-invalid')
    }
})

/* button block */

button.addEventListener('click', function(e) {
    if ((errorPass || errorEmail) == '') {
        $('error-button').innerText = 'Ingresa tus datos'
        e.preventDefault()
    } else {
        $('error-button').innerText = null
    }
})