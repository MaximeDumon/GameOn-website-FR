/* Object defining the regular expressions needed for the form validation */
let validationRegEx = {
  /* Names must start with a capitalized letter, be 2 characters long minimum and contain only letters */
  name: /^[A-Z]{1}[A-Za-z]{1,}$/,
  /* Emails must start with a letter followed by only alphanumerical characters and dots;
  then have the @ followed by at least 2 letters, followed by a dot and at least 2 characters. They are 
  not case sensitive */
  email: /^[A-Za-z]{1}\w.+@[A-Za-z]{2,}\.[A-Za-z]{2,}$/,
  birthDate: /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/,
  /* Number of city must be in the 0 - 99 range */
  numberOfCity: /^\d{2}$/,
};

/* Class defining the inscription form and its associated methods */
class InscriptionForm {
  /* Initialize the form and add the listeners */
  constructor(fields) {
    this.fields = fields;
    this.fields.forEach((element) => {
      // Add an event listener for each input field of the form
      element.addEventListener("change", this);
    });
    this.formValid = false;
    this.nameValid = false;
    this.surnameValid = false;
    this.emailValid = false;
    this.birthDateValid = false;
    this.numberOfCityValid = false;
  }

  /* Function that validates the field value that has been changed and displays a proper error message if not ok */
  handleEvent() {
    let errorMessage = "";
    const value = event.target.value;
    switch (event.target.id) {
      case "first":
        this.nameValid = validationRegEx.name.test(value);
        if (!this.nameValid)
          errorMessage =
            "Veuillez saisir votre prénom (2 caractères minimum commençant par une majuscule) - Lettres uniquement.";
        break;
      case "last":
        this.surnameValid = validationRegEx.name.test(value);
        if (!this.surnameValid)
          errorMessage =
            "Veuillez saisir votre nom (2 caractères minimum commençant par une majuscule) - Lettres uniquement.";
        break;
      case "email":
        this.emailValid = validationRegEx.email.test(value);
        if (!this.emailValid)
          errorMessage = "Veuillez saisir une adresse email correcte.";
        break;
      case "birthdate":
        this.birthDateValid = validationRegEx.birthDate.test(value);
        if (!this.birthDateValid)
          errorMessage = "Veuillez saisir votre date de naissance.";
        break;
      case "quantity":
        this.numberOfCityValid = validationRegEx.numberOfCity.test(value);
        if (!this.numberOfCityValid)
          errorMessage = "La quantité doit être comprise en 0 et 99.";
        break;
      default:
        console.log("Wrong field has been selected!");
    }
    // <this> is the <input> element which fired the event, the error message is right next to it in the DOM.
    event.target.nextElementSibling.innerHTML = errorMessage;
    this.formValid =
      this.nameValid &&
      this.surnameValid &&
      this.emailValid &&
      this.birthDateValid &&
      this.numberOfCityValid;
  }

  /* Function validate called when submitting the form, it make sure that every field is valid and submit the form if so */
  validate() {
    event.preventDefault();
    return this.formValid;
  }
}

/* Function being called for the the drop-down menu on the mobile version of the navigation menu */
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
/* Launch modal form */
function launchModal() {
  modalbg.style.display = "block";
}
/* Close modal form without saving data when clicking on the 'close' button */
function closeModal() {
  modalbg.style.display = "none";
}
/* Show the confirmation message after "sending" the inscription form */
function showConfirmation() {
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = "<p>Merci de vous être enregistré !</p>";
}

/* Get the form fields to be monitored and validated and create the JS object */
const inputFields = document.querySelectorAll(".fieldToValidate");
let form = new InscriptionForm(inputFields);
function validate() {
  if (form.validate()) showConfirmation();
}
// DOM Elements
const modalbg = document.getElementById("bground");

const modalBtn = document.querySelector(".modal-btn");
// Launch modal event
modalBtn.addEventListener("click", launchModal);

const closeModalBtn = document.getElementById("close");
// Close modal event
closeModalBtn.addEventListener("click", closeModal);
