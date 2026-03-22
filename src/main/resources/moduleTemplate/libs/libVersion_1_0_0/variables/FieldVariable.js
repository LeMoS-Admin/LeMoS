import {Variable} from "./Variable.js";

export class FieldVariable extends Variable {
    static fieldVariables = [];
    name;

    constructor(name) {
        super();
        FieldVariable.fieldVariables[FieldVariable.fieldVariables.length] = this;
        this.name = name;
    }

    static getAllFieldVariables() {
        return FieldVariable.fieldVariables;
    }

    valueOf() {
        return document.getElementById(this.name).value;
    }

    setValue(v) {
        document.getElementById(this.name).value = v;
    }

    isEmpty() {
        return this.valueOf() === "";
    }
}