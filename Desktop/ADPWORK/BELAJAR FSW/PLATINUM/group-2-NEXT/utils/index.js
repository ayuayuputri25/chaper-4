const Log = (word = "hello") => {
  console.log(word);
}

const isValidEmail = (email) => {
  return !/.+@.+\.[A-Za-z]+$/.test(email)
}

module.exports = {
  Log,
  isValidEmail
};