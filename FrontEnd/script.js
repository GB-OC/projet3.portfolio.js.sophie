const apiUrl = "http://localhost:5678/api/works";
let categories = ["Tous"];

//contenue dynamique

function genererContenuDynamique(projets) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  projets.forEach((projet) => {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    image.src = projet.imageUrl;
    image.alt = projet.title;

    figcaption.textContent = projet.title;

    figure.appendChild(image);
    figure.appendChild(figcaption);

    gallery.appendChild(figure);
  });
}

function genererfiltre(categories) {
  const filtresContainer = document.getElementById("filtres");

  categories.forEach((categorie) => {
    const bouton = document.createElement("button");
    bouton.textContent = categorie.name;
    bouton.addEventListener("click", () => filtrerProjets(categorie));
    filtresContainer.appendChild(bouton);
  });
  const boutonTous = document.createElement("button");
  boutonTous.textContent = "Tous";
  boutonTous.addEventListener("click", () => filtrerProjets(null));
  filtresContainer.appendChild(boutonTous);
}
// Fonction pour filtrer les projets
function filtrerProjets(categorie) {
  console.log(categorie);
  if (categorie) {
    genererContenuDynamique(
      projets.filter((item) => item.category.id === categorie.id)
    );
  } else {
    genererContenuDynamique(projets);
  }
}

// Utilise la méthode fetch pour faire une requête GET à l'API.
fetch(apiUrl)
  .then((response) => {
    console.log(response);
    // Vérifie si la réponse est OK (statut 200).
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }
    // transofrme en JSON.
    return response.json();
  })
  .then((data) => {
    genererContenuDynamique(data);
    console.log(data);
    projets = data;
    let categories = [];
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      const existcategory = categories.find(
        (itemX) => itemX.id === data[i].category.id
      );
      if (!existcategory) {
        categories.push(data[i].category);
      }
      console.log(categories);
    }

    genererfiltre(categories);

    afficherImagesDansModal(data);
  })
  .catch((error) => {
    console.error("Erreur :", error);
  });

function afficherImagesDansModal(stpfonctionne) {
  // Fonction pour afficher des miniatures dans la modale

  // Sélectionne l'élément de la galerie
  const galleryModal = document.querySelector(".admin-panel");

  // Vérifie si stpfonctionne est défini et est un tableau
  if (stpfonctionne && Array.isArray(stpfonctionne)) {
    // Parcourt chaque projet dans le tableau stpfonctionne
    stpfonctionne.forEach((projet) => {
      // Crée un élément div pour la miniature
      const miniature = document.createElement("div");
      miniature.classList.add("thumbnail-modal");

      // Crée un bouton de suppression
      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-button";

      // Crée un élément d'icône de poubelle et l'ajoute au bouton
      const deleteIcon = document.createElement("i");
      deleteIcon.className = "fa-solid fa-trash-can";
      deleteButton.appendChild(deleteIcon);

      // Ajoute un écouteur d'événements au bouton de suppression
      deleteButton.addEventListener("click", async (event) => {
        // Gère la suppression d'un projet
        const portfolioTitle = miniature.querySelector(".portfolio-title");
        console.log("Titre du portfolio :", portfolioTitle.textContent);

        // Appel API pour supprimer de la base de données
        const projectId = projet.id; // Récupère l'ID du projet à partir de l'objet projet
        const apiUrl2 = `http://localhost:5678/api/works/${projectId}`; // Utilise l'ID dans l'URL
        const token = localStorage.getItem("authToken"); //recupére jeton authtoken

        // Effectuer la requête DELETE avec le jeton d'authentification
        try {
          const response = await fetch(apiUrl2, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            console.log(`Projet avec l'ID ${projectId} supprimé avec succès.`);
            galleryModal.removeChild(miniature); 
          } else {
            console.error(
              `Erreur lors de la suppression du projet avec l'ID ${projectId}.`
            );
          }
        } catch (error) {
          console.error("Erreur lors de la requête API :", error);
        }

        event.stopPropagation();
      });

      // Crée le titre du portfolio
      const portfolioTitle = document.createElement("h2");
      portfolioTitle.className = "portfolio-title";
      portfolioTitle.textContent = projet.projetNom;

      // Crée une balise img pour afficher l'image du projet
      const img = document.createElement("img");
      img.src = projet.imageUrl;

      // Ajoute les éléments à la miniature
      miniature.appendChild(deleteButton);
      miniature.appendChild(portfolioTitle);
      miniature.appendChild(img);

      // Ajoute la miniature à la galerie .admin-panel
      galleryModal.appendChild(miniature);
    });
  }
}



// Variable pour stocker l'image
let loadedFile = null;

// File input change event
document.getElementById('imgUpload').addEventListener('change', function () {
  filesManager(this.files);
});

// Drag and drop events for dropBox
var dropBox = document.getElementById('dropBox');

dropBox.addEventListener('dragover', function (e) {
  e.preventDefault();
  dropBox.style.border = '2px dashed #aaa';
});

dropBox.addEventListener('dragleave', function () {
  dropBox.style.border = '2px dashed #ccc';
});

dropBox.addEventListener('drop', function (e) {
  e.preventDefault();
  dropBox.style.border = '2px dashed #ccc';
  filesManager(e.dataTransfer.files);
});

function filesManager(files) {
  var file = files[0];

  if (file && file.type.startsWith('image/')) {
    loadedFile = file;

    // preview de l'image
    var reader = new FileReader();
    reader.onload = function (e) {
      var loadedImage = new Image();
      loadedImage.src = e.target.result;
      loadedImage.style.width = '129px';
      loadedImage.style.height = '169px';

      dropBox.innerHTML = '';
      dropBox.appendChild(loadedImage);
    };

    reader.readAsDataURL(file);
  } else {
    loadedFile = null;
    alert('Veuillez sélectionner un fichier image valide');
  }
}

function reloadPage() {
  // Reload the page
  location.reload();
}

function uploadFile(title, category) {
  // Check if a file is loaded
  if (loadedFile) {
    var formData = new FormData();
    formData.append('image', loadedFile);
    formData.append('title', title);
    formData.append('category', category);

    const token = localStorage.getItem("authToken");

    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Server response:', data);
      // Gére la réponse du serveur si nécessaire

      // Recharge la page après le traitement de la réponse
      reloadPage();
    })
    .catch(error => console.error('Error:', error));
  }
}

// Connecte la fonction au bouton "EnvoyerPhoto"
document.getElementById('EnvoyerPhoto').addEventListener('click', function () {
  // Récupère les valeurs des champs de saisie
  var title = document.getElementById('infoTitre').value.trim();
  var category = document.getElementById('infoCategorie').value.trim();

  // Vérifie si les champs sont remplis et si une image est chargée
  if (title && category && loadedFile) {
    // Appelle la fonction pour envoyer le fichier et les données supplémentaires au serveur
    uploadFile(title, category);
  }
});

// Ajoute des écouteurs d'événements pour mettre à jour la couleur du bouton lors de la saisie du titre, de la sélection de la catégorie et du chargement de l'image
document.getElementById('infoTitre').addEventListener('input', updateButtonColor);
document.getElementById('infoCategorie').addEventListener('change', updateButtonColor);
document.getElementById('imgUpload').addEventListener('change', updateButtonColor);

// Fonction pour mettre à jour la couleur du bouton
function updateButtonColor() {
  // Récupère les valeurs des champs de saisie
  var title = document.getElementById('infoTitre').value.trim();
  var category = document.getElementById('infoCategorie').value.trim();

  // Vérifie si les champs sont remplis et si une image est chargée
  if (title && category && loadedFile) {
    // Change la couleur du bouton en vert
    document.getElementById('EnvoyerPhoto').style.backgroundColor = '#1D6154'; // Vert
  }
}
