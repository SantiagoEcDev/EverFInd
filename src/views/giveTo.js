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



// Obtén todos los botones de edición por su clase 'btn-edit'
const editButtons = document.querySelectorAll('.btn-edit');

// Agrega un controlador de eventos de clic a cada botón de edición
editButtons.forEach(button => {
  button.addEventListener('click', () => {
    const petContainer = button.closest('.pets');
    if (petContainer) {
      // Encuentra elementos dentro del contenedor para editar
      const nameElement = petContainer.querySelector('.name h2');
      const ageElement = petContainer.querySelector('.age p');
      
      // Crea campos de entrada para editar los datos
      const nameInput = document.createElement('input');
      const ageInput = document.createElement('input');
      
      // Asigna los valores actuales a los campos de entrada
      nameInput.value = nameElement.textContent;
      ageInput.value = ageElement.textContent;
      
      // Reemplaza los elementos de texto con los campos de entrada
      nameElement.replaceWith(nameInput);
      ageElement.replaceWith(ageInput);
      
      // Agrega un botón de guardar para confirmar la edición
      const saveButton = document.createElement('button');
      saveButton.textContent = 'Guardar';
      saveButton.addEventListener('click', () => {
        // Actualiza los valores con los datos editados
        nameElement.textContent = nameInput.value;
        ageElement.textContent = ageInput.value;
        
        // Restaura los elementos originales y elimina el botón de guardar
        nameInput.replaceWith(nameElement);
        ageInput.replaceWith(ageElement);
        saveButton.remove();
      });
      
      // Agrega el botón de guardar al contenedor de edición
      petContainer.appendChild(saveButton);
    }
  });
});


