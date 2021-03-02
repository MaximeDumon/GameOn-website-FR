// @ts-check

/** Object describing the inscription form and its fields */
class InscriptionForm {
  constructor() {}
}

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.getElementById("bground");
const modalBtn = document.querySelector(".modal-btn");
const closeModalBtn = document.getElementById("close");

const inputFields = document.querySelectorAll(".formData > input");

// Launch modal event
modalBtn.addEventListener("click", launchModal);
// Close modal event
closeModalBtn.addEventListener("click", closeModal);

// Add an event listener for each input field of the form
for (let i = 0; i < inputFields.length; i++) {
  inputFields[i].addEventListener("change", validateField);
}

// Launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// Close modal form without saving data when clicking on the 'close' button
function closeModal() {
  modalbg.style.display = "none";
}

/* Function validate called when submitting the form, it calls the validateField() function for every field */
function validate() {
  let formValid = true;
  inputFields.forEach((element) => {
    formValid &&= validateField(element.dispatchEvent(new Event("change")));
    if (!formValid) {
      console.log("Form not valid!");
    }
  });
}

/* Function that validates the field value that has been changed and displays a proper error message if not ok */
function validateField(e) {
  return;
  let errorMessage = "";
  let regEx;
  let fieldValid = true;
  const value = e.target.value;
  switch (e.target.id) {
    case "first":
      regEx = /a/;
      if (!regEx.test(value)) {
        errorMessage = "Veuillez saisir votre prénom (2 caractères minimum).";
        fieldValid = false;
      }
      break;
    case "last":
      regEx = /a/;
      if (!regEx.test(value)) {
        errorMessage = "Veuillez saisir votre nom.";
        fieldValid = false;
      }
      break;
    case "email":
      regEx = /a/;
      if (!regEx.test(value)) {
        errorMessage =
          "Veuillez saisir une adresse email au format <texte>@<texte>.<texte>";
        fieldValid = false;
      }
      break;
    case "birthdate":
      regEx = /a/;
      if (!regEx.test(value)) {
        errorMessage = "Veuillez saisir votre date de naissance.";
        fieldValid = false;
      }
      break;
    case "quantity":
      if (value < 0) {
        errorMessage = "La quantité ne peut être inférieure à 0.";
        fieldValid = false;
      }
      break;
    case "checkbox1":
      if (!value) {
        errorMessage =
          "Veuillez accepter les conditions générales d'utilisation.";
        fieldValid = false;
      }
      break;
    default:
      console.log("Wrong field has been selected!");
  }
  // <this> is the <input> element which fired the event, the error message is right next to it in the DOM.
  this.nextElementSibling.innerHTML = errorMessage;
  return fieldValid;
}
