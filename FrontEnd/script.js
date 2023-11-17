// Remplacez l'URL de l'API par l'URL réelle de l'API que vous souhaitez utiliser.
const apiUrl = "http://localhost:5678/api/works";
let projet = [];
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


//fetch
// Utilisez la méthode fetch pour faire une requête GET à l'API.
fetch(apiUrl)
  .then((response) => {
    // Vérifiez si la réponse est OK (statut 200).
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }
    // Si la réponse est OK, transformez-la en JSON.
    return response.json();
  })
  .then((data) => {
    genererContenuDynamique(data);
    console.log(data);
    projets = data;
    categories = data.reduce((acc, item) => {
      const existcategory = acc.find((i) => i.id === item.category.id);
      if (!existcategory) {
        acc.push(item.category);
      }
      return acc;
    }, []);

    genererfiltre(categories);
  })
  .catch((error) => {
    // Attrapez et gérez les erreurs ici.
    console.error("Erreur :", error);
  });