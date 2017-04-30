import { templates } from '../utils/templates.js';

export function homeController() {
    templates.get('home')
        .then((res) => {
            let hbTemplate = Handlebars.compile(res);
            let template = hbTemplate();

            $('#content').html(template);
        })

}