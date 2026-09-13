//ChatGPT was used as a learning aid to explain concepts,
//review code, and assist with debugging.
import { UserInterface } from "./UserInterface.js";
import { FormValidator } from "./FormValidator.js";
import { AppController } from "./AppController.js";
import { GameEngine } from "./GameEngine.js";

const userInterface = new UserInterface();
const formValidator = new FormValidator(3, 7);
const gameEngine =  new GameEngine(userInterface.gameArea, userInterface);
const appController = new AppController(
    userInterface,
    formValidator,
    gameEngine
);

appController.initialize();