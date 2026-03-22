package org.hs_coburg.lemos;

import org.hs_coburg.lemos.field.Field;
import org.hs_coburg.lemos.general.GeneralData;
import org.hs_coburg.lemos.module.LearningModule;
import org.hs_coburg.lemos.module.Scenario;
import org.hs_coburg.lemos.state.State;
import org.hs_coburg.lemos.state.StateType;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.List;

public class Generator
{
    public static void generateModule(LearningModule module, File target)
    {
        String result = readDefault();
        result = insertGeneralData(module.general, result);
        result = insertFields(module.fields, result);
        result = insertStates(module.states, result);
        result = insertSzenarios(module.scenarios, result);
        writeResult(target.toPath(), result);
    }

    private static String readDefault()
    {
        try (InputStream in = Generator.class.getClassLoader().getResourceAsStream("default.html"))
        {
            assert in != null;
            return new String(in.readAllBytes());
        }
        catch (IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    private static void writeResult(Path path, String result)
    {
        try
        {
            Files.writeString(path, result);
        }
        catch (IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    private static String insertGeneralData(GeneralData general, String result)
    {
        return result.replace("<!--HEADING-->", general.heading)
                     .replace("<!--EXPLANATION-->", general.explanation);
    }

    private static String insertFields(List<Field> fields, String result)
    {
        StringBuilder tempHTML            = new StringBuilder("<div>\n");
        StringBuilder tempJS_Variables    = new StringBuilder();
        StringBuilder tempJS_Restrictions = new StringBuilder();
        int           curY                = 1;
        for (Field field : fields.stream().sorted(Comparator.comparing(f -> f.position)).toList())
        {
            if (field.position.yAxis > curY)
            {
                tempHTML.append("</div>\n")
                        .append("<div>\n");
                curY = field.position.yAxis;
            }
            tempHTML.append("<span>\n")
                    .append(field.asHtml())
                    .append("</span>\n");
            tempJS_Variables.append(field.asJavaScriptVariable());
            tempJS_Restrictions.append(field.getRestrictionsAsJavaScript());
        }
        tempHTML.append("</div>\n");
        return result.replace("<!--FIELDS-->", tempHTML.toString())
                     .replace("<!--VARIABLES-->", tempJS_Variables.toString())
                     .replace("<!--RESTRICTIONS-->", tempJS_Restrictions.toString());
    }

    private static String insertStates(List<State> states, String result)
    {
        StringBuilder temp = new StringBuilder();
        for (State state : states)
        {
            temp.append(state.asJavaScriptFunction());
        }
        State entryState = states.stream().filter(s -> s.type.equals(StateType.ENTRY_POINT)).findFirst().get();
        return result.replace("<!--ENTRY-STATE-CALL-->", State.getStateCall(entryState.name))
                     .replace("<!--STATES-->", temp.toString());
    }

    private static String insertSzenarios(List<Scenario> szenarios, String result)
    {
        StringBuilder tempHTML = new StringBuilder();
        StringBuilder tempJS   = new StringBuilder();
        for (Scenario scenario : szenarios)
        {
            tempHTML.append(scenario.asHTMLOption());
            tempJS.append(scenario.asJavaScriptCase());
        }
        return result.replace("<!--SCENARIO-OPTIONS-->", tempHTML.toString())
                     .replace("<!--SCENARIO-CASES-->", tempJS.toString());
    }
}
