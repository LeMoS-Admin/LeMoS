package org.hs_coburg.lemos;

import org.hs_coburg.lemos.field.Field;
import org.hs_coburg.lemos.general.GeneralData;
import org.hs_coburg.lemos.module.LearningModule;
import org.hs_coburg.lemos.scenario.Scenario;
import org.hs_coburg.lemos.state.State;
import org.hs_coburg.lemos.state.StateType;
import org.hs_coburg.lemos.util.FileHelper;

import java.io.IOException;
import java.util.Comparator;
import java.util.List;

public class ModuleGenerator
{
    public static String generateWebXmlContent(LearningModule module) throws IOException
    {
        String result = FileHelper.readResource("web.xml");
        result = insertGeneralData(module.general, result);
        return result;
    }

    public static String generateIndexHtmlContent(LearningModule module) throws IOException
    {
        String result = FileHelper.readResource("index.html");
        result = insertGeneralData(module.general, result);
        result = insertFields(module.fields, result);
        result = insertStates(module.states, result);
        result = insertSzenarios(module.scenarios, result);
        return result;
    }

    private static String insertGeneralData(GeneralData general, String result)
    {
        return result.replace("<!--HEADING-->", general.heading)
                     .replace("<!--EXPLANATION-->", general.explanation)
                     .replace("<!--PROTOCOL-CONTAINER-STYLE-->", general.logger.generateLoggerContainerStyleCSS())
                     .replace("<!--PROTOCOL-FIELD-STYLE-->", general.logger.generateLoggerFieldStyleCSS())
                     .replace("<!--SOURCES-->", general.generateSourcesHTML())
                     .replace("<!--CONTACTS-->", general.generateContactsHTML())
                     .replace("<!--BIG-STEP-ENABLING-->", general.generateBigStepEnabledStateCSS())
                     .replace("<!--ADDITIONAL-IMPORTS-->", general.generateImportsJS())
                     .replace("<!--RESOURCES-->", general.generateResourcesJS())
                     .replace("<!--ADDITIONAL-VARIABLES-->", general.generateVariablesJS())
                     .replace("<!--SPECIAL-FUNCTIONS-->", general.generateFunctionsJS());
    }

    private static String insertFields(List<Field> fields, String result)
    {
        StringBuilder tempHTML         = new StringBuilder();
        StringBuilder tempJS_Variables = new StringBuilder();
        for (Field field : fields)
        {
            tempHTML.append(field.generateFieldTagHTML());
            tempJS_Variables.append(field.generateFieldVariableJS()).append("\n");
        }
        return result.replace("<!--FIELDS-->", tempHTML.toString())
                     .replace("<!--FIELD-VARIABLES-->", tempJS_Variables.toString());
    }

    private static String insertStates(List<State> states, String result)
    {
        StringBuilder temp = new StringBuilder();
        for (State state : states)
        {
            temp.append(state.generateStateFunctionJS());
        }
        State entryState = states.stream().filter(s -> s.type.equals(StateType.ENTRY)).findFirst().get();
        return result.replace("<!--ENTRY-STATE-CALL-->", State.generateStateFunctionCallJS(entryState.id))
                     .replace("<!--STATES-->", temp.toString());
    }

    private static String insertSzenarios(List<Scenario> scenarios, String result)
    {
        StringBuilder tempHTML = new StringBuilder();
        StringBuilder tempJS   = new StringBuilder();
        scenarios.sort(Comparator.comparing(s -> s.name));
        for (Scenario scenario : scenarios)
        {
            tempHTML.append(scenario.generateScenarioOptionHTML());
            tempJS.append(scenario.generateScenarioCaseJS());
        }
        return result.replace("<!--SCENARIO-OPTIONS-->", tempHTML.toString())
                     .replace("<!--SCENARIO-CASES-->", tempJS.toString());
    }
}
