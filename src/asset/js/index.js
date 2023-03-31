import {
  checkEmptyString,
  checkStringLength,
  checkEmail,
  checkUpperCase,
  checkLowerCase,
  checkNumber,
} from "../../lib/FormValidator.js";

import { eventListenerSelect } from "../../lib/simplifyLib.js";

const getUserData = localStorage.getItem("userData");
const userData = JSON.parse(getUserData) || [
  { id: 1, email: "admin@gmail.com", password: "Adm123123" },
];
localStorage.setItem("userData", JSON.stringify(userData));

const signIn = () => {
  let email = document.querySelector("#emailLogin").value;
  let pw = document.querySelector("#pwLogin").value;
  console.log(email, "email");

  const checkCredential = userData.find(
    (a) => a.email === email && a.password === pw
  );

  switch (false) {
    case checkEmptyString(email):
      console.log("Please fill in your email!");
      break;
    case checkEmail(email):
      console.log("Please enter a valid email!");
      break;
    case checkEmptyString(pw):
      console.log("Please fill in your password!");
      break;
    case checkCredential !== undefined:
      console.log("You may enter wrong email or password.");
      break;
    case checkCredential === undefined:
      console.log("success");
      localStorage.setItem("email", email);
      window.location.href = "./pages/dashboard/";
      break;
  }
};

const signUp = () => {
  let email = document.querySelector("#emailReg").value;
  let pw = document.querySelector("#pwReg").value;

  const checkDuplicate = userData.find((a) => a.email === email);

  switch (false) {
    case checkEmptyString(email):
      console.log("Please fill in your email!");
      break;
    case checkEmail(email):
      console.log("Please enter a valid email!");
      break;
    case checkEmptyString(pw):
      console.log("Please fill in your password!");
      break;
    case checkStringLength(pw):
      console.log("Your password must contain at least 8 characters!");
      break;
    case checkUpperCase(pw):
      console.log("Your password must contain at least 1 uppercase!");
      break;
    case checkLowerCase(pw):
      console.log("Your password must contain at least 1 lowercase!");
      break;
    case checkNumber(pw):
      console.log("Your password must contain at least 1 number!");
      break;
    case checkDuplicate === undefined:
      console.log("This email has been registered");
      break;
    case checkDuplicate !== undefined:
      userData.push({
        id: userData[userData.length - 1].id + 1,
        email: email,
        password: pw,
      });
      localStorage.setItem("userData", JSON.stringify(userData));
      break;
  }
};

eventListenerSelect("#btn-login", "click", signIn);
eventListenerSelect("#btn-reg", "click", signUp);
