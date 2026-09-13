import { STRINGS } from "../lang/messages/en/user.js";
export class UserInterface {
    constructor() {
        this.inputBox = document.getElementById("button-count");
        this.inputLabel = document.getElementById("input-label");
        this.goButton = document.getElementById("go-button");
        this.messageArea = document.getElementById("message");
        this.gameArea = document.getElementById("game-area");
        this.appTitle = document.getElementById("app-title");
        
        this.inputLabel.textContent = STRINGS.INPUT_PROMPT;
        this.goButton.textContent = STRINGS.GO_BUTTON;
        this.appTitle.textContent = STRINGS.APP_TITLE;
    }

    getUserInput(){
        return this.inputBox.value;
    }

    showMessage(message) {
        this.messageArea.textContent = message;
    }

    onGoClick(handler) {
        this.goButton.addEventListener("click", handler);
    }
}