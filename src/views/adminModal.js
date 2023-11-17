// Obtén los modales
var userModal = document.getElementById("userModal");
var messageModal = document.getElementById("messageModal");
var modalEnvio = document.getElementById("confirmacionEnvioModal");

// Obtén los elementos que abren los modales
var openUserModalButtons = document.querySelectorAll("[id^='openUserModal']");
var openMessageModalButtons = document.querySelectorAll("[id^='openMessageModal']");


// Obtén los elementos relacionados con el correo y las notificaciones
var mail = document.getElementById("mailIcon");
var mailCount = document.getElementById("mailCount");
var notificationIcon = document.getElementById("notificationIcon");
var notificationCount = document.getElementById("notificationCount");

// Función para abrir cualquier modal por ID
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
}

// Función para cerrar cualquier modal por ID
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}

// Asigna manejadores de eventos a los botones que abren los modales
openUserModalButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        openModal(button.getAttribute("data-modal-id"));
    });
});

openMessageModalButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        openModal(button.getAttribute("data-modal-id"));
    });
});


// Asigna manejadores de eventos al resto del código...
mail.addEventListener("click", function () {
    window.location.href = "petitions";
});

mailCount.addEventListener("click", function () {
    window.location.href = "petitions";
});

notificationIcon.addEventListener("click", function () {
    window.location.href = "history";
});

notificationCount.addEventListener("click", function () {
    window.location.href = "history";
});

// ... Resto del código ...

// Obtén el formulario
var form = document.getElementById("messageForm");

// Función para mostrar el modal y ocultarlo después de un tiempo
function mostrarYCerrarModal() {
    modalEnvio.style.display = "block";
    setTimeout(function () {
        modalEnvio.style.display = "none";
    }, 1500); // El modal se cerrará después de 3 segundos
}

// Cuando el formulario se envía, muestra el modal
form.onsubmit = function (event) {
    messageModal.style.display = "none";
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario
    mostrarYCerrarModal();

    // Aquí puedes agregar código adicional para manejar el envío del formulario
};

// Cierra el modal si el usuario hace clic fuera de él
window.onclick = function (event) {
    if (event.target == modalEnvio) {
        closeModal("confirmacionEnvioModal");
    }
};

// Cierra el modal cuando el usuario sale del campo de texto del mensaje
form.querySelector("input[name='message']").addEventListener("focusout", function () {
    if (this.value) {
        modalEnvio.style.display = "block";
    }
});