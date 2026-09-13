import { STRINGS } from "../lang/messages/en/user.js";
export class AppController {
    constructor(userInterface,formValidator,gameEngine) {
        this.userInterface = userInterface;
        this.formValidator = formValidator;
        this.gameEngine = gameEngine;
    }

    initialize() {
        this.userInterface.onGoClick(() => {
            const input = this.userInterface.getUserInput();

            if (!this.formValidator.validate(input)) {
                this.userInterface.showMessage(STRINGS.INVALID_INPUT);
                return;
            }

            this.userInterface.showMessage("");
            const number = Number(input);
            this.gameEngine.createButtons(number);
            this.gameEngine.scramble();
    });
}
}