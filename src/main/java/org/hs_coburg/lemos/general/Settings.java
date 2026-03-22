package org.hs_coburg.lemos.general;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.Objects;

public class Settings
{
    public final String  libraryVersion;
    public final Boolean showFieldIDs;
    public final Boolean differentStepSizes;

    @JsonCreator
    public Settings(@JsonProperty("libraryVersion") String libraryVersion,
                    @JsonProperty("showFieldIDs") Boolean showFieldIDs,
                    @JsonProperty("differentStepSizes") Boolean differentStepSizes)
    {
        this.libraryVersion     = Objects.requireNonNullElse(libraryVersion, "LATEST");
        this.showFieldIDs       = Objects.requireNonNullElse(showFieldIDs, false);
        this.differentStepSizes = Objects.requireNonNullElse(differentStepSizes, true);
    }

    public static Settings get()
    {
        return GeneralData.get().settings;
    }

    @Override
    public String toString()
    {
        return getClass().getSimpleName() + ":" +
               "\n\t" + "libraryVersion: " + StringHelper.get(libraryVersion) +
               "\n\t" + "showFieldIDs: " + StringHelper.get(showFieldIDs) +
               "\n\t" + "differentStepSizes: " + StringHelper.get(differentStepSizes);
    }
}
