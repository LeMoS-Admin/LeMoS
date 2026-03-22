package org.hs_coburg.lemos.field;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.general.Resource;
import org.hs_coburg.lemos.module.Condition;
import org.hs_coburg.lemos.module.Operation;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class InfoField extends Field
{
    public final String      text;
    public final Resource    resource;
    public final String      resourceID;
    public final ContentType contentType;
    public final Integer     maxWidth;
    public final Integer     maxHeight;

    @JsonCreator
    public InfoField(@JsonProperty("id") String id,
                     @JsonProperty("name") String name,
                     @JsonProperty("explanation") String explanation,
                     @JsonProperty("usage") FieldUsage usage,                       // ignoriert
                     @JsonProperty("type") FieldType type,
                     @JsonProperty("style") Style style,
                     @JsonProperty("hidden") Boolean hidden,
                     @JsonProperty("highlighted") Boolean highlighted,
                     @JsonProperty("allowEmpty") Boolean allowEmpty,                // ignoriert
                     @JsonProperty("datatype") FieldDatatype datatype,              // ignoriert
                     @JsonProperty("restrictions") List<Condition> restrictions,    // ignoriert
                     @JsonProperty("reactions") List<Operation> reactions,          // ignoriert
                     @JsonProperty("text") String text,
                     @JsonProperty("resource") Resource resource,
                     @JsonProperty("resourceID") String resourceID,
                     @JsonProperty("contentType") ContentType contentType,
                     @JsonProperty("maxWidth") Integer maxWidth,
                     @JsonProperty("maxHeight") Integer maxHeight)
    {
        super(id, name, explanation, FieldUsage.OUTPUT, type, style, hidden, highlighted,true, FieldDatatype.STRING, Collections.emptyList(), Collections.emptyList());
        this.text        = Objects.requireNonNullElse(text, "");
        this.contentType = Objects.requireNonNullElse(contentType, ContentType.TEXT);

        if (this.contentType == ContentType.TEXT)
        {
            this.resource   = Resource.emptyResource;
            this.resourceID = "";
            this.maxWidth   = -1;
            this.maxHeight  = -1;
        }
        else
        {
            this.resource   = Objects.requireNonNullElse(resource, Resource.emptyResource);
            this.resourceID = Objects.requireNonNullElse(resourceID, "");
            this.maxWidth   = Objects.requireNonNullElse(maxWidth, -1);
            this.maxHeight  = Objects.requireNonNullElse(maxHeight, -1);
        }

        validate();
    }

    private void validate()
    {
        if (contentType != ContentType.TEXT &&
            resourceID.isEmpty() &&
            resource == Resource.emptyResource)
        {
            throw new RuntimeException("ContentTypes other than 'TEXT' require either 'resource' or 'resourceID'");
        }
        if (!resourceID.isEmpty() &&
            resource != Resource.emptyResource)
        {
            throw new RuntimeException("Combination of the attributes 'resource' and 'resourceID' is not allowed");
        }
    }

    @Override
    protected String getFieldTagTemplateHTML()
    {
        String template = """
               <div id='{{id}}' class='fieldContainer {{type}}' style='{{style}}'>
                 {{label}}
                 <form class='field'>
                   {{content}}
                 </form>
               </div>
               """;
        return template.replace("{{content}}", getContentHTML());
    }

    @Override
    protected String getFieldVariableTemplateJS()
    {
        return "let {{id}} = new InfoFieldManager('#{{id}}', '{{name}}', '{{contentType}}').getInteractor();";
    }

    @Override
    protected String performReplacements(String string)
    {
        return super.performReplacements(string)
                    .replace("{{text}}", getText())
                    .replace("{{resource}}", getResource())
                    .replace("{{mediaStyle}}", getMediaStyle())
                    .replace("{{contentType}}", contentType.asName());
    }

    private String getContentHTML()
    {
        switch (contentType)
        {
            case TEXT:
                return "<span class='{{highlighted}}'>{{text}}</span>";
            case IMAGE:
                return "<img class='{{highlighted}}' src='{{resource}}' alt='{{text}}' style='{{mediaStyle}}'>";
            case AUDIO:
                return "<audio class='{{highlighted}}' src='{{resource}}' style='{{mediaStyle}}' controls></audio>" +
                       "<span class='{{highlighted}}' style='display: none'>{{text}}</span>";
            case VIDEO:
                return "<video class='{{highlighted}}' src='{{resource}}' style='{{mediaStyle}}' controls></video>" +
                       "<span class='{{highlighted}}' style='display: none'>{{text}}</span>";
            default:    // Kommt nicht vor, da alle Ausprägungen von ContentType abgedeckt sind
                return "";
        }
    }

    private String getText()
    {
        if (text.isEmpty() && contentType != ContentType.TEXT)
        {
            return contentType.asName() + " currently not available";
        }
        else
        {
            return StringHelper.escape(text);
        }
    }

    private String getResource()
    {
        if (!resourceID.isEmpty())
        {
            Resource resource = Resource.get(resourceID);
            if (resource != null)
            {
                return resource.getSource();
            }
            else
            {
                throw new RuntimeException("No resource with id '" + resourceID + "' found");
            }
        }
        else if (resource != Resource.emptyResource)
        {
            return resource.getSource();
        }
        else
        {
            return "";
        }
    }

    private String getMediaStyle()
    {
        String mediaStyle = "";
        if (maxWidth != -1)
        {
            mediaStyle += "max-width: " + maxWidth + "px; ";
        }
        if (maxHeight != -1)
        {
            mediaStyle += "max-height: " + maxHeight + "px;";
        }
        return mediaStyle;
    }

    @Override
    public String toString()
    {
        return super.toString() +
               "\n\t" + "text: " + StringHelper.get(text) +
               "\n\t" + "resource: " + StringHelper.get(resource) +
               "\n\t" + "resourceID: " + StringHelper.get(resourceID) +
               "\n\t" + "contentType: " + StringHelper.get(contentType) +
               "\n\t" + "maxWidth: " + StringHelper.get(maxWidth) +
               "\n\t" + "maxHeight: " + StringHelper.get(maxHeight);
    }
}
