package org.hs_coburg.lemos.scenario;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.field.Option;
import org.hs_coburg.lemos.module.Operation;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.List;
import java.util.Objects;

public class Scenario
{
    public final String          id;
    public final String          name;
    public final String          explanation;
    public final List<Operation> initialization;

    @JsonCreator
    public Scenario(@JsonProperty("id") String id,
                    @JsonProperty("name") String name,
                    @JsonProperty("explanation") String explanation,
                    @JsonProperty("initialization") List<Operation> initialization)
    {
        this.id             = Objects.requireNonNull(id, "Missing required attribute 'id'");
        this.name           = Objects.requireNonNullElse(name, id);
        this.explanation    = Objects.requireNonNullElse(explanation, "");
        this.initialization = Objects.requireNonNull(initialization, "Missing required attribute 'initialization'");
    }

    public String generateScenarioOptionHTML()
    {
        return new Option(id, name, explanation).generateSelectorOptionHTML();
    }

    public String generateScenarioCaseJS()
    {
        String template = """
                          case '{{id}}':
                          {
                            {{initialization}}
                            break;
                          }
                          """;
        return template.replace("{{id}}", StringHelper.escape(id))
                       .replace("{{initialization}}", Operation.generateActionJS(initialization));
    }

    @Override
    public String toString()
    {
        return getClass().getSimpleName() + ":" +
               "\n\t" + "id: '" + StringHelper.get(id) + '\'' +
               "\n\t" + "name: '" + StringHelper.get(name) + '\'' +
               "\n\t" + "explanation: '" + StringHelper.get(explanation) + '\'' +
               "\n\t" + "initialization: " + StringHelper.get(initialization);
    }
}
