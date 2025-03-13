let btnFavoritos = document.getElementById("favoritos");
let btnTodos = document.getElementById("todos");

let lugaresTodos = document.getElementsByClassName("accordion-item");
let lugaresFavoritos = document.getElementsByClassName("fav");

btnFavoritos.addEventListener("click", () => {
  for (let i = 0; i < lugaresTodos.length; i++) {
    lugaresTodos[i].style.display = "none";
  }

  for (let i = 0; i < lugaresFavoritos.length; i++) {
    lugaresFavoritos[i].style.display = "block";
  }
});
