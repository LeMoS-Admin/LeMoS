package org.hs_coburg.lemos.general;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.module.Operation;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.Objects;

public class Variable
{
    public final String    name;
    public final Operation value;
    public final Boolean   isConstant;

    public Variable(@JsonProperty("name") String name,
                    @JsonProperty("value") Operation value,
                    @JsonProperty("isConstant") Boolean isConstant)
    {
        this.name       = Objects.requireNonNull(name, "Missing required attribute 'name'");
        this.value      = Objects.requireNonNullElse(value, new Operation("undefined"));
        this.isConstant = Objects.requireNonNullElse(isConstant, false);
    }

    public String generateVariableJS()
    {
        String template = "let {{name}} = new GlobalVariable('{{name}}', {{value}}, {{isConstant}})";
        return template.replace("{{name}}", name)
                       .replace("{{value}}", value.getOperationJS())
                       .replace("{{isConstant}}", Boolean.toString(isConstant));
    }

    @Override
    public String toString()
    {
        return getClass().getSimpleName() + ":" +
               "\n\t" + "name: " + StringHelper.get(name) +
               "\n\t" + "value: " + StringHelper.get(value) +
               "\n\t" + "isConstant: " + StringHelper.get(isConstant);
    }
}
