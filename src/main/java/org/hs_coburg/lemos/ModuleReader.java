package org.hs_coburg.lemos;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
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
        validateLemosVersion(om, moduleConfig, moduleName);
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

    // Kompatibilitätslogik
    private static void validateLemosVersion(ObjectMapper om, File moduleConfig, String moduleName) throws IOException
    {
        JsonNode tree = om.readTree(moduleConfig);
        String lemosVersion = tree.path("general")
                                  .path("settings")
                                  .path("lemosVersion")
                                  .asText(null);     // Standardwert, falls general/settings/lemosVersion nicht konfiguriert
        if (lemosVersion != null)
        {
            StringBuilder steps = new StringBuilder();
            switch (lemosVersion)
            {
                // "break" bewusst weggelassen, damit alle benötigten Maßnahmen ab der konfigurierten LeMoS-Version aufgelistet werden
                case "1.0.0":
                case "1.0.1":
                    steps.append("- replace usages of value 'SELECTOR' for attribute 'type' (Field) with 'SELECT'\n");
                case "1.1.1":
                    steps.append("- replace usages of attribute 'fixLines' (MultilineableField) with attributes 'minLines' and 'maxLines'\n");
                    steps.append("- replace usages of class 'Module' with class 'Fields'\n");
                    steps.append("- replace usages of class 'Logger' with class 'Module'\n");
                    steps.append("- replace usages of function 'Fields.isFilled' with function 'Fields.areFilled'\n");
                    steps.append("- replace usages of function 'Module.set' with function 'Module.setLogger'\n");
                    steps.append("- replace usages of function 'Module.clear' with function 'Module.clearLogger'\n");
                    steps.append("- replace usages of function '.length()' with function '.getLength()'\n");
                case "1.2.0":
                case "1.2.1":
                case "1.2.2":
                case "1.2.3":
                    steps.append("- replace usages of attribute 'message' (Condition) with attribute 'errorMessage'\n");
                case "2.0.0":
                    // TODO bei neuer Version: neue Versionsnummer und (falls nötig) Kompatibilitätsmaßnahmen ergänzen
                    break;
                default:
                    throw new IllegalArgumentException(moduleName + ": configured LeMoS-Version '" + lemosVersion + "' does not exist");
            }
            if (!steps.isEmpty())
            {
                String currentVersion = "2.0.0"; // TODO bei neuer Version: neue Versionsnummer eintragen
                steps.append("- replace value '").append(lemosVersion).append("' for attribute 'lemosVersion' (Settings) with value '").append(currentVersion).append("'");
                throw new IllegalArgumentException(moduleName + ": configured LeMoS-Version '" + lemosVersion + "' is not fully compatible with current version '" + currentVersion + "'.\n" +
                                                   "Please perform the following actions in the given order to regain compatibility:\n" + steps);
            }
        }
        else
        {
            System.out.println(moduleName + ": no specified LeMoS-Version (attribute 'lemosVersion' in 'Settings') found, assuming current version");
        }
    }
}
