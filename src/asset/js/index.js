import {
  checkEmptyString,
  checkStringLength,
  checkEmail,
  checkUpperCase,
  checkLowerCase,
  checkNumber,
} from "../../lib/FormValidator.js";

import { eventListenerSelect } from "../../lib/simplifyLib.js";
import { USER_API_ENDPOINT } from "../../lib/constants.js";

// const getUserData = localStorage.getItem("userData");
// const userData = JSON.parse(getUserData) || [
//   { id: 1, email: "admin@gmail.com", password: "Adm123123" },
// ];
// localStorage.setItem("userData", JSON.stringify(userData));

// getting all user
const getAllUser = async () => {
  try {
    let response = await fetch(USER_API_ENDPOINT);
    return await response.json();
    
  } catch (err) {
    console.log("error", err);
  }
};

const signIn = async () => {
  let email = document.querySelector("#emailLogin").value;
  let pw = document.querySelector("#pwLogin").value;
  
  const userData = await getAllUser();

  const checkCredential = userData.find(
    (a) => a.email === email && a.password === pw
  );

  switch (false) {
    case checkEmptyString(email):
      alert("Please fill in your email!");
      break;
    case checkEmail(email):
      alert("Please enter a valid email!");
      break;
    case checkEmptyString(pw):
      alert("Please fill in your password!");
      break;
    case checkCredential !== undefined:
      alert("You may enter wrong email or password.");
      break;
    case checkCredential === undefined:
      alert("success");
      localStorage.setItem("email", email);
      window.location.href = "./pages/dashboard/";
      break;
  }
};

const addUser = async (email, pwd) => {
  try {
    let response = await fetch(USER_API_ENDPOINT,{
      method: 'POST',
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: pwd
      })
    });
    return await response.json();
  } catch (err) {
    console.log('error',(err))
  }
}

const signUp = async() => {
  let email = document.querySelector("#emailReg").value;
  let pwd = document.querySelector("#pwReg").value;

  const userData = await getAllUser();

  const checkDuplicate = userData.find((a) => a.email === email);

  switch (false) {
    case checkEmptyString(email):
      alert("Please fill in your email!");
      break;
    case checkEmail(email):
      alert("Please enter a valid email!");
      break;
    case checkEmptyString(pwd):
      alert("Please fill in your password!");
      break;
    case checkStringLength(pwd):
      alert("Your password must contain at least 8 characters!");
      break;
    case checkUpperCase(pwd):
      alert("Your password must contain at least 1 uppercase!");
      break;
    case checkLowerCase(pwd):
      alert("Your password must contain at least 1 lowercase!");
      break;
    case checkNumber(pwd):
      alert("Your password must contain at least 1 number!");
      break;
    case checkDuplicate === undefined:
      alert("This email has been registered");
      break;
    case checkDuplicate !== undefined:
      addUser(email,pwd);
      alert('register Success')
      break;
  }
};

eventListenerSelect("#btn-login", "click", signIn);
eventListenerSelect("#btn-reg", "click", signUp);
