package org.hs_coburg.lemos.module;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.field.Field;
import org.hs_coburg.lemos.field.Style;
import org.hs_coburg.lemos.general.GeneralData;
import org.hs_coburg.lemos.scenario.Scenario;
import org.hs_coburg.lemos.state.State;
import org.hs_coburg.lemos.state.StateType;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

@JsonIgnoreProperties("$schema")
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
        this.general   = Objects.requireNonNull(general, "Missing required attribute 'general'");
        this.fields    = Objects.requireNonNull(fields, "Missing required attribute 'fields'");
        this.states    = Objects.requireNonNull(states, "Missing required attribute 'states'");
        this.scenarios = new LinkedList<>();
        validate();
    }

    private void validate()
    {
        if (states.isEmpty())
        {
            throw new RuntimeException("LearningModule requires at least one state");
        }
        if (states.stream().filter(s -> s.type.equals(StateType.ENTRY)).count() != 1)
        {
            throw new RuntimeException("LearningModule requires exact one entry");
        }
        if (states.size() != states.stream().map(state -> state.id).distinct().count())
        {
            throw new RuntimeException("LearningModule requires unique IDs for each state");
        }
        if (scenarios.size() != scenarios.stream().map(scenario -> scenario.id).distinct().count())
        {
            throw new RuntimeException("LearningModule requires unique IDs for each scenario");
        }
        if (fields.size() != fields.stream().map(field -> field.id).distinct().count())
        {
            throw new RuntimeException("LearningModule requires unique IDs for each field (inner #fields must only be unique in their context)");
        }
        if (fields.stream().anyMatch(field -> field.style == Style.emptyStyle) &&
            fields.stream().anyMatch(field -> field.style != Style.emptyStyle))
        {
            throw new RuntimeException("LearningModule requires either a style for each field (except for inner and hidden #fields) or no style for any field");
        }
    }

    @Override
    public String toString()
    {
        return getClass().getSimpleName() + ":" +
               "\n\t" + "general: " + StringHelper.get(general) +
               "\n\t" + "fields: " + StringHelper.get(fields) +
               "\n\t" + "states: " + StringHelper.get(states) +
               "\n\t" + "scenarios: " + StringHelper.get(scenarios);
    }
}
