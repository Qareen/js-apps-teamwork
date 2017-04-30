import { templates } from '../utils/templates.js';
import { homeController } from './homeController.js';

export function headerController() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            templates.get('headers/authenticated')
                .then((res) => {
                    let hbTemplate = Handlebars.compile(res);
                    let template = hbTemplate();

                    $('#navbar-content').html(template);

                    $('#logout-button').on('click', () => {
                        firebase.auth().signOut()
                            .then(() => {
                                headerController();
                                homeController();
                            })
                    })
                });
        } else {
            templates.get('headers/unauthenticated')
                .then((res) => {
                    let hbTemplate = Handlebars.compile(res);
                    let template = hbTemplate();

                    $('#navbar-content').html(template);
                });
        }
    });
}