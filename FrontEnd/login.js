document.addEventListener("DOMContentLoaded", function () {
  // Ajoutez un écouteur d'événement sur le formulaire
  var loginForm = document.querySelector("#login form");
  loginForm.addEventListener("submit", function (event) {
    // Empêcher le comportement par défaut du formulaire
    event.preventDefault();

    // Récupérer les valeurs du formulaire
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Effectuer une requête Fetch vers le backend
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Nom d'utilisateur ou mot de passe incorrect.");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("authToken", data.token);

        // Rediriger l'utilisateur
        window.location.href = "index.html";
      })
      .catch((error) => {
        // Afficher un message d'erreur
        document.getElementById("error-message").innerText = error.message;
      });
  });
});
