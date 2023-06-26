const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]/, // Letras y espacios, pueden llevar acentos.
	password: /^.{6,12}$/, // 5 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{9}$/ //9 numeros.
};
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
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
    case "edad":
			validarCampo(expresiones.edad, e.target, 'edad');
		break;
    case "website":
			validarCampo(expresiones.website, e.target, 'website');
		break;
	}
}
formulario.addEventListener('submit', (e)=>{
 e.preventDefault()
});
inputs.forEach((input)=>{
  input.addEventListener('keyup', validarFormulario)
  input.addEventListener('blur', validarFormulario)
})