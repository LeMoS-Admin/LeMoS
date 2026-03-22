import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlFactory;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import module.LearningModule;

import java.io.File;
import java.io.IOException;

// LeMoS = Lernstoff-Modellierungs-System
public class LeMoS
{
    public static void main(String[] args)
    {
        for (String path : args)
        {
            try
            {
                System.out.println("Reading file: " + path);
                ObjectMapper   om     = getObjectMapper(path).findAndRegisterModules();
                LearningModule module = om.readValue(new File(path), LearningModule.class);

                // Ausgabe als Struktur:
                System.out.println("Read object: " + module);

                // Ausgabe als eine Zeile (zum Vergleichen):
                // System.out.println("Read object: " + module.toString().replace("\n", " ").replace("\t", ""));
            }
            catch (Exception e)
            {
                System.err.println("Error while reading of file '" + path + "': \n" + e.getMessage());
            }
        }
    }

    private static ObjectMapper getObjectMapper(String path) throws IOException
    {
        String extension = path.substring(path.lastIndexOf("."));
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
