const checkEmptyString = (input) => {
  return input.length > 0;
};

const checkStringLength = (input) => {
  return input.length >= 8;
};

const checkEmail = (input) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input);
};

const checkUpperCase = (input) => {
  return /[A-Z]/.test(input);
};

const checkLowerCase = (input) => {
  return /[a-z]/.test(input);
};

const checkNumber = (input) => {
  return /[0-9]/.test(input);
};

const checkString = (input) => {
  return /[a-z]/gi.test(input);
};

export {
  checkEmptyString,
  checkStringLength,
  checkEmail,
  checkUpperCase,
  checkLowerCase,
  checkNumber,
  checkString,
};
