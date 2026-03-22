package field;

import util.StringHelper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

public abstract class SimpleField extends Field
{
    protected final FieldDatatype     datatype;
    protected final List<Restriction> restrictions;
    protected final Integer           size;

    protected SimpleField(String name,
                          String description,
                          String comment,
                          FieldUsage usage,
                          FieldType type,
                          Position position,
                          FieldDatatype datatype,
                          List<Restriction> restrictions,
                          Integer size)
    {
        super(name, description, comment, usage, type, position);
        this.datatype     = Objects.requireNonNullElse(datatype, FieldDatatype.STRING);
        this.restrictions = Objects.requireNonNullElse(restrictions, Collections.emptyList());
        this.size         = Objects.requireNonNullElse(size, 10);
    }

    @Override
    public String toString()
    {
        return super.toString() +
               "\n\t" + "datatype: " + StringHelper.get(datatype) +
               "\n\t" + "restrictions: " + StringHelper.get(restrictions) +
               "\n\t" + "size: " + StringHelper.get(size);
    }
}
