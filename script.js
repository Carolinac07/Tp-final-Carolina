function crearCuenta() {
    const nuevoUsuario = document.getElementById("nuevoUsuario").value
    const nuevaContra = document.getElementById("nuevaContra").value
    const mensaje = document.getElementById("mensaje")

    if (!nuevoUsuario || !nuevaContra) {
        mensaje.textContent = "Completar usuario y contraseña"
        return
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {}

    if (usuarios[nuevoUsuario]) {
        mensaje.textContent = "El usuario ya existe"
        return
    }

    usuarios[nuevoUsuario] = nuevaContra;
    localStorage.setItem("usuarios", JSON.stringify(usuarios))

    mensaje.textContent = "Cuenta creada"
    document.getElementById("nuevoUsuario").value = ""
    document.getElementById("nuevaContraseña").value = ""
}

function validacion() {
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("Contraseña").value;
    const mensaje2 = document.getElementById("mensaje")

    const userDefecto = "admin"
    const contraDefecto = "1234"

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {}

    if ((usuario === userDefecto && contraseña === contraDefecto) || 
        (usuarios[usuario] && usuarios[usuario] === contraseña)) {
        mensaje2.textContent = "Inicio de sesión correcto"

        setTimeout(() => {
            window.location.href = "juego.html"
        }, 1000);
    } else {
        mensaje2.textContent = "Usuario o contraseña incorrecto"
    }
}



function mostrarUsuarios() {
    const lista = document.getElementById("listaUsuarios");
    lista.innerHTML = "" 

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {}

    if (Object.keys(usuarios).length === 0) {
        lista.innerHTML = "<li>No hay usuarios guardados</li>"
        return
    }

    for (let nombre in usuarios) {
        let li = document.createElement("li")
        li.textContent = nombre
        lista.appendChild(li)
    }
}


let numeroSecreto = Math.floor(Math.random() * 100) + 1
let contador = 0

function adivinar() {
    const valor = parseInt(document.getElementById("intento").value)
    const resultado = document.getElementById("resultado")
    const intentos = document.getElementById("intentos")

    if (!valor || valor < 1 || valor > 100) {
        resultado.textContent = "Por favor ingresa un número entre 1 y 100."
        return
    }

    contador++;
    if (valor === numeroSecreto) {
        resultado.textContent = `¡Correcto! El número era ${numeroSecreto}.`
        intentos.textContent = `Lo lograste en ${contador} intentos.`
    } else if (valor < numeroSecreto) {
        resultado.textContent = "Es más alto."
    } else {
        resultado.textContent = "Es más bajo."
    }
}

function reiniciar() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1
    contador = 0
    document.getElementById("resultado").textContent = ""
    document.getElementById("intentos").textContent = ""
    document.getElementById("intento").value = ""
}

function cerrarSesion() {
    window.location.href = "index.html"
}


function traerDato() {
    fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=es")
        .then(res => res.json())
        .then(data => {
            document.getElementById("datoInutil").textContent = data.text
        })
        .catch(() => {
            document.getElementById("datoInutil").textContent = "Error al cargar el dato"
        })
}
