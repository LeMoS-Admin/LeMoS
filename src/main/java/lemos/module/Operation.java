package lemos.module;

import com.fasterxml.jackson.annotation.JsonCreator;
import lemos.util.StringHelper;

import java.util.List;
import java.util.Objects;

public class Operation
{
    public final String operation;

    // Erzeugung läuft hier über Konstruktor, da in Konfigurationsdatei kein Variablenname angegeben wird:
    // (in YAML: "- <<Befehl>>" statt "- operation: <<Befehl>>")
    @JsonCreator
    public Operation(String operation)
    {
        this.operation = Objects.requireNonNull(operation, "Missing required attribute 'operation'");
    }

    public static String generateActionJS(List<Operation> actions)
    {
        StringBuilder actionsJS = new StringBuilder();
        for (Operation action : actions)
        {
            actionsJS.append(action.getOperationJS()).append("\n");
        }
        return actionsJS.toString();
    }

    public String getOperationJS()
    {
        return operation.trim();
    }

    @Override
    public String toString()
    {
        return getClass().getSimpleName() + ": '" + StringHelper.get(operation) + "'";
    }
}
