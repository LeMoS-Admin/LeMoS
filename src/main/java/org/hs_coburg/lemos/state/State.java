package org.hs_coburg.lemos.state;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.module.LearningModule;
import org.hs_coburg.lemos.module.Operation;
import org.hs_coburg.lemos.util.StringHelper;

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

    public static State findState(String stateID)
    {
        State state = LearningModule.get().states.stream().filter(s -> s.id.equals(stateID)).findFirst().orElse(null);
        if (state != null)
        {
            return state;
        }
        else
        {
            throw new RuntimeException("No state with id " + stateID + " found");
        }
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
        String template = """
                          function {{functionName}}
                          {
                            States._currentStateID = `{{id}}`;
                            States._currentStateName = `{{name_plain}}`;
                            States._currentStateExplanation = `{{explanation_plain}}`;
                            (() => {
                              {{actions}}
                            })();
                            Module.log(`Reached state {{id}}{{name}}{{explanation}}`);
                            {{explanationPrint}}
                            _nextTransition = () => {
                              States._lastStateID = `{{id}}`;
                              States._lastStateName = `{{name_plain}}`;
                              States._lastStateExplanation = `{{explanation_plain}}`;
                              {{transitions}}
                              {{error}}
                            }
                            return {{importance}};
                          }
                          """;
        return performReplacements(template);
    }

    private String performReplacements(String string)
    {
        return string.replace("{{id}}", StringHelper.escape(id))
                     .replace("{{name}}", StringHelper.escape(getName()))
                     .replace("{{name_plain}}", StringHelper.escape(name))
                     .replace("{{explanation}}", StringHelper.escape(getExplanation()))
                     .replace("{{explanation_plain}}", StringHelper.escape(explanation))
                     .replace("{{explanationPrint}}", getExplanationPrint())
                     .replace("{{type}}", type.asName())
                     .replace("{{importance}}", getImportance())
                     .replace("{{actions}}", Operation.generateActionJS(actions))
                     .replace("{{transitions}}", generateTransitionsJS())
                     .replace("{{error}}", getError())
                     .replace("{{functionName}}", generateFunctionCallJS());
    }

    private String getName()
    {
        if (name.isEmpty())
        {
            return "";
        }
        else
        {
            return ": " + name;
        }
    }

    private String getExplanation()
    {
        if (explanation.isEmpty())
        {
            return "";
        }
        else
        {
            return " (" + explanation + ")";
        }
    }

    private String getExplanationPrint()
    {
        if (explanation.isEmpty())
        {
            return "";
        }
        else
        {
            return "Module.print(`" + StringHelper.escape(explanation) + "`);";
        }
    }

    private String getImportance()
    {
        if (transitions.isEmpty())
        {
            return "9";
        }
        else
        {
            return Integer.toString(importance.asNumber());
        }
    }

    private String getError()
    {
        if (errorMessage.isEmpty())
        {
            return "";
        }
        else
        {
            return "Module.fail(`" + StringHelper.escape(errorMessage) + "`);";
        }
    }

    private String generateTransitionsJS()
    {
        if (transitions.isEmpty())
        {
            return """
                   Module.log("No further transitions, learning module is completed");
                   return -1;
                   """;
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
            transitionsJS.append(transition.generateTransitionJS());
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
            transitionsJS.append("""
                                 Module.log("No suitable transition, staying in current state");
                                 return -1;
                                 """);
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
