import styles from "./styles.scss";

const PREVIEW_IDS = {
  img: "preview-img",
  name: "preview-name",
  counter: "preview-counter"
};

const cats = [];
let currentlySelectedCat = null;

function addCatToList(name, imgUrl) {
  const newCat = { name, imgUrl, clicked: 0 };
  cats.push(newCat);
}

function ensureCatsAdded() {
  if (cats.length == 0) {
    throw "Add cats before performing this action!";
  }
}

function showCatInPreview(cat) {
  const differentCat =
    !currentlySelectedCat || currentlySelectedCat.name !== cat.name;

  if (differentCat) {
    console.log("Updating cat");

    const catPreviewName = document.getElementById(PREVIEW_IDS.name);
    const catPreviewImg = document.getElementById(PREVIEW_IDS.img);
    const catPreviewCounter = document.getElementById(PREVIEW_IDS.counter);

    catPreviewName.textContent = cat.name;
    catPreviewImg.setAttribute("src", cat.imgUrl);
    catPreviewCounter.textContent = cat.clicked;

    currentlySelectedCat = cat;
  }
}

function showCatList() {
  ensureCatsAdded();
}

function showPreviewArea() {
  function showEmptyPreviewArea() {
    function setupName() {
      catNameHeading.classList.add(styles.name);
      catNameHeading.id = PREVIEW_IDS.name;
    }
    function setupImg() {
      catImg.classList.add(styles.cat);
      catImg.setAttribute("alt", "cat");
      catImg.setAttribute("src", "");
      catImg.id = PREVIEW_IDS.img;
      catImg.addEventListener("click", () => {
        if (currentlySelectedCat) {
          currentlySelectedCat.clicked++;
          catCounter.textContent = currentlySelectedCat.clicked;
        }
      });
    }
    function setupCounter() {
      catCounter.classList.add(styles.counter);
      catCounter.id = PREVIEW_IDS.counter;
    }

    const previewArea = document.createElement("div");
    const catNameHeading = document.createElement("h2");
    const catCounter = document.createElement("div");
    const catImg = document.createElement("img");

    setupName();
    setupImg();
    setupCounter();

    previewArea.classList.add(styles.preview);
    previewArea.appendChild(catNameHeading);
    previewArea.appendChild(catImg);
    previewArea.appendChild(catCounter);

    app.appendChild(previewArea);
  }

  ensureCatsAdded();

  showEmptyPreviewArea();
  const firstCat = cats[0];
  showCatInPreview(firstCat);
}

function showLinkToSandbox() {
  document.body.insertAdjacentHTML(
    "beforeend",
    `<a class="${styles["sandbox-link"]}" href="sandbox.html">Sandbox</a>`
  );
}

function setupApp() {
  const app = document.getElementById("app");
  app.classList.add(styles.app);

  addCatToList("Patrick", "https://placekitten.com/500/400");
  addCatToList("Frank", "https://placekitten.com/480/400");
  addCatToList("Georges", "https://placekitten.com/490/400");
  addCatToList("Daniel", "https://placekitten.com/550/400");

  showCatList();
  showPreviewArea();
  showLinkToSandbox();
}

setupApp();
