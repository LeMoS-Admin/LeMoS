package org.hs_coburg.lemos.general;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.Objects;

public class Configuration
{
    public final String  libraryVersion;
    public final Boolean showFieldNames;
    public final Boolean differentStepSizes;

    @JsonCreator
    public Configuration(@JsonProperty("libraryVersion") String libraryVersion,
                         @JsonProperty("showFieldNames") Boolean showFieldNames,
                         @JsonProperty("differentStepSizes") Boolean differentStepSizes)
    {
        this.libraryVersion     = Objects.requireNonNullElse(libraryVersion, "LATEST");
        this.showFieldNames     = Objects.requireNonNullElse(showFieldNames, true);
        this.differentStepSizes = Objects.requireNonNullElse(differentStepSizes, false);
    }

    @Override
    public String toString()
    {
        return "Configuration:" +
               "\n\t" + "showFieldNames: " + StringHelper.get(showFieldNames) +
               "\n\t" + "differentStepSizes: " + StringHelper.get(differentStepSizes);
    }
}
