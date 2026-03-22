package org.hs_coburg.lemos.general;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.Objects;

public class Settings
{
    public final String  lemosVersion;
    public final Boolean showFieldIDs;
    public final Boolean differentStepSizes;

    @JsonCreator
    public Settings(@JsonProperty("lemosVersion") String lemosVersion,
                    @JsonProperty("showFieldIDs") Boolean showFieldIDs,
                    @JsonProperty("differentStepSizes") Boolean differentStepSizes)
    {
        this.lemosVersion       = Objects.requireNonNullElse(lemosVersion, "LATEST");
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
               "\n\t" + "lemosVersion: " + StringHelper.get(lemosVersion) +
               "\n\t" + "showFieldIDs: " + StringHelper.get(showFieldIDs) +
               "\n\t" + "differentStepSizes: " + StringHelper.get(differentStepSizes);
    }
}
