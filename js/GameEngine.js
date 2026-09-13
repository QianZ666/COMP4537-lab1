import { STRINGS } from "../lang/messages/en/user.js";
export class GameEngine {
    constructor(gameArea, userInterface) {
        this.gameArea = gameArea;
        this.userInterface = userInterface;
        this.buttons = [];
        this.expectedNumber = 1;
        this.timers = [];
    }

    createButtons(count){
        this.clearTimers();
        this.gameArea.innerHTML = "";
        this.buttons = [];
        this.expectedNumber = 1;

        for(let i=0; i < count; i++){
            const button = document.createElement("button")
            button.textContent = i + 1;
            button.dataset.number = i + 1;
            button.classList.add("game-button");
            button.style.backgroundColor = this.getRandomColor();
            this.gameArea.appendChild(button)
            this.buttons.push(button)
            
        }
    }

    getRandomColor() {
        const red = Math.floor(Math.random() * 156) + 100;
        const green = Math.floor(Math.random()  * 156) + 100;
        const blue = Math.floor(Math.random()  * 156) + 100;

        return `rgb(${red}, ${green}, ${blue})`;
    }

    scrambleOnce() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        for(let i = 0; i < this.buttons.length; i++){
            const randomX = Math.random() * (width - this.buttons[i].offsetWidth);
            const randomY = Math.random() * (height - this.buttons[i].offsetHeight);
            this.buttons[i].style.margin = "0";
            this.buttons[i].style.position = "absolute";
            this.buttons[i].style.left = randomX + "px";
            this.buttons[i].style.top = randomY + "px";
        }
    }

    scramble(){
        const buttonCount = this.buttons.length;

        for(let i = 0; i < buttonCount; i++){
            const timerId = setTimeout(() =>{
                this.scrambleOnce();
                if(i === buttonCount - 1){
                    this.hideNumbers();
                    this.enableButtonClicks();
                }
            },buttonCount * 1000 + i * 2000);
            this.timers.push(timerId);
        }
    }

    hideNumbers(){
        for(let i = 0; i < this.buttons.length; i++){
            this.buttons[i].textContent = "";
        }

    }

    enableButtonClicks(){
        for(let i = 0; i < this.buttons.length; i++){
            const button = this.buttons[i];
            button.addEventListener("click",() => {

               const result = this.checkButton(button);

               if (result === "win") {
                    this.userInterface.showMessage(
                        STRINGS.EXCELLENT_MEMORY
                    );
                    this.disableButtons();
               }
                if (result === "wrong") {
                    this.userInterface.showMessage(
                        STRINGS.WRONG_ORDER
                    );
                    this.revealNumbers();
                    this.disableButtons();
                }
            });
        }
    }

    checkButton(button){
        const clickedNumber = Number(button.dataset.number);

        if(clickedNumber === this.expectedNumber){
            button.textContent = clickedNumber;
            this.expectedNumber++;

            if(this.expectedNumber > this.buttons.length){
                return "win";
            }

            return "continue";
        }

        return  "wrong";
    }

    revealNumbers(){
        for(let i = 0; i < this.buttons.length; i++){
            this.buttons[i].textContent = this.buttons[i].dataset.number;
        }
    }

    disableButtons(){
        for(let i = 0; i < this.buttons.length; i++){
            this.buttons[i].disabled = true;
        }
    }

    clearTimers(){
        for(let i = 0; i < this.timers.length;i++){
            clearTimeout(this.timers[i]);
        }

        this.timers = [];
    }

}