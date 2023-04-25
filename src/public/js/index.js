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
        socket.emit('authenticated', user);
    });


chatbox.addEventListener('keyup', evt=>{
    if(evt.key=='Enter'){
        if(chatbox.value.trim().length > 0){
            socket.emit('message',  {user, message:  chatbox.balue});
            chatbox.value='';
        }
    }
})

socket.on('messagesLogs', data =>{
    let log = document.getElementById('messageLogs');
    let messages = '';
    data.forEach(message => {
        messages += `${message.user} dice: ${message.message} <br/>`
    });
    log.innerHTML=messages
})

socket.on('newUserConnected', data =>{
    Swal.fire({
        toast:true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `${data} se ha unido al chat`,
        icon: 'success'
    })
})