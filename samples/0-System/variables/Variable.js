export class Variable {
    valueOf() {
    };

    setValue(v) {
    };

    isEmpty() {
        return this.valueOf() === "";
    }
}