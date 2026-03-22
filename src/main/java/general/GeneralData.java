package general;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import util.StringHelper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class GeneralData
{
    public final String        heading;
    public final String        explanation;
    public final List<String>  sources;
    public final Contact       contact;
    public final Configuration config;

    @JsonCreator
    public GeneralData(@JsonProperty("heading") String heading,
                       @JsonProperty("explanation") String explanation,
                       @JsonProperty("sources") List<String> sources,
                       @JsonProperty("contact") Contact contact,
                       @JsonProperty("config") Configuration config)
    {
        this.heading     = Objects.requireNonNull(heading, "Missing required attribute 'heading'");
        this.explanation = Objects.requireNonNullElse(explanation, "");
        this.sources     = Objects.requireNonNullElse(sources, Collections.emptyList());
        this.contact     = Objects.requireNonNullElse(contact, new Contact(null));
        this.config      = Objects.requireNonNullElse(config, new Configuration(null, null));
    }

    @Override
    public String toString()
    {
        return "GeneralData:" +
               "\n\t" + "heading: '" + StringHelper.get(heading) + '\'' +
               "\n\t" + "explanation: '" + StringHelper.get(explanation) + '\'' +
               "\n\t" + "sources: " + StringHelper.get(sources) +
               "\n\t" + "contact: " + StringHelper.get(contact) +
               "\n\t" + "config: " + StringHelper.get(config);
    }
}
