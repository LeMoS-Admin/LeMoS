package org.hs_coburg.lemos.field;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.Objects;

public class Style
{
    public static final Style emptyStyle = new Style(0, 0, 0, 0);

    public final Integer row;
    public final Integer column;
    public final Integer width;
    public final Integer height;

    @JsonCreator
    public Style(@JsonProperty("row") Integer row,
                 @JsonProperty("column") Integer column,
                 @JsonProperty("width") Integer width,
                 @JsonProperty("height") Integer height)
    {
        this.row    = Objects.requireNonNull(row, "Missing required attribute 'row'");
        this.column = Objects.requireNonNull(column, "Missing required attribute 'column'");
        this.width  = Objects.requireNonNullElse(width, 1);
        this.height = Objects.requireNonNullElse(height, 1);
    }

    public String generateFieldStyleCSS()
    {
        if (this == emptyStyle)
        {
            return "";
        }

        int    endRow    = row + height;
        int    endColumn = column + width;
        String template  = "grid-row: {{startRow}}/{{endRow}}; grid-column: {{startColumn}}/{{endColumn}};";
        return template.replace("{{startRow}}", Integer.toString(row))
                       .replace("{{startColumn}}", Integer.toString(column))
                       .replace("{{endRow}}", Integer.toString(endRow))
                       .replace("{{endColumn}}", Integer.toString(endColumn));
    }

    @Override
    public String toString()
    {
        return getClass().getSimpleName() + ":" +
               "\n\t" + "row: " + StringHelper.get(row) +
               "\n\t" + "column: " + StringHelper.get(column) +
               "\n\t" + "width: " + StringHelper.get(width) +
               "\n\t" + "height: " + StringHelper.get(height);
    }
}
