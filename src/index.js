import styles from "./styles.scss";

const model = {
  cats: [
    { name: "Patrick", imgUrl: "https://placekitten.com/500/400", clicked: 0 },
    { name: "Frank", imgUrl: "https://placekitten.com/480/400", clicked: 0 },
    { name: "Georges", imgUrl: "https://placekitten.com/490/400", clicked: 0 },
    { name: "Daniel", imgUrl: "https://placekitten.com/550/400", clicked: 0 }
  ],

  currentCat: null,

  getCat(catName) {
    for (const cat of this.cats) {
      if (cat.name === catName) {
        return cat;
      }
    }
    throw `Cat '${catName}' not found!`;
  }
};

const octopus = {
  init() {
    catListView.init();
    catPreviewView.init();

    const firstCat = this.getAllCats()[0];
    this.selectCat(firstCat.name);
  },

  selectCat(catName) {
    model.currentCat = model.getCat(catName);
    catPreviewView.render();
  },

  clickOnCurrentCat() {
    model.currentCat.clicked++;
    catPreviewView.render();
  },

  getAllCats() {
    return model.cats;
  },

  getCurrentCat() {
    return model.currentCat;
  }
};

const catListView = {
  init() {
    this.catList = document.getElementById("cat-list");
    this.catList.classList.add(styles["cat-list"]);

    this.render();
  },

  render() {
    const catEntry = catName => {
      const catEntry = document.createElement("li");
      const catLink = document.createElement("a");
      catLink.setAttribute("href", catName);
      catLink.textContent = catName;
      catLink.addEventListener("click", e => {
        e.preventDefault();
        octopus.selectCat(catName);
      });
      catEntry.appendChild(catLink);
      return catEntry;
    };

    this.catList.innerHTML = "";

    octopus
      .getAllCats()
      .map(cat => cat.name)
      .map(catEntry)
      .forEach(entry => this.catList.appendChild(entry));
  }
};

const catPreviewView = {
  init() {
    const setupName = () => {
      this.name.classList.add(styles.name);
    };
    const setupImg = () => {
      this.img.classList.add(styles.cat);
      this.img.setAttribute("alt", "cat");
      this.img.setAttribute("src", "");
      this.img.addEventListener("click", () => {
        octopus.clickOnCurrentCat();
      });
    };
    const setupCounter = () => {
      this.counter.classList.add(styles.counter);
    };

    this.name = document.createElement("h2");
    this.counter = document.createElement("div");
    this.img = document.createElement("img");

    setupName();
    setupImg();
    setupCounter();

    const previewArea = document.getElementById("preview");
    previewArea.classList.add(styles.preview);
    previewArea.appendChild(this.name);
    previewArea.appendChild(this.img);
    previewArea.appendChild(this.counter);
  },

  render() {
    const currentCat = octopus.getCurrentCat();

    this.name.textContent = currentCat.name;
    this.img.src = currentCat.imgUrl;
    this.counter.textContent = currentCat.clicked;
  }
};

function main() {
  function newElementWithId(tagName, id) {
    const elmnt = document.createElement(tagName);
    elmnt.id = id;
    return elmnt;
  }

  const app = document.getElementById("app");

  const previewArea = newElementWithId("div", "preview");
  const catList = newElementWithId("ul", "cat-list");

  app.appendChild(catList);
  app.appendChild(previewArea);

  octopus.init();
}

main();
