import ko from "knockout";
import styles from "./styles.scss";

const Cat = function() {
  this.name = ko.observable("Frank");
  this.imgUrl = ko.observable("https://placekitten.com/500/400");
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

  this.nicknames = ko.observableArray([
    "franky",
    "frakinou",
    "Miiiiiiister Franky",
    "Funky Franky"
  ]);
};

const ViewModel = function() {
  this.currentCat = ko.observable(new Cat());
  this.incrementClickCount = () => {
    this.currentCat().clicked(this.currentCat().clicked() + 1);
  };
};

function init() {
  const app = document.getElementById("app");
  app.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="${styles.preview}" data-bind="using: currentCat()">
      <h2 class="${styles.name}" data-bind="text: name"></h2>
      <h3 class="${styles.level}" data-bind="text: level"></h3>
      <img class="${styles.ca }" data-bind="click: $parent.incrementClickCount, attr: {src: imgUrl}" alt="cat" />
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
