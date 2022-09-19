//Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");

let tweets = [];

//Event listeners
eventListeners();

function eventListeners() {
  //Cuando el usuario agrega un nuevo tweet
  formulario.addEventListener("submit", agregarTweet);

  //Cuando el documento está listo o coge lo que hay en storage o asigna un array vacio

  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];

    crearHtml();
  });
}

//Funciones

function agregarTweet(e) {
  e.preventDefault();

  //Textarea donde el usuario escribe

  const tweet = document.querySelector("#tweet").value;

  if (tweet === "") {
    mostrarError("Un mensaje no puede ir vacio");
    return;
  }

  const tweetObject = {
    id: Date.now(),
    tweet,
  };

  //Añadir el array de tweets

  tweets = [...tweets, tweetObject];

  //una vez agregado creamos el Html
  crearHtml();

  //reiniciar el formulario

  formulario.reset();
}

//Mostrar error
function mostrarError(error) {
  const mensajeError = document.createElement("p");

  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  //Insertarlo en el contenido
  const contenido = document.querySelector(".six ");

  contenido.appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

function crearHtml() {
  limpiarHtml();

  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      //Agregar botón de eliminar
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.innerText = "X";

      //Añadir la función de eliminar
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      const li = document.createElement("li");

      //Añadir texto

      li.innerText = tweet.tweet;

      //Asignar el boton
      li.appendChild(btnEliminar);

      //Insertar en el html

      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

//Agrega los tweets al localstorage

function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function limpiarHtml() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}

function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHtml();
}
