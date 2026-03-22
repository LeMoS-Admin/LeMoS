package general;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import util.StringHelper;

import java.util.Objects;

public class Configuration
{
    public final Boolean showFieldNames;
    public final Boolean differentStepSizes;

    @JsonCreator
    public Configuration(@JsonProperty("showFieldNames") Boolean showFieldNames,
                         @JsonProperty("differentStepSizes") Boolean differentStepSizes)
    {
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
