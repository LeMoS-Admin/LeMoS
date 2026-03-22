package org.hs_coburg.lemos.field;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class PlainField extends SimpleField
{
    @JsonCreator
    public PlainField(@JsonProperty("name") String name,
                      @JsonProperty("description") String description,
                      @JsonProperty("comment") String comment,
                      @JsonProperty("usage") FieldUsage usage,
                      @JsonProperty("type") FieldType type,
                      @JsonProperty("position") Position position,
                      @JsonProperty("datatype") FieldDatatype datatype,
                      @JsonProperty("restrictions") List<Restriction> restrictions,
                      @JsonProperty("size") Integer size)
    {
        super(name, description, comment, usage, type, position, datatype, restrictions, size);
    }

    @Override
    public String asHtml()
    {
        String label = String.format("<label for='%s'>%s (%s):</label><br/>", name, description, name);
        String field = String.format("<input id='%s' class='%s' type='text' size=%d></input>", name, usage.asName(), size);
        return label + "\n" + field + "\n";
    }

    @Override
    public String toString()
    {
        return "PlainField:" + super.toString();
    }
}
