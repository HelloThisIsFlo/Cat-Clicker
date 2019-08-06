import styles from "./styles.scss";

function addLinkToSandbox() {
  document.body.insertAdjacentHTML(
    "beforeend",
    `<a class="${styles["sandbox-link"]}" href="sandbox.html">Sandbox</a>`
  );
}

function addCatClicker() {
  function setupImg() {
    catImg.classList.add(styles.cat);
    catImg.setAttribute("alt", "cat");
    catImg.setAttribute("src", "https://placekitten.com/500/400");
  }
  function setupCounter() {
    catCounter.classList.add(styles.counter);
    catCounter.textContent = "0";
  }

  const catClickerDiv = document.createElement("div");
  const catImg = document.createElement("img");
  const catCounter = document.createElement("div");

  setupImg();
  setupCounter();
  catClickerDiv.classList.add(styles["cat-clicker"]);
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

  addCatClicker();
  addLinkToSandbox();
}

setupApp();
