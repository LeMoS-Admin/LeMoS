package org.hs_coburg.lemos.field;

import org.hs_coburg.lemos.module.Condition;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.List;
import java.util.Objects;

public abstract class MultilineableField extends Field
{
    public final Boolean multiline;
    public final Integer minLines;
    public final Integer maxLines;
    public final Integer fixLines;

    protected MultilineableField(String id,
                                 String name,
                                 String explanation,
                                 FieldUsage usage,
                                 FieldType type,
                                 Style style,
                                 Boolean hidden,
                                 Boolean allowEmpty,
                                 FieldDatatype datatype,
                                 List<Condition> restrictions,
                                 Boolean multiline,
                                 Integer minLines,
                                 Integer maxLines,
                                 Integer fixLines)
    {
        super(id, name, explanation, usage, type, style, hidden, allowEmpty, datatype, restrictions);
        this.multiline = Objects.requireNonNullElse(multiline, false);
        if (!this.multiline)
        {
            this.minLines = -1;
            this.maxLines = -1;
            this.fixLines = -1;
        }
        else
        {
            this.minLines = Objects.requireNonNullElse(minLines, -1);
            this.maxLines = Objects.requireNonNullElse(maxLines, -1);
            this.fixLines = Objects.requireNonNullElse(fixLines, -1);
        }
        validate();
    }

    private void validate()
    {
        if (maxLines != -1 && minLines > maxLines)
        {
            throw new RuntimeException("Attribute 'maxLines' must be higher or equal to 'minLines'");
        }
        if (fixLines != -1 && (minLines != -1 || maxLines != -1))
        {
            throw new RuntimeException("Attribute 'fixLines' can not be combined with 'minLines' or 'maxLines'");
        }
    }

    protected String getFieldTagHTML()
    {
        if (multiline)
        {
            return "<textarea name='{{id}}' {{fieldStyle}} {{enabledState}}></textarea>";
        }
        else
        {
            return "<input name='{{id}}' type='text' {{enabledState}}>";
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

        // Jeweils addieren einer halben Zeile, damit die konfigurierten Zeilen sicher in das Feld passen
        if (minLines != -1)
        {
            fieldStyle += " min-height: " + (minLines + 0.5) + "lh;";
        }
        if (maxLines != -1)
        {
            fieldStyle += " max-height: " + (maxLines + 0.5) + "lh;";
        }
        if (fixLines != -1)
        {
            fieldStyle += " height: " + (fixLines + 0.5) + "lh;";
        }
        if (multiline && fixLines == -1)
        {
            // Höhe mit 0 initialisieren, um min-height zu nutzen
            fieldStyle += " height: 0;";
        }
        return fieldStyle + "'";
    }

    private String getGrowable()
    {
        if (multiline && fixLines == -1)
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
               "\n\t" + "maxLines: " + StringHelper.get(maxLines) +
               "\n\t" + "fixLines: " + StringHelper.get(fixLines);
    }
}
