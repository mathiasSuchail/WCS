let nbCol = 7;
let nbRow = 6;
let pow = 5;
let tour = 1;

const row = [];
const grid = [];

function settings() {
  document.querySelector("#settings form").onsubmit = function (event) {
    event.preventDefault();
    document.querySelector("#settings").style = "display: none;";
    nbRow = event.target[0].value;
    nbCol = event.target[1].value;
    pow = event.target[2].value;
    generateHTML(nbCol, nbRow);
    cellsEvent();
  };
}

function generateHTML(nbCol, nbRow) {
  document.querySelector("h1").innerText = "Puissance " + pow;
  document.querySelector("h2").innerText = "Au tour du joueur " + tour;
  for (let j = nbRow - 1; j >= 0; j--) {
    const HTMLRow = document.createElement("div");
    HTMLRow.classList.add("row");
    for (let i = 0; i < nbCol; i++) {
      const HTMLCell = document.createElement("div");
      HTMLCell.classList.add("cell");
      HTMLCell.setAttribute("id", `${j}.${i}`);
      HTMLRow.appendChild(HTMLCell);
    }
    document.querySelector("#grid").appendChild(HTMLRow);
  }
}

function turnOver(event) {
  if (event.target.classList.length < 2) {
    event.target.classList.add(`J${tour}`);
    tour === 1 ? (tour = 2) : (tour = 1);
    document.querySelector(".player").innerText = `Au tour du joueur ${tour}`;
    gravity(event);
  }
}

function cellsEvent() {
  document.querySelectorAll(".cell").forEach(function (cell) {
    cell.addEventListener("click", turnOver);
  }); /*initialisation eventlistener*/
}

function gravity(event) {
  let newID = "";
  let player;
  tour === 1 ? (player = "J2") : (player = "J1");

  for (let i = event.target.id[0]; i > 0; i--) {
    const bottomCell = {
      id: `${i - 1}.${event.target.id.split(".")[1]}`,
      empty:
        document.getElementById(`${i - 1}.${event.target.id.split(".")[1]}`)
          .classList.length < 2,
    };

    if (bottomCell.empty) {
      newID = bottomCell.id;
    }
  }
  if (!newID) {
    newID = event.target.id;
    document.getElementById(newID).classList.add(player);
  } else {
    document.getElementById(newID).classList.add(player);
    event.target.classList.remove(player);
  }

  getLines(newID);
}

function getLines(id) {
  const row = new Array(nbCol).fill("x");
  const col = new Array(nbRow).fill("x");
  const diagL = new Array(nbRow + nbCol).fill("x");
  const diagR = new Array(nbRow + nbCol).fill("x");

  for (let i = 0; i < nbCol; i++) {
    if (
      document.getElementById(`${id.split(".")[0]}.${i}`).classList.length == 2
    ) {
      row[i] = document.getElementById(`${id.split(".")[0]}.${i}`).classList[1];
    }
  }

  for (let i = 0; i < nbRow; i++) {
    if (
      document.getElementById(`${i}.${id.split(".")[1]}`).classList.length == 2
    ) {
      col[i] = document.getElementById(`${i}.${id.split(".")[1]}`).classList[1];
    }
  }

  let i = 0;
  const IndexLeft = [];
  const IndexRight = [];

  while (id[0] - i >= 0 && id.split(".")[1] - i >= 0) {
    IndexLeft[0] = id.split(".")[0] - i;
    IndexLeft[1] = id.split(".")[1] - i;
    i++;
  }
  i = 0;
  while (IndexLeft[0] < nbRow && IndexLeft[1] < nbCol) {
    if (
      document.getElementById(`${IndexLeft[0]}.${IndexLeft[1]}`).classList
        .length == 2
    ) {
      diagR[i] = document.getElementById(
        `${IndexLeft[0]}.${IndexLeft[1]}`
      ).classList[1];
    }
    IndexLeft[0]++;
    IndexLeft[1]++;
    i++;
  }
  i = 0;
  while (id.split(".")[0] - i >= 0 && id.split(".")[1] + i >= 0) {
    IndexRight[0] = id.split(".")[0] - i;
    IndexRight[1] = parseInt(id.split(".")[1]) + i;
    i++;
  }
  console.log(IndexRight);

  i = 0;
  while (IndexRight[0] < nbRow && IndexRight[1] >= 0 && IndexRight[1] < nbCol) {
    if (
      document.getElementById(`${IndexRight[0]}.${IndexRight[1]}`).classList
        .length == 2
    ) {
      diagL[i] = document.getElementById(
        `${IndexRight[0]}.${IndexRight[1]}`
      ).classList[1];
    }
    IndexRight[0]++;
    IndexRight[1]--;
    i++;
  }
  checkGamerOver(row, col, diagL, diagR);
}

function checkGamerOver(...lines) {
  lines.forEach(function (line) {
    if (line.join("").includes("J1".repeat(pow))) {
      endGame(1);
    } else if (line.join("").includes("J2".repeat(pow))) {
      endGame(2);
    }
  });
}

function endGame(winner) {
  alert(`Bravo au joueur ${winner}!`);
  location.reload();
}

function launcher() {
  settings();
}

launcher();
