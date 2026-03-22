package org.hs_coburg.lemos.field;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.module.Condition;

import java.util.Collections;
import java.util.List;

public class TextField extends Field
{
	@JsonCreator
	public TextField(@JsonProperty("id") String id,
					 @JsonProperty("name") String name,
					 @JsonProperty("explanation") String explanation,
					 @JsonProperty("usage") FieldUsage usage,
					 @JsonProperty("type") FieldType type,
					 @JsonProperty("style") Style style,
					 @JsonProperty("allowEmpty") Boolean allowEmpty,
					 @JsonProperty("datatype") FieldDatatype datatype,
					 @JsonProperty("restrictions") List<Condition> restrictions)
	{
		super(id, name, explanation, FieldUsage.OUTPUT, type, style, true, FieldDatatype.STRING, Collections.emptyList());
	}

	@Override
	protected String getFieldLabelTemplateHTML()
	{
		return """
			   <span class='label'>{{name_unescaped}}</span>
			   """;
	}

	@Override
	protected String getFieldTagTemplateHTML()
	{
		return """
			   <div id='{{id}}' class='fieldContainer {{type}}' style='{{style}}'>
			     {{label}}
			     <div class='field'>
			       <p>{{explanation_unescaped}}</p>
			     </div>
			   </div>
			   """;
	}

	@Override
	protected String getFieldVariableTemplateJS()
	{
		return "let {{id}} = new TextField('#{{id}}', '{{name}}');";
	}

	@Override
	protected String performReplacements(String string)
	{
		return super.performReplacements(string);
	}

	@Override
	public String toString()
	{
		return super.toString();
	}
}
