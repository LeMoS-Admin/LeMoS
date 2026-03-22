package org.hs_coburg.lemos.general;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.module.Operation;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.Objects;

public class Variable
{
    public final String    name;
    public final String    value;
    public final Operation initialisation;
    public final Boolean   isConstant;

    public Variable(@JsonProperty("name") String name,
                    @JsonProperty("value") String value,
                    @JsonProperty("initialisation") Operation initialisation,
                    @JsonProperty("isConstant") Boolean isConstant)
    {
        this.name           = Objects.requireNonNull(name, "Missing required attribute 'name'");
        this.value          = Objects.requireNonNullElse(value, "");
        this.initialisation = Objects.requireNonNullElse(initialisation, new Operation(""));
        this.isConstant     = Objects.requireNonNullElse(isConstant, false);
        validate();
    }

    private void validate()
    {
        if (name.startsWith("_"))
        {
            throw new RuntimeException("Names of variables must not start with underscores");
        }
        if (!value.isEmpty() && !initialisation.operation.isEmpty())
        {
            throw new RuntimeException("Combination of the attributes 'value' and 'initialisation' is not allowed");
        }
        if (isConstant && value.isEmpty() && initialisation.operation.isEmpty())
        {
            throw new RuntimeException("Constant variables require either the attribute 'value' or 'initialisation'");
        }
    }

    public String generateVariableJS()
    {
        String template = "let {{name}} = new GlobalVariable('{{name}}', {{content}}, {{isConstant}});";
        return template.replace("{{name}}", name)
                       .replace("{{content}}", getContent())
                       .replace("{{isConstant}}", Boolean.toString(isConstant));
    }

    private String getContent()
    {
        if (!value.isEmpty())
        {
            return "'" + StringHelper.escape(value) + "'";
        }
        if (initialisation.operation.isEmpty())
        {
            return "undefined";
        }
        else
        {
            return initialisation.getOperationJS();
        }
    }

    @Override
    public String toString()
    {
        return getClass().getSimpleName() + ":" +
               "\n\t" + "name: " + StringHelper.get(name) +
               "\n\t" + "value: " + StringHelper.get(value) +
               "\n\t" + "initialisation: " + StringHelper.get(initialisation) +
               "\n\t" + "isConstant: " + StringHelper.get(isConstant);
    }
}
