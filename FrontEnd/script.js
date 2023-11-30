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
    console.log(response)
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
    let categories = []
    for (let i=0 ;i<data.length;i++) {
      console.log (data[i])
      const existcategory = categories.find((itemX) => itemX.id === data[i].category.id)
            if (!existcategory) {
              categories.push(data[i].category);}
              console.log (categories)
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

      // Fonction pour créer des miniatures et les afficher dans la modale
function afficherImagesDansModal(stpfonctionne) {
  console.log("Entrée dans la fonction afficherImagesDansModal");

  const galleryModal = document.querySelector(".admin-panel");
  console.log("Élément .admin-panel trouvé :", galleryModal);

  // Check si stpfonctionne est défini et est un tableau
  if (stpfonctionne && Array.isArray(stpfonctionne)) {
    console.log("Contenu de stpfonctionne :", stpfonctionne);

    stpfonctionne.forEach((projet) => {
      console.log("Début de la boucle forEach pour le projet :", projet);

      const miniature = document.createElement("div");
      miniature.classList.add("thumbnail-modal");

      const img = document.createElement("img");
      img.src = projet.imageUrl;
      console.log("Image créée avec l'URL :", img.src);

      miniature.appendChild(img);
      console.log("Image ajoutée à la miniature :", miniature);

      galleryModal.appendChild(miniature);
      console.log("Miniature ajoutée à la galerie .admin-panel :", miniature);
    });
  } else {
    console.error("Erreur : stpfonctionne n'est pas défini ou n'est pas un tableau.");
  }
}


