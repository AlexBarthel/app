var socket = io();
var formData = {
    form: document.getElementById("form"),
    submit: document.getElementById("submit"),
    nickname: document.getElementById("form-nickname"),
    code: document.getElementById("form-code")
};

formData.submit.onclick = function(event) {
    event.preventDefault();
    if (formData.nickname.value) {
        formData.nickname.style.animation = "fadeContentOut 500ms forwards";
        setTimeout(() => {
            formData.nickname.style.display = "none";
            formData.code.style.display = "inline-block";
            formData.code.style.animation = "fadeContentIn 500ms forwards";
            if (formData.code.value) {
                socket.emit('form-submit', {nickname: formData.nickname.value, code: formData.code.value});
                formData.code.style.animation = "fadeContentOut 500ms forwards";
                formData.submit.style.animation = "fadeContentOut 500ms forwards";
            }
        }, 500)
        
    }
};

socket.on('form-submit', function(o) {
    if (formData.nickname.value === o.nickname && formData.code.value === o.code) {
        console.log("retrieved form-submit data", o);
        formData.nickname.value = '';
        formData.code.value = '';
    }
});
