package org.hs_coburg.lemos.field;

import org.hs_coburg.lemos.util.StringHelper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

public abstract class SimpleField extends Field
{
    public final FieldDatatype     datatype;
    public final List<Restriction> restrictions;
    public final Integer           size;

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
        this.size         = Objects.requireNonNullElse(size, 20);
        restrictions.forEach(restriction -> restriction.fieldName = description);
    }

    public String getRestrictionsAsJavaScript()
    {
        StringBuilder builder = new StringBuilder();
        for (Restriction restriction : restrictions)
        {
            builder.append(restriction.asJavaScriptOperation());
            builder.append("\n");
        }
        return builder.toString();
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
