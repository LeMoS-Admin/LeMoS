package org.hs_coburg.lemos.module;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.util.StringHelper;
import org.hs_coburg.lemos.field.Field;
import org.hs_coburg.lemos.general.GeneralData;
import org.hs_coburg.lemos.state.State;
import org.hs_coburg.lemos.state.StateType;

import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

public class LearningModule
{
    public final GeneralData    general;
    public final List<Field>    fields;
    public final List<State>    states;
    @JsonIgnore
    public final List<Scenario> scenarios;

    @JsonCreator
    public LearningModule(@JsonProperty("general") GeneralData general,
                          @JsonProperty("fields") List<Field> fields,
                          @JsonProperty("states") List<State> states)
    {
        this.general   = Objects.requireNonNull(general, "Missing required attribute 'org.hs_coburg.lemos.general'");
        this.fields    = Objects.requireNonNull(fields, "Missing required attribute 'fields'");
        this.states    = Objects.requireNonNull(states, "Missing required attribute 'states'");
        this.scenarios = new LinkedList<>();
        validate();
    }

    private void validate()
    {
        if (states.isEmpty())
        {
            throw new RuntimeException("LearningModule needs at least one org.hs_coburg.lemos.state");
        }
        if (states.stream().filter(s -> s.type.equals(StateType.ENTRY_POINT)).count() != 1)
        {
            throw new RuntimeException("LearningModule needs exact one entry-point");
        }
    }

    @Override
    public String toString()
    {
        return "LearningModule:" +
               "\n\t" + "org.hs_coburg.lemos.general: " + StringHelper.get(general) +
               "\n\t" + "fields: " + StringHelper.get(fields) +
               "\n\t" + "states: " + StringHelper.get(states) +
               "\n\t" + "scenarios: " + StringHelper.get(scenarios);
    }
}
