//console.log('correcto');

document.querySelector('#data-btn').addEventListener('click', traerDatos);

function traerDatos(){

    //console.log('dentro de la funcion');
    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'users.json', true);

    xhttp.send();

    xhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){

            //console.log(this.responseText);
            let datos =JSON.parse(this.responseText);
            //console.log(datos);
            let info = document.querySelector('#info');
            info.innerHTML = '';

            for(let item of datos){
                //console.log(item);
                info.innerHTML += `
                <tr>
                    <th>${item.id}</th>
                    <th>${item.name}</th>
                    <th>${item.username}</th>
                    <th>${item.email}</th>
                    <th>${item.address}</th>
                    <th>${item.phone}</th>
                    <th>${item.website}</th>
                    <th>${item.company}</th>
                </tr>
            `
                    
            }
        }
    }

}