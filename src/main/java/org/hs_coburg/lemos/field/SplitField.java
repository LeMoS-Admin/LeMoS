package org.hs_coburg.lemos.field;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.module.Condition;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.List;
import java.util.Objects;

public class SplitField extends MultilineableField
{
    public final String separator;

    @JsonCreator
    public SplitField(@JsonProperty("id") String id,
                      @JsonProperty("name") String name,
                      @JsonProperty("explanation") String explanation,
                      @JsonProperty("usage") FieldUsage usage,
                      @JsonProperty("type") FieldType type,
                      @JsonProperty("style") Style style,
                      @JsonProperty("hidden") Boolean hidden,
                      @JsonProperty("allowEmpty") Boolean allowEmpty,
                      @JsonProperty("datatype") FieldDatatype datatype,
                      @JsonProperty("restrictions") List<Condition> restrictions,
                      @JsonProperty("multiline") Boolean multiline,
                      @JsonProperty("minLines") Integer minLines,
                      @JsonProperty("maxLines") Integer maxLines,
                      @JsonProperty("fixLines") Integer fixLines,
                      @JsonProperty("separator") String separator)
    {
        super(id, name, explanation, usage, type, style, hidden, allowEmpty, datatype, restrictions, multiline, minLines, maxLines, fixLines);
        this.separator = Objects.requireNonNullElse(separator, "");
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
        return "let {{id}} = new SplitFieldManager('#{{id}}', '{{name}}', {{multiline}}, {{growable}}, '{{separator}}', {{allowEmpty}}, '{{datatype}}', (entry) => {\n{{restrictions}}}).getInteractor();";
    }

    @Override
    protected String performReplacements(String string)
    {
        return super.performReplacements(string)
                    .replace("{{separator}}", StringHelper.escape(separator));
    }

    @Override
    public String toString()
    {
        return super.toString() +
               "\n\t" + "separator: '" + StringHelper.get(separator) + '\'';
    }
}
