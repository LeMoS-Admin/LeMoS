package util;

import field.Field;
import general.GeneralData;
import module.LearningModule;
import module.Scenario;
import state.State;
import state.StateType;

import java.util.List;

public class Validator
{
    public static void validateModule(LearningModule module)
    {
        validateGeneralData(module.general);
        validateFields(module.fields);
        validateStates(module.states);
        validateSzenarios(module.scenarios);
    }

    private static void validateGeneralData(GeneralData general)
    {

    }

    private static void validateFields(List<Field> fields)
    {

    }

    private static void validateStates(List<State> states)
    {
        if (states.isEmpty())
        {
            throw new RuntimeException("LearningModule needs at least one state");
        }
        if (states.stream().filter(s -> s.type.equals(StateType.ENTRY_POINT)).count() != 1)
        {
            throw new RuntimeException("LearningModule needs exact one entry-point");
        }
    }

    private static void validateSzenarios(List<Scenario> szenarios)
    {

    }
}
