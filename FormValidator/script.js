//IFs in event listener - easy but messy and not scalable
// needs changing for functions

//Get elements from DOM
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSucess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(input) {
  const regex = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i;
  if (regex.test(input.value.trim())) {
    showSucess(input);
  } else {
    showError(input, `${getFieldName(input)} is not valid`);
  }
}

function checkRequired(inputArray) {
  inputArray.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSucess(input);
    }
  });
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters long.`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters long.`
    );
  } else {
    showSucess(input);
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

//Event listeners
form.addEventListener("submit", function (event) {
  event.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15); // input checked, min char, max char
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});

// if (username.value === "") {
//   showError(username, "Username is required");
// } else {
//   showSucess(username);
// }

// if (email.value === "") {
//   showError(email, "Email is required");
// } else if (!isValidEmail(email.value)) {
//   showError(email, "Email is not valid");
// } else {
//   showSucess(email);
// }

// if (password.value === "") {
//   showError(password, "Password is required");
// } else {
//   showSucess(password);
// }

// if (password2.value === "") {
//   showError(password2, "Password confirmation is required");
// } else if (password.value !== password2.value) {
//   showError(password2, "Passwords do not match");
// } else {
//   showSucess(password2);
// }
