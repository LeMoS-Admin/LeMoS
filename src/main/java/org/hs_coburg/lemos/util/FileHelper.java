package org.hs_coburg.lemos.util;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class FileHelper
{
    private static final Map<String, String> rescourceMap = getFileMap();

    public static String getExtension(File file)
    {
        String fileName = file.getName();
        return fileName.substring(fileName.lastIndexOf("."));
    }

    public static String readResource(String resource) throws IOException
    {
        try (InputStream in = Thread.currentThread()
                                    .getContextClassLoader()
                                    .getResourceAsStream(rescourceMap.get(resource)))
        {
            assert in != null;
            return new String(in.readAllBytes(), StandardCharsets.UTF_8);
        }
        // Kein catch, da zentrale Behandlung von Fehlern in der main-Methode
    }

    public static void writeFile(File file, String content) throws IOException
    {
        try (FileWriter fw = new FileWriter(file, false))
        {
            fw.write(content);
        }
        // Kein catch, da zentrale Behandlung von Fehlern in der main-Methode
    }

    private static Map<String, String> getFileMap()
    {
        Map<String, String> tempMap = new HashMap<>();
        tempMap.put("index.html", "moduleTemplate/index.html");
        tempMap.put("web.xml", "moduleTemplate/WEB-INF/web.xml");
        return tempMap;
    }
}
