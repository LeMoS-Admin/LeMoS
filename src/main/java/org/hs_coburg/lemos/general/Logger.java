package org.hs_coburg.lemos.general;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.Objects;

public class Logger
{
    public final Boolean hidden;
    public final Integer minWidth;
    public final Integer minHeight;

    public Logger(@JsonProperty("hidden") Boolean hidden,
                  @JsonProperty("minWidth") Integer minWidth,
                  @JsonProperty("minHeight") Integer minHeight)
    {
        this.hidden    = Objects.requireNonNullElse(hidden, false);
        this.minWidth  = Objects.requireNonNullElse(minWidth, 100);
        this.minHeight = Objects.requireNonNullElse(minHeight, 10);
    }

    public String generateLoggerContainerStyleCSS()
    {
        if (hidden)
        {
            return "display: none";
        }
        else
        {
            return "";
        }
    }

    public String generateLoggerFieldStyleCSS()
    {
        String template = "min-width: {{minWidth}}ch; min-height: {{minHeight}}lh;";
        return template.replace("{{minWidth}}", Integer.toString(minWidth + 1))
                       .replace("{{minHeight}}", Double.toString(minHeight + 0.5));
    }

    @Override
    public String toString()
    {
        return getClass().getSimpleName() + ":" +
               "\n\t" + "hidden: " + StringHelper.get(hidden) +
               "\n\t" + "minWidth: " + StringHelper.get(minWidth) +
               "\n\t" + "minHeight: " + StringHelper.get(minHeight);
    }
}
