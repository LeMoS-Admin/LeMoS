package org.hs_coburg.lemos.state;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.module.Operation;
import org.hs_coburg.lemos.util.StringHelper;

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
        validate();
    }

    public static String getStateCall(String stateName)
    {
        return String.format("_state_%s()", stateName);
    }

    private void validate()
    {
        if (!transitions.isEmpty() &&
            transitions.stream().filter(t -> t.condition.terms.isEmpty()).count() > 1)
        {
            throw new RuntimeException("Only one transition per org.hs_coburg.lemos.state can be unconditionally");
        }
    }

    public String asJavaScriptFunction()
    {
        StringBuilder builder = new StringBuilder("function ");
        builder.append(getStateCall(name)).append("{\n");
        builder.append("//alert('").append(name).append("');\n");
        builder.append("//alert('").append(description).append("');\n");
        for (Operation operation : action)
        {
            builder.append(operation.asJavaScriptOperation()).append(";\n");
        }

        builder.append("_nextTransition = () => {\n");
        builder.append("//alert('Übergang')\n");
        Transition defaultTransition = null;
        for (Transition transition : transitions)
        {
            if (transition.condition.terms.isEmpty())
            {
                defaultTransition = transition;
                break;
            }
            builder.append(transition.asJavaScriptOperation());
        }
        if (defaultTransition != null)
        {
            // defaultTransition muss der letzte Übergang sein
            builder.append(defaultTransition.asJavaScriptOperation());
        }
        else
        {
            // Wenn es keine defaultTransition gibt, wird -1 zurückgebeten (kein Übergang möglich)
            builder.append("return -1\n");
        }
        builder.append("}\n");

        if (type == StateType.JUNCTION)
        {
            builder.append("return 0;\n");
        }
        else
        {
            builder.append("return ").append(importance.asNumber()).append(";\n");
        }

        builder.append("}\n");

        return builder.toString();
    }

    @Override
    public String toString()
    {
        return type.asName() +
               "\n\t" + "name: '" + StringHelper.get(name) + '\'' +
               "\n\t" + "description: '" + StringHelper.get(description) + '\'' +
               "\n\t" + "comment: '" + StringHelper.get(comment) + '\'' +
               "\n\t" + "importance: " + StringHelper.get(importance) +
               "\n\t" + "action: " + StringHelper.get(action) +
               "\n\t" + "transitions: " + StringHelper.get(transitions);
    }
}
