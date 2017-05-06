import {templates} from '../utils/templates.js';

export function profileController() {

    var user = firebase.auth().currentUser
    templates.get('profile')
        .then((res) => {

            user.updateProfile({
                displayName: "Vanko",
                photoURL: ""
            });
            let hbTemplate = Handlebars.compile(res);
            let template = hbTemplate(user);

            $('#content').html(template);
            let profilePic = document.getElementById('profilePic');
        });
    var markup = document.documentElement.innerHTML;
    console.log(markup);
    var changePicBtn = document.getElementById("changePic");
    changePicBtn.addEventListener('click', function () {
        document.getElementById('changePicContainer').style.display('');
    })
}

function addProfilePicFunction() {

}