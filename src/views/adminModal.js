// Obtén el modal
var userModal = document.getElementById("userModal");
var messageModal = document.getElementById("messageModal");
// Obtén el elemento que abre el modal
var btn = document.getElementById("openUserModal");
var openMessageModal = document.getElementById("openMessageModal")
// Obtén el elemento <span> que cierra el modal
var span = document.getElementById("closeUserModal");
var closeMessageModal = document.getElementById("closeMessageModal");

var mail = document.getElementById("mailIcon");
var mailCount = document.getElementById("mailCount");

var notificationIcon = document.getElementById("notificationIcon");
var notificationCount = document.getElementById("notificationCount");

var sendMessage = document.getElementById("sendMessage")

// Cuando el usuario hace clic en el botón, abre el modal 

mail.addEventListener("click", function() {
    window.location.href = "petitions"; 
});

mailCount.addEventListener("click", function() {
    window.location.href = "petitions"; 
});

notificationIcon.addEventListener("click", function() {
    window.location.href = "history"; 
});

notificationCount.addEventListener("click", function() {
    window.location.href = "history"; 
});

btn.onclick = function () {
    userModal.style.display = "block";
}

// Cuando el usuario hace clic en <span> (x), cierra el modal
span.onclick = function () {
    userModal.style.display = "none";
}

// Cuando el usuario hace clic en cualquier lugar fuera del modal, ciérralo

openMessageModal.onclick = function () {
    messageModal.style.display = "block";
}

// Cuando el usuario hace clic en <span> (x), cierra el modal
closeMessageModal.onclick = function () {
    messageModal.style.display = "none";
}

// Cuando el usuario hace clic en cualquier lugar fuera del modal, ciérralo
window.onclick = function (event) {
    if (event.target == messageModal) {
        messageModal.style.display = "none";
    }
}

// Obtén el modal
var modalEnvio = document.getElementById("confirmacionEnvioModal");

// Obtén el formulario
var form = document.getElementById("messageForm");

// Función para mostrar el modal y ocultarlo después de un tiempo
function mostrarYCerrarModal() {
    modalEnvio.style.display = "block";
    setTimeout(function() {
        modalEnvio.style.display = "none";
    }, 1500); // El modal se cerrará después de 3 segundos
}

// Cuando el formulario se envía, muestra el modal
form.onsubmit = function(event) {
    messageModal.style.display = "none"
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario
    mostrarYCerrarModal();
    // Aquí puedes agregar código adicional para manejar el envío del formulario
}

// Cierra el modal si el usuario hace clic fuera de él
window.onclick = function(event) {
    if (event.target == modalEnvio) {
        modalEnvio.style.display = "none";
    }
}



