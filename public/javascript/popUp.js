document.addEventListener("DOMContentLoaded", () => {
    const modalButtons = document.querySelectorAll(".btn-more");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll("[data-modal-close]");

    modalButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const targetModalId = button.getAttribute("data-modal-target");
            const targetModal = document.getElementById(targetModalId);
            targetModal.style.display = "block";
        });
    });

    closeButtons.forEach((closeButton) => {
        closeButton.addEventListener("click", () => {
            const modalId = closeButton.getAttribute("data-modal-close");
            const modal = document.getElementById(modalId);
            modal.style.display = "none";
        });
    });

    window.addEventListener("click", (event) => {
        modals.forEach((modal) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
});
