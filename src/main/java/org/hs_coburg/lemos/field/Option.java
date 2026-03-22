package org.hs_coburg.lemos.field;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.Objects;

public class Option
{
	public final String id;
	public final String name;
	public final String explanation;

	@JsonCreator
	public Option(@JsonProperty("id") String id,
				  @JsonProperty("name") String name,
				  @JsonProperty("explanation") String explanation)
	{
		this.id          = Objects.requireNonNull(id, "Missing required attribute 'id'");
		this.name        = Objects.requireNonNullElse(name, id);
		this.explanation = Objects.requireNonNullElse(explanation, "");
	}

	public String generateOptionHTML()
	{
		String template = "<option value='{{id}}'>{{name_unescaped}}{{explanation_unescaped}}</option>";
		return template.replace("{{id}}", StringHelper.escape(id))
					   .replace("{{name_unescaped}}", name)
					   .replace("{{explanation_unescaped}}", getExplanation());
	}

	private String getExplanation()
	{
		if (explanation.isEmpty())
		{
			return "";
		}
		else
		{
			return " (" + explanation + ")";
		}
	}

	@Override
	public String toString()
	{
		return getClass().getSimpleName() + ":" +
			   "\n\t" + "id: '" + StringHelper.get(id) + "'" +
			   "\n\t" + "name: '" + StringHelper.get(name) + "'" +
			   "\n\t" + "explanation: '" + StringHelper.get(explanation) + "'";
	}
}
