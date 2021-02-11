function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.getElementById("modal-btn");
const closeModalBtn = document.getElementById("close");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.addEventListener("click", launchModal);
closeModalBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal form without saving data when clicking on the 'close' button
function closeModal() {
  modalbg.style.display = "none";
}
