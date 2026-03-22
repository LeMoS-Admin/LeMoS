package lemos.field;

import lemos.module.Condition;
import lemos.module.Operation;
import lemos.util.StringHelper;

import java.util.List;
import java.util.Objects;

public abstract class MultilineableField extends Field
{
    public final Boolean multiline;
    public final Integer minLines;
    public final Integer maxLines;

    protected MultilineableField(String id,
                                 String name,
                                 String explanation,
                                 FieldUsage usage,
                                 FieldType type,
                                 Style style,
                                 Boolean hidden,
                                Boolean highlighted,
                                 Boolean allowEmpty,
                                 FieldDatatype datatype,
                                 List<Condition> restrictions,
                                 List<Operation> reactions,
                                 Boolean multiline,
                                 Integer minLines,
                                 Integer maxLines)
    {
        super(id, name, explanation, usage, type, style, hidden, highlighted,allowEmpty, datatype, restrictions, reactions);
        this.multiline = Objects.requireNonNullElse(multiline, false);
        if (!this.multiline)
        {
            this.minLines = -1;
            this.maxLines = -1;
        }
        else
        {
            this.minLines = Objects.requireNonNullElse(minLines, 1);
            this.maxLines = Objects.requireNonNullElse(maxLines, -1);
        }
        validate();
    }

    private void validate()
    {
        if (maxLines != -1 && minLines > maxLines)
        {
            throw new RuntimeException("Attribute 'maxLines' must be higher or equal to 'minLines'");
        }
    }

    protected String getFieldTagHTML()
    {
        if (multiline)
        {
            return "<textarea name='{{id}}' class='{{highlighted}}' {{fieldStyle}} {{enabledState}}></textarea>";
        }
        else
        {
            return "<input name='{{id}}' class='{{highlighted}}' type='text' {{enabledState}}>";
        }
    }

    @Override
    protected String performReplacements(String string)
    {
        return super.performReplacements(string)
                    .replace("{{multiline}}", Boolean.toString(multiline))
                    .replace("{{fieldStyle}}", getFieldStyleCSS())
                    .replace("{{growable}}", getGrowable());
    }

    protected String getFieldStyleCSS()
    {
        String fieldStyle = "style='";

        // Hinweis: damit die konfigurierten Zeilen sicher in das Feld passen, wird jeweils eine halbe Zeile addiert
        if (minLines.equals(maxLines) && minLines != -1)
        {
            fieldStyle += "height: " + (minLines + 0.5) + "lh; ";
        }
        else
        {
            if (minLines != -1)
            {
                fieldStyle += "height: 0; "; // Höhe mit 0 initialisieren, um initial min-height zu nutzen
                fieldStyle += "min-height: " + (minLines + 0.5) + "lh; ";
            }
            if (maxLines != -1)
            {
                fieldStyle += "max-height: " + (maxLines + 0.5) + "lh; ";
            }
        }
        return fieldStyle + "'";
    }

    private String getGrowable()
    {
        if (multiline && !minLines.equals(maxLines))
        {
            return "true";
        }
        else
        {
            return "false";
        }
    }

    @Override
    public String toString()
    {
        return super.toString() +
               "\n\t" + "multiline: " + StringHelper.get(multiline) +
               "\n\t" + "minLines: " + StringHelper.get(minLines) +
               "\n\t" + "maxLines: " + StringHelper.get(maxLines);
    }
}
