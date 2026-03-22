package org.hs_coburg.lemos;

import org.hs_coburg.lemos.module.LearningModule;
import org.hs_coburg.lemos.util.FileHelper;

import java.io.File;

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
		String moduleName   = moduleConfig.getName().replace(FileHelper.getExtension(moduleConfig), "");
		File   targetFolder = new File(args[1]).getAbsoluteFile();
//        System.out.println("Config file: " + moduleConfig.getPath());
//        System.out.println("Module name: " + moduleName);
//        System.out.println("Target folder: " + targetFolder.getPath());

		try
		{
			System.out.println(moduleName + ": reading configuration");
			LearningModule module = ModuleReader.readModuleConfiguration(moduleConfig, moduleName);
			//printLearningModule(module, moduleName);

			System.out.println(moduleName + ": interpreting configuration");
			String libraryVersion   = module.general.config.libraryVersion;
			String webXmlContent    = ModuleGenerator.generateWebXmlContent(module);
			String indexHtmlContent = ModuleGenerator.generateIndexHtmlContent(module);

			System.out.println(moduleName + ": writing module");
			ModuleWriter.writeModule(targetFolder, moduleName, libraryVersion, webXmlContent, indexHtmlContent);
		}
		catch (Exception e)
		{
			System.err.println(moduleName + ": error while processing: \n" + e.getMessage());
			e.printStackTrace(System.err);
			throw new RuntimeException(e);
		}
	}

	private static void printLearningModule(LearningModule module, String moduleName)
	{
		// Ausgabe als Struktur:
		System.out.println(moduleName + ": read configuration: " + module);
		// Ausgabe als eine Zeile (zum Vergleichen):
		System.out.println(moduleName + ": read configuration: " + module.toString().replace("\n", " ").replace("\t", ""));
	}
}
