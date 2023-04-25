const socket = io();

// Swal.fire({
//     title: 'Saludos',
//     text: 'Mensaje inicial',
//     icon: 'Success'
// })

let user;
const chatbox= document.getElementById('chatBox');


Swal.fire({
        title: 'Identificate',
        input: 'text',
        text: 'ingresa tu nombre de usuario',
        inputValidator: (value) =>{
            return !value && "Necesitas escribir algun nombre para continuar"
        },
        allowOutsideClick: false,
        allowEscape: false
    }).then(result =>{
        user = result.value;
    });
