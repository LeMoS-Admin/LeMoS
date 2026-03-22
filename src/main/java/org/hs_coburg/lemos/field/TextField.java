package org.hs_coburg.lemos.field;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.module.Condition;
import org.hs_coburg.lemos.module.Operation;

import java.util.List;

public class TextField extends MultilineableField
{
    @JsonCreator
    public TextField(@JsonProperty("id") String id,
                     @JsonProperty("name") String name,
                     @JsonProperty("explanation") String explanation,
                     @JsonProperty("usage") FieldUsage usage,
                     @JsonProperty("type") FieldType type,
                     @JsonProperty("style") Style style,
                     @JsonProperty("hidden") Boolean hidden,
                     @JsonProperty("highlighted") Boolean highlighted,
                     @JsonProperty("allowEmpty") Boolean allowEmpty,
                     @JsonProperty("datatype") FieldDatatype datatype,
                     @JsonProperty("restrictions") List<Condition> restrictions,
                     @JsonProperty("reactions") List<Operation> reactions,
                     @JsonProperty("multiline") Boolean multiline,
                     @JsonProperty("minLines") Integer minLines,
                     @JsonProperty("maxLines") Integer maxLines)
    {
        super(id, name, explanation, usage, type, style, hidden, highlighted,allowEmpty, datatype, restrictions, reactions, multiline, minLines, maxLines);
    }

    @Override
    protected String getFieldTagTemplateHTML()
    {
        String template = """
                          <div id='{{id}}' class='fieldContainer {{usage}} {{type}}' style='{{style}}'>
                            {{label}}
                            <form class='field'>
                              {{fieldTag}}
                            </form>
                          </div>
                          """;
        return template.replace("{{fieldTag}}", getFieldTagHTML());
    }

    @Override
    protected String getFieldVariableTemplateJS()
    {
        return "let {{id}} = new TextFieldManager('#{{id}}', '{{name}}', {{multiline}}, {{growable}}, {{allowEmpty}}, '{{datatype}}', () => {\n{{restrictions}}}, () => {\n{{reactions}}}).getInteractor();";
    }

    @Override
    protected String performReplacements(String string)
    {
        return super.performReplacements(string);
    }

    @Override
    public String toString()
    {
        return super.toString();
    }
}
