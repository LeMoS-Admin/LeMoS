package org.hs_coburg.lemos.general;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.module.Operation;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class Function
{
    public final String          name;
    public final List<String>    parameters;
    public final List<Operation> implementation;

    public Function(@JsonProperty("name") String name,
                    @JsonProperty("parameters") List<String> parameters,
                    @JsonProperty("implementation") List<Operation> implementation)
    {
        this.name           = Objects.requireNonNull(name, "Missing required attribute 'name'");
        this.parameters     = Objects.requireNonNullElse(parameters, Collections.emptyList());
        this.implementation = Objects.requireNonNull(implementation, "Missing required attribute 'implementation'");
        validate();
    }

    private void validate()
    {
        if (name.startsWith("_"))
        {
            throw new RuntimeException("Names of functions must not start with underscores");
        }
    }

    public String generateFunctionJS()
    {
        String template = """
                          static {{name}}({{parameters}})
                          {
                            {{implementation}}
                          }
                          """;
        return template.replace("{{name}}", name)
                       .replace("{{parameters}}", getParameters())
                       .replace("{{implementation}}\n", Operation.generateActionJS(implementation));
    }

    private String getParameters()
    {
        if (parameters.isEmpty())
        {
            return "";
        }
        else
        {
            StringBuilder params = new StringBuilder();
            parameters.forEach(param -> params.append(StringHelper.escape(param)).append(", "));
            return params.substring(0, params.length() - 2);
        }
    }

    @Override
    public String toString()
    {
        return getClass().getSimpleName() + ":" +
               "\n\t" + "name: " + StringHelper.get(name) +
               "\n\t" + "parameters: " + StringHelper.get(parameters) +
               "\n\t" + "implementation: " + StringHelper.get(implementation);
    }
}
