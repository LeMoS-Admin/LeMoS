package org.hs_coburg.lemos;

import com.fasterxml.jackson.annotation.JsonCreator;

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

    public String asJavaScriptOperation()
    {
        if (operation.trim().matches("[^=\\s]+\\s*=[^=]*"))
        {
            return operation.replaceFirst("\\s*=", ".setValue(") + ")";
        }
        return operation.replace("==", "===").replace("!=", "!==");
    }

    @Override
    public String toString()
    {
        return "Operation: '" + StringHelper.get(operation) + '\'';
    }
}
