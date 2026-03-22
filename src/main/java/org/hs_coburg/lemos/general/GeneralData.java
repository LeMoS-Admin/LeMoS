package org.hs_coburg.lemos.general;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class GeneralData
{
	public final String        heading;
	public final String        explanation;
	public final List<String>  sources;
	public final List<Contact> contacts;
	public final Configuration config;

	@JsonCreator
	public GeneralData(@JsonProperty("heading") String heading,
					   @JsonProperty("explanation") String explanation,
					   @JsonProperty("sources") List<String> sources,
					   @JsonProperty("contacts") List<Contact> contacts,
					   @JsonProperty("config") Configuration config)
	{
		this.heading     = Objects.requireNonNull(heading, "Missing required attribute 'heading'");
		this.explanation = Objects.requireNonNullElse(explanation, "");
		this.sources     = Objects.requireNonNullElse(sources, Collections.emptyList());
		this.contacts    = Objects.requireNonNullElse(contacts, Collections.emptyList());
		this.config      = Objects.requireNonNullElse(config, new Configuration(null, null, null));
	}

	public String generateSourcesHTML()
	{
		if (sources.isEmpty())
		{
			return "Keine Quellen hinterlegt";
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
			return "Keine Kontakte hinterlegt";
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
		if (config.differentStepSizes)
		{
			return "";
		}
		else
		{
			return "display: none;";
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
			   "\n\t" + "config: " + StringHelper.get(config);
	}
}
