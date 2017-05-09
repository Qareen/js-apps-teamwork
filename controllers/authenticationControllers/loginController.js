import {templates} from '../../utils/templates.js';

export function loginController() {
    firebase.auth().onAuthStateChanged(changeAuthState);
<<<<<<< HEAD
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
                    });

                    $(document).keypress((e) => {
                        if (e.charCode === 13) {
                            $('#login-button').trigger('click');
                        }
                    });
                });
        }
    })
=======
>>>>>>> b8484ddc52b9faae54a9d9bac90138b1cdd13683
}

function changeAuthState(user) {
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
                });

                $(document).keypress((e) => {
                if (e.charCode === 13) {
                    $('#login-button').trigger('click');
                }
            });
            });
    }
};

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