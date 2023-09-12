function agregarMascota() {
    // Captura los datos ingresados por el usuario
    const nombreMascota = document.getElementById('pets-name').value;
    const razaMascota = document.getElementById('pets-breed').value;
    const cumpleanosMascota = document.getElementById('pets-birthday').value;
    const generoMascota = document.querySelector('input[name="pet-gender"]:checked').value;
    const esterilizadoCastrado = document.querySelector('input[name="spayed-neutered"]:checked').value;
  
    // Crea un nuevo elemento <div> para la mascota
    const nuevaMascota = document.createElement('div');
    nuevaMascota.classList.add('pets');
    nuevaMascota.innerHTML = `
      <article class="pet-view">
        <div class="pet-background">
          <!-- Aquí puedes incluir una imagen de la mascota -->
        </div>
        <div class="pet-info">
          <div class="pet-info-column">
            <div class="name-gender">
              <div class="name">
                <h2>${nombreMascota}</h2>
              </div>
              <div class="gender">
                <i class="fas fa-${generoMascota === 'female' ? 'venus' : 'mars'}"></i>
              </div>
            </div>
            <div class="age">
              <p>${cumpleanosMascota}</p>
            </div>
            <div class="more">
              <button class="btn-edit"><i class="fas fa-edit"></i></button>
              <button class="btn-delete"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        </div>
      </article>
    `;
  
    // Agrega la nueva mascota al contenedor principal
    const contenedorMascotas = document.querySelector('.pets-container');
    contenedorMascotas.appendChild(nuevaMascota);
  }
  