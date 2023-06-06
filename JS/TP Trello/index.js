// Déclaration des variables/constantes DOM
const pending = document.querySelector("#target #pending");
const processing = document.querySelector("#target #processing");
const closed = document.querySelector("#target #closed");
const btnAdd = document.getElementById("addTag");
const editBtn = document.querySelector("#editTag");
const inputValue = document.getElementById("tag").value;
const description = document.querySelector("#description").value;
const message = document.getElementById("message");

// Fonctions :
function createTicket() {
  if (inputValue === "") {
    message.innerText = "Titre VIDE !!!";
    return;
  } else if (description === "") {
    message.innerText = "Description VIDE !!!";
    return;
  }
  message.innerText = "";
}

// Event listener
btnAdd.addEventListener("click", function (event) {
  createTicket();
  const ticket = `<details>
  <summary>${inputValue}</summary>
  <div>${description}</div>
  </details>`;
  const newTag = document.createElement("div");
  newTag.classList.add("ticket");
  newTag.innerHTML = ticket;

  //function createSwitchBtn() {
  const switchBtn = document.createElement("button");
  switchBtn.classList.add("switchButton");
  switchBtn.innerText = "->";
  switchBtn.addEventListener("click", function () {
    switch (this.parentNode.parentNode.id) {
      case "pending":
        document.querySelector("#processing").appendChild(this.parentNode);
        break;
      case "processing":
        document.querySelector("#closed").appendChild(this.parentNode);
        this.remove();
    }
  });
  //}

  newTag.appendChild(switchBtn);

  //function createDeleteBtn() {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteBnt");
  deleteBtn.innerText = "supprimer";
  deleteBtn.addEventListener("click", function (event) {
    this.parentNode.remove();
  });
  // }
  newTag.appendChild(deleteBtn);
  pending.appendChild(newTag);
});

editBtn.onclick = function () {
  const tickets = document.querySelectorAll(".ticket details div");
  for (let ticket of tickets) {
    if (ticket.isContentEditable) {
      ticket.contentEditable = false;
    } else {
      ticket.contentEditable = true;
    }
  }
};
