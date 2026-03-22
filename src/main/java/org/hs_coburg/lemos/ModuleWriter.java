package org.hs_coburg.lemos;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class ModuleWriter
{
    public static void writeModule(File targetFolder,
                                   String moduleName,
                                   String libraryVersion,
                                   String webXmlContent,
                                   String moduleHtmlContent) throws IOException
    {
        assertTargetFolder(targetFolder);
        selectLibrary(targetFolder, moduleName, libraryVersion);
        writeFile(new File(targetFolder, "WEB-INF/web.xml"), webXmlContent);
        writeFile(new File(targetFolder, "module.html"), moduleHtmlContent);
    }

    private static void assertTargetFolder(File targetFolder) throws IOException
    {
        if (!targetFolder.exists())
        {
            throw new IOException("Target folder does not exist: " + targetFolder.getPath());
        }
        if (!targetFolder.isDirectory())
        {
            throw new IOException("Target folder is not a directory: " + targetFolder.getPath());
        }

        File libsFolder = new File(targetFolder, "libs");
        if (!libsFolder.exists())
        {
            throw new IOException("Libs folder does not exist: " + libsFolder.getPath());
        }
        if (libsFolder.listFiles().length == 0)
        {
            throw new IOException("Libs folder is empty: " + libsFolder.getPath());
        }
    }

    private static void selectLibrary(File targetFolder, String moduleName, String libraryVersion)
    {
        List<File> libs = Arrays.asList(new File(targetFolder, "libs").listFiles());
        libraryVersion = "libVersion_" + libraryVersion;
        if (!libs.contains(libraryVersion))
        {
            // Wenn die Version nicht gefunden wurde oder "LATEST" lautet, wird die aktuellste Version (sollte die alphabetisch letzte sein) gewählt
            Collections.sort(libs);
            libraryVersion = libs.getLast().getName();
        }
        System.out.println(moduleName + ": selecting " + libraryVersion);

        // Umbenennen der gewählten Version, damit sie später verschoben und die anderen Versionen gelöscht werden können

        File selectedLibFolder = new File(targetFolder, "libs" + File.separator + libraryVersion);
        File newName           = new File(targetFolder, "libs" + File.separator + "lib");
        selectedLibFolder.renameTo(newName);
    }

    private static void writeFile(File file, String content) throws IOException
    {
        try (FileWriter fw = new FileWriter(file, false))
        {
            fw.write(content);
        }
        // Kein catch, da zentrale Behandlung von Fehlern in der main-Methode
    }
}
