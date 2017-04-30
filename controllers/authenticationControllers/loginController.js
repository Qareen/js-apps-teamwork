import { templates } from '../../utils/templates.js';

export function loginController() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            window.location.href = "/#/home";
        } else {
            templates.get('authentication/login')
                .then((res) => {
                    let hbTemplate = Handlebars.compile(res);
                    let template = hbTemplate();

                    $('#content').html(template);

                    $('#login-button').on('click', () => {
                        let credentials = validateData();
                        if (credentials) {
                            authenticateUser(credentials);
                        }
                    })
                });
        }
    })
}

function validateData() {
    let credentials = {
        email: "",
        password: ""
    }

    if ($('#email').val()) {
        credentials.email = $('#email').val();
    } else {
        toastr.error('Email field cannot be left blank.');
        return;
    }

    if ($('#password').val()) {
        credentials.password = $('#password').val();
    } else {
        toastr.error('Password field cannot be left blank.');
        return;
    }

    return credentials;
}

function authenticateUser(credentials) {
    firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        .catch((err) => {
            toastr.error(err.message);
        });
}