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
        if (args.length == 0)
        {
            System.out.println("Please provide at least one path of a learning module configuration (as YAML, JSON or XML) you wish to generate a learning module from.");
        }
        for (String path : args)
        {
            try
            {
                System.out.println("Reading module configuration: " + path);
                String         extension = path.substring(path.lastIndexOf("."));
                ObjectMapper   om        = getObjectMapper(extension).findAndRegisterModules();
                LearningModule module    = om.readValue(new File(path), LearningModule.class);

                String scenarioDirPath = new File(path).getParentFile().getAbsolutePath() + "/scenarios";
                File   scenarioDir     = new File(scenarioDirPath);
                if (scenarioDir.exists())
                {
                    for (File scenarioFile : scenarioDir.listFiles())
                    {
                        String scenarioPath = scenarioFile.getAbsolutePath();
                        System.out.println("Reading scenario configuration: " + scenarioPath);
                        extension = scenarioPath.substring(scenarioPath.lastIndexOf("."));
                        om        = getObjectMapper(extension).findAndRegisterModules();
                        Scenario scenario = om.readValue(scenarioFile, Scenario.class);
                        module.scenarios.add(scenario);
                    }
                }

                // Ausgabe als Struktur:
                //System.out.println("Read object: " + module);
                // Ausgabe als eine Zeile (zum Vergleichen):
                // System.out.println("Read object: " + org.hs_coburg.lemos.module.toString().replace("\n", " ").replace("\t", ""));

                File result = new File(path.replace(extension, ".html"));
                System.out.println("Generating module: " + result.getAbsolutePath());
                Generator.generateModule(module, result);

                System.out.println("Generation accomplished");
            }
            catch (Exception e)
            {
                System.err.println("Error while processing of module '" + path + "': \n" + e.getMessage());
                e.printStackTrace(System.err);
            }
        }
    }

    private static ObjectMapper getObjectMapper(String extension) throws IOException
    {
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
}
