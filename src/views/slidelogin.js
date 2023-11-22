const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

let index = 1; // Inicializa el índice en 1

function moveSlider() {
  const currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  bullets[index - 1].classList.add("active");

  // Incrementa el índice
  index++;

  // Detén el intervalo si llegamos a la última imagen
  if (index > images.length) {
    clearInterval(sliderInterval);
  }
}

// Inicia el intervalo para llamar a moveSlider cada 3 segundos
const sliderInterval = setInterval(moveSlider, 2000);

// Agrega un event listener a cada bullet para mover manualmente el slider
bullets.forEach((bullet) => {
  bullet.addEventListener("click", () => {
    // Reinicia el intervalo al hacer clic en un bullet
    clearInterval(sliderInterval);
    index = parseInt(bullet.dataset.value);
    moveSlider();
  });
});