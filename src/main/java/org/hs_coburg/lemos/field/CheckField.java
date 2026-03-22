package org.hs_coburg.lemos.field;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.module.Condition;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.List;
import java.util.Objects;

public class CheckField extends Field
{
    public final List<Option> options;
    public final Boolean      multipleCheck;

    @JsonCreator
    public CheckField(@JsonProperty("id") String id,
                      @JsonProperty("name") String name,
                      @JsonProperty("explanation") String explanation,
                      @JsonProperty("usage") FieldUsage usage,
                      @JsonProperty("type") FieldType type,
                      @JsonProperty("style") Style style,
                      @JsonProperty("hidden") Boolean hidden,
                      @JsonProperty("allowEmpty") Boolean allowEmpty,
                      @JsonProperty("datatype") FieldDatatype datatype,             // ignoriert
                      @JsonProperty("restrictions") List<Condition> restrictions,
                      @JsonProperty("options") List<Option> options,
                      @JsonProperty("multipleCheck") Boolean multipleCheck)
    {
        super(id, name, explanation, usage, type, style, hidden, allowEmpty, FieldDatatype.STRING, restrictions);
        this.options       = Objects.requireNonNull(options, "Missing required attribute 'options'");
        this.multipleCheck = Objects.requireNonNullElse(multipleCheck, true);
    }

    @Override
    protected String getFieldTagTemplateHTML()
    {
        String template = """
                          <div id='{{id}}' class='fieldContainer {{usage}} {{type}}' style='{{style}}'>
                            {{label}}
                            <form class='field'>
                              {{options}}
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
            optionsHTML.append(option.generateCheckOptionHTML())
                       .append("\n");
        }
        return optionsHTML.toString();
    }

    @Override
    protected String getFieldVariableTemplateJS()
    {
        return "let {{id}} = new CheckFieldManager('#{{id}}', '{{name}}', {{multipleCheck}}, {{allowEmpty}}, () => {\n{{restrictions}}}).getInteractor();";
    }

    @Override
    protected String performReplacements(String string)
    {
        return super.performReplacements(string)
                    .replace("{{options}}\n", generateOptionsHTML())
                    .replace("{{checkType}}", getCheckType())
                    .replace("{{multipleCheck}}", Boolean.toString(multipleCheck));
    }

    private String getCheckType()
    {
        if (multipleCheck)
        {
            return "checkbox";
        }
        else
        {
            return "radio";
        }
    }

    @Override
    public String toString()
    {
        return super.toString() +
               "\n\t" + "options: " + StringHelper.get(options) +
               "\n\t" + "multipleCheck: " + StringHelper.get(multipleCheck);
    }
}
