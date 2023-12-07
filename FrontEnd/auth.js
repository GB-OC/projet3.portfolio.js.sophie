document.addEventListener("DOMContentLoaded", function () {
  // Récupérer le token d'authentification depuis le local storage
  const authToken = localStorage.getItem("authToken");

  setTimeout(function () {

    if (authToken) {
      // Sélectionner l'élément avec la classe 'login-logout'
      const loginLogoutLink = document.querySelector(".login-logout");

      // Modifier le texte du lien en "logout"
      loginLogoutLink.textContent = "logout";

      // Ajouter un gestionnaire d'événements au clic sur le lien "logout"
      loginLogoutLink.addEventListener("click", function (event) {
        // Empêcher le comportement par défaut du lien (suivre le lien)
        event.preventDefault();

        // Logique de déconnexion
        localStorage.removeItem("authToken");

        // Redirige vers landingpage
        window.location.href = "index.html";
      });

      const filtresDiv = document.getElementById("filtres");
      filtresDiv.style.display = "none";

      // Sélectionner l'élément avec la classe 'absolute' à l'intérieur de la div 'filtres'
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
    


    // Ouvrir la fenêtre modale au clic sur le "Modifier"
    openModalBtn.addEventListener("click", function () {
      modal.style.display = "block";
    });

    // Fermer la fenêtre modale au clic sur le x
    closeModalBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });

    closeModalBtnDansAjoutPhoto.addEventListener("click", function () {
      modal.style.display = "none";
    });

  }, 2000);
});


function afficherModaleAjoutPhoto() {
  const modal = document.querySelector('.modal-content');
  const modalAjoutPhoto = document.querySelector('.modal-content2');

  // Masque l'élément modal principal
  modal.style.display = 'none';

  // Assurez-vous également que l'élément modalAjoutPhoto est visible
  modalAjoutPhoto.style.display = 'block';
}

document.getElementById('addPhotoBtn').addEventListener('click', afficherModaleAjoutPhoto);

function afficherModalePrincipale() {
  const modal = document.querySelector('.modal-content');
  const modalAjoutPhoto = document.querySelector('.modal-content2');

  // Assurez-vous que l'élément modal principal est visible
  modal.style.display = 'block';

  // Masque l'élément modalAjoutPhoto
  modalAjoutPhoto.style.display = 'none';
}

document.getElementById('previousBtn').addEventListener('click', afficherModalePrincipale);

