function cargarContenido(opcion) {
    console.log('Cargando contenido: ' + opcion);
    var seccionDerecha = document.querySelector(".home-section"); // Cambiar a querySelector(".home-section")

    // Limpia el contenido actual de la sección
    seccionDerecha.innerHTML = "";

    // Utiliza fetch para cargar el contenido del archivo HTML
    fetch(opcion + '.html')
        .then(function(response) {
            return response.text();
        })
        .then(function(data) {
            // Inserta el contenido cargado en la sección derecha
            seccionDerecha.innerHTML = data;
        })
        .catch(function(error) {
            console.error('Error al cargar el contenido: ', error);
        });
}