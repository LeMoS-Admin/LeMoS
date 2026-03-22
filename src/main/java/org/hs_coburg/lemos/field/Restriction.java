package org.hs_coburg.lemos.field;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.module.Operation;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.List;
import java.util.Objects;

public class Restriction
{
    public final String          message;
    public final List<Operation> terms;
    @JsonIgnore
    public       String          fieldName = "";

    @JsonCreator
    public Restriction(@JsonProperty("message") String message,
                       @JsonProperty("terms") List<Operation> terms)
    {
        this.message = Objects.requireNonNullElse(message, "");
        this.terms   = Objects.requireNonNull(terms, "Missing required attribute 'terms'");
    }

    public String asJavaScriptOperation()
    {
        StringBuilder builder = new StringBuilder();
        builder.append("if (!(");
        if (terms.size() == 1)
        {
            builder.append(terms.getFirst().asJavaScriptOperation());
        }
        else
        {
            for (Operation term : terms)
            {
                builder.append("(");
                builder.append(term.asJavaScriptOperation());
                builder.append(") &&\n");
            }
            builder.delete(builder.length() - 3, builder.length());
        }
        builder.append(")){\n");
        builder.append("alert('");
        builder.append(fieldName);
        builder.append(": ");
        builder.append(message);
        builder.append("');\n");
        builder.append("throw new Error('");
        builder.append(fieldName);
        builder.append(": ");
        builder.append(message);
        builder.append("');\n");
        builder.append("}\n");
        return builder.toString();
    }

    @Override
    public String toString()
    {
        return "Restriction:" +
               "\n\t" + "message: '" + StringHelper.get(message) + '\'' +
               "\n\t" + "terms: " + StringHelper.get(terms);
    }
}
