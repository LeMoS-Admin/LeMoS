package org.hs_coburg.lemos.field;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.module.Condition;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.List;
import java.util.Objects;

public class SelectorField extends Field
{
	public final List<Option> options;
	public final Boolean      emptyOption;

	@JsonCreator
	public SelectorField(@JsonProperty("id") String id,
						 @JsonProperty("name") String name,
						 @JsonProperty("explanation") String explanation,
						 @JsonProperty("usage") FieldUsage usage,
						 @JsonProperty("type") FieldType type,
						 @JsonProperty("style") Style style,
						 @JsonProperty("allowEmpty") Boolean allowEmpty,
						 @JsonProperty("datatype") FieldDatatype datatype,    // Für SelectorField ignoriert
						 @JsonProperty("restrictions") List<Condition> restrictions,
						 @JsonProperty("options") List<Option> options,
						 @JsonProperty("emptyOption") Boolean emptyOption)
	{
		super(id, name, explanation, usage, type, style, allowEmpty, FieldDatatype.STRING, restrictions);
		this.options     = Objects.requireNonNull(options, "Missing required attribute 'options'");
		this.emptyOption = Objects.requireNonNullElse(emptyOption, false);
	}

	@Override
	protected String getFieldTagTemplateHTML()
	{
		return """
			   <div id='{{id}}' class='fieldContainer {{usage}} {{type}}' style='{{style}}'>
			     {{label}}
			     <div class='field'>
			       <select name='{{id}}' {{enabledState}}>
			       {{options}}
			       </select>
			     </div>
			   </div>
			   """;
	}

	@Override
	protected String getFieldVariableTemplateJS()
	{
		return "let {{id}} = new SelectorField('#{{id}}', '{{name}}', {{emptyOption}}, {{allowEmpty}}, () => {\n{{restrictions}}});";
	}

	@Override
	protected String performReplacements(String string)
	{
		return super.performReplacements(string)
					.replace("{{options}}\n", generateOptionsHTML())
					.replace("{{emptyOption}}", Boolean.toString(emptyOption));
	}

	private String generateOptionsHTML()
	{
		StringBuilder optionsHTML = new StringBuilder();
		for (Option option : options)
		{
			optionsHTML.append(option.generateOptionHTML())
					   .append("\n");
		}
		return optionsHTML.toString();
	}

	@Override
	public String toString()
	{
		return super.toString() +
			   "\n\t" + "options: " + StringHelper.get(options);
	}
}
