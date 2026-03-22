package org.hs_coburg.lemos;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlFactory;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import org.hs_coburg.lemos.module.LearningModule;
import org.hs_coburg.lemos.module.Scenario;

import java.io.File;
import java.io.IOException;

// LeMoS = Lernstoff-Modellierungs-System
public class LeMoS
{
    public static void main(String[] args)
    {
        if (args.length != 2)
        {
            System.out.println("Please provide exactly the following parameters:");
            System.out.println("1: Relative or absolute path to the learning module configuration (as YAML-, JSON- or XML-File)");
            System.out.println("2: Relative or absolute path to the target folder in which the learning module shall be inserted");
            System.exit(1);
        }
        File   moduleConfig = new File(args[0]).getAbsoluteFile();
        String moduleName   = moduleConfig.getName().replace(getExtension(moduleConfig), "");
        File   targetFolder = new File(args[1]).getAbsoluteFile();
//        System.out.println("Config file: " + moduleConfig.getPath());
//        System.out.println("Module name: " + moduleName);
//        System.out.println("Target folder: " + targetFolder.getPath());

        try
        {
            System.out.println(moduleName + ": reading configuration");
            LearningModule module = readModuleConfiguration(moduleConfig, moduleName);
            // printLearningModule(module, moduleName);

            System.out.println(moduleName + ": interpreting configuration");
            String libraryVersion = module.general.config.libraryVersion;
            String webXmlContent     = ModuleGenerator.generateWebXmlContent(module);
            String moduleHtmlContent = ModuleGenerator.generateModuleHtmlContent(module);

            System.out.println(moduleName + ": writing module");
            ModuleWriter.writeModule(targetFolder, moduleName, libraryVersion, webXmlContent, moduleHtmlContent);
        }
        catch (Exception e)
        {
            System.err.println(moduleName + ": error while processing: \n" + e.getMessage());
            e.printStackTrace(System.err);
            throw new RuntimeException(e);
        }
    }

    private static LearningModule readModuleConfiguration(File moduleConfig, String moduleName) throws IOException
    {
        ObjectMapper   om     = getObjectMapper(moduleConfig, moduleName).findAndRegisterModules();
        LearningModule module = om.readValue(moduleConfig, LearningModule.class);

        String scenarioDirPath = moduleConfig.getParentFile().getPath() + "/scenarios";
        File   scenarioDir     = new File(scenarioDirPath);
        if (scenarioDir.exists())
        {
            for (File scenarioConfig : scenarioDir.listFiles())
            {
                String scenarioName = scenarioConfig.getName().replace(getExtension(scenarioConfig), "");
                System.out.println(moduleName + ": reading scenario " + scenarioName);
                ObjectMapper scenarioOM = getObjectMapper(scenarioConfig, moduleName + "/" + scenarioName).findAndRegisterModules();
                Scenario     scenario   = scenarioOM.readValue(scenarioConfig, Scenario.class);
                module.scenarios.add(scenario);
            }
        }

        return module;
    }

    private static void printLearningModule(LearningModule module, String moduleName)
    {
        // Ausgabe als Struktur:
        System.out.println(moduleName + ": read configuration: " + module);
        // Ausgabe als eine Zeile (zum Vergleichen):
        System.out.println(moduleName + ": read configuration: " + module.toString().replace("\n", " ").replace("\t", ""));
    }

    private static ObjectMapper getObjectMapper(File file, String moduleName) throws IOException
    {
        String extension = getExtension(file);
        switch (extension)
        {
            case ".json":
                return new ObjectMapper(new JsonFactory());
            case ".xml":
                return new ObjectMapper(new XmlFactory());
            case ".yaml":
                return new ObjectMapper(new YAMLFactory());
            default:
                throw new IOException("Unknown extension: '" + extension + "' should be one of [json, xml, yaml]");
        }
    }

    private static String getExtension(File file)
    {
        String fileName = file.getName();
        return fileName.substring(fileName.lastIndexOf("."));
    }
}
