import {templates} from '../utils/templates.js';

export function profileController() {

    let user = firebase.auth().currentUser;
    templates.get('profile')
        .then((res) => {

            let hbTemplate = Handlebars.compile(res);
            let template = hbTemplate(user);

            $('#content').html(template);

            let changePicBtn = document.getElementById('changePicBtn');
            changePicBtn.addEventListener('click', showPictureChangeContainer);

            let savePicBtn = document.getElementById('savePicBtn');
            savePicBtn.addEventListener('click', function () {
                submitPictureUrl(user);
            });

            let cancelPicBtn = document.getElementById('cancelPicBtn');
            let changePicContainer = document.getElementById('changePicContainer');
            cancelPicBtn.addEventListener('click', function () {
                hide(changePicContainer);
            });

            let editEmailBtn = document.getElementById('editEmailBtn');
            let changeEmailContainer = document.getElementById('changeEmailContainer');
            editEmailBtn.addEventListener('click', function() {
                show(changeEmailContainer);
            });
            
            let saveEmailBtn = document.getElementById('')
        });
}
function show(element) {
    element.style.display = "";
}

function hide(element) {
    element.style.display = "none";
}

function showEmailChangeContainer() {
    let changeEmailContainer = document.getElementById('changeEmailContainer');
    changeEmailContainer.style.display = "block";
}

function showPictureChangeContainer() {
    let changePicContainer = document.getElementById('changePicContainer');
    changePicContainer.style.display = "block";
}

function hidePictureChangeContainer(){
    let changePicContainer = document.getElementById('changePicContainer');
    changePicContainer.style.display = "none";
}

function submitPictureUrl(user) {
    const changePicContainer = document.getElementById('changePicContainer');
    const pattern = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

    let urlTextBox = document.getElementById('urlTextBox');
    let url = urlTextBox.value;


    if (pattern.test(url) == true) {
        user.updateProfile({
            photoURL: url
        });

        let profilePic = document.getElementById('profilePicture');
        profilePic.src = url;
    }

    else {
        alert("Invalid URL!");
        return;
    }

    urlTextBox.value = ""
    hide(changePicContainer);
}