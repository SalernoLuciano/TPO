const formulario = document.getElementById('formulario');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const correo = document.getElementById('correo');
const mensaje = document.getElementById('mensaje');
const submit = document.getElementById('submit');
const aviso = document.getElementById('on_submit');

function validar(e){
    console.log("ENTRE");
    if(nombre.value == 0){
        console.log("ENTRE");
        alert("No olvide completar su nombre!");
        e.preventDefault(); 
    } else if(formulario.apellido.value == 0){
        alert("No olvide completar su apellido!");
        e.preventDefault();
    } else if(formulario.correo.value == 0){
        alert("No olvide completar su correo!");
        e.preventDefault();
    } else if(formulario.mensaje.value == 0){
        alert("No olvide escribir su mensaje!");
        e.preventDefault();
    } else{
        aviso.innerHTML = "   ¡¡¡ Enviado !!!"
        formulario.reset();
        e.preventDefault();
    }
}

submit.addEventListener('click', validar);
