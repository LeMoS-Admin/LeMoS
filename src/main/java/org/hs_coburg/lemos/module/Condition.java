package org.hs_coburg.lemos.module;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.List;
import java.util.Objects;

public class Condition
{
    public final String          message;
    public final List<Operation> terms;

    @JsonCreator
    public Condition(@JsonProperty("message") String message,
                     @JsonProperty("terms") List<Operation> terms)
    {
        this.message = Objects.requireNonNullElse(message, "");
        this.terms   = Objects.requireNonNull(terms, "Missing required attribute 'terms'");
    }

    private static String generateConditionJS(List<Operation> terms)
    {
        if (terms.isEmpty())
        {
            return "true";
        }
        if (terms.size() == 1)
        {
            return terms.getFirst().getOperationJS();
        }
        else
        {
            StringBuilder termsJS = new StringBuilder();
            for (Operation term : terms)
            {
                termsJS.append("(");
                termsJS.append(term.getOperationJS());
                termsJS.append(") && ");
            }
            termsJS.delete(termsJS.length() - 4, termsJS.length());
            return termsJS.toString();
        }
    }

    public String generateTransitionConditionJS(String target)
    {
        String template = """
                             if(!({{terms}}))
                             {
                               Module.log("Condition for transition to {{target}} not met");
                               {{alertMessage}}
                             }
                          """;
        return performReplacements(template).replace("{{target}}", target);
    }

    public String generateFieldRestrictionJS(String fieldName)
    {
        String template = """
                          if (!({{terms}}))
                          {
                            throw new ValidationError(`{{message}}`);
                          }
                          """;
        return performReplacements(template).replace("{{fieldName}}", fieldName);
    }

    private String performReplacements(String string)
    {
        return string.replace("{{terms}}", generateConditionJS(terms))
                     .replace("{{message}}", StringHelper.escape(message))
                     .replace("{{alertMessage}}", getAlertMesssage());
    }

    private String getAlertMesssage()
    {
        if (message.isEmpty())
        {
            return "";
        }
        else
        {
            return "Module.alert(`" + StringHelper.escape(message) + "`);";
        }
    }

    @Override
    public String toString()
    {
        return getClass().getSimpleName() + ":" +
               "\n\t" + "message: '" + StringHelper.get(message) + '\'' +
               "\n\t" + "terms: " + StringHelper.get(terms);
    }
}
