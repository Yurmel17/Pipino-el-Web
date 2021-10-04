const USERNAME_REGEX = /^([a-zA-Z0-9]+).{3,24}$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// test: jose120, HolaM%&7351

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");
  const hasIllnessCheckbox = document.getElementById("hasIllness");
  const contagiousIllnessCheckbox = document.getElementById("contagiousIllness");

  form.addEventListener("submit", validateForm);
  hasIllnessCheckbox.addEventListener("change", toggleSection);
  contagiousIllnessCheckbox.addEventListener("change", toggleInput);

  $(function () {
      $("#datepicker").datepicker({
          dateFormat: "mm-dd-yy",
          defaultDate: "11-09-2001",
          changeMonth: true,
          changeYear: true
      });
  });

});

const validateForm = async (e) => {
  e.preventDefault();
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const dateInput = document.getElementById("datepicker");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  var shouldSend = true;

  if (!usernameInput.value.match(USERNAME_REGEX)) {
    usernameInput.classList.add("invalid-input");
    document.getElementById("usernameFb").classList.add("visible");
    shouldSend = false;
  } else {
    usernameInput.classList.remove("invalid-input");
    document.getElementById("usernameFb").classList.remove("visible");
  }

  if (!emailInput.value.match(EMAIL_REGEX)) {
    emailInput.classList.add("invalid-input");
    document.getElementById("emailFb").classList.add("visible");
    shouldSend = false;
  } else {
    emailInput.classList.remove("invalid-input");
    document.getElementById("emailFb").classList.remove("visible");
  }

  if (!validDate(dateInput.value)) {
    dateInput.classList.add("invalid-input");
    shouldSend = false;
  } else {
    dateInput.classList.remove("invalid-input");
  }

  if (!passwordInput.value.match(PASSWORD_REGEX)) {
    passwordInput.classList.add("invalid-input");
    document.getElementById("passwordFb").classList.add("visible");
    shouldSend = false;
  } else {
    passwordInput.classList.remove("invalid-input");
    document.getElementById("passwordFb").classList.remove("visible");
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.classList.add("invalid-input");
    shouldSend = false;
  } else {
    confirmPasswordInput.classList.remove("invalid-input");
  }

  if (!shouldSend) return;
  console.log(e.currentTarget);
  const status = await storeUser(e.currentTarget, usernameInput.value);
  if (!status) {
    return;
  }

  console.log(e.currentTarget);
  
  e.currentTarget.submit();

}

const toggleSection = (e) => {
  const checkbox = e.currentTarget;
  const container = document.getElementById("optionalSection");
  console.log(checkbox)
  container.classList.toggle("active");
}

const toggleInput = (e) => {
  const checkbox = e.currentTarget;
  const container = document.getElementById("illness");
  console.log(checkbox)
  container.classList.toggle("active");
}


const storeUser = async (form, identifier) => {
  if (localStorage.getItem(identifier)) {
    alert("Username already exists.")
    return false;
  }
  const inputs = form.querySelectorAll('input');
  var obj = {};
  inputs.forEach(input => {
    obj[input.name] = input.value;
  });

  console.log(obj)

  localStorage.setItem(identifier, obj);

  cookieStorage.setItem("registeredUSer", identifier);

  const birthDate = new Date(obj.date);

  const age = new Date().getFullYear() - birthDate.getFullYear();

  alert(`Se ha registrado al usuario ${obj.username} cuya edad es ${age} años.`)
  return true;
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

// const delay = ms => new Promise(res => setTimeout(res, ms));
const validDate = (dateStr) => {
    return (new Date(dateStr) !== "Invalid Date") && !isNaN(new Date(dateStr));

}