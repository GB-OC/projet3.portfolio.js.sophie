const apiUrl = "http://localhost:5678/api/works";
let categories = ["Tous"];

//contenue dynamique

function genererContenuDynamique(projets) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  projets.forEach((projet) => {
    const figure = document.createElement("figure");
    // Ajoute l'ID du projet comme attribut pour supression DOM
    figure.setAttribute("data-project-id", projet.id);
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
  if (categorie) {
    genererContenuDynamique(
      projets.filter((item) => item.category.id === categorie.id)
    );
  } else {
    genererContenuDynamique(projets);
  }
}

fetchData();
// Utilise la méthode fetch pour faire une requête GET à l'API.
function fetchData() {
  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      return response.json();
    })
    .then((data) => {
      genererContenuDynamique(data);
      projets = data;
      let categories = [];
      for (let i = 0; i < data.length; i++) {
        const existcategory = categories.find(
          (itemX) => itemX.id === data[i].category.id
        );
        if (!existcategory) {
          categories.push(data[i].category);
        }
      }

      genererfiltre(categories);

      afficherImagesDansModal(data);
    })
    .catch((error) => {
      console.error("Erreur :", error);
      alert("Une erreur s'est produite lors du chargement des données.");
    });
}

function afficherImagesDansModal(afficherProjetsDansModal) {
  // Fonction pour afficher des miniatures dans la modale

  // Sélectionne l'élément de la galerie
  const galleryModal = document.querySelector(".admin-panel");
  galleryModal.innerHTML = "";

  // Vérifie si afficherProjetsDansModal est défini et est un tableau
  if (afficherProjetsDansModal && Array.isArray(afficherProjetsDansModal)) {
    // Parcourt chaque projet dans le tableau afficherProjetsDansModal
    afficherProjetsDansModal.forEach((projet) => {
      // div pour la miniature
      const miniature = document.createElement("div");
      miniature.classList.add("thumbnail-modal");

      // Bouton de suppression
      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-button";

      // Crée un élément d'icône de poubelle et l'ajoute au bouton
      const deleteIcon = document.createElement("i");
      deleteIcon.className = "fa-solid fa-trash-can";
      deleteButton.appendChild(deleteIcon);

      // Ajoute un écouteur d'événements au bouton de suppression
      deleteButton.addEventListener("click", async (event) => {
        // Appel API pour supprimer de la base de données
        const projectId = projet.id;
        const apiUrl2 = `http://localhost:5678/api/works/${projectId}`;
        const token = localStorage.getItem("authToken");

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
            // Retire l'image du DOM
            const figureElement = document.querySelector(
              `.gallery figure[data-project-id="${projectId}"]`
            );
            if (figureElement) {
              figureElement.remove();
            }

            galleryModal.removeChild(miniature);
          } else {
            if (response.status === 401) {
              alert(
                "Votre session a expiré. Veuillez vous déconnecter puis vous reconnecter."
              );
            } else {
              console.error(
                `Erreur lors de la suppression du projet avec l'ID ${projectId}.`
              );
            }
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
document.getElementById("imgUpload").addEventListener("change", function () {
  filesManager(this.files);
});

// Drag and drop events for dropBox
var dropBox = document.getElementById("dropBox");

dropBox.addEventListener("dragover", function (e) {
  e.preventDefault();
  dropBox.style.border = "2px dashed #aaa";
});

dropBox.addEventListener("dragleave", function () {
  dropBox.style.border = "2px dashed #ccc";
});

dropBox.addEventListener("drop", function (e) {
  e.preventDefault();
  dropBox.style.border = "2px dashed #ccc";
  filesManager(e.dataTransfer.files);
});

function filesManager(files) {
  var file = files[0];

  if (file && file.type.startsWith("image/")) {
    loadedFile = file;

    // preview de l'image
    var reader = new FileReader();
    reader.onload = function (e) {
      var loadedImage = new Image();
      loadedImage.src = e.target.result;
      loadedImage.style.width = "129px";
      loadedImage.style.height = "169px";

      dropBox.innerHTML = "";
      dropBox.appendChild(loadedImage);
    };

    reader.readAsDataURL(file);
  } else {
    loadedFile = null;
    alert("Veuillez sélectionner un fichier image valide");
  }
}

function uploadFile(title, category) {
  // Check if a file is loaded
  if (loadedFile) {
    var formData = new FormData();
    formData.append("image", loadedFile);
    formData.append("title", title);
    formData.append("category", category);

    const token = localStorage.getItem("authToken");

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          if (response.status === 401) {
            alert(
              "Votre session a expiré. Veuillez vous déconnecter puis vous reconnecter."
            );
          }

          throw new Error("Erreur lors de l'ajout du projet");
        }
      })
      .then(function (data) {
        fetchData();
        alert("L'ajout de la photo a réussi !");
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  }
}

document.getElementById("EnvoyerPhoto").addEventListener("click", function () {
  var title = document.getElementById("infoTitre").value.trim();
  var category = document.getElementById("infoCategorie").value.trim();

  if (title && category && loadedFile) {
    uploadFile(title, category);
  }
});

document
  .getElementById("infoTitre")
  .addEventListener("input", updateButtonColor);
document
  .getElementById("infoCategorie")
  .addEventListener("change", updateButtonColor);
document
  .getElementById("imgUpload")
  .addEventListener("change", updateButtonColor);

// Maj couleur bouton
function updateButtonColor() {
  // Récupère les valeurs des champs de saisie
  var title = document.getElementById("infoTitre").value.trim();
  var category = document.getElementById("infoCategorie").value.trim();

  if (title && category && loadedFile) {
    document.getElementById("EnvoyerPhoto").style.backgroundColor = "#1D6154"; // Vert
  }
}
