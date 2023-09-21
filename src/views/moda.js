
        // Obtener el modal y los botones de abrir y cerrar
        var modal = document.getElementById("myModal");
        var btnOpen = document.getElementById("openModal");
        var btnClose = document.getElementById("back"); // Cambiar al botón "Atrás" según tu diseño

        // Función para abrir el modal
        btnOpen.onclick = function() {
            modal.style.display = "block";
        }

        // Función para cerrar el modal
        btnClose.onclick = function() {
            modal.style.display = "none";
        }

        // Cerrar el modal si se hace clic fuera de él
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
