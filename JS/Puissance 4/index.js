const nbCol = 7;
const nbRow = 6;
let tour = 1;

const row = [];
const grid = [];

const gridTarget = document.querySelector("#grid");

function generateHTMLGrid(nbCol, nbRow) {
  for (let j = nbRow - 1; j >= 0; j--) {
    const HTMLRow = document.createElement("div");
    HTMLRow.classList.add("row");
    for (let i = 0; i < nbCol; i++) {
      const HTMLCell = document.createElement("div");
      HTMLCell.classList.add("cell");
      HTMLCell.setAttribute("id", `${j}${i}`);
      HTMLRow.appendChild(HTMLCell);
    }
    gridTarget.appendChild(HTMLRow);
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
  let player = event.target.classList.contains("J1");
  player ? (player = "J1") : (player = "J2");
  for (let i = event.target.id[0]; i > 0; i--) {
    const bottomCell = {
      id: `${i - 1}${event.target.id[1]}`,
      empty:
        document.getElementById(`${i - 1}${event.target.id[1]}`).classList
          .length < 2,
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

  checkGameOver(newID);
}

function checkGameOver(id) {
  const row = new Array(nbCol).fill("x");
  const col = new Array(nbRow).fill("x");
  const diagL = new Array(nbRow + nbCol).fill("x");
  const diagR = new Array(nbRow + nbCol).fill("x");

  for (let i = 0; i < nbCol; i++) {
    if (document.getElementById(`${id[0]}${i}`).classList.length == 2) {
      row[i] = document.getElementById(`${id[0]}${i}`).classList[1];
    }
  }
  for (let i = 0; i < nbRow; i++) {
    if (document.getElementById(`${i}${id[1]}`).classList.length == 2) {
      col[i] = document.getElementById(`${i}${id[1]}`).classList[1];
    }
  }

  let i = 0;
  const IndexLeft = [];
  const IndexRight = [];

  while (id[0] - i >= 0 && id[1] - i >= 0) {
    IndexLeft[0] = id[0] - i;
    IndexLeft[1] = id[1] - i;
    i++;
  }
  i = 0;
  while (IndexLeft[0] < nbRow && IndexLeft[1] < nbCol) {
    if (
      document.getElementById(`${IndexLeft[0]}${IndexLeft[1]}`).classList
        .length == 2
    ) {
      diagR[i] = document.getElementById(
        `${IndexLeft[0]}${IndexLeft[1]}`
      ).classList[1];
    }
    IndexLeft[0]++;
    IndexLeft[1]++;
    i++;
  }
  i = 0;
  while (id[0] - i >= 0 && id[1] + i >= 0) {
    IndexRight[0] = id[0] - i;
    IndexRight[1] = parseInt(id[1]) + i;
    i++;
  }

  i = 0;
  while (IndexRight[0] < nbRow && IndexRight[1] >= 0 && IndexRight[1] < nbCol) {
    console.log(IndexRight);
    if (
      document.getElementById(`${IndexRight[0]}${IndexRight[1]}`).classList
        .length == 2
    ) {
      diagL[i] = document.getElementById(
        `${IndexRight[0]}${IndexRight[1]}`
      ).classList[1];
    }
    IndexRight[0]++;
    IndexRight[1]--;
    i++;
  }
  console.log(diagR);

  if (
    diagR.join("").includes("J1".repeat(4)) |
    diagL.join("").includes("J1".repeat(4)) |
    row.join("").includes("J1".repeat(4)) |
    col.join("").includes("J1".repeat(4))
  ) {
    endGame(1);
  } else if (
    diagR.join("").includes("J2".repeat(4)) |
    diagL.join("").includes("J2".repeat(4)) |
    row.join("").includes("J2".repeat(4)) |
    col.join("").includes("J2".repeat(4))
  ) {
    endGame(2);
  }
}

function endGame(winner) {
  alert(`Bravo au joueur ${winner}!`);
  location.reload();
}

function launcher() {
  generateHTMLGrid(nbCol, nbRow);
  cellsEvent();
}

launcher();
