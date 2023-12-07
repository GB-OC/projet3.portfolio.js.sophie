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
    // categories = data.reduce((acc, item) => {
    //   console.log('acc',acc)
    //   console.log('item',item)
    //   const existcategory = acc.find((i) => i.id === item.category.id);
    //   console.log('existcategory',existcategory)
    //   if (!existcategory) {
    //     acc.push(item.category);
    //   }
    //   return acc;
    // }, []);

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
            galleryModal.removeChild(miniature); // Supprime également la miniature de l'interface
          } else {
            console.error(
              `Erreur lors de la suppression du projet avec l'ID ${projectId}.`
            );
          }
        } catch (error) {
          console.error("Erreur lors de la requête API :", error);
        }

        event.stopPropagation();
        galleryModal.removeChild(miniature);
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
  } else {
    // Gère l'erreur si stpfonctionne n'est pas défini ou n'est pas un tableau
    console.error(
      "Erreur : stpfonctionne n'est pas défini ou n'est pas un tableau."
    );
  }
}

