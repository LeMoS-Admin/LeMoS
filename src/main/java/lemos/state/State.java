package lemos.state;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lemos.module.LearningModule;
import lemos.module.Operation;
import lemos.util.StringHelper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class State
{
    public final String           id;
    public final String           name;
    public final String           explanation;
    public final StateImportance  importance;
    public final StateType        type;
    public final List<Operation>  actions;
    public final List<Transition> transitions;
    public final String           errorMessage;

    @JsonCreator
    public State(@JsonProperty("id") String id,
                 @JsonProperty("name") String name,
                 @JsonProperty("explanation") String explanation,
                 @JsonProperty("type") StateType type,
                 @JsonProperty("importance") StateImportance importance,
                 @JsonProperty("actions") List<Operation> actions,
                 @JsonProperty("transitions") List<Transition> transitions,
                 @JsonProperty("errorMessage") String errorMessage)
    {
        this.id           = Objects.requireNonNull(id, "Missing required attribute 'id'");
        this.name         = Objects.requireNonNullElse(name, id);
        this.explanation  = Objects.requireNonNullElse(explanation, "");
        this.type         = Objects.requireNonNullElse(type, StateType.STATE);
        this.transitions  = Objects.requireNonNullElse(transitions, Collections.emptyList());
        this.errorMessage = Objects.requireNonNullElse(errorMessage, "");
        if (this.type == StateType.JUNCTION)
        {
            this.importance = StateImportance.ZERO;
            this.actions    = Collections.emptyList();
        }
        else
        {
            this.importance = Objects.requireNonNullElse(importance, StateImportance.HIGH);
            this.actions    = Objects.requireNonNullElse(actions, Collections.emptyList());
        }
        validate();
    }

    private void validate()
    {
        if (id.matches(".*\\s.*"))
        {
            throw new RuntimeException("IDs of states must not contain whitespaces");
        }
        if (id.startsWith("_"))
        {
            throw new RuntimeException("IDs of states must not start with underscores");
        }
        if (transitions.stream()
                       .filter(t -> t.conditions.isEmpty())
                       .count() > 1)
        {
            throw new RuntimeException("Only one transition per state can be unconditionally");
        }
    }

    public String generateStateFunctionJS()
    {
        String template = "new State('{{id}}', '{{name}}', '{{explanation}}', {{stepSize}}, '{{errorMessage}}', () => {\n{{actions}}}, () => {\n{{transitions}}});\n";
        return performReplacements(template);
    }

    private String performReplacements(String string)
    {
        return string.replace("{{id}}", StringHelper.escape(id))
                     .replace("{{name}}", StringHelper.escape(name))
                     .replace("{{explanation}}", StringHelper.escape(explanation))
                     .replace("{{stepSize}}", getStepSize())
                     .replace("{{actions}}", Operation.generateActionJS(actions))
                     .replace("{{transitions}}", generateTransitionsJS())
                     .replace("{{errorMessage}}", StringHelper.escape(errorMessage));
    }

    private String getStepSize()
    {
        if (transitions.isEmpty())
        {
            return "9";
        }
        else
        {
            return Integer.toString(importance.asStepSize());
        }
    }

    private String generateTransitionsJS()
    {
        if (transitions.isEmpty())
        {
            return "return null;";
        }

        StringBuilder transitionsJS     = new StringBuilder();
        Transition    defaultTransition = null;
        for (Transition transition : transitions)
        {
            if (transition.conditions.isEmpty())
            {
                // Unbedingter Übergang muss am Schluss stehen
                defaultTransition = transition;
                continue;
            }
            transitionsJS.append(transition.generateTransitionJS()).append("\n");
        }

        // Festlegen des Verhaltens im Fall, dass keiner der bedingten Übergänge (Transitions) erfolgen konnte (ELSE-Fall)
        if (defaultTransition != null)
        {
            // Falls ein unbedingter Übergang definiert wurde, wird er nun ELSE-Fall ergänzt
            transitionsJS.append(defaultTransition.generateTransitionJS());
        }
        else
        {
            // Falls kein unbedingter Übergang definiert wurde, wird als ELSE-Fall '-1' zurückgegeben (kein Übergang möglich)
            transitionsJS.append("return null;");
        }
        return transitionsJS.toString();
    }

    public String generateFunctionCallJS()
    {
        return String.format("_state_%s()", StringHelper.escape(id));
    }

    @Override
    public String toString()
    {
        return type.asName() +
               "\n\t" + "id: '" + StringHelper.get(id) + '\'' +
               "\n\t" + "name: '" + StringHelper.get(name) + '\'' +
               "\n\t" + "explanation: '" + StringHelper.get(explanation) + '\'' +
               "\n\t" + "importance: " + StringHelper.get(importance) +
               "\n\t" + "action: " + StringHelper.get(actions) +
               "\n\t" + "transitions: " + StringHelper.get(transitions);
    }
}
