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


// Cuando el usuario hace clic en el botón, abre el modal 
btn.onclick = function () {
    userModal.style.display = "block";
}

// Cuando el usuario hace clic en <span> (x), cierra el modal
span.onclick = function () {
    userModal.style.display = "none";
}

// Cuando el usuario hace clic en cualquier lugar fuera del modal, ciérralo
window.onclick = function (event) {
    if (event.target == userModal) {
        userModal.style.display = "none";
    }
}

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

mail.addEventListener("click", function() {
    window.location.href = "index.html"; 
});

mailCount.addEventListener("click", function() {
    window.location.href = "index.html"; 
});

notificationIcon.addEventListener("click", function() {
    window.location.href = "index.html"; 
});

notificationCount.addEventListener("click", function() {
    window.location.href = "index.html"; 
});

document.getElementById("iconTrigger").addEventListener("click", function() {
        document.getElementById("iconContainer").style.display = "flex";
    });

    document.getElementById("deleteIcon").addEventListener("click", function() {
        // Aquí puedes agregar la lógica para la acción de eliminar
        alert("Icono de eliminar clickeado");
    });

    document.getElementById("whatsappIcon").addEventListener("click", function() {
        // Redirige a WhatsApp o realiza otra acción
        window.location.href = "https://wa.me/123456789"; // Cambia esto por tu enlace de WhatsApp
    });


