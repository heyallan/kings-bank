class Navbar extends HTMLElement {
	constructor() {
		super()
	}

	connectedCallback() {
		this.innerHTML = `
<nav>
	<fieldset>
		<legend>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
			Menú de navegación
		</legend>
		<ol start="0" style="padding-left: 1.5em">
			<li>
				<a href="index.html">Inicio</a>
			</li>
			<li>
				<a href="crear-cuenta.html">Crear cuenta</a>
			</li>
			<li>
				<a href="ver-cuenta.html">Ver cuenta</a>
			</li>
			<li>
				<a href="obtener-calificacion.html">Obtener calificación</a>
			</li>
			<li>
				<a href="solicitar-tarjeta.html">Solicitar tarjeta</a>
			</li>
			<li>
				<a href="enviar-mensaje.html">Enviar mensaje</a>
			</li>
			<li>
				<a href="eliminar-cuenta.html">Eliminar cuenta</a>
			</li>
			<li>
				<a href="tipo-de-cambio.html">Tipo de cambio</a>
			</li>
			<li>
				<a href="#!" data-action="logout">Cerrar sesión</a>
			</li>
		</ol>
	</fieldset>
</nav>
		`
	}
} customElements.define('ui-navbar', Navbar);

// colores
// ----- ----- ----- ----- -----
// mensaje de alerta
const color_error    = 'hsl(4deg, 89.62%, 58.43%)'
const color_exito    = 'hsl(122deg, 39.44%, 49.22%)'
// icono tarjeta
const color_normal   = 'hsl(225deg, 72.73%, 56.86%)'
const color_platinum = 'hsl(0deg, 0%, 0%)'
const color_dorada   = 'hsl(42deg, 88.72%, 38.24%)'
let   icono_color    = color_normal



// marcar la página activa en el menú de navegación
// ----- ----- ----- ----- -----
// por cada item del menu
document.querySelectorAll('nav li>a').forEach(function(item) {
	// si la URL de la página conicide con la URL del menu
	if (document.location.href.includes(item.href)) {
		// agregar clase para estilizar via CSS
		item.classList.add('active')
	}
})



// $ mostrar secciones condicionales
// ----- ----- ----- ----- -----
// por cada item
document.querySelectorAll('[data-displayon]').forEach(function(item) {
	// esconder item por defecto
	item.style.display = 'none'
	// consultar valor condicional
	const condition = item.getAttribute('data-displayon')
	// si el valor condicional existe
	if (sessionStorage.getItem(condition)) {
		// deshacer esconder
		item.style.display = ''
	}
})



// $ esconder secciones condicionales
// ----- ----- ----- ----- -----
// por cada item
document.querySelectorAll('[data-hideon]').forEach(function(item) {
	// consultar valor condicional
	const condition = item.getAttribute('data-hideon')
	// si el valor condicional existe
	if (sessionStorage.getItem(condition)) {
		// esconder
		item.style.display = 'none'
	}
})



// $ mostrar textos condicionales
// ----- ----- ----- ----- -----
// por cada item
document.querySelectorAll('[data-display]').forEach(function(element) {
	const datum_name = element.getAttribute('data-display')
	const datum_value = sessionStorage.getItem(datum_name)
	// validar dato (el dato debe existir previamente)
	if (datum_value !== null)  {
		if (element.tagName.toLowerCase() === 'input') {
			element.value = datum_value
		} else {
			element.innerText = datum_value
		}
	}
})



// $ crear cuenta
// ----- ----- ----- ----- -----
;(function() {
	// obtener formulario
	const formulario_crear_cuenta = document.querySelector('form#crear_cuenta')
	// si el formulario no existe entonces salir
	if (formulario_crear_cuenta === null) return;
	// asignar manejador de evento
	formulario_crear_cuenta.onsubmit = function(event) {
		// prevenir envío automático del formulario
		event.preventDefault()
		// variables de trabajo
		const banner_resultado  = formulario_crear_cuenta.querySelector('#banner_resultado')
		let texto_resultado = ''
		// obtener datos del formulario
		const data     = new FormData(formulario_crear_cuenta)
		const email    = data.get('email')
		const password = data.get('password')
		const emailPattern = /[a-zA-Z0-9\.\_\-\+]{1,}@[a-zA-Z0-9\.\-]{1,}\.[a-zA-Z]{2,6}/;
		const digitPattern = /\d/;
		const letterPattern = /[a-zA-Z]/;
		// validar campo email
		if (email === '') {
			texto_resultado = '❌ El campo "Email" es obligatorio'
		}
		// validar formato de email
		else if (email.match(emailPattern) === null) {
			texto_resultado = '❌ El campo "Email" debe cumplir el formato "nombre@email.com"'
		}
		// validar contraseña
		else if (password === '') {
			texto_resultado = '❌ El campo "Contraseña" es obligatorio'
		}
		// validar formato de contraseña
		else if (password.match(letterPattern) === null || password.match(digitPattern) === null) {
			texto_resultado = '❌ El campo "Contraseña" debe contener letras y números'
		}
		// si no hay errores, proceder
		else {
			// registrar datos en la memoria del navegador
			sessionStorage.setItem('loggedin', true)
			sessionStorage.setItem('email', email)
			sessionStorage.setItem('password', password)
			// redirigir a la página de perfil
			window.location.href = 'ver-cuenta.html'
		}
		// mostrar resultado
		banner_resultado.innerText = texto_resultado
	}
})(); // fin de crear cuenta




// $ obtener calificación de crédito
// ----- ----- ----- ----- -----
;(function() {
	// obtener formulario
	const formulario_obtener_calificacion = document.querySelector('form#obtener_calificacion')
	// si el formulario no existe entonces salir
	if (formulario_obtener_calificacion === null) return;
	// asignar manejador de evento
	formulario_obtener_calificacion.onsubmit = function(event) {
		// prevenir el envío automático del formulario
		event.preventDefault()
		// variables de trabajo
		const banner_resultado  = formulario_obtener_calificacion.querySelector('#banner_resultado')
		const icono_tarjeta     = formulario_obtener_calificacion.querySelector('#icon_card_container')
		let   icono_visibilidad = 'none'
		let   texto_resultado   = ''
		// obtener datos del formulario
		const data            = new FormData(formulario_obtener_calificacion)
		const nombre          = data.get('nombre') // returns string
		const tipo_de_ingreso = data.get('tipo_de_ingreso') // returns null || string
		const ingreso         = parseInt(data.get('ingreso')) // returns NaN || number
		let   calificacion    = 'Ninguna' // valor por defecto
		// validar nombre
		if (nombre === '') {
			texto_resultado = '❌ El campo "Nombre" es obligatorio'
			icono_visibilidad = 'none'
		}
		// validar tipo de ingreso
		else if (tipo_de_ingreso === null) {
			texto_resultado = '❌ El campo "Tipo de ingreso" es obligatorio.'
			icono_visibilidad = 'none'
		}
		else if (tipo_de_ingreso !== 'asalariado') {
			texto_resultado = '❌ El "Tipo de ingreso" debe ser "Asalariado".'
			icono_visibilidad = 'none'
		}
		// validar ingreso
		else if (isNaN(ingreso)) {
			texto_resultado = '❌ El campo "Monto de ingreso" es obligatorio.'
			icono_visibilidad = 'none'
		}
		else if (ingreso < 1) {
			texto_resultado = '❌ El "Monto de ingreso" debe ser un número positivo.'
			icono_visibilidad = 'none'
		}
		// si no hay errores, proceder a calcular resultado
		// ----- ----- ----- ----- -----
		else {
			// asignar calificación
			calificacion = asignar_calificacion_segun_ingreso(ingreso)
			// calcular mensajes de resultado
			switch (calificacion) {
				case 'Normal':
				texto_resultado = `Su calificación de crédito es: "${calificacion}".`
				icono_visibilidad = 'block'
				icono_color       = color_normal
				break
				case 'Platinum':
				texto_resultado = `Su calificación de crédito es: "${calificacion}".`
				icono_visibilidad = 'block'
				icono_color       = color_platinum
				break
				case 'Dorada':
				texto_resultado = `Su calificación de crédito es: "${calificacion}".`
				icono_visibilidad = 'block'
				icono_color       = color_dorada
				break
			}
		}
		// mostrar resultado
		banner_resultado.innerText = texto_resultado
		icono_tarjeta.style.display = icono_visibilidad
		icono_tarjeta.querySelector('#icon_card_background').style.fill = icono_color
		icono_tarjeta.querySelector('#icon_card_name').textContent = nombre
		// registrar datos en la memoria del navegador
		sessionStorage.setItem('nombre', nombre)
		sessionStorage.setItem('calificacion', calificacion)
		sessionStorage.setItem('ingreso', ingreso)
	}
})(); // final de  calificación de crédito




// $ solicitar tarjeta
// ----- ----- ----- ----- -----
;(function() {
	// obtener formulario
	const formulario_solicitar_tarjeta = document.querySelector('form#solicitar_tarjeta')
	// si el formulario no existe entonces salir
	if (formulario_solicitar_tarjeta === null) return;
	// asignar manejador de evento
	formulario_solicitar_tarjeta.onsubmit = function(event) {
		// prevenir envío automático del formulario
		event.preventDefault()
		// variables de trabajo
		const banner_resultado    = formulario_solicitar_tarjeta.querySelector('#banner_resultado')
		const calificacion        = sessionStorage.getItem('calificacion')
		const estado_de_solicitud = sessionStorage.getItem('estado_de_solicitud')
		// validar calificación de crédito
		if (calificacion === 'Ninguna' || calificacion === null) {
			banner_resultado.innerText = '❌ Usted necesita una calificación de crédito para solicitar una tarjeta.'
		}
		// validar estado de solicitud de tarjeta
		else if (estado_de_solicitud === 'Enviada') {
			banner_resultado.innerText = '❌ Su solicitud ya fue enviada. Si desea apelar su solicitud utilice la funcionalidad: "Enviar mensaje".'
		}
		// si no hay errores, proceder
		else {
			banner_resultado.innerText = '✅ Su tarjeta ha sido solicitada. Pronto estaremos en contacto.'
			sessionStorage.setItem('estado_de_solicitud', 'Enviada')
		}
	}
})();



// $ enviar mensaje
// ----- ----- ----- ----- -----
;(function() {
	// obtener formulario
	const formulario_enviar_mensaje = document.querySelector('form#enviar_mensaje')
	// si el formulario no existe entonces salir
	if (formulario_enviar_mensaje === null) return;
	// campos
	const campo_mensaje    = formulario_enviar_mensaje.querySelector('#mensaje')
	const banner_resultado = formulario_enviar_mensaje.querySelector('#banner_resultado')
	const min_length       = campo_mensaje.getAttribute('data-minlength') || 25
	const max_length       = campo_mensaje.getAttribute('data-maxlength') || 40
	// asignar manejador de evento
	formulario_enviar_mensaje.onsubmit = function(event) {
		// prevenir envío automático del formulario
		event.preventDefault()
		// validar mensaje
		if (campo_mensaje.value.length < min_length) {
			banner_resultado.innerText = `❌ El mensaje no puede ser menor a ${min_length} caracteres`
		}
		else if (campo_mensaje.value.length > max_length) {
			banner_resultado.innerText = `❌ El mensaje no puede ser mayor a ${max_length} caracteres`
		}
		// si no hay errores, proceder
		else {
			banner_resultado.innerText = `✅ Su mensaje ha sido enviado. Pronto estaremos en contacto.`
			campo_mensaje.value = '' // limpiar formulario
			update_counter() // actualizar contador
		}
	}
	// $ contador de caracteres
	const char_counter = document.createElement('span')
	char_counter.classList.add('float-right')
	char_counter.classList.add('color-muted')
	char_counter.classList.add('font-size-sm')
	char_counter.style = 'transform: translate(-1em, -3.5em)'
	// inyectar contador de caracteres
	campo_mensaje.insertAdjacentElement('afterend', char_counter)
	// ejecutar por primera vez
	update_counter()
	// ejecutar cuando el texto cambia
	campo_mensaje.oninput = update_counter
	// definir function contador
	function update_counter() {
		char_counter.innerText = `Min: ${min_length} / Max: ${max_length} / Actual: ${campo_mensaje.value.length}`
	}
})();



// $ eliminar cuenta
// ----- ----- ----- ----- -----
;(function() {
	// obtener formulario
	const formulario_eliminar_cuenta = document.querySelector('form#eliminar_cuenta')
	// si el formulario no existe entonces salir
	if (formulario_eliminar_cuenta === null) return;
	// asignar manejador de evento
	formulario_eliminar_cuenta.onsubmit = function(event) {
		// prevenir envío automático del formulario
		event.preventDefault()
		// campos del formulario
		const data                   = new FormData(formulario_eliminar_cuenta)
		const acepto_las_condiciones = data.get('acepto_las_condiciones') // null | 'on'
		if (acepto_las_condiciones === null) {
			alert('Usted debe aceptar las condiciones antes de eliminar su cuenta.')
		}
		else {
			// remover todos los datos de la memoria del navegador
			sessionStorage.clear()
			// redirigir a la página de inicio
			window.location.href = 'index.html?alertMessage="Su cuenta ha sido eliminada exitosamente. Usted será redirigido(a) a la página de inicio."'
		}
	}
})();



// $ check exchange rate
// ----- ----- ----- -----
(function() {
	var form = document.querySelector('#check_xrate');
	var loaderIcon = document.querySelector('#loader-icon');
	var banner_resultado = document.querySelector('#banner_resultado');
	if (form === null) return false;
	form.onsubmit = function(event) {
		event.preventDefault();
		loaderIcon.classList.remove('hide');
		setTimeout(function() {
			var random = Math.random();
			banner_resultado.innerHTML = `<pre id="query_result">Valor: ${random}</pre>`;
			loaderIcon.classList.add('hide');
		}, 3000);
	}
})();



// $ cerrar sesión (logout simbólico)
// ----- ----- ----- ----- -----
// obtener botón
const boton_salir = document.querySelector('[data-action="logout"]')
// si el botón existe
if (boton_salir !== null) {
	// asignar manejador de evento
	boton_salir.onclick = function(event) {
		// prevenir redirección cuando el botón es un enlace
		event.preventDefault()
		// si el usuario está loggeado
		if (sessionStorage.getItem('loggedin') === 'true') {
			// remover datos de la memoria del nevegador (olvidar usuario)
			sessionStorage.removeItem('loggedin')
			// redirigir a la página de inicio
			window.location.href = 'index.html?alertMessage="Se ha cerrado la sesión exitosamente. Usted será redirigido(a) a la página de inicio."'
		} else {
			alert('Usted no ha iniciado sesión.')
		}
	}
}



/**
* Asignar calificación de crédito según ingreso
* @param {number} ingreso
* @returns {string} 'Normal' | 'Platinum' | 'Dorada'
*/
function asignar_calificacion_segun_ingreso(ingreso = 0) {
	let resultado = ''
	// aquí no podemos usar switch porque switch solo evalúa igualdad, no comparación
	if (ingreso < 400000) {
		resultado = 'Normal'
	}
	else if (ingreso < 800000) {
		resultado = 'Platinum'
	}
	else {
		resultado = 'Dorada'
	}
	return resultado
}

// $ alert message via url query string
// ----- ----- ----- ----- -----
;(function() {
	// obtener el mensaje
	const url = new URL(document.location)
	const message = url.searchParams.get('alertMessage')
	// si no hay mensaje salir
	if (message === null) return
	// mostrar el mensaje
	alert(message)
	// remover el mensaje de la url
	window.location.href = window.location.href.split('?')[0]
})()


// $ toggle password field visibility
// ----------------------------------
;(function() {
	const toggler = document.querySelector('[data-action="toggle-password"]')
	if (toggler === null) return
	toggler.addEventListener('click', function(event) {
		const target = document.querySelector(event.target.getAttribute('data-target'))
		if (target.getAttribute('type') === 'password') {
			target.setAttribute('type', 'text')
		} else {
			target.setAttribute('type', 'password')
		}
	})
})();

