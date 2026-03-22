package org.hs_coburg.lemos.field;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.StringHelper;

import java.util.List;
import java.util.Objects;

public class TableField extends Field
{
    public final List<Field>      innerFields;
    public final FieldOrientation growthDirection;
    public final Integer          maxEntries;

    @JsonCreator
    public TableField(@JsonProperty("name") String name,
                      @JsonProperty("description") String description,
                      @JsonProperty("comment") String comment,
                      @JsonProperty("usage") FieldUsage usage,
                      @JsonProperty("type") FieldType type,
                      @JsonProperty("position") Position position,
                      @JsonProperty("innerFields") List<Field> innerFields,
                      @JsonProperty("growthDirection") FieldOrientation growthDirection,
                      @JsonProperty("maxEntries") Integer maxEntries)
    {
        super(name, description, comment, usage, type, position);
        this.innerFields     = Objects.requireNonNull(innerFields, "Missing required attribute 'innerFields'");
        this.growthDirection = Objects.requireNonNullElse(growthDirection, FieldOrientation.VERTICAL);
        this.maxEntries      = Objects.requireNonNullElse(maxEntries, -1);
    }

    @Override
    public String asHtml()
    {
        // TODO
        return "";
    }

    @Override
    public String getRestrictionsAsJavaScript()
    {
        // TODO
        return "";
    }

    @Override
    public String toString()
    {
        return "TableField:" + super.toString() +
               "\n\t" + "innerFields: " + StringHelper.get(innerFields) +
               "\n\t" + "growthDirection: " + StringHelper.get(growthDirection) +
               "\n\t" + "maxEntries: " + StringHelper.get(maxEntries);
    }
}
