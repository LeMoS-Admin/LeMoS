package module;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import field.Field;
import general.GeneralData;
import state.State;
import util.StringHelper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class LearningModule
{
    public final GeneralData    general;
    public final List<Field>    fields;
    public final List<State>    states;
    public final List<Scenario> scenarios;

    @JsonCreator
    public LearningModule(@JsonProperty("general") GeneralData general,
                          @JsonProperty("fields") List<Field> fields,
                          @JsonProperty("states") List<State> states,
                          @JsonProperty("scenarios") List<Scenario> scenarios)
    {
        this.general   = Objects.requireNonNull(general, "Missing required attribute 'general'");
        this.fields    = Objects.requireNonNull(fields, "Missing required attribute 'fields'");
        this.states    = Objects.requireNonNull(states, "Missing required attribute 'states'");
        this.scenarios = Objects.requireNonNullElse(scenarios, Collections.emptyList());
    }

    @Override
    public String toString()
    {
        return "LearningModule:" +
               "\n\t" + "general: " + StringHelper.get(general) +
               "\n\t" + "fields: " + StringHelper.get(fields) +
               "\n\t" + "states: " + StringHelper.get(states) +
               "\n\t" + "scenarios: " + StringHelper.get(scenarios);
    }
}
