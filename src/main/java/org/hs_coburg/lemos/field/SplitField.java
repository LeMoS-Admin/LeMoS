package org.hs_coburg.lemos.field;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.List;
import java.util.Objects;

public class SplitField extends SimpleField
{
    public final String separator;

    @JsonCreator
    public SplitField(@JsonProperty("name") String name,
                      @JsonProperty("description") String description,
                      @JsonProperty("comment") String comment,
                      @JsonProperty("usage") FieldUsage usage,
                      @JsonProperty("type") FieldType type,
                      @JsonProperty("position") Position position,
                      @JsonProperty("datatype") FieldDatatype datatype,
                      @JsonProperty("restrictions") List<Restriction> restrictions,
                      @JsonProperty("size") Integer size,
                      @JsonProperty("separator") String separator)
    {
        super(name, description, comment, usage, type, position, datatype, restrictions, size);
        this.separator = Objects.requireNonNullElse(separator, "");
    }

    @Override
    public String asHtml()
    {
        // TODO
        return "";
    }

    @Override
    public String toString()
    {
        return "SplitField:" + super.toString() +
               "\n\t" + "separator: '" + StringHelper.get(separator) + '\'';
    }
}
