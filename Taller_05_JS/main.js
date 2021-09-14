document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('mainform').addEventListener('submit', (event) => {
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

        if (user_name.length <= 0 || user_name.length > 25){
            event.preventDefault()
            alert('El campo nombre debe estar lleno y debe tener una longitud de máximo 25 caracteres.')
            return false
        }

        if (user_surname.length <= 0 || user_surname.length > 25){
            event.preventDefault()
            alert('El campo apellido debe estar lleno y debe tener una longitud de máximo 25 caracteres.')
            return false
        }

        var lower_direction = user_direction.toLowerCase()
        if(!(lower_direction.startsWith('cll') || 
             lower_direction.startsWith('cra') || 
             lower_direction.startsWith('av')  || 
             lower_direction.startsWith('anv') || 
             lower_direction.startsWith('trans'))){
            event.preventDefault()
            alert('El campo dirección debe empezar por las siguientes palabras. cll, cra, av, anv, trans')
            return false
        }

        if (user_account.length < 10 || user_account.length > 20){
            event.preventDefault()
            alert('El campo ccusuario debe estar lleno y debe tener una longitud de máximo 20 y mínimo 10 caracteres')
            return false
        }

        if (!isAlphaNumeric(user_account)){
            event.preventDefault()
            alert('El campo ccusuario no debe contener caracteres extraños')
            return false
        }

        if (user_pw.length < 15 || user_pw.length > 20){
            event.preventDefault()
            alert('El campo ccpaswd debe estar lleno y debe tener una longitud de máximo 20 y mínimo 15 caracteres.') 
            return false
        }

        if (!validatePasswordStrength(user_pw)){
            event.preventDefault()
            alert('El campo ccpaswd debe contener mayúsculas , numeros, letras y/o lossiguientes caracteres [#,%,/,&]')  
            return false
        }

        if(user_pw !== user_pwconf){
            event.preventDefault()
            alert('El campo ccpaswd debe estar confirmado e identico a dicha confirmacion') 
            return false
        }

        if (user_email.length <= 0 || user_email.length > 120){
            event.preventDefault()
            alert('El campo email debe estar lleno y debe tener una longitud de máximo 120 caracteres.')
            return false
        }
    })
})

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