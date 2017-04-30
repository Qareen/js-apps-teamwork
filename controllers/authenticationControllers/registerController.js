import { templates } from '../../utils/templates.js';
import { validator } from '../../utils/validator.js';

export function registerController() {
    templates.get('authentication/register')
        .then((res) => {
            let hbTemplate = Handlebars.compile(res);
            let template = hbTemplate();

            $('#content').html(template);

            $('#register-button').on('click', () => {
                let credentials = validateData();
                if (credentials) {
                    firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
                        .catch((err) => {
                            toastr.error(err.message);
                        });

                    firebase.auth().onAuthStateChanged((user) => {
                        if (user) {
                            toastr.success('You registered successfully. You are now logged in.');
                            window.location.href = "/#/home";
                        }
                    });
                }
            })
        });
}

function validateData() {
    let credentials = {
        email: "",
        password: ""
    }

    if (validator.email($('#email').val())) {
        credentials.email = $('#email').val();
    } else {
        toastr.error('Invalid email.');
        return;
    }

    if (validator.password($('#password').val())) {
        if ($('#password').val() === $('#confirm-password').val()) {
            credentials.password = $('#password').val()
        } else {
            toastr.error('Passwords doesn\'t match.');
            return;
        }
    } else {
        toastr.error('Password should contain atleast one number and one letter and be between 6 and 16 symbols long.');
        return;
    }

    return credentials;
}