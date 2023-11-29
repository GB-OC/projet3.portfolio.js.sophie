document.addEventListener("DOMContentLoaded", function () {
  
  // Récupérer le token d'authentification depuis le local storage
  const authToken = localStorage.getItem("authToken");
  
  // Modifier le texte du lien en "logout" si authToken est présent
  if (authToken) {
    // Sélectionner l'élément avec la classe 'login-logout'
    const loginLogoutLink = document.querySelector(".login-logout");
  
    // Modifier le texte du lien en "logout"
    loginLogoutLink.textContent = "logout";
  
    // Ajouter un gestionnaire d'événements au clic sur le lien "logout"
    loginLogoutLink.addEventListener("click", function (event) {
      // Empêcher le comportement par défaut du lien (suivre le lien)
      event.preventDefault();
  
      // Logique de déconnexion (exemple : suppression du token d'authentification)
      localStorage.removeItem("authToken");
  
      // Rediriger vers la page de connexion (à adapter selon votre application)
      window.location.href = "index.html";
    });

    // Sélectionner la div avec l'id 'filtres'
    const filtresDiv = document.getElementById("filtres");
    filtresDiv.style.display = "none";

      // Sélectionner l'élément avec la classe 'absolute' à l'intérieur de la div 'filtres'
    const absoluteElement = document.querySelector(".absolute");
    absoluteElement.style.display = "contents";
  }

  // Vous pouvez ajouter d'autres gestionnaires d'événements ici
});

