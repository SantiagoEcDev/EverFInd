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

mail.addEventListener("click", function() {
    window.location.href = "solicitudes.html"; 
});

mailCount.addEventListener("click", function() {
    window.location.href = "solicitudes.html"; 
});

notificationIcon.addEventListener("click", function() {
    window.location.href = "historial.html"; 
});

notificationCount.addEventListener("click", function() {
    window.location.href = "historial.html"; 
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





