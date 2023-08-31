document.addEventListener("DOMContentLoaded", () => {
    const petForm = document.getElementById("petForm");
    const petList = document.getElementById("petList");

    petForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const petName = document.getElementById("petName").value;
        const petAge = document.getElementById("petAge").value;
        const petBreed = document.getElementById("petBreed").value;

        const pet = {
            name: petName,
            age: petAge,
            breed: petBreed
        };

        addPetToList(pet);
        savePetToLocal(pet);
        petForm.reset();
    });

    function addPetToList(pet) {
        const li = document.createElement("div");
        div.textContent = `Nombre: ${pet.name}, Edad: ${pet.age}, Raza: ${pet.breed}`;
        petList.appendChild(li);
    }

    function savePetToLocal(pet) {
        let savedPets = localStorage.getItem("pets");
        savedPets = savedPets ? JSON.parse(savedPets) : [];
        savedPets.push(pet);
        localStorage.setItem("pets", JSON.stringify(savedPets));
    }

    function loadPetsFromLocal() {
        const savedPets = JSON.parse(localStorage.getItem("pets")) || [];
        savedPets.forEach((pet) => {
            addPetToList(pet);
        });
    }

    loadPetsFromLocal();
});
