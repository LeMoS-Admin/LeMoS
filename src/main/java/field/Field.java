package field;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import util.StringHelper;

import java.util.Objects;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({@Type(name = "PLAIN", value = PlainField.class),
               @Type(name = "SPLIT", value = SplitField.class),
               @Type(name = "LIST", value = ListField.class),
               @Type(name = "SELECTOR", value = SelectorField.class),
               @Type(name = "TABLE", value = TableField.class)})
public abstract class Field
{
    protected final String     name;
    protected final String     description;
    protected final String     comment;
    protected final FieldUsage usage;
    protected final FieldType  type;
    protected final Position   position;

    protected Field(String name,
                    String description,
                    String comment,
                    FieldUsage usage,
                    FieldType type,
                    Position position)
    {
        this.name        = Objects.requireNonNull(name, "Missing required attribute 'name'");
        this.description = Objects.requireNonNullElse(description, name);
        this.comment     = Objects.requireNonNullElse(comment, name);
        this.usage       = Objects.requireNonNullElse(usage, FieldUsage.INPUT);
        this.type        = Objects.requireNonNullElse(type, FieldType.PLAIN);
        this.position    = Objects.requireNonNullElse(position, new Position(null, null));
    }

    // public abstract String getAsJavaScript();

    @Override
    public String toString()
    {
        return "\n\t" + "name: '" + StringHelper.get(name) + '\'' +
               "\n\t" + "description: '" + StringHelper.get(description) + '\'' +
               "\n\t" + "comment: '" + StringHelper.get(comment) + '\'' +
               "\n\t" + "usage: " + StringHelper.get(usage) +
               "\n\t" + "position: " + StringHelper.get(position);
    }
}
