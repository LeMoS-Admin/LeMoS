import {Variable} from "./Variable.js";

export class PseudoVariable extends Variable
{
    value;

    constructor(value) {
        super();
        this.value = value;
    }

    valueOf() {
        return this.value;
    }

    setValue(v) {
        this.value = v;
    }
}