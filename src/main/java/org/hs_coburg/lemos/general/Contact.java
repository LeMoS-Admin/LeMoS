package org.hs_coburg.lemos.general;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.Collections;
import java.util.Map;
import java.util.Objects;

public class Contact
{
    public final String              name;
    public final String              purpose;
    public final Map<String, String> data;

    public Contact(@JsonProperty("name") String name,
                   @JsonProperty("purpose") String purpose,
                   @JsonProperty("data") Map<String, String> data)
    {
        this.name    = Objects.requireNonNull(name, "Missing required attribute 'name'");
        this.purpose = Objects.requireNonNullElse(purpose, "");
        this.data    = Objects.requireNonNullElse(data, Collections.emptyMap());
    }

    public String generateContactHTML()
    {
        String template = """
                          <div>
                            <span>{{purpose}}{{name}}</span>
                            {{data}}
                          </div>
                          """;
        return template.replace("{{name}}", name)
                       .replace("{{purpose}}", getPurpose())
                       .replace("{{data}}\n", generateDataHTML());
    }

    private String getPurpose()
    {
        if (purpose.isEmpty())
        {
            return "";
        }
        else
        {
            return purpose + ": ";
        }
    }

    private String generateDataHTML()
    {
        if (data.isEmpty())
        {
            return "";
        }

        StringBuilder contactDateHTML = new StringBuilder();
        String        template        = "<li>{{key}}: {{value}}</li>\n";

        contactDateHTML.append("<ul>");
        for (Map.Entry<String, String> entry : data.entrySet())
        {
            contactDateHTML.append(template.replace("{{key}}", entry.getKey())
                                           .replace("{{value}}", entry.getValue()));
        }
        contactDateHTML.append("</ul>");

        return contactDateHTML.toString();
    }

    @Override
    public String toString()
    {
        return getClass().getSimpleName() + ":" +
               "\n\t" + "name: " + StringHelper.get(name) +
               "\n\t" + "purpose: " + StringHelper.get(purpose) +
               "\n\t" + "data: " + StringHelper.get(data);
    }
}
