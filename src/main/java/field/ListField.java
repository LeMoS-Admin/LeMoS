package field;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import util.StringHelper;

import java.util.List;
import java.util.Objects;

public class ListField extends SimpleField
{
    public final FieldOrientation growthDirection;
    public final Integer          maxEntries;

    @JsonCreator
    public ListField(@JsonProperty("name") String name,
                     @JsonProperty("description") String description,
                     @JsonProperty("comment") String comment,
                     @JsonProperty("usage") FieldUsage usage,
                     @JsonProperty("type") FieldType type,
                     @JsonProperty("position") Position position,
                     @JsonProperty("datatype") FieldDatatype datatype,
                     @JsonProperty("restrictions") List<Restriction> restrictions,
                     @JsonProperty("size") Integer size,
                     @JsonProperty("growthDirection") FieldOrientation growthDirection,
                     @JsonProperty("maxEntries") Integer maxEntries)
    {
        super(name, description, comment, usage, type, position, datatype, restrictions, size);
        this.growthDirection = Objects.requireNonNullElse(growthDirection, FieldOrientation.VERTICAL);
        this.maxEntries      = Objects.requireNonNullElse(maxEntries, -1);
    }

    @Override
    public String toString()
    {
        return "ListField:" + super.toString() +
               "\n\t" + "growthDirection: " + StringHelper.get(growthDirection) +
               "\n\t" + "maxEntries: " + StringHelper.get(maxEntries);
    }
}
