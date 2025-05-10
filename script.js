<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", 
function () {
  // === ANIMACIÓN DEL CANVAS ===
  const canvas = document.getElementById("miCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const circulos = [];

    for (let i = 0; i < 10; i++) {
      circulos.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 10 + Math.random() * 20,
        dx: 2 - Math.random() * 4,
        dy: 2 - Math.random() * 4,
        color: `hsl(${Math.random() * 360}, 80%, 60%)`
      });
    }

    function dibujar() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let c of circulos) {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fillStyle = c.color;
        ctx.fill();

        c.x += c.dx;
        c.y += c.dy;

        if (c.x + c.r > canvas.width || c.x - c.r < 0) c.dx *= -1;
        if (c.y + c.r > canvas.height || c.y - c.r < 0) c.dy *= -1;
      }
      requestAnimationFrame(dibujar);
    }

    dibujar();
  }

  // === BOTÓN: CONTAR PÁRRAFOS ===
  const boton = document.getElementById("botonContar");
  if (boton) {
    boton.onclick = function () {
      const nuevoParrafo = document.createElement("p");
      nuevoParrafo.textContent = "Y otro más";
      document.getElementById("contenedorParrafos").appendChild(nuevoParrafo);

      const total = document.getElementsByTagName("p").length;
      document.getElementById("resultadoParrafos").textContent =
        "Número de párrafos: " + total;
    };
  }

  // === FUNCIONES DE FORMULARIO Y REGISTRO ===
  window.mostrarFormulario = function () {
    toggleDisplay("registro", "block");
    scrollIntoView("registro");
  };

  function toggleDisplay(elementId, displayStyle) {
    document.getElementById(elementId).style.display = displayStyle;
  }

  function scrollIntoView(elementId) {
    document.getElementById(elementId).scrollIntoView({ behavior: "smooth" });
  }

  window.guardarEnBloc = function () {
    const userData = obtenerDatosFormulario();
    if (!validarFormulario(userData)) return;

    localStorage.setItem("nombre", userData.nombre);
    localStorage.setItem("email", userData.email);
    localStorage.setItem("password", userData.password);

    toggleDisplay("registro", "none");
    toggleDisplay("zonaPrivada", "block");
    document.getElementById("mensajeBienvenida").textContent = `Bienvenido/a, ${userData.nombre} 👋`;

    alert("Registro exitoso.");
  };

  function obtenerDatosFormulario() {
    return {
      nombre: document.getElementById("fname").value,
      apellido: document.getElementById("lname").value,
      edad: document.getElementById("age").value,
      email: document.getElementById("email").value,
      pais: document.getElementById("country").value,
      genero: document.querySelector('input[name="gender"]:checked')?.value || 'No especificado',
      ocupacion: document.getElementById("occupation").value,
      password: document.getElementById("password").value,
      repeatPassword: document.getElementById("repeatPassword").value,
    };
  }

  function validarFormulario(userData) {
    const campos = Object.values(userData);
    if (campos.includes("")) {
      alert("Por favor completa todos los campos correctamente.");
      return false;
    }

    if (userData.password !== userData.repeatPassword) {
      alert("Las contraseñas no coinciden, corrígelas");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(userData.email)) {
      alert("Por favor ingresa un correo electrónico válido.");
      return false;
    }

    return true;
  }

  window.mostrarAjustes = function () {
    toggleDisplay("formularioAjustes", "block");
  };

  window.cancelarAjustes = function () {
    toggleDisplay("formularioAjustes", "none");
  };

  window.guardarAjustes = function () {
    const nuevoEmail = document.getElementById("nuevoEmail").value;
    const nuevaContra = document.getElementById("nuevaContra").value;
    const contraActualGuardada = localStorage.getItem("password");
    const antiguaContra = document.getElementById("antiguaContra").value;

    if (antiguaContra !== contraActualGuardada) {
      alert("La contraseña actual no es correcta.");
      return;
    }

    if (nuevoEmail) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(nuevoEmail)) {
        alert("Por favor ingresa un correo electrónico válido.");
        return;
      } else {
        alert(`Nuevo email: ${nuevoEmail}`);
      }
    }

    if (nuevaContra) {
      localStorage.setItem("password", nuevaContra);
      alert("Contraseña actualizada con éxito.");
    }

    if (!nuevoEmail && !nuevaContra) {
      alert("Introduce al menos un dato para modificar.");
    }

    window.cancelarAjustes();
  };

  window.calcularLetraDNI = function () {
    const dniInput = document.getElementById("dni");
    const letraDiv = document.getElementById("letraDNI");
    const dni = parseInt(dniInput.value);

    if (!isNaN(dni) && dni.toString().length === 8) {
      const letra = "TRWAGMYFPDXBNJZSQVHLCKE"[dni % 23];
      letraDiv.innerText = `Letra del DNI: ${letra}`;
    } else {
      letraDiv.innerText = "Introduce un DNI válido de 8 cifras.";
    }
  };

  window.cerrarSesion = function () {
    toggleDisplay("zonaPrivada", "none");
    toggleDisplay("registro", "none");
    toggleDisplay("mainContent", "none");
    alert("Has cerrado sesión.");
  };
});
function mostrarFormulario() {
  document.getElementById('registro').style.display = 'block';
  document.getElementById('contenidoPrincipal').style.display = 'none';
  document.getElementById('zonaPrivada').style.display = 'none';
  document.getElementById('btnInicio').style.display = 'inline-block';
}

function mostrarInicio() {
  document.getElementById('registro').style.display = 'none';
  document.getElementById('contenidoPrincipal').style.display = 'block';
  document.getElementById('zonaPrivada').style.display = 'none';
  document.getElementById('btnInicio').style.display = 'none';
}

function cerrarSesion() {
  document.getElementById('zonaPrivada').style.display = 'none';
  mostrarInicio();
}

function mostrarZonaPrivada(nombreUsuario = "Usuario") {
  document.getElementById('mensajeBienvenida').innerText = "Bienvenido/a, " + nombreUsuario;
  document.getElementById('zonaPrivada').style.display = 'block';
  document.getElementById('registro').style.display = 'none';
  document.getElementById('contenidoPrincipal').style.display = 'none';
  document.getElementById('btnInicio').style.display = 'inline-block';
=======
document.addEventListener("DOMContentLoaded", 
function () {
  // === ANIMACIÓN DEL CANVAS ===
  const canvas = document.getElementById("miCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const circulos = [];

    for (let i = 0; i < 10; i++) {
      circulos.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 10 + Math.random() * 20,
        dx: 2 - Math.random() * 4,
        dy: 2 - Math.random() * 4,
        color: `hsl(${Math.random() * 360}, 80%, 60%)`
      });
    }

    function dibujar() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let c of circulos) {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fillStyle = c.color;
        ctx.fill();

        c.x += c.dx;
        c.y += c.dy;

        if (c.x + c.r > canvas.width || c.x - c.r < 0) c.dx *= -1;
        if (c.y + c.r > canvas.height || c.y - c.r < 0) c.dy *= -1;
      }
      requestAnimationFrame(dibujar);
    }

    dibujar();
  }

  // === BOTÓN: CONTAR PÁRRAFOS ===
  const boton = document.getElementById("botonContar");
  if (boton) {
    boton.onclick = function () {
      const nuevoParrafo = document.createElement("p");
      nuevoParrafo.textContent = "Y otro más";
      document.getElementById("contenedorParrafos").appendChild(nuevoParrafo);

      const total = document.getElementsByTagName("p").length;
      document.getElementById("resultadoParrafos").textContent =
        "Número de párrafos: " + total;
    };
  }

  // === FUNCIONES DE FORMULARIO Y REGISTRO ===
  window.mostrarFormulario = function () {
    toggleDisplay("registro", "block");
    scrollIntoView("registro");
  };

  function toggleDisplay(elementId, displayStyle) {
    document.getElementById(elementId).style.display = displayStyle;
  }

  function scrollIntoView(elementId) {
    document.getElementById(elementId).scrollIntoView({ behavior: "smooth" });
  }

  window.guardarEnBloc = function () {
    const userData = obtenerDatosFormulario();
    if (!validarFormulario(userData)) return;

    localStorage.setItem("nombre", userData.nombre);
    localStorage.setItem("email", userData.email);
    localStorage.setItem("password", userData.password);

    toggleDisplay("registro", "none");
    toggleDisplay("zonaPrivada", "block");
    document.getElementById("mensajeBienvenida").textContent = `Bienvenido/a, ${userData.nombre} 👋`;

    alert("Registro exitoso.");
  };

  function obtenerDatosFormulario() {
    return {
      nombre: document.getElementById("fname").value,
      apellido: document.getElementById("lname").value,
      edad: document.getElementById("age").value,
      email: document.getElementById("email").value,
      pais: document.getElementById("country").value,
      genero: document.querySelector('input[name="gender"]:checked')?.value || 'No especificado',
      ocupacion: document.getElementById("occupation").value,
      password: document.getElementById("password").value,
      repeatPassword: document.getElementById("repeatPassword").value,
    };
  }

  function validarFormulario(userData) {
    const campos = Object.values(userData);
    if (campos.includes("")) {
      alert("Por favor completa todos los campos correctamente.");
      return false;
    }

    if (userData.password !== userData.repeatPassword) {
      alert("Las contraseñas no coinciden, corrígelas");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(userData.email)) {
      alert("Por favor ingresa un correo electrónico válido.");
      return false;
    }

    return true;
  }

  window.mostrarAjustes = function () {
    toggleDisplay("formularioAjustes", "block");
  };

  window.cancelarAjustes = function () {
    toggleDisplay("formularioAjustes", "none");
  };

  window.guardarAjustes = function () {
    const nuevoEmail = document.getElementById("nuevoEmail").value;
    const nuevaContra = document.getElementById("nuevaContra").value;
    const contraActualGuardada = localStorage.getItem("password");
    const antiguaContra = document.getElementById("antiguaContra").value;

    if (antiguaContra !== contraActualGuardada) {
      alert("La contraseña actual no es correcta.");
      return;
    }

    if (nuevoEmail) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(nuevoEmail)) {
        alert("Por favor ingresa un correo electrónico válido.");
        return;
      } else {
        alert(`Nuevo email: ${nuevoEmail}`);
      }
    }

    if (nuevaContra) {
      localStorage.setItem("password", nuevaContra);
      alert("Contraseña actualizada con éxito.");
    }

    if (!nuevoEmail && !nuevaContra) {
      alert("Introduce al menos un dato para modificar.");
    }

    window.cancelarAjustes();
  };

  window.calcularLetraDNI = function () {
    const dniInput = document.getElementById("dni");
    const letraDiv = document.getElementById("letraDNI");
    const dni = parseInt(dniInput.value);

    if (!isNaN(dni) && dni.toString().length === 8) {
      const letra = "TRWAGMYFPDXBNJZSQVHLCKE"[dni % 23];
      letraDiv.innerText = `Letra del DNI: ${letra}`;
    } else {
      letraDiv.innerText = "Introduce un DNI válido de 8 cifras.";
    }
  };

  window.cerrarSesion = function () {
    toggleDisplay("zonaPrivada", "none");
    toggleDisplay("registro", "none");
    toggleDisplay("mainContent", "none");
    alert("Has cerrado sesión.");
  };
});
function mostrarFormulario() {
  document.getElementById('registro').style.display = 'block';
  document.getElementById('contenidoPrincipal').style.display = 'none';
  document.getElementById('zonaPrivada').style.display = 'none';
  document.getElementById('btnInicio').style.display = 'inline-block';
}

function mostrarInicio() {
  document.getElementById('registro').style.display = 'none';
  document.getElementById('contenidoPrincipal').style.display = 'block';
  document.getElementById('zonaPrivada').style.display = 'none';
  document.getElementById('btnInicio').style.display = 'none';
}

function cerrarSesion() {
  document.getElementById('zonaPrivada').style.display = 'none';
  mostrarInicio();
}

function mostrarZonaPrivada(nombreUsuario = "Usuario") {
  document.getElementById('mensajeBienvenida').innerText = "Bienvenido/a, " + nombreUsuario;
  document.getElementById('zonaPrivada').style.display = 'block';
  document.getElementById('registro').style.display = 'none';
  document.getElementById('contenidoPrincipal').style.display = 'none';
  document.getElementById('btnInicio').style.display = 'inline-block';
>>>>>>> c05a7ad4cafd5be17ff7a1d5523259c99d10b7d7
}