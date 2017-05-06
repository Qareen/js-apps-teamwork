import { homeController } from './homeController.js';
import { headerController } from './headerController.js';
import { registerController } from './authenticationControllers/registerController.js';
import { loginController } from './authenticationControllers/loginController.js';
import { profileController } from './profileController.js';

export let controllers = {
    home: homeController,
    header: headerController,
    register: registerController,
    login: loginController,
    profile: profileController
}