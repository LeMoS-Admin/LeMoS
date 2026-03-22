package lemos.field;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lemos.module.Condition;
import lemos.module.Operation;
import lemos.util.StringHelper;

import java.util.List;
import java.util.Objects;

public class SelectField extends Field
{
    public final List<Option> options;
    public final Boolean      emptyOption;

    @JsonCreator
    public SelectField(@JsonProperty("id") String id,
                       @JsonProperty("name") String name,
                       @JsonProperty("explanation") String explanation,
                       @JsonProperty("usage") FieldUsage usage,
                       @JsonProperty("type") FieldType type,
                       @JsonProperty("style") Style style,
                       @JsonProperty("hidden") Boolean hidden,
                       @JsonProperty("highlighted") Boolean highlighted,
                       @JsonProperty("allowEmpty") Boolean allowEmpty,
                       @JsonProperty("datatype") FieldDatatype datatype,    // Für SelectField ignoriert
                       @JsonProperty("restrictions") List<Condition> restrictions,
                       @JsonProperty("reactions") List<Operation> reactions,
                       @JsonProperty("options") List<Option> options,
                       @JsonProperty("emptyOption") Boolean emptyOption)
    {
        super(id, name, explanation, usage, type, style, hidden, highlighted, allowEmpty, FieldDatatype.STRING, restrictions, reactions);
        this.options     = Objects.requireNonNull(options, "Missing required attribute 'options'");
        this.emptyOption = Objects.requireNonNullElse(emptyOption, false);
    }

    @Override
    protected String getFieldTagTemplateHTML()
    {
        String template = """
                          <div id='{{id}}' class='fieldContainer {{usage}} {{type}}' style='{{style}}'>
                            {{label}}
                            <form class='field'>
                              <select name='{{id}}' class='{{highlighted}}' {{enabledState}}>
                                {{options}}
                              </select>
                            </form>
                          </div>
                          """;
        return template.replace("{{options}}\n", generateOptionsHTML());
    }

    private String generateOptionsHTML()
    {
        StringBuilder optionsHTML = new StringBuilder();
        for (Option option : options)
        {
            optionsHTML.append(option.generateSelectOptionHTML())
                       .append("\n");
        }
        return optionsHTML.toString();
    }

    @Override
    protected String getFieldVariableTemplateJS()
    {
        return "let {{id}} = new SelectFieldManager('#{{id}}', '{{name}}', {{emptyOption}}, {{allowEmpty}}, () => {\n{{restrictions}}}, () => {\n{{reactions}}}).getInteractor();";
    }

    @Override
    protected String performReplacements(String string)
    {
        return super.performReplacements(string)
                    .replace("{{emptyOption}}", Boolean.toString(emptyOption));
    }

    @Override
    public String toString()
    {
        return super.toString() +
               "\n\t" + "options: " + StringHelper.get(options) +
               "\n\t" + "emptyOption: " + StringHelper.get(emptyOption);
    }
}
