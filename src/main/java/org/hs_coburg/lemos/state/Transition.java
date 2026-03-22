package org.hs_coburg.lemos.state;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.module.Condition;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class Transition
{
    public final String          target;
    public final String          name;
    public final String          explanation;
    public final List<Condition> conditions;

    @JsonCreator
    public Transition(@JsonProperty("target") String target,
                      @JsonProperty("name") String name,
                      @JsonProperty("explanation") String explanation,
                      @JsonProperty("conditions") List<Condition> conditions)
    {
        this.target      = Objects.requireNonNull(target, "Missing required attribute 'target'");
        this.name        = Objects.requireNonNullElse(name, "");
        this.explanation = Objects.requireNonNullElse(explanation, "");
        this.conditions  = Objects.requireNonNullElse(conditions, Collections.emptyList());
    }

    public String generateTransitionJS()
    {
        String template;
        if (conditions.isEmpty())
        {
            template = """
                       Logger.log("Transition to {{target}}{{name}}{{explanation}}");
                       return {{stateFunctionCall}};
                       """;
        }
        else
        {
            template = """
                       Logger.log("Trying transition to {{target}}{{name}}{{explanation}}");
                       {{conditions}}
                       {
                         Logger.log("Transition to {{target}}{{name}}{{explanation}}")
                         return {{stateFunctionCall}};
                       }
                       """;
        }
        return performReplacements(template);
    }

    private String performReplacements(String string)
    {
        return string.replace("{{target}}", StringHelper.escape(target))
                     .replace("{{name}}", StringHelper.escape(getName()))
                     .replace("{{explanation}}", StringHelper.escape(getExplanation()))
                     .replace("{{conditions}}", generateConditionsJS())
                     .replace("{{stateFunctionCall}}", State.generateStateFunctionCallJS(target));
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

    private String generateConditionsJS()
    {
        StringBuilder conditionsJS = new StringBuilder();
        for (Condition condition : conditions)
        {
            conditionsJS.append(condition.generateTransitionConditionJS(target));
            conditionsJS.append("else");
        }
        return conditionsJS.toString();
    }

    @Override
    public String toString()
    {
        return getClass().getSimpleName() + ":" +
               "\n\t" + "target: " + StringHelper.get(target) +
               "\n\t" + "name: '" + StringHelper.get(name) + "'" +
               "\n\t" + "explanation: '" + StringHelper.get(explanation) + "'" +
               "\n\t" + "conditions: " + StringHelper.get(conditions);
    }
}
