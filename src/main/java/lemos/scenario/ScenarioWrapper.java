package lemos.scenario;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lemos.util.StringHelper;

import java.util.Objects;

public class ScenarioWrapper
{
    public final Scenario scenario;

    @JsonCreator
    public ScenarioWrapper(@JsonProperty("scenario") Scenario scenario)
    {
        this.scenario = Objects.requireNonNull(scenario, "Missing required attribute 'scenario'");
    }

    @Override
    public String toString()
    {
        return getClass().getSimpleName() + ":" +
               "\n\t" + "scenario: " + StringHelper.get(scenario);
    }
}
