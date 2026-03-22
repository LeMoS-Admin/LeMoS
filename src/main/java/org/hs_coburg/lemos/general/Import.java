package org.hs_coburg.lemos.general;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.Objects;

public class Import
{
    public final Resource resource;
    public final String   name;
    public final String   alias;

    public Import(@JsonProperty("resource") Resource resource,
                  @JsonProperty("name") String name,
                  @JsonProperty("alias") String alias)
    {
        this.resource = Objects.requireNonNull(resource, "Missing required attribute 'resource'");
        this.name     = Objects.requireNonNullElse(name, "");
        this.alias    = Objects.requireNonNullElse(alias, name);

        validate();
    }

    private void validate()
    {
        if (name.isEmpty() && alias.isEmpty())
        {
            throw new RuntimeException("At least one of the attributes 'name' and 'alias' must not be empty for an Import");
        }
    }

    public String generateImportJS()
    {
        String template = "import {{component}} from '{{resource}}'";
        return template.replace("{{component}}", generateComponent())
                       .replace("{{resource}}", resource.getSource());
    }

    private String generateComponent()
    {
        if (name.isEmpty())
        {
            return StringHelper.escape(alias);
        }
        else if (alias.isEmpty())
        {
            return "{" + StringHelper.escape(name) + "}";
        }
        else
        {
            return "{" + StringHelper.escape(name) + " as " + StringHelper.escape(alias) + "}";
        }
    }

    @Override
    public String toString()
    {
        return getClass().getSimpleName() + ":" +
               "\n\t" + "resource: " + StringHelper.get(resource) +
               "\n\t" + "name: " + StringHelper.get(name) +
               "\n\t" + "alias: " + StringHelper.get(alias);
    }
}
