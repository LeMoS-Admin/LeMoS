package org.hs_coburg.lemos.state;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.Objects;

public class Transition
{
    public final String    target;
    public final String    comment;
    public final Condition condition;

    @JsonCreator
    public Transition(@JsonProperty("target") String target,
                      @JsonProperty("comment") String comment,
                      @JsonProperty("condition") Condition condition)
    {
        this.target    = Objects.requireNonNull(target, "Missing required attribute 'target'");
        this.comment   = Objects.requireNonNullElse(comment, "");
        this.condition = Objects.requireNonNullElse(condition, new Condition(null, null));
    }

    public String asJavaScriptOperation()
    {
        String result = "return " + State.getStateCall(target) + ";\n";
        if (!condition.terms.isEmpty())
        {
            result = "if(" + condition.asJavaScriptOperation() + "){\n" +
                     result +
                     "}\n";
        }
        return result;
    }

    @Override
    public String toString()
    {
        return "Transition:" +
               "\n\t" + "target: " + StringHelper.get(target) +
               "\n\t" + "comment: '" + StringHelper.get(comment) + '\'' +
               "\n\t" + "condition: " + StringHelper.get(condition);
    }
}
