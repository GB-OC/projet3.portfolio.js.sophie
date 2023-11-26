document.addEventListener("DOMContentLoaded", function() {
  // Ajoutez un écouteur d'événement sur le formulaire
  var loginForm = document.querySelector("#login form");
  loginForm.addEventListener("submit", function(event) {
      // Empêcher le comportement par défaut du formulaire
      event.preventDefault();
      
      // Récupérer les valeurs du formulaire
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;

      //console.log
      console.log("E-mail:", email);
      console.log("Mot de passe:", password);

      // Effectuer une requête Fetch vers le backend
      fetch('http://localhost:5678/api/users/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email: email,
              password: password
          }),
      })
      .then(response => {
        console.log('Response Status:', response.status);

          if (!response.ok) {
              throw new Error('Nom d\'utilisateur ou mot de passe incorrect.');
          }
          return response.json();
      })
      .then(data => {
          // Authentification réussie
          console.log('Token d\'authentification:', data.token);

          localStorage.setItem('authToken', data.token);

          // Affiche un message de confirmation avec le token
          console.log('Authentification réussie. Token:', data.token);

          // Rediriger l'utilisateur
          window.location.href = "index.html";
      })
      .catch(error => {
          // Afficher un message d'erreur
          document.getElementById("error-message").innerText = error.message;
      });
  });
});