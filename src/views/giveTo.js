// Obtén todos los botones de eliminar por su clase 'btn-delete'
const deleteButtons = document.querySelectorAll('.btn-delete');

// Agrega un controlador de eventos de clic a cada botón de eliminar
deleteButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Encuentra el elemento padre 'div.pets' y elimínalo
    const petContainer = button.closest('.pets');
    if (petContainer) {
      petContainer.remove();
    }
  });
});





