const USERNAME_REGEX = /^([a-zA-Z0-9]+).{3,24}$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

// test: jose120, HolaM%&7351

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");
  form.addEventListener("submit", validateForm);
});

const validateForm = (e) => {
  e.preventDefault();
  const usernameInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("password").value;
  const confirmPasswordInput = document.getElementById("confirmPassword").value;

  var shouldSend = true;

  if (!usernameInput.match(USERNAME_REGEX)) {
    alert("Invalid username");
    shouldSend = false;
  }
  if (!passwordInput.match(PASSWORD_REGEX)) {
    alert("invalid password");
    shouldSend = false;
  }

  if (passwordInput !== confirmPasswordInput) {
    alert("Passwords must be the same");
    shouldSend = false;
  }

  if (shouldSend) {
    e.currentTarget.submit();
    storeUser(form, usernameInput);
  }

}

const storeUser = (form, identifier) => {
  if (localStorage.getItem(identifier)) {
    alert("Username already exists.")
    return;
  }
  const inputs = form.querySelectorAll('input');
  var obj = {};
  inputs.forEach(input => {
    obj[input.name] = input.value;
  });
  localStorage.setItem(identifier, obj);

  cookieStorage.setItem("registeredUSer", identifier);
};

const cookieStorage = {
    getItem: (item) => {
        // converts cookies string into an object-like
        const cookies = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            // key.trim() takes care of removing posible whitespaces
            // {} as last parameter makes the return of reduce an object
            .reduce((accum, [key, value]) => ({ ...accum, [key.trim()]: value }), {});

        // at this point this should be an string or undefined in case the item is not there
        return cookies[item];
    },
    setItem: (item, value, days) => {
        if (days) {
            var date = new Date();
            date.setTime(+ date + (days * 86400000)); //24 * 60 * 60 * 1000
            document.cookie = `${item}=${value}; expires=${date.toUTCString()};`;
            return;
        }
        document.cookie = `${item}=${value};`;
    },
    deleteItem: (item) => {
        document.cookie = `${item}=;expires= Thu, 21 Aug 2014 20:00:00 UTC`;
    }
}