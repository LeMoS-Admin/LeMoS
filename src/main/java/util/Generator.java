package util;

/* import field.Field;
import general.GeneralData;
import module.LearningModule;
import module.Scenario;
import state.State;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List; */

public class Generator
{
    /* public static void generateModule(LearningModule module, File target)
    {
        String result = readDefault();
        result = insertGeneralData(module.general, result);
        result = insertFields(module.fields, result);
        result = insertStates(module.states, result);
        result = insertSzenarios(module.scenarios, result);
    }

    private static String readDefault()
    {
        try
        {
            return Files.readString(Path.of("src/main/resources/default.html"));
        }
        catch (IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    private static String insertGeneralData(GeneralData general, String result)
    {
        result = result.replace("<!--HEADING-->", general.heading);
        result = result.replace("<!--EXPLANATION-->", general.explanation);
        return result;
    }

    private static String insertFields(List<Field> fields, String result)
    {
        String temp = "";
        for(Field field : fields)
        {
            temp = field.getAsJavaScript();
        }
    }

    private static String insertStates(List<State> states, String result)
    {
        
    }

    private static String insertSzenarios(List<Scenario> szenarios, String result)
    {

    }*/
}
