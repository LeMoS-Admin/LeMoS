package org.hs_coburg.lemos.field;

import org.hs_coburg.lemos.module.Condition;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.List;
import java.util.Objects;

public abstract class ExpandableField extends Field
{
    public final FieldOrientation growthDirection;
    public final Integer          initialEntries;
    public final Integer          maxEntries;

    protected ExpandableField(String id,
                              String name,
                              String explanation,
                              FieldUsage usage,
                              FieldType type,
                              Style style,
                              Boolean hidden,
                              Boolean allowEmpty,
                              FieldDatatype datatype,
                              List<Condition> restrictions,
                              FieldOrientation growthDirection,
                              Integer initialEntries,
                              Integer maxEntries)
    {
        super(id, name, explanation, usage, type, style, hidden, allowEmpty, datatype, restrictions);
        this.growthDirection = Objects.requireNonNullElse(growthDirection, FieldOrientation.VERTICAL);
        this.initialEntries  = Objects.requireNonNullElse(initialEntries, 1);
        this.maxEntries      = Objects.requireNonNullElse(maxEntries, -1);
        validate();
    }

    private void validate()
    {
        if (maxEntries != -1 && initialEntries > maxEntries)
        {
            throw new RuntimeException("Attribute 'maxEntries' must be higher or equal to 'initialEntries'");
        }
    }

    @Override
    protected String performReplacements(String string)
    {
        return super.performReplacements(string)
                    .replace("{{growthDirection}}", growthDirection.asName())
                    .replace("{{initialEntries}}", Integer.toString(initialEntries))
                    .replace("{{maxEntries}}", Integer.toString(maxEntries));
    }

    @Override
    public String toString()
    {
        return super.toString() +
               "\n\t" + "growthDirection: " + StringHelper.get(growthDirection) +
               "\n\t" + "initialEntries: " + StringHelper.get(initialEntries) +
               "\n\t" + "maxEntries: " + StringHelper.get(maxEntries);
    }
}
