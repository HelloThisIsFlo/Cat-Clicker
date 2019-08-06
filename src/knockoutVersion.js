import ko from "knockout";
import styles from "./styles.scss";

const initialCats = [
  {
    name: "Patrick",
    imgUrl: "https://placekitten.com/500/400",
    nicknames: ["big P"]
  },
  {
    name: "Frank",
    imgUrl: "https://placekitten.com/480/400",
    nicknames: ["franky", "frakinou", "Miiiiiiister Franky", "Funky Franky"]
  },
  {
    name: "Georges",
    imgUrl: "https://placekitten.com/490/400",
    nicknames: ["Mr G", "Giorgio"]
  },
  {
    name: "Daniel",
    imgUrl: "https://placekitten.com/550/400",
    nicknames: ["Danny", "Danny D"]
  }
];

const Cat = function(data) {
  this.name = ko.observable(data.name);
  this.imgUrl = ko.observable(data.imgUrl);
  this.clicked = ko.observable(0);
  this.level = ko.computed(function() {
    if (this.clicked() < 5) {
      return "newborn";
    } else if (this.clicked() < 15) {
      return "teenager";
    } else if (this.clicked() < 25) {
      return "adult";
    } else {
      return "wise cat";
    }
  }, this);

  this.nicknames = ko.observableArray(data.nicknames);
};

const ViewModel = function() {
  this.catList = ko.observableArray([]);
  initialCats
    .map(catData => new Cat(catData))
    .forEach(cat => this.catList.push(cat));

  this.currentCat = ko.observable(this.catList()[0]);

  this.incrementClickCount = () => {
    this.currentCat().clicked(this.currentCat().clicked() + 1);
  };

  this.selectCat = (clickedCat) => {
    console.log('yo');
    this.currentCat(clickedCat)
  }
};

function init() {
  const app = document.getElementById("app");
  app.insertAdjacentHTML(
    "afterbegin",
    `
    <div>
      <h2>All cats</h2>
      <ul class="${styles['cat-list']}" data-bind="foreach: catList">
        <li><a href="" data-bind="text: name, click: $parent.selectCat"></a></li>
      </ul>
    </div>
    <div class="${styles.preview}" data-bind="using: currentCat()">
      <h2 class="${styles.name}" data-bind="text: name"></h2>
      <h3 class="${styles.level}" data-bind="text: level"></h3>
      <img class="${ styles.cat }" data-bind="click: $parent.incrementClickCount, attr: {src: imgUrl}" alt="cat" />
      <div class="${styles.counter}" data-bind="text: clicked"></div>
      <ul data-bind="foreach: nicknames">
        <li data-bind="text: $data"></li>
      </ul>
    </div>
    `
  );

  const viewModel = new ViewModel();
  ko.applyBindings(viewModel);
  window.vm = viewModel;
}

init();
