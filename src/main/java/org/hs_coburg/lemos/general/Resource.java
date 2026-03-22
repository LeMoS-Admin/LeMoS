package org.hs_coburg.lemos.general;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.Objects;

public class Resource
{
    public static final Resource emptyResource = new Resource("", "", null);

    public final String  id;
    public final String  source;
    public final Boolean isExternal;

    public Resource(@JsonProperty("id") String id,
                    @JsonProperty("source") String source,
                    @JsonProperty("isExternal") Boolean isExternal)
    {
        this.id         = Objects.requireNonNull(id, "Missing required attribute 'id'");
        this.source     = Objects.requireNonNull(source, "Missing required attribute 'source'");
        this.isExternal = Objects.requireNonNullElse(isExternal, false);
    }

    public static Resource get(String id)
    {
        for (Resource resource : GeneralData.get().resources)
        {
            if (resource.id.equals(id))
            {
                return resource;
            }
        }
        return null;
    }

    public String getSource()
    {
        if (isExternal)
        {
            return StringHelper.escape(source);
        }
        else
        {
            String path = source.substring(source.indexOf("resource") + 8); // Pfad vor dem resource-Ordner abschneiden
            path = "./res" + path;                                                    // Pfad zum resource-Ordner (res) des Lernmoduls ergänzen
            path = path.replace("\\", "/");                          // Potenzielle Probleme durch unterschiedliche Separatoren (/ oder \) auflösen
            return StringHelper.escape(path);
        }
    }

    public String generateResourceJS()
    {
        String template = "{{id}}: {{source}}";
        return template.replace("{{id}}", StringHelper.escape(id))
                       .replace("{{source}}", getSource());
    }

    @Override
    public String toString()
    {
        return getClass().getSimpleName() + ":" +
               "\n\t" + "id: " + StringHelper.get(id) +
               "\n\t" + "source: " + StringHelper.get(source) +
               "\n\t" + "isExternal: " + StringHelper.get(isExternal);
    }
}
