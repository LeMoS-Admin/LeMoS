package lemos;

import lemos.module.LearningModule;
import lemos.util.FileHelper;

import java.io.File;
import java.util.Arrays;

// LeMoS = Lernstoff-Modellierungs-System
public class LeMoS
{
    private static boolean printAsStructure;
    private static boolean printAsLine;

    public static void main(String[] args) throws Exception
    {
        resetOptions();
        if (args.length < 2)
        {
            System.out.println("Please provide at least the following two parameters:");
            System.out.println("1: Relative or absolute path to the learning module configuration (as YAML-, JSON- or XML-File)");
            System.out.println("2: Relative or absolute path to the target folder in which the learning module shall be inserted");
            System.out.println("Additionally you can use the following two parameters:");
            System.out.println("-PaS or -PrintAsStructure to print the read configuration as structure");
            System.out.println("-PaL or -PrintAsLine to print the read configuration as single line");
            System.exit(1);
        }

        String moduleName = "Module";   // "Module" = initialer Modul-Name, falls das Auslesen des Namens scheitert
        try
        {
            File moduleConfig = new File(args[0]).getCanonicalFile();
            File targetFolder = new File(args[1]).getCanonicalFile();
            moduleName = moduleConfig.getName().replace(FileHelper.getExtension(moduleConfig), "");
            readOptions(Arrays.copyOfRange(args, 2, args.length));

            System.out.println(moduleName + ": reading configuration");
            LearningModule module = ModuleReader.readModuleConfiguration(moduleConfig, moduleName);
            printLearningModule(module, moduleName);

            System.out.println(moduleName + ": interpreting configuration");
            String webXmlContent    = ModuleGenerator.generateWebXmlContent(module);
            String indexHtmlContent = ModuleGenerator.generateIndexHtmlContent(module);

            System.out.println(moduleName + ": writing module");
            ModuleWriter.writeModule(targetFolder, webXmlContent, indexHtmlContent);
        }
        catch (Exception e)
        {
            System.err.println(moduleName + ": error while processing:");   // Fehlermeldung wird von der Java-Runtime ausgegeben
            throw e;    // Fehlermeldung wird weiter werfen, damit Java-Runtime einen entsprechenden Rückgabecode zurückgibt
        }
    }

    private static void resetOptions()
    {
        printAsStructure = false;
        printAsLine      = false;
    }

    private static void readOptions(String[] args)
    {
        for (String arg : args)
        {
            switch (arg)
            {
                case "-PaS":
                case "-PrintAsStructure":
                    printAsStructure = true;
                    break;
                case "-PaL":
                case "-PrintAsLine":
                    printAsLine = true;
                    break;
                default:
                    break;
            }
        }
    }

    private static void printLearningModule(LearningModule module, String moduleName)
    {
        // Ausgabe als Struktur:
        if (printAsStructure)
        {
            System.out.println(moduleName + ": read configuration: " + module);
        }
        // Ausgabe als eine Zeile (zum Vergleichen):
        if (printAsLine)
        {
            System.out.println(moduleName + ": read configuration: " + module.toString().replace("\n", " ").replace("\t", ""));
        }
    }
}
