const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]/, // Letras y espacios, pueden llevar acentos.
	password: /^.{6,12}$/, // 5 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{9}$/, //9 numeros.
  edad: /^\d{1,3}$/,
	url: /[\w\-\.]+\.\w{2,5}\/?\5*/
};
const campos = {
	nombre: false,
  apellido: false,
	password: false,
	email: false,
	telefono: false,
  edad:false
}
const camposValue={
	nombre: '',
  apellido: '',
	password: '',
	email:'',
	telefono: '',
  edad:'',
	website:'',
}
const preventString= (e)=>{
  if (e.keyCode < 45 || e.keyCode > 57) {
    e.returnValue = false
  }
}
document.querySelectorAll('.input_number').forEach((inumber)=>{
  inumber.addEventListener('keypress', preventString)
})
const validarFormulario = (e)=>{
  switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "apellido":
			validarCampo(expresiones.nombre, e.target, 'apellido');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
		break;
		case "email":
			validarCampo(expresiones.correo, e.target, 'email');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
    case "edad":
			validarCampo(expresiones.edad, e.target, 'edad')
		break;
    case "website":
			validarCampo(expresiones.url, e.target, 'website')
		break;
	}
}
const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
		camposValue[campo]=`${input.value}`
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}
const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['password'] = false;
	} else {
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password'] = true;
	}
}
inputs.forEach((input)=>{
  input.addEventListener('keyup', validarFormulario)
  input.addEventListener('blur', validarFormulario)
})
console.log(campos);
formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.nombre && campos.apellido && campos.password && campos.email && campos.telefono && campos.edad &&terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
		const resultado ={
			nombre: `${camposValue.nombre} ${camposValue.apellido}`,
			password: camposValue.password,
			email:camposValue.email,
			telefono:camposValue.telefono,
			edad:camposValue.edad,
			website:camposValue.website,
			experiencia:inputSlider.value,
		}
		console.log(resultado);
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});


const slideValue = document.querySelector("span");
const inputSlider = document.querySelector(".input-slider");
inputSlider.oninput = (()=>{
  let value = inputSlider.value;
  slideValue.textContent = value;
	slideValue.style.left = `calc(${value*10}%)`;
  	slideValue.classList.add("show");
});
inputSlider.onblur = (()=>{
  slideValue.classList.remove("show");
});
// konami code

let keys = {
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  65: "a",
  66: "b"
};

let konamiCode = ["up", "up", "down", "down", "left", "right", "left", "right", "b", "a"];
let keyCount = 0;
let isOpen= false
let timerID;

document.addEventListener("keydown", checkCode, false);

function checkCode(e) {
  let keyPressed = keys[e.keyCode];

  if (keyPressed === konamiCode[keyCount]) {
    keyCount++;

    // clear timer
    window.clearTimeout(timerID);

    // start timer with a 1 second delay before resetting state
    timerID = window.setTimeout(resetKeyState, 4000);

    // check if we are still on the right path
    if (keyCount === konamiCode.length && !isOpen) {
      cheatCodeActivated();
			isOpen=true;
      resetKeyState();
    } else if (keyCount === konamiCode.length && isOpen){
			cheatCodeDesactivated();
			resetKeyState();
		}
  } else {
    resetKeyState();
  }
}

function cheatCodeActivated() {
  modal_container.classList.add('show');
}
function cheatCodeDesactivated() {
  modal_container.classList.remove('show');
}
function resetKeyState() {
  window.clearTimeout(timerID);
  keyCount = 0;
}