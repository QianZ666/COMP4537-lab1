export class FormValidator {
    constructor(min,max) {
        this.min = min;
        this.max = max;   
    }

    validate(input) {
        const number = Number(input);
        if (Number.isNaN(number)){
            return false;
        }
        if(number > this.max || number < this.min){
            return false;
        }
        if(!Number.isInteger(number)){
            return false;
        }
        return  true;
        
    }
}