package org.hs_coburg.lemos;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlFactory;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import org.hs_coburg.lemos.module.LearningModule;
import org.hs_coburg.lemos.scenario.Scenario;
import org.hs_coburg.lemos.scenario.ScenarioWrapper;
import org.hs_coburg.lemos.util.FileHelper;

import java.io.File;
import java.io.IOException;

public class ModuleReader
{
    public static LearningModule readModuleConfiguration(File moduleConfig, String moduleName) throws IOException
    {
        String       extension = FileHelper.getExtension(moduleConfig);
        ObjectMapper om        = getObjectMapper(extension);
        if (om == null)
        {
            throw new IOException("Unknown extension: '" + extension + "' should be one of [json, xml, yaml]");
        }
        LearningModule module = om.readValue(moduleConfig, LearningModule.class);

        String scenarioDirPath = moduleConfig.getParentFile().getPath() + "/scenarios";
        File   scenarioDir     = new File(scenarioDirPath);
        if (scenarioDir.exists())
        {
            for (File scenarioConfig : scenarioDir.listFiles())
            {
                String       scenarioExtension = FileHelper.getExtension(scenarioConfig);
                String       scenarioName      = scenarioConfig.getName().replace(scenarioExtension, "");
                ObjectMapper scenarioOM        = getObjectMapper(scenarioExtension);
                System.out.println(moduleName + ": reading scenario " + scenarioName);
                if (scenarioOM == null)
                {
                    continue;
                }
                Scenario scenario = scenarioOM.readValue(scenarioConfig, ScenarioWrapper.class).scenario;
                module.scenarios.add(scenario);
            }
        }
        return module;
    }

    private static ObjectMapper getObjectMapper(String extension)
    {
        switch (extension)
        {
            case ".xml":
                // Duplikate und Auflistungen sind in XML nicht syntaktisch unterscheidbar, Duplikate können daher nicht ausgeschlossen werden
                return new ObjectMapper(new XmlFactory()).findAndRegisterModules();
            case ".json":
                return new ObjectMapper(new JsonFactory()).enable(JsonParser.Feature.STRICT_DUPLICATE_DETECTION)
                                                          .findAndRegisterModules();
            case ".yaml":
                return new ObjectMapper(new YAMLFactory()).enable(JsonParser.Feature.STRICT_DUPLICATE_DETECTION)
                                                          .findAndRegisterModules();
            default:
                return null;
        }
    }
}
