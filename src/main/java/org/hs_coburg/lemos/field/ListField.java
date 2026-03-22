package org.hs_coburg.lemos.field;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.module.Condition;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.List;
import java.util.Objects;

public class ListField extends ExpandableField
{
	public final Boolean allowWrap;
	public final Integer minEntryWidth;

	@JsonCreator
	public ListField(@JsonProperty("id") String id,
					 @JsonProperty("name") String name,
					 @JsonProperty("explanation") String explanation,
					 @JsonProperty("usage") FieldUsage usage,
					 @JsonProperty("type") FieldType type,
					 @JsonProperty("style") Style style,
					 @JsonProperty("allowEmpty") Boolean allowEmpty,
					 @JsonProperty("datatype") FieldDatatype datatype,
					 @JsonProperty("restrictions") List<Condition> restrictions,
					 @JsonProperty("growthDirection") FieldOrientation growthDirection,
					 @JsonProperty("initialEntries") Integer initialEntries,
					 @JsonProperty("maxEntries") Integer maxEntries,
					 @JsonProperty("allowWrap") Boolean allowWrap,
					 @JsonProperty("minEntryWidth") Integer minEntryWidth)
	{
		super(id, name, explanation, usage, type, style, allowEmpty, datatype, restrictions, growthDirection, initialEntries, maxEntries);

		// Die nachfolgenden Attribute sind nur bei growthDirection HORIZONTAL relevant, da VERTICAL stets die volle Breite nutzt und grundsätzlich unbegrenzt lang sein kann
		if (growthDirection == FieldOrientation.HORIZONTAL)
		{
			this.allowWrap     = Objects.requireNonNullElse(allowWrap, false);
			this.minEntryWidth = Objects.requireNonNullElse(minEntryWidth, -1);
		}
		else
		{
			this.allowWrap     = false;
			this.minEntryWidth = -1;
		}
	}

	@Override
	protected String getFieldTagTemplateHTML()
	{
		return """
			   <div id='{{id}}' class='fieldContainer {{usage}} {{type}} {{growthDirection}} {{wrappableState}}' style='{{style}}'>
			     {{label}}
			     <div class='entries'>
			       <div class='entry entry0' style='min-width: {{minWidth}};'>
			           <div class='fieldContainer {{usage}} TextField'>
			             <div class='field'>
			               <input name='{{id}}' type='text' {{enabledState}}/>
			             </div>
			           </div>
			       </div>
			     </div>
			     <div class='buttons'>
			       <button class='removeEntryButton' name='removeEntry' {{enabledState}}>-</button>
			       <button class='addEntryButton' name='addEntry' {{enabledState}}>+</button>
			     </div>
			   </div>
			   """;
	}

	@Override
	protected String getFieldVariableTemplateJS()
	{
		return "let {{id}} = new ListField('#{{id}}', '{{name}}', {{initialEntries}}, {{maxEntries}}, {{allowEmpty}}, '{{datatype}}', (entry) => {\n{{restrictions}}});";
	}

	@Override
	protected String performReplacements(String string)
	{
		return super.performReplacements(string)
					.replace("{{wrappableState}}", getWrappableState())
					.replace("{{minWidth}}", getMinWidth());
	}

	private String getWrappableState()
	{
		if (allowWrap)
		{
			return "Wrap";
		}
		else
		{
			return "NoWrap";
		}
	}

	private String getMinWidth()
	{
		if (minEntryWidth != -1)
		{
			// Addieren eines weiteren Zeichens, damit die konfigurierten Zeilen sicher in das Feld passen
			return minEntryWidth + 1 + "ch";
		}
		else
		{
			return "unset";
		}
	}

	@Override
	public String toString()
	{
		return super.toString() +
			   "\n\t" + "allowWrap: " + StringHelper.get(allowWrap) +
			   "\n\t" + "minEntryWidth: " + StringHelper.get(minEntryWidth);
	}
}
