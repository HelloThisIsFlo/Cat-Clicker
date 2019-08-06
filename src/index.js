import styles from "./styles.scss";

function addLinkToSandbox() {
  document.body.insertAdjacentHTML(
    "beforeend",
    `<a class="${styles["sandbox-link"]}" href="sandbox.html">Sandbox</a>`
  );
}

function addCatClicker(catName, imgUrl) {
  function setupName() {
    catNameHeading.textContent = catName
    catNameHeading.classList.add(styles.name)
  }
  function setupImg() {
    catImg.classList.add(styles.cat);
    catImg.setAttribute("alt", "cat");
    catImg.setAttribute("src", imgUrl);
  }
  function setupCounter() {
    catCounter.classList.add(styles.counter);
    catCounter.textContent = "0";
  }

  const catClickerDiv = document.createElement("div");
  const catNameHeading = document.createElement("h2");
  const catImg = document.createElement("img");
  const catCounter = document.createElement("div");

  setupName();
  setupImg();
  setupCounter();
  catClickerDiv.classList.add(styles["cat-clicker"]);
  catClickerDiv.appendChild(catNameHeading);
  catClickerDiv.appendChild(catImg);
  catClickerDiv.appendChild(catCounter);

  catImg.addEventListener(
    "click",
    (() => {
      let counter = 0;
      return () => {
        counter++;
        catCounter.textContent = counter;
      };
    })()
  );

  app.appendChild(catClickerDiv);
}

function setupApp() {
  const app = document.getElementById("app");
  app.classList.add(styles.app);

  addCatClicker("Patrick", "https://placekitten.com/500/400");
  addLinkToSandbox();
}

setupApp();
