import ko from "knockout";
import styles from "./styles.scss";

const ViewModel = function() {
  this.name = ko.observable("Franky");
  this.imgUrl = ko.observable("https://placekitten.com/500/400");
  this.clicked = ko.observable(0);

  this.incrementClickCount = () => {
    this.clicked(this.clicked() + 1);
  };
};

function init() {
  const app = document.getElementById("app");
  app.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="${styles.preview}">
      <h2 class="${styles.name}" data-bind="text: name"></h2>
      <img class="${
        styles.cat
      }" data-bind="click: incrementClickCount, attr: {src: imgUrl}" alt="cat" />
      <div class="${styles.counter}" data-bind="text: clicked"></div>
    </div>
    `
  );

  const viewModel = new ViewModel();
  ko.applyBindings(viewModel);
  window.vm = viewModel;
}

init();
