package org.hs_coburg.lemos.state;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.Operation;
import org.hs_coburg.lemos.StringHelper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class Condition
{
    public final String          name;
    public final List<Operation> terms;

    @JsonCreator
    public Condition(@JsonProperty("name") String name,
                     @JsonProperty("terms") List<Operation> terms)
    {
        this.name  = Objects.requireNonNullElse(name, "");
        this.terms = Objects.requireNonNullElse(terms, Collections.emptyList());
    }

    public String asJavaScriptOperation()
    {
        if (terms.size() == 1)
        {
            return terms.getFirst().asJavaScriptOperation();
        }
        else
        {
            StringBuilder builder = new StringBuilder();
            for (Operation term : terms)
            {
                builder.append("(");
                builder.append(term.asJavaScriptOperation());
                builder.append(") &&\n");
            }
            builder.delete(builder.length() - 3, builder.length());
            return builder.toString();
        }
    }

    @Override
    public String toString()
    {
        return "Condition:" +
               "\n\t" + "name: '" + StringHelper.get(name) + '\'' +
               "\n\t" + "terms: " + StringHelper.get(terms);
    }
}
