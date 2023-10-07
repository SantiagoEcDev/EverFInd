const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');

sideLinks.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', () => {
        sideLinks.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});

const menuBar = document.querySelector('.content nav .bx.bx-menu');
const sideBar = document.querySelector('.sidebar');

menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});

const searchBtn = document.querySelector('.content nav form .form-input button');
const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
const searchForm = document.querySelector('.content nav form');

searchBtn.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault;
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchBtnIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchBtnIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        sideBar.classList.add('close');
    } else {
        sideBar.classList.remove('close');
    }
    if (window.innerWidth > 576) {
        searchBtnIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

const toggler = document.getElementById('theme-toggle');

toggler.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});

// JavaScript para manejar los modales
const openModalButtons = document.querySelectorAll(".open-modal-btn");
const closeModalButtons = document.querySelectorAll(".close-modal-btn");
const modalContainers = document.querySelectorAll(".modal");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = button.getAttribute("data-index");
    const modal = document.getElementById(`modal${index}`);
    modal.style.display = "block";
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = button.getAttribute("data-index");
    const modal = document.getElementById(`modal${index}`);
    modal.style.display = "none";
  });
});

  
const aplicarBtn = document.getElementById('aplicarBtn');

aplicarBtn.addEventListener('click', () => {
    aplicarBtn.classList.toggle('clicked');
    if (aplicarBtn.classList.contains('clicked')) {
        aplicarBtn.innerHTML = 'Cancelar <i class="fa-solid fa-ban"></i>';
    } else {
        aplicarBtn.innerHTML = 'Aplicar  <i class="fa-solid fa-plus"></i>';
    }
});

var box  = document.getElementById('box');
var down = false;


function toggleNotifi(){
	if (down) {
		box.style.height  = '0px';
		box.style.opacity = 0;
		down = false;
	}else {
		box.style.height  = '510px';
		box.style.opacity = 1;
		down = true;
	}
}