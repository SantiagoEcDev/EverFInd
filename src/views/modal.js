// En tu archivo JavaScript
// Escucha el clic en el botón de "Editar"
const editButtons = document.querySelectorAll('.edit-pet-button');
const editModal = document.getElementById('editPetModal');
const closeEditModal = document.getElementById('closeEditModal');

editButtons.forEach(button => {
  button.addEventListener('click', () => {
    const petId = button.getAttribute('data-pet-id');
    // Puedes cargar los datos de la mascota a editar usando AJAX o simplemente mostrar el modal
    editModal.style.display = 'block';
  });
});

// Cierra el modal al hacer clic en la "x"
closeEditModal.addEventListener('click', () => {
  editModal.style.display = 'none';
});

// Cierra el modal al hacer clic fuera del mismo
window.addEventListener('click', event => {
  if (event.target === editModal) {
    editModal.style.display = 'none';
  }
});
