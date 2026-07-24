// MAPEO DEL DOM

const imagenPregunta = document.getElementById("imagen-pregunta");
const enunciado = document.getElementById("enunciado");
const botonesOpcion = document.querySelectorAll("#opciones button");
const iconosFeedback = document.querySelectorAll("#opciones .icono-feedback");
const contador = document.getElementById("contador");
const puntuacion = document.getElementById("puntuacion");

const bloqueExplicacion = document.getElementById("explicacion");
const tituloExplicacion = document.getElementById("titulo-explicacion");
const textoExplicacion = document.getElementById("texto-explicacion");

const btnAnterior = document.getElementById("btn-anterior");
const btnSiguiente = document.getElementById("btn-siguiente");
const btnTerminar = document.getElementById("btn-terminar");

const dialogConfirmar = document.getElementById("dialog-confirmar");
const btnNoConfirmar = document.getElementById("btn-no-confirmar");
const btnSiConfirmar = document.getElementById("btn-si-confirmar");

const dialogEmail = document.getElementById("dialog-email");
const formEmail = document.getElementById("form-email");
const formCerrarEmail = document.getElementById("form-cerrar-email");
const inputEmail = document.getElementById("input-email");
const mensajeEnvio = document.getElementById("mensaje-envio");

// DECLARACIÓN DE VARIABLES

let indiceActual = 0;
let opcionPendiente = "";
let testTerminado = false;

// DECLARACIÓN DE FUNCIONES

const obtenerPregunta = (lista, indice) => {
  let pregunta = lista[indice];
  return pregunta;
};

const esPrimeraPregunta = (indice) => {
  let resultado = false;

  if (indice === 0) {
    resultado = true;
  } else {
    resultado = false;
  }

  return resultado;
};

const esUltimaPregunta = (indice, total) => {
  let resultado = false;

  if (indice === total - 1) {
    resultado = true;
  } else {
    resultado = false;
  }

  return resultado;
};

const sePuedeResponder = (pregunta, terminado) => {
  let resultado = false;

  if (terminado === true) {
    resultado = false;
  } else {
    if (pregunta.confirmada === true) {
      resultado = false;
    } else {
      resultado = true;
    }
  }

  return resultado;
};

const calcularPuntuacion = (lista) => {
  let puntos = 0;
  let i = 0;

  while (i < lista.length) {
    if (lista[i].confirmada === true) {
      if (lista[i].respuesta === lista[i].correcta) {
        puntos = puntos + 1;
      } else {
        puntos = puntos;
      }
    } else {
      puntos = puntos;
    }

    i = i + 1;
  }

  return puntos;
};

const prepararIndiceAnterior = (indice) => {
  let nuevoIndice = indice;

  if (esPrimeraPregunta(indice)) {
    nuevoIndice = indice;
  } else {
    nuevoIndice = indice - 1;
  }

  return nuevoIndice;
};

const prepararIndiceSiguiente = (indice, total) => {
  let nuevoIndice = indice;

  if (esUltimaPregunta(indice, total)) {
    nuevoIndice = indice;
  } else {
    nuevoIndice = indice + 1;
  }

  return nuevoIndice;
};

const obtenerHtmlIconoOk = () => {
  let html =
    '<span class="inline-flex h-9 w-9 items-center justify-center rounded-full" style="background:#22c55e;">' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-none stroke-white stroke-[3]" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M15 18l-6-6 6-6"></path>' +
    "</svg></span>";

  return html;
};

const obtenerHtmlIconoError = () => {
  let html =
    '<span class="inline-flex h-9 w-9 items-center justify-center rounded-full" style="background:#ef4444;">' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-none stroke-white stroke-[3]" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M18 6L6 18"></path>' +
    '<path d="M6 6l12 12"></path>' +
    "</svg></span>";

  return html;
};

const main = (operacion, entrada) => {
  let resultado = null;

  switch (operacion) {
    case "mostrar": {
      let pregunta = obtenerPregunta(preguntas, indiceActual);
      let puntos = calcularPuntuacion(preguntas);
      let i = 0;

      imagenPregunta.src = pregunta.imagen;
      imagenPregunta.alt = pregunta.pregunta;
      enunciado.textContent = pregunta.pregunta;
      contador.textContent = (indiceActual + 1) + " / " + preguntas.length;
      puntuacion.textContent = puntos;

      while (i < botonesOpcion.length) {
        botonesOpcion[i].textContent = pregunta.opciones[i];
        iconosFeedback[i].style.display = "none";
        iconosFeedback[i].innerHTML = "";

        if (pregunta.confirmada === true) {
          if (pregunta.opciones[i] === pregunta.correcta) {
            botonesOpcion[i].className = "btn btn-primary flex-1";
            iconosFeedback[i].innerHTML = obtenerHtmlIconoOk();
            iconosFeedback[i].style.display = "inline-flex";
          } else {
            if (pregunta.opciones[i] === pregunta.respuesta) {
              botonesOpcion[i].className = "btn btn-error flex-1";
              iconosFeedback[i].innerHTML = obtenerHtmlIconoError();
              iconosFeedback[i].style.display = "inline-flex";
            } else {
              botonesOpcion[i].className = "btn btn-primary flex-1";
            }
          }
        } else {
          botonesOpcion[i].className = "btn btn-primary flex-1";
        }

        if (sePuedeResponder(pregunta, testTerminado)) {
          botonesOpcion[i].disabled = false;
        } else {
          botonesOpcion[i].disabled = true;
        }

        i = i + 1;
      }

      if (pregunta.confirmada === true) {
        if (pregunta.respuesta === pregunta.correcta) {
          tituloExplicacion.textContent = "Correcta — " + pregunta.correcta;
        } else {
          tituloExplicacion.textContent =
            "Incorrecta — la respuesta era " + pregunta.correcta;
        }

        textoExplicacion.textContent = pregunta.explicacion;
        bloqueExplicacion.classList.remove("hidden");
      } else {
        tituloExplicacion.textContent = "";
        textoExplicacion.textContent = "";
        bloqueExplicacion.classList.add("hidden");
      }

      if (testTerminado === true) {
        btnAnterior.disabled = true;
        btnSiguiente.disabled = true;
        btnTerminar.disabled = true;
      } else {
        if (esPrimeraPregunta(indiceActual)) {
          btnAnterior.disabled = true;
        } else {
          btnAnterior.disabled = false;
        }

        if (esUltimaPregunta(indiceActual, preguntas.length)) {
          btnSiguiente.disabled = true;
        } else {
          btnSiguiente.disabled = false;
        }

        btnTerminar.disabled = false;
      }

      break;
    }

    case "anterior": {
      indiceActual = prepararIndiceAnterior(indiceActual);
      main("mostrar", null);
      resultado = indiceActual;
      break;
    }

    case "siguiente": {
      indiceActual = prepararIndiceSiguiente(indiceActual, preguntas.length);
      main("mostrar", null);
      resultado = indiceActual;
      break;
    }

    case "elegir": {
      let pregunta = obtenerPregunta(preguntas, indiceActual);

      if (sePuedeResponder(pregunta, testTerminado)) {
        opcionPendiente = entrada;
        dialogConfirmar.showModal();
      } else {
        opcionPendiente = "";
      }

      break;
    }

    case "cancelar": {
      opcionPendiente = "";
      dialogConfirmar.close();
      break;
    }

    case "confirmar": {
      let pregunta = obtenerPregunta(preguntas, indiceActual);

      if (opcionPendiente === "") {
        dialogConfirmar.close();
      } else {
        pregunta.respuesta = opcionPendiente;
        pregunta.confirmada = true;
        opcionPendiente = "";
        dialogConfirmar.close();
        main("mostrar", null);
      }

      break;
    }

    case "terminar": {
      testTerminado = true;
      main("mostrar", null);
      dialogEmail.showModal();
      break;
    }

    case "enviar": {
      let correo = entrada;

      formEmail.classList.add("hidden");
      mensajeEnvio.textContent =
        "Sus respuestas y la calificación ha sido enviada a " + correo;
      mensajeEnvio.classList.remove("hidden");
      formCerrarEmail.classList.remove("hidden");
      inputEmail.disabled = true;
      quitarEscuchadores();
      break;
    }

    default: {
      resultado = null;
      break;
    }
  }

  return resultado;
};

const alClicarAnterior = () => {
  main("anterior", null);
};

const alClicarSiguiente = () => {
  main("siguiente", null);
};

const alClicarOpcion = (evento) => {
  let boton = evento.currentTarget;
  let indiceOpcion = Number(boton.dataset.opcion);
  let pregunta = obtenerPregunta(preguntas, indiceActual);
  let textoOpcion = pregunta.opciones[indiceOpcion];

  main("elegir", textoOpcion);
};

const alClicarNoConfirmar = () => {
  main("cancelar", null);
};

const alClicarSiConfirmar = () => {
  main("confirmar", null);
};

const alClicarTerminar = () => {
  main("terminar", null);
};

const alEnviarEmail = (evento) => {
  evento.preventDefault();
  main("enviar", inputEmail.value);
};

const enlazarEscuchadores = () => {
  let i = 0;

  btnAnterior.addEventListener("click", alClicarAnterior);
  btnSiguiente.addEventListener("click", alClicarSiguiente);
  btnTerminar.addEventListener("click", alClicarTerminar);
  btnNoConfirmar.addEventListener("click", alClicarNoConfirmar);
  btnSiConfirmar.addEventListener("click", alClicarSiConfirmar);
  formEmail.addEventListener("submit", alEnviarEmail);

  while (i < botonesOpcion.length) {
    botonesOpcion[i].addEventListener("click", alClicarOpcion);
    i = i + 1;
  }
};

const quitarEscuchadores = () => {
  let i = 0;

  btnAnterior.removeEventListener("click", alClicarAnterior);
  btnSiguiente.removeEventListener("click", alClicarSiguiente);
  btnTerminar.removeEventListener("click", alClicarTerminar);
  btnNoConfirmar.removeEventListener("click", alClicarNoConfirmar);
  btnSiConfirmar.removeEventListener("click", alClicarSiConfirmar);
  formEmail.removeEventListener("submit", alEnviarEmail);

  while (i < botonesOpcion.length) {
    botonesOpcion[i].removeEventListener("click", alClicarOpcion);
    i = i + 1;
  }
};

// EJECUCIÓN DE CÓDIGO

enlazarEscuchadores();
main("mostrar", null);
