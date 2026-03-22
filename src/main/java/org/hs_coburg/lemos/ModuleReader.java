package org.hs_coburg.lemos;

import com.fasterxml.jackson.core.JsonFactory;
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
		ObjectMapper   om     = getObjectMapper(moduleConfig).findAndRegisterModules();
		LearningModule module = om.readValue(moduleConfig, LearningModule.class);

		String scenarioDirPath = moduleConfig.getParentFile().getPath() + "/scenarios";
		File   scenarioDir     = new File(scenarioDirPath);
		if (scenarioDir.exists())
		{
			for (File scenarioConfig : scenarioDir.listFiles())
			{
				String scenarioName = scenarioConfig.getName().replace(FileHelper.getExtension(scenarioConfig), "");
				System.out.println(moduleName + ": reading scenario " + scenarioName);
				ObjectMapper scenarioOM = getObjectMapper(scenarioConfig).findAndRegisterModules();
				Scenario     scenario   = scenarioOM.readValue(scenarioConfig, ScenarioWrapper.class).scenario;
				module.scenarios.add(scenario);
			}
		}

		return module;
	}

	private static ObjectMapper getObjectMapper(File file) throws IOException
	{
		String extension = FileHelper.getExtension(file);
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
