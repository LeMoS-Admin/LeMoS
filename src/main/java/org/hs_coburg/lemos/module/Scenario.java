package org.hs_coburg.lemos.module;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.List;
import java.util.Objects;

public class Scenario
{
    public final String          name;
    public final String          description;
    public final String          comment;
    public final List<Operation> initialization;

    @JsonCreator
    public Scenario(@JsonProperty("name") String name,
                    @JsonProperty("description") String description,
                    @JsonProperty("comment") String comment,
                    @JsonProperty("initialization") List<Operation> initialization)
    {
        this.name           = Objects.requireNonNull(name, "Missing required attribute 'name'");
        this.description    = Objects.requireNonNullElse(description, name);
        this.comment        = Objects.requireNonNullElse(comment, name);
        this.initialization = Objects.requireNonNull(initialization, "Missing required attribute 'initialization'");
    }

    public String asHTMLOption()
    {
        return String.format("<option value='%s'>%s</option>", name, name);
    }

    public String asJavaScriptCase()
    {
        StringBuilder builder = new StringBuilder("case '");
        builder.append(name);
        builder.append("' : \n");
        for (Operation operation : initialization)
        {
            builder.append(operation.asJavaScriptOperation());
            builder.append(";\n");
        }
        builder.append("break;\n");
        return builder.toString();
    }

    @Override
    public String toString()
    {
        return "Scenario:" +
               "\n\t" + "name: '" + StringHelper.get(name) + '\'' +
               "\n\t" + "description: '" + StringHelper.get(description) + '\'' +
               "\n\t" + "comment: '" + StringHelper.get(comment) + '\'' +
               "\n\t" + "initialization: " + StringHelper.get(initialization);
    }
}
