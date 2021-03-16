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
  numberOfCity: /^\d{1,2}$/,
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
    this.cgvError = document.getElementById("cgvError");
    this.formValid = false;
    this.nameValid = false;
    this.surnameValid = false;
    this.emailValid = false;
    this.birthDateValid = false;
    this.numberOfCityValid = false;
    this.cgvChecked = true;
    this.needsReset = false;
  }

  /* Function that validates the field value that has been changed and displays a proper error message if not ok */
  handleEvent(e) {
    let value = e.target.value;
    switch (e.target.id) {
      case "first":
        this.nameValid = validationRegEx.name.test(value);
        if (!this.nameValid)
          // <this> is the <input> element which fired the event, the error message is right next to it in the DOM.
          e.target.nextElementSibling.innerHTML =
            "Veuillez saisir votre prénom (2 caractères minimum commençant par une majuscule) - Lettres uniquement.";
        else e.target.nextElementSibling.innerHTML = "";
        break;
      case "last":
        this.surnameValid = validationRegEx.name.test(value);
        if (!this.surnameValid)
          e.target.nextElementSibling.innerHTML =
            "Veuillez saisir votre nom (2 caractères minimum commençant par une majuscule) - Lettres uniquement.";
        else e.target.nextElementSibling.innerHTML = "";
        break;
      case "email":
        this.emailValid = validationRegEx.email.test(value);
        if (!this.emailValid)
          e.target.nextElementSibling.innerHTML =
            "Veuillez saisir une adresse email correcte.";
        else e.target.nextElementSibling.innerHTML = "";
        break;
      case "birthdate":
        this.birthDateValid = validationRegEx.birthDate.test(value);
        if (!this.birthDateValid)
          e.target.nextElementSibling.innerHTML =
            "Veuillez saisir votre date de naissance.";
        else e.target.nextElementSibling.innerHTML = "";
        break;
      case "quantity":
        this.numberOfCityValid = validationRegEx.numberOfCity.test(value);
        if (!this.numberOfCityValid)
          e.target.nextElementSibling.innerHTML =
            "La quantité doit être comprise en 0 et 99.";
        else e.target.nextElementSibling.innerHTML = "";
        break;
      case "checkbox1":
        if (!e.target.checked) {
          this.cgvChecked = false;
          this.cgvError.innerHTML =
            "Veuillez accepter les conditions générales d'utilisation.";
        } else {
          this.cgvChecked = true;
          this.cgvError.innerHTML = "";
        }
        break;
      default:
        console.log("Wrong field has been selected!");
    }
    this.formValid =
      this.nameValid &&
      this.surnameValid &&
      this.emailValid &&
      this.birthDateValid &&
      this.numberOfCityValid &&
      this.cgvChecked;
  }

  /* Function validate called when submitting the form, it make sure that every field is valid and submit the form if so */
  validate() {
    /* Force the validation of each field in case nothing has been entered in some of them */
    this.fields.forEach((element) => {
      element.dispatchEvent(new Event("change"));
    });
    return this.formValid;
  }
}

/* Get the form fields to be monitored and validated and create the JS object */
const inputFields = document.querySelectorAll(".fieldToValidate");
let form = new InscriptionForm(inputFields);

// DOM Elements
const modalbg = document.getElementById("bground");

// Launch modal event
const modalBtn = document.querySelector(".modal-btn");
modalBtn.addEventListener("click", launchModal);

// Close modal event
const closeModalBtn = document.getElementById("close");
closeModalBtn.addEventListener("click", closeModal);

const confirmationButton = document.getElementById("confirmation");
confirmationButton.addEventListener("click", closeConfirmation);
const modalConfirm = document.getElementById("confirmationDialog");

const modalBody = document.getElementById("inscriptionForm");
const formContent = modalBody.innerHTML;

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
  closeModal();
  modalConfirm.style.display = "block";
  form.needsReset = true;
}
function closeConfirmation() {
  modalConfirm.style.display = "none";
  if (form.needsReset) {
    form.fields.forEach((element) => {
      element.value = "";
    });
  }
}

function validate() {
  event.preventDefault();
  if (form.validate()) showConfirmation();
}
