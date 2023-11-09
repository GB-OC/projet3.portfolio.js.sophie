// Remplacez l'URL de l'API par l'URL réelle de l'API que vous souhaitez utiliser.
const apiUrl = "http://localhost:5678/api/works";
let projet = [];
let categories = [];

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
}
// Fonction pour filtrer les projets
function filtrerProjets(categorie) {
  console.log(categorie);
  genererContenuDynamique(
    projets.filter((item) => item.category.id === categorie.id)
  );
}


