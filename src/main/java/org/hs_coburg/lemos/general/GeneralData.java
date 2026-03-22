package org.hs_coburg.lemos.general;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class GeneralData
{
    private static GeneralData currentGeneralData;

    public final String         heading;
    public final String         explanation;
    public final List<String>   sources;
    public final List<Contact>  contacts;
    public final Settings       settings;
    public final Logger         logger;
    public final List<Variable> variables;
    public final List<Function> functions;
    public final List<Import>   imports;
    public final List<Resource> resources;

    @JsonCreator
    public GeneralData(@JsonProperty("heading") String heading,
                       @JsonProperty("explanation") String explanation,
                       @JsonProperty("sources") List<String> sources,
                       @JsonProperty("contacts") List<Contact> contacts,
                       @JsonProperty("settings") Settings settings,
                       @JsonProperty("#logger") Logger logger,
                       @JsonProperty("variables") List<Variable> variables,
                       @JsonProperty("functions") List<Function> functions,
                       @JsonProperty("imports") List<Import> imports,
                       @JsonProperty("resources") List<Resource> resources)
    {
        this.heading       = Objects.requireNonNull(escapeHeading(heading), "Missing required attribute 'heading'");
        this.explanation   = Objects.requireNonNullElse(explanation, "");
        this.sources       = Objects.requireNonNullElse(sources, Collections.emptyList());
        this.contacts      = Objects.requireNonNullElse(contacts, Collections.emptyList());
        this.settings      = Objects.requireNonNullElse(settings, new Settings(null, null, null));
        this.logger        = Objects.requireNonNullElse(logger, new Logger(null, null, null));
        this.variables     = Objects.requireNonNullElse(variables, Collections.emptyList());
        this.functions     = Objects.requireNonNullElse(functions, Collections.emptyList());
        this.imports       = Objects.requireNonNullElse(imports, Collections.emptyList());
        this.resources     = Objects.requireNonNullElse(resources, Collections.emptyList());
        currentGeneralData = this;
    }

    public static GeneralData get()
    {
        return currentGeneralData;
    }

    private String escapeHeading(String heading)
    {
        return heading.replace("<", "&lt;")
                      .replace(">", "&gt;");
    }

    public String generateSourcesHTML()
    {
        if (sources.isEmpty())
        {
            return "<span>Keine Quellen hinterlegt</span>";
        }

        StringBuilder sourcesHTML = new StringBuilder();
        String        template    = "<li>{{source}}</li>\n";

        sourcesHTML.append("<ul>");
        for (String source : sources)
        {
            sourcesHTML.append(template.replace("{{source}}", source));
        }
        sourcesHTML.append("</ul>");

        return sourcesHTML.toString();
    }

    public String generateContactsHTML()
    {
        if (contacts.isEmpty())
        {
            return "<span>Keine Kontakte hinterlegt</span>";
        }

        StringBuilder contactsHTML = new StringBuilder();
        for (Contact contact : contacts)
        {
            contactsHTML.append(contact.generateContactHTML());
        }
        return contactsHTML.toString();
    }

    public String generateBigStepEnabledStateCSS()
    {
        if (settings.differentStepSizes)
        {
            return "";
        }
        else
        {
            return "display: none;";
        }
    }

    public String generatevariablesJS()
    {
        StringBuilder variablesJS = new StringBuilder();
        for (Variable variable : variables)
        {
            variablesJS.append(variable.generateVariableJS())
                       .append("\n");
        }
        return variablesJS.toString();
    }

    public String generateFunctionsJS()
    {
        StringBuilder functionsJS = new StringBuilder();
        for (Function function : functions)
        {
            functionsJS.append(function.generateFunctionJS())
                       .append("\n");
        }
        return functionsJS.toString();
    }

    public String generateImportsJS()
    {
        StringBuilder importsJS = new StringBuilder();
        for (Import _import : imports)
        {
            importsJS.append(_import.generateImportJS())
                     .append(";\n");
        }
        return importsJS.toString();
    }

    public String generateResourcesJS()
    {
        if (resources.isEmpty())
        {
            return "";
        }
        else
        {
            StringBuilder resourcesJS = new StringBuilder();
            for (Resource resource : resources)
            {
                resourcesJS.append(resource.generateResourceJS())
                           .append(",\n");
            }
            resourcesJS.delete(resourcesJS.length() - 2, resourcesJS.length());
            return resourcesJS.toString();
        }
    }

    @Override
    public String toString()
    {
        return getClass().getSimpleName() + ":" +
               "\n\t" + "heading: '" + StringHelper.get(heading) + '\'' +
               "\n\t" + "explanation: '" + StringHelper.get(explanation) + '\'' +
               "\n\t" + "sources: " + StringHelper.get(sources) +
               "\n\t" + "contacts: " + StringHelper.get(contacts) +
               "\n\t" + "settings: " + StringHelper.get(settings) +
               "\n\t" + "functions: " + StringHelper.get(functions) +
               "\n\t" + "imports: " + StringHelper.get(imports) +
               "\n\t" + "resources: " + StringHelper.get(resources);
    }
}
