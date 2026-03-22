package org.hs_coburg.lemos.field;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import org.hs_coburg.lemos.general.Settings;
import org.hs_coburg.lemos.module.Condition;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type", visible = true)
@JsonSubTypes({@Type(name = "INFO", value = InfoField.class),
               @Type(name = "TEXT", value = TextField.class),
               @Type(name = "SPLIT", value = SplitField.class),
               @Type(name = "CHECK", value = CheckField.class),
               @Type(name = "SELECT", value = SelectField.class),
               @Type(name = "LIST", value = ListField.class),
               @Type(name = "TABLE", value = TableField.class)})
public abstract class Field
{
    public final String          id;
    public final String          name;
    public final String          explanation;
    public final FieldUsage      usage;
    public final FieldType       type;
    public final Style           style;
    public final Boolean         hidden;
    public final Boolean         allowEmpty;
    public final FieldDatatype   datatype;
    public final List<Condition> restrictions;

    protected Field(String id,
                    String name,
                    String explanation,
                    FieldUsage usage,
                    FieldType type,
                    Style style,
                    Boolean hidden,
                    Boolean allowEmpty,
                    FieldDatatype datatype,
                    List<Condition> restrictions)
    {
        this.id          = Objects.requireNonNull(id, "Missing required attribute 'id'");
        this.name        = Objects.requireNonNullElse(name, id);
        this.explanation = Objects.requireNonNullElse(explanation, "");
        this.usage       = Objects.requireNonNullElse(usage, FieldUsage.INPUT);
        this.type        = Objects.requireNonNull(type, "Missing required attribute 'type'");
        this.style       = Objects.requireNonNullElse(style, Style.emptyStyle);
        this.hidden      = Objects.requireNonNullElse(hidden, false);
        this.datatype    = Objects.requireNonNullElse(datatype, FieldDatatype.STRING);

        if (this.usage != FieldUsage.INPUT)
        {
            // Für ein Feld, dass keine Eingaben zulässt, ergeben Eingabebeschränkungen keinen Sinn
            this.allowEmpty   = true;
            this.restrictions = Collections.emptyList();
        }
        else
        {
            this.allowEmpty   = Objects.requireNonNullElse(allowEmpty, false);
            this.restrictions = Objects.requireNonNullElse(restrictions, Collections.emptyList());
        }
        validate();
    }

    private void validate()
    {
        if (id.matches(".*\\s.*"))
        {
            throw new RuntimeException("IDs of fields must not contain whitespaces");
        }
        if (id.startsWith("_"))
        {
            throw new RuntimeException("IDs of fields must not start with underscores");
        }
    }

    public final String generateFieldTagHTML()
    {
        String fieldTagTemplateHTML   = getFieldTagTemplateHTML();
        String fieldLabelTemplateHTML = getFieldLabelTemplateHTML();
        String template               = fieldTagTemplateHTML.replace("{{label}}\n", fieldLabelTemplateHTML);
        return performReplacements(template);
    }

    public final String generateFieldVariableJS()
    {
        return performReplacements(getFieldVariableTemplateJS());
    }

    protected String getFieldLabelTemplateHTML()
    {
        if (explanation.isEmpty())
        {
            return """
                   <span class='label'>{{name_unescaped}}</span>
                   """;
        }
        else
        {
            return """
                   <details class='label'>
                     <summary>{{name_unescaped}}</summary>
                     <span>{{explanation_unescaped}}</span>
                   </details>
                   """;
        }
    }

    protected abstract String getFieldTagTemplateHTML();

    protected abstract String getFieldVariableTemplateJS();

    protected String performReplacements(String string)
    {
        return string.replace("{{id}}", StringHelper.escape(id))
                     .replace("{{name}}", StringHelper.escape(getName()))
                     .replace("{{name_unescaped}}", getName())
                     .replace("{{explanation}}", StringHelper.escape(explanation))
                     .replace("{{explanation_unescaped}}", explanation)
                     .replace("{{usage}}", usage.asName())
                     .replace("{{type}}", type.asName())
                     .replace("{{style}}", generateFieldStyleCSS())
                     .replace("{{allowEmpty}}", Boolean.toString(allowEmpty))
                     .replace("{{datatype}}", datatype.asName())
                     .replace("{{restrictions}}", generateFieldRestrictionsJS())
                     .replace("{{enabledState}}", getFieldEnabledState());
    }

    private String getName()
    {
        if (Settings.get().showFieldIDs && !name.equals(id))
        {
            return name + " (" + id + ")";
        }
        else
        {
            return name;
        }
    }

    private String generateFieldStyleCSS()
    {
        if (hidden)
        {
            return "display: none; " + style.generateFieldStyleCSS();
        }
        else
        {
            return style.generateFieldStyleCSS();
        }
    }

    private String generateFieldRestrictionsJS()
    {
        StringBuilder fieldRestrictionsJS = new StringBuilder();
        for (Condition restriction : restrictions)
        {
            fieldRestrictionsJS.append(restriction.generateFieldRestrictionJS(getName()));
        }
        return fieldRestrictionsJS.toString();
    }

    private String getFieldEnabledState()
    {
        if (usage == FieldUsage.INPUT)
        {
            return "";
        }
        else
        {
            return "disabled";
        }
    }

    @Override
    public String toString()
    {
        return getClass().getSimpleName() + ":" +
               "\n\t" + "id: '" + StringHelper.get(id) + "'" +
               "\n\t" + "name: '" + StringHelper.get(name) + "'" +
               "\n\t" + "explanation: '" + StringHelper.get(explanation) + "'" +
               "\n\t" + "usage: " + StringHelper.get(usage) +
               "\n\t" + "style: " + StringHelper.get(style) +
               "\n\t" + "hidden: " + StringHelper.get(hidden) +
               "\n\t" + "allowEmpty: " + StringHelper.get(allowEmpty) +
               "\n\t" + "datatype: " + StringHelper.get(datatype) +
               "\n\t" + "restrictions: " + StringHelper.get(restrictions);
    }
}
