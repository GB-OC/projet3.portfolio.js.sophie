document.addEventListener("DOMContentLoaded", function () {

  const authToken = localStorage.getItem("authToken");
    if (authToken) {

      const loginLogoutLink = document.querySelector(".login-logout");

      // Modifier le texte du lien en "logout"
      loginLogoutLink.textContent = "logout";

      // Ajouter un gestionnaire d'événements au clic sur le lien "logout"
      loginLogoutLink.addEventListener("click", function (event) {
        // Empêcher le comportement par défaut du lien 
        event.preventDefault();

        // Logique de déco
        localStorage.removeItem("authToken");

        // Redirige vers landingpage
        window.location.href = "index.html";
      });

      const filtresDiv = document.getElementById("filtres");
      filtresDiv.style.display = "none";

      const absoluteElement = document.querySelector(".absolute");
      absoluteElement.style.display = "contents";
    }

    // Déclaration de la variable modal
    const modal = document.getElementById("myModal");
    window.addEventListener("click", function (event) {
      // Vérifier si l'élément cliqué est en dehors de la modale
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
    // Sélectionneur de bouton
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const closeModalBtnDansAjoutPhoto = document.getElementById("closeModalBtnDansAjoutPhoto");
    


    // Ouvrir modale
    openModalBtn.addEventListener("click", function () {
      modal.style.display = "block";
    });

    // Fermer modale
    closeModalBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });

    closeModalBtnDansAjoutPhoto.addEventListener("click", function () {
      modal.style.display = "none";
    });
});


function afficherModaleAjoutPhoto() {
  const modal = document.querySelector('.modal-content');
  const modalAjoutPhoto = document.querySelector('.modal-content2');

  // Masque l'élément modal principal
  modal.style.display = 'none';

  modalAjoutPhoto.style.display = 'block';
}

document.getElementById('addPhotoBtn').addEventListener('click', afficherModaleAjoutPhoto);

function afficherModalePrincipale() {
  const modal = document.querySelector('.modal-content');
  const modalAjoutPhoto = document.querySelector('.modal-content2');

  modal.style.display = 'block';

  // Masque l'élément modalAjoutPhoto
  modalAjoutPhoto.style.display = 'none';
}

document.getElementById('previousBtn').addEventListener('click', afficherModalePrincipale);

