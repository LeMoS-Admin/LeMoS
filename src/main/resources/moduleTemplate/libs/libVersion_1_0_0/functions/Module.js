import {FieldVariable} from "../variables/FieldVariable.js";

export class Module {
    static filled(...variables) // Verteiler
    {
        if (variables.length === 0)
            return this.filled1();
        else
            return this.filled2(variables);
    }

    static filled1() {
        let result = [];
        for (let variable of FieldVariable.getAllFieldVariables()) {
            if (!variable.isEmpty()) {
                result[result.length] = variable;
            }
        }
        return result;
    }

    static filled2(variables) {
        //alert("Länge: " + variables.length);
        for (let variable of variables) {
            {
                if (variable.isEmpty())
                    return false;
            }
        }
        return true;
    }
}