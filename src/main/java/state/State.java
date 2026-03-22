package state;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import util.Operation;
import util.StringHelper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class State
{
    public final String           name;
    public final String           description;
    public final String           comment;
    public final StateImportance  importance;
    public final StateType        type;
    public final List<Operation>  action;
    public final List<Transition> transitions;

    @JsonCreator
    public State(@JsonProperty("name") String name,
                 @JsonProperty("description") String description,
                 @JsonProperty("comment") String comment,
                 @JsonProperty("importance") StateImportance importance,
                 @JsonProperty("type") StateType type,
                 @JsonProperty("action") List<Operation> action,
                 @JsonProperty("transitions") List<Transition> transitions)
    {
        this.name        = Objects.requireNonNull(name, "Missing required attribute 'name'");
        this.description = Objects.requireNonNullElse(description, name);
        this.comment     = Objects.requireNonNullElse(comment, "");
        this.importance  = Objects.requireNonNullElse(importance, StateImportance.HIGH);
        this.type        = Objects.requireNonNullElse(type, StateType.STATE);
        this.action      = Objects.requireNonNullElse(action, Collections.emptyList());
        this.transitions = Objects.requireNonNullElse(transitions, Collections.emptyList());
    }

    @Override
    public String toString()
    {
        return type.normalCase +
               "\n\t" + "name: '" + StringHelper.get(name) + '\'' +
               "\n\t" + "description: '" + StringHelper.get(description) + '\'' +
               "\n\t" + "comment: '" + StringHelper.get(comment) + '\'' +
               "\n\t" + "importance: " + StringHelper.get(importance) +
               "\n\t" + "action: " + StringHelper.get(action) +
               "\n\t" + "transitions: " + StringHelper.get(transitions);
    }
}
