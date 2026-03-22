package state;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import util.StringHelper;

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
        this.target    = Objects.requireNonNull(target, "Missing required attribute 'heading'");
        this.comment   = Objects.requireNonNullElse(comment, "");
        this.condition = Objects.requireNonNullElse(condition, new Condition(null, null));
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
