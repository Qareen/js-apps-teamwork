import { controllers } from './controllers/controllers.js';

let router = new Navigo(null, true);

router
    .on('/', () => { router.navigate('/home') })
    .on('/home', () => {
        controllers.header();
        controllers.home();
    })
    .on('/register', () => {
        controllers.register();
    })
    .on('/login', () => {
        controllers.login();
    })
    .on('/profile', () => {
        controllers.profile();
    })
    .on('/category', (params, query) => {
        controllers.categories(query);
    })
    .notFound(() => {
        router.navigate('/home');
    })
    .resolve();