package org.hs_coburg.lemos;

import org.hs_coburg.lemos.util.FileHelper;

import java.io.File;
import java.io.IOException;

public class ModuleWriter
{
    public static void writeModule(File targetFolder,
                                   String webXmlContent,
                                   String indexHtmlContent) throws IOException
    {
        assertTargetFolder(targetFolder);
        FileHelper.writeFile(new File(targetFolder, "WEB-INF/web.xml"), webXmlContent);
        FileHelper.writeFile(new File(targetFolder, "index.html"), indexHtmlContent);
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
    }
}
