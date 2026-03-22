package lemos.module;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lemos.util.StringHelper;

import java.util.List;
import java.util.Objects;

public class Condition
{
    public final String          errorMessage;
    public final List<Operation> terms;

    @JsonCreator
    public Condition(@JsonProperty("errorMessage") String errorMessage,
                     @JsonProperty("terms") List<Operation> terms)
    {
        this.errorMessage = Objects.requireNonNullElse(errorMessage, "");
        this.terms   = Objects.requireNonNull(terms, "Missing required attribute 'terms'");
    }

    public String generateTransitionConditionJS(String target)
    {
        String template = """
                             if(!({{terms}}))
                             {
                               Module.log(`Condition for transition to {{target}} not met`);
                               {{failWithErrorMessage}}
                             }
                          """;
        return performReplacements(template).replace("{{target}}", target);
    }

    public String generateFieldRestrictionJS(String fieldName)
    {
        String template = """
                          if (!({{terms}}))
                          {
                            throw new ValidationError(`{{errorMessage}}`);
                          }
                          """;
        return performReplacements(template).replace("{{fieldName}}", fieldName);
    }

    private String performReplacements(String string)
    {
        return string.replace("{{terms}}", generateConditionJS(terms))
                     .replace("{{errorMessage}}", StringHelper.escape(errorMessage))
                     .replace("{{failWithErrorMessage}}", getErrorMessageFail());
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

    private String getErrorMessageFail()
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

    @Override
    public String toString()
    {
        return getClass().getSimpleName() + ":" +
               "\n\t" + "errorMessage: '" + StringHelper.get(errorMessage) + '\'' +
               "\n\t" + "terms: " + StringHelper.get(terms);
    }
}
