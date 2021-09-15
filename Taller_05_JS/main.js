const brands = {
    "Bugatti": ["Chiron", "Veyron 16.4"],
    "BMW": ["i4", "i8", "iX", "Serie 1", "Serie 2"],
    "Audi": ["A1/Sportback", "A3 Cabrio", "A3/Sportback", "A4"],
    "Aston Martin": ["DB11", "DB9", "DBS", "DBX"],
    "Ford": ["EcoSport", "Explorer", "Fiesta", "Focus", "KUGA"]
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mainForm')
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        var user_id = document.getElementById('id_usr').value
        var user_country = document.getElementById('country_usr').value
        var user_name = document.getElementById('name_usr').value
        var user_surname = document.getElementById('surname_usr').value
        var user_direction = document.getElementById('direction_usr').value
        var user_account = document.getElementById('account_usr').value
        var user_pw = document.getElementById('pw_usr').value
        var user_pwconf = document.getElementById('pwconf_usr').value
        var user_email = document.getElementById('email_usr').value
        var user_phone = document.getElementById('phone_usr').value
        const minRange = document.getElementById('affordRangeInputMin');
        const maxRange = document.getElementById('affordRangeInputMax');

        if (user_name.length <= 0 || user_name.length > 25) {
            event.preventDefault()
            alert('El campo nombre debe estar lleno y debe tener una longitud de máximo 25 caracteres.')
            return false
        }

        if (user_surname.length <= 0 || user_surname.length > 25) {
            alert('El campo apellido debe estar lleno y debe tener una longitud de máximo 25 caracteres.')
            return false
        }

        var lower_direction = user_direction.toLowerCase()
        if (!(lower_direction.startsWith('cll') ||
            lower_direction.startsWith('cra') ||
            lower_direction.startsWith('av') ||
            lower_direction.startsWith('anv') ||
            lower_direction.startsWith('trans'))) {
            alert('El campo dirección debe empezar por las siguientes palabras. cll, cra, av, anv, trans')
            return false
        }

        if (user_account.length < 10 || user_account.length > 20) {
            alert('El campo ccusuario debe estar lleno y debe tener una longitud de máximo 20 y mínimo 10 caracteres')
            return false
        }

        if (!isAlphaNumeric(user_account)) {
            alert('El campo ccusuario no debe contener caracteres extraños')
            return false
        }

        if (user_pw.length < 15 || user_pw.length > 20) {
            alert('El campo ccpaswd debe estar lleno y debe tener una longitud de máximo 20 y mínimo 15 caracteres.')
            return false
        }

        if (!validatePasswordStrength(user_pw)) {
            alert('El campo ccpaswd debe contener mayúsculas , numeros, letras y/o lossiguientes caracteres [#,%,/,&]')
            return false
        }

        if (user_pw !== user_pwconf) {
            alert('El campo ccpaswd debe estar confirmado e identico a dicha confirmacion')
            return false
        }

        if (user_email.length <= 0 || user_email.length > 120) {
            alert('El campo email debe estar lleno y debe tener una longitud de máximo 120 caracteres.')
            return false
        }

        if (minRange.value > maxRange.value) {
            alert('El mínimo valor que está dispuesto a pagar no puede ser mayor que el máximo.');
            return false;
        }
        
        form.submit();

    });

    document.getElementById('enableLikes').addEventListener('click', (event) => {
        const parent = document.getElementById('likesSection')
        parent.classList.toggle('show')
        
        if (parent.classList.contains("show")) {
            event.currentTarget.checked = true;
            populateForm()
            updateBrandModels()
            updateInputRange(document.getElementById('affordRangeInputMin'))
            updateInputRange(document.getElementById('affordRangeInputMax'))
        } else {
            event.currentTarget.checked = false;
        }

    });

    document.getElementById('favBrand').addEventListener('change', (event) => {
        updateBrandModels(event.target.value)
    });

    document.getElementById('affordRangeInputMin').addEventListener('input', (event) => {
        updateInputRange(event.currentTarget);
    });
    document.getElementById('affordRangeInputMax').addEventListener('input', (event) => {
        updateInputRange(event.currentTarget);
    })
});

function populateForm() {
    const targetParent = document.getElementById('favBrand');

    // remove all children before appending new (this is unlikely)
    targetParent.innerHTML = '';
    
    for (const brand in brands) {
        var opt = document.createElement('option');
        opt.value = brand;
        opt.textContent = brand;

        targetParent.appendChild(opt);
    }
}

function updateBrandModels(brand = "Bugatti") {
    const select = document.getElementById('favModel')
    if (!brand in brands) {
        console.error("Selected brand doesn't exist.")
    }
    select.innerHTML = '';

    for (const model of brands[brand]) {
        var opt = document.createElement('option');
        opt.value = model;
        opt.textContent = model;

        select.appendChild(opt);
    }
}

function updateInputRange(input) {
    const pTag = input.parentNode.getElementsByTagName('p')[0];
    pTag.innerText = `$${input.value} pesos`;
}

function isAlphaNumeric(str) {
    var code, i, len;
  
    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (!(code > 47 && code < 58) && // numeric (0-9)
          !(code > 64 && code < 91) && // upper alpha (A-Z)
          !(code > 96 && code < 123)) { // lower alpha (a-z)
        return false;
      }
    }
    return true;
};

function validatePasswordStrength(str) {
    if (str.search(/[a-z]/) < 0) {
        return false;
    }
    if (str.search(/[A-Z]/) < 0) {
        return false;
    }
    if (str.search(/[0-9]/) < 0) {
        return false;
    }
    if (str.search(/[#%/&]/) < 0) {
        return false;
    }
    return true;
}
