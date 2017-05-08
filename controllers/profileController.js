import {templates} from '../utils/templates.js';

export function profileController() {

    let user = firebase.auth().currentUser;
    templates.get('profile')
        .then((res) => {

            let hbTemplate = Handlebars.compile(res);
            let template = hbTemplate(user);

            $('#content').html(template);

            let savePicBtn = document.getElementById('savePicBtn');
            savePicBtn.addEventListener('click', function () {
                editPictureUrl(user);
                // location.reload();
            });

            let cancelPicBtn = document.getElementById('cancelPicBtn');
            let changePicContainer = document.getElementById('changePicContainer');
            cancelPicBtn.addEventListener('click', function () {
                hide(changePicContainer);
            });

            let changePicBtn = document.getElementById('changePicBtn');
            changePicBtn.addEventListener('click', function () {
                show(changePicContainer);
            });

            let editEmailBtn = document.getElementById('editEmailBtn');
            let changeEmailContainer = document.getElementById('changeEmailContainer');
            editEmailBtn.addEventListener('click', function () {
                show(changeEmailContainer);
            });

            let cancelEmailBtn = document.getElementById('cancelEmailBtn');
            cancelEmailBtn.addEventListener('click', function () {
                hide(changeEmailContainer);
            });

            let saveEmailBtn = document.getElementById('saveEmailBtn');
            saveEmailBtn.addEventListener('click', function () {
                editEmail(user);
                hide(changeEmailContainer);
            });

            let editNameBtn = document.getElementById('editNameBtn');
            let changeNameContainer = document.getElementById('changeNameContainer');
            editNameBtn.addEventListener('click', function () {
                show(changeNameContainer);
            });

            let cancelNameBtn = document.getElementById('cancelNameBtn');
            cancelNameBtn.addEventListener('click', function () {
                hide(changeNameContainer);
            });

            let saveNameBtn = document.getElementById('saveNameBtn');
            saveNameBtn.addEventListener('click', function () {
                editName(user);
            })
        });
}
function show(element) {
    element.style.display = "inline";
}

function hide(element) {
    element.style.display = "none";
}

function editEmail(user) {
    let emailTextBox = document.getElementById('emailTextBox');
    let email = emailTextBox.value;
    user.updateEmail(email);
}

function editName(user) {
    let nameTextBox = document.getElementById('nameTextBox');
    let name = nameTextBox.value;

    if (name === user.displayName) {
        toastr.warning("The name you entered and your current display are the same!");
    }

    else if (!name || name.length < 3) {
        toastr.warning("The name cannot be less than 3 symbols of length!");
    }

    else {
        user.updateProfile({
            displayName: name
        });
        toastr.success("Your display name has been successfully changed");
        location.reload();
    }
}

function editPictureUrl(user) {
    const changePicContainer = document.getElementById('changePicContainer');
    const pattern = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

    let urlTextBox = document.getElementById('urlTextBox');
    let url = urlTextBox.value;

    if (url === user.photoURL) {
        toastr.warning("Your current profile picture has the same URL!");
    }


    else if (pattern.test(url) == true) {
        user.updateProfile({
            photoURL: url
        });
        toastr.success('The profile picture has been successfully changed!');
    }

    else {
        toastr.error('Invalid URL!');
        return;
    }
}