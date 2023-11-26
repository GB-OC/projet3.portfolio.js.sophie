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
    console.log(response)
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
  })
  .catch((error) => {
    // Attrapez et gérez les erreurs ici.
    console.error("Erreur :", error);
  });

// Récupère le token d'authentification depuis le localStorage
const authToken = localStorage.getItem('authToken');

// Vérifie si le token est présent
if (authToken) {
    // Utilisez le token selon vos besoins
    console.log('Token d\'authentification récupéré sur la page index:', authToken);
} else {
    // Gérez le cas où le token n'est pas présent
    console.log('Aucun token d\'authentification trouvé sur la page index.');
}