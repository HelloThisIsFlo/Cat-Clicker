import styles from "./styles.scss";
import _anotherStyle from './another.scss';

const app = document.getElementById("app");

function main() {
  app.classList.add(styles.app)
  addDebugElement();
}

function addDebugElement() {
  const debug = document.createElement("div");
  debug.classList.add(styles.debug)
  app.appendChild(debug);
}


main();
