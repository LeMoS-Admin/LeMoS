package org.hs_coburg.lemos.field;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.StringHelper;

import java.util.List;
import java.util.Objects;

public class SelectorField extends SimpleField
{
    public final List<String> options;

    @JsonCreator
    public SelectorField(@JsonProperty("name") String name,
                         @JsonProperty("description") String description,
                         @JsonProperty("comment") String comment,
                         @JsonProperty("usage") FieldUsage usage,
                         @JsonProperty("type") FieldType type,
                         @JsonProperty("position") Position position,
                         @JsonProperty("datatype") FieldDatatype datatype,
                         @JsonProperty("restrictions") List<Restriction> restrictions,
                         @JsonProperty("size") Integer size,
                         @JsonProperty("options") List<String> options)
    {
        super(name, description, comment, usage, type, position, datatype, restrictions, size);
        this.options = Objects.requireNonNull(options, "Missing required attribute 'options'");
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
        return "SelectorField:" + super.toString() +
               "\n\t" + "options: " + StringHelper.get(options);
    }
}
