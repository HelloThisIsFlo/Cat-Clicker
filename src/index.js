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
  },

  showAdmin: false
};

const octopus = {
  init() {
    catListView.init();
    catPreviewView.init();
    adminView.init();

    const firstCat = this.getAllCats()[0];
    this.selectCat(firstCat.name);
  },

  selectCat(catName) {
    model.currentCat = model.getCat(catName);
    catPreviewView.render();
    adminView.render();
  },

  clickOnCurrentCat() {
    model.currentCat.clicked++;
    catPreviewView.render();
    adminView.render();
  },

  updateCurrentCat(newName, newImgUrl, newClicked) {
    model.currentCat.name = newName;
    model.currentCat.imgUrl = newImgUrl;
    model.currentCat.clicked = newClicked;

    catPreviewView.render();
    catListView.render();
    adminView.render();
  },

  getAllCats() {
    return model.cats;
  },

  getCurrentCat() {
    return model.currentCat;
  },

  shouldDisplayAdminArea() {
    return model.showAdmin;
  },

  toggleAdminArea() {
    model.showAdmin = !model.showAdmin;
    adminView.render();
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

const adminView = {
  init() {
    this.adminDiv = document.getElementById("admin");
    this.adminDiv.classList.add(styles.admin);
    this.adminDiv.insertAdjacentHTML(
      "afterbegin",
      `
      <button type="button" id="admin-showhide">Admin</button>
      <form action="#" id="admin-form">
        <div>
          <label for="name">Name:</label>
          <input type="text" name="name" id="admin-name" required/>
        </div>
        <div>
          <label for="name">Image URL:</label>
          <input type="text" name="imgurl" id="admin-imgurl" required/>
        </div>
        <div>
          <label for="name">Clicked:</label>
          <input type="number" name="clicked" id="admin-clicked" required/>
        </div>

        <button type="button" id="admin-cancel">Cancel</button>
        <button type="submit" id="admin-save">Save</button>
      </form>
    `
    );

    this.adminBtn = document.getElementById("admin-showhide");
    this.form = document.getElementById("admin-form");
    this.name = document.getElementById("admin-name");
    this.imgUrl = document.getElementById("admin-imgurl");
    this.clicked = document.getElementById("admin-clicked");
    this.save = document.getElementById("admin-save");
    this.cancel = document.getElementById("admin-cancel");

    this.adminBtn.addEventListener("click", () => {
      octopus.toggleAdminArea();
    });
    this.save.addEventListener("click", e => {
      const formValid = () => {
        for (const input of this.form.getElementsByTagName("input")) {
          if (!input.checkValidity()) return false;
        }
        return true;
      };

      e.preventDefault();
      if (formValid()) {
        octopus.updateCurrentCat(
          this.name.value,
          this.imgUrl.value,
          this.clicked.value
        );
      }
    });
    this.cancel.addEventListener("click", e => {
      e.preventDefault();
      this.render();
    });

    this.render();
  },

  render() {
    if (octopus.shouldDisplayAdminArea()) {
      this.form.style.display = "block";

      const currentCat = octopus.getCurrentCat();
      this.name.value = currentCat.name;
      this.imgUrl.value = currentCat.imgUrl;
      this.clicked.value = currentCat.clicked;
    } else {
      this.form.style.display = "none";

      this.name.value = "";
      this.imgUrl.value = "";
      this.clicked.value = "";
    }
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
  const adminArea = newElementWithId("div", "admin");

  app.appendChild(catList);
  app.appendChild(previewArea);
  app.appendChild(adminArea);

  octopus.init();
}

main();
